# Plugins

BTCPay Server Plugins are written in C#.
They extend the core functionality and run in the same context as the BTCPay Server code.
As a prerequisite for developing a plugin, you should be familiar with the [local development](./LocalDev.md) process.

[[toc]]

## Setup of a new plugin

Create a folder for the BTCPay Server projects. It will contain at least:

- Your plugin repository
- Your fork of the BTCPay Server repository

You can get started by cloning the [plugin template](https://github.com/btcpayserver/btcpayserver-plugin-template) or taking a look at [existing plugins](#resources).
This tutorial uses the plugin template as an example — substitute the references with your own plugin or simply follow along with the template.

The plugin repository should have BTCPay Server as a submodule.
This way you are able to reference BTCPay Server as a dependency, so that you can use the existing core classes and modules.
Start by first building BTCPay Server and then your plugin to check that the references are working:

```bash
# Clone the plugin template to a new directory called btcpayserver-my-plugin + make sure we get the contents of the submodule too
git clone git@github.com:btcpayserver/btcpayserver-plugin-template.git --recurse-submodules btcpayserver-my-plugin

# Enter the dir
cd btcpayserver-my-plugin

# Build the BTCPay Server project inside the plugin repository
dotnet build btcpayserver

# Build your plugin, which references the BTCPay Server project
dotnet build BTCPayServer.Plugins.Template
```

To develop your plugin you will need the BTCPay Server solution as the context:
Fork the [main repository](https://github.com/btcpayserver/btcpayserver) to your personal GitHub account and clone it onto your computer.

The folder structure should now look like this:

```bash
|_ btcpayserver # your fork
|_ btcpayserver-plugin-template
  |_ btcpayserver # the submodule
  |_ BTCPayServer.Plugins.Template
```

Before starting, rename `BTCPayServer.Plugins.Template` to the name of your plugin.
Also rename the `BTCPayServer.Plugins.Template/BTCPayServer.Plugins.Template.csproj` file.

In the csproj file, customize the plugin information, for example:

```xml
  <PropertyGroup>
    <Product>Cool Plugin</Product>
    <Description>My plugin is doing nothing, but it's cool.</Description>
    <Version>1.0.0</Version>
  </PropertyGroup>
```

### Plugin reference

In the forked repository you can [include your plugin in the solution](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-sln#add) inside the [`Plugins` subdirectory](https://github.com/btcpayserver/btcpayserver/tree/master/Plugins/):

```bash
# Enter the forked BTCPay Server repository
cd btcpayserver

# Add your plugin to the solution
dotnet sln add ../btcpayserver-plugin-template/BTCPayServer.Plugins.Template -s Plugins
```

This references the plugin project in the folder, that sits right next to your BTCPay Server fork.

:::tip The BTCPay Server dependency
Your plugin is part of the BTCPay Server solution then, but keep the following in mind:
The BTCPay Server version your plugin has as a dependecy is the submodule in the plugin repository — not the one in the forked repository.
You will need to update the submodule to access the latest version of BTCPay Server.
:::

To have the main project include the plugin whenever you run the app in development mode, you need to add the file `BTCPayServer/appsettings.dev.json`. It is ignored in the repository and references the local and built version of your plugin for debugging:

```bash
{
  "DEBUG_PLUGINS": "/absolute/path/btcpayserver-plugin-template/BTCPay.Plugins.Template/bin/Debug/net6.0/BTCPayServer.Plugins.Template.dll"
}
```

You need to reference the built DLL file with the absolute path of the build version of your plugin on your local file system.
If you want to reference multiple plugins, separate them using a semicolon.

Once that is set up, you should be able to build and run the app — see the startup message for potential problems.
Your plugin should be included and also be ready for debugging.

:::tip Building the whole solution
You might want to setup a pre-build step in the solution, so that your plugins gets rebuild whenever you run the app.
Do so by editing the run/debug configuration and choose the build the whole solution, instead of just the BTCPay Server project.
:::

## Coding a plugin

More information on the following topics will be provided soon.
For now, these are the basics you should know about …

### Assets

In order to reference assets (CSS, JavaScript and images), the plugin project needs to [embed a `Resources` folder](https://github.com/btcpayserver/btcpayserver-plugin-template/blob/master/BTCPayServer.Plugins.Template/BTCPayServer.Plugins.Template.csproj#L32) like this:

```xml
<ItemGroup>
  <ProjectReference Include="..\btcpayserver\BTCPayServer\BTCPayServer.csproj" />
  <EmbeddedResource Include="Resources\**" />
</ItemGroup>
```

Then you can reference the assets in your views like this:

```html
<img src="~/Resources/img/my.png" asp-append-version="true" />
<script src="~/Resources/js/my.js" asp-append-version="true"></script>
<link
  href="~/Resources/css/my.css"
  asp-append-version="true"
  rel="stylesheet"
/>
```

A good example of this is the [Bitcoin Whitepaper plugin](https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.BitcoinWhitepaper) which exposes the bitcoin whitepaper PDF on your BTCPay Server using embedded resources.

### Database

The main BTCPay Server database tables are part of the public schema.
Plugins have their own database context and schema, named after the plugin:

```csharp
public class MyPluginDbContextFactory : BaseDbContextFactory<MyPluginDbContext>
{
    public MyPluginDbContextFactory(IOptions<DatabaseOptions> options) :
        base(options, "BTCPayServer.Plugins.Template") {}
}
```

Plugins can have their own data models and migrations:

```bash
# Add a new migration once you defined a new model or updates
dotnet ef migrations add MoreData -p BTCPayServer.Plugins.Template -c PluginDbContext -o Data/Migrations

# Update the database
dotnet ef database update -p BTCPayServer.Plugins.Template -c PluginDbContext
```

When inspecting the database (with `psql`), only the tables of the public schema are shown by default.
If you want to also see and select the plugin tables, you need to extend the search path:

```sql
# list plugin schemas
SELECT * FROM pg_catalog.pg_namespace WHERE nspname LIKE 'BTCPayServer.%';

# extend search path
SET search_path TO "BTCPayServer.Plugins.Template", public;

# table list now also shows the template plugin tables
\dt
```

### UI Extension Points

The extension points offer you ways to add your plugin views and partials to the UI.
They get defined in the plugin base class.
The following snippet shows how you can add a link to your plugin to the main navigation:

```csharp
public class Plugin : BaseBTCPayServerPlugin
{
    public override void Execute(IServiceCollection services)
    {
        services.AddSingleton<IUIExtension>(new UIExtension("TemplatePluginHeaderNav", "header-nav"));
    }
}
```

In this case, `header-nav` is the name of the extension point.
You can find the available extension points by searching for the `vc:ui-extension-point` references inside the main app.
For the `header-nav` the reference looks like this:

```csharp
<vc:ui-extension-point location="header-nav" model="@Model" />
```

The views and partials (i.e. `TemplatePluginHeaderNav.cshtml`) need to be located in the `Shared` folder of your `Views` or `Pages` directory, so that the main app can find and include them.

:::tip Missing extension points
If you would like to extend the UI but an extension point is not available yet, feel free to open an issue with a request to add it.
We extend them as we move along, same with [actions and filters](#actions-and-filters) …
:::

### Actions and Filters

In addtion to the extention points which hook into the UI, you can also use the following hooks to modify and extend behaviour:

- [Action](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Abstractions/Contracts/IPluginHookAction.cs): Extend the core functionality
- [Filters](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Abstractions/Contracts/IPluginHookFilter.cs): Do something and also return data

As with the UI extention points, you can define them within the `Execute` method of the plugin base class:

```csharp
public class Plugin : BaseBTCPayServerPlugin
{
    public override void Execute(IServiceCollection services)
    {
        services.AddSingleton<IPluginHookAction, MyPluginAction>();
        services.AddSingleton<IPluginHookFilter, MyPluginFilter>();
    }
}
```

Find the available hooks by searching for `ApplyAction` and `ApplyFilter` calls inside the main app.

### Authorization and Permissions

You can reuse the `AuthenticationSchemes` and `Policies` of the main app:

```csharp
// Authorize users via their cookie login
[Authorize(AuthenticationSchemes = AuthenticationSchemes.Cookie, Policy = Policies.CanViewProfile)]
public class UIPluginController : Controller
{
    // GET might inherit CanViewProfile
    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        return View();
    }

    // POST might require CanModifyProfile
    [HttpPost("update")]
    [Authorize(AuthenticationSchemes = AuthenticationSchemes.Cookie, Policy = Policies.CanModifyProfile)]
    public async Task<IActionResult> Modify()
    {
        return RedirectToAction(nameof(Index))
    }
}
```

To show certain parts of the UI depending on the permissions the user has, you can use the `permissions` view tag helper:

```html
<li class="nav-item" permission="@Policies.CanModifyProfile"></li>
```

#### Customizing Authorization

You can also define your own `AuthenticationSchemes` and `Policies` within the `Execute` method of the plugin base class:

```csharp
public class Plugin : BaseBTCPayServerPlugin
{
    public override void Execute(IServiceCollection services)
    {
        // Add custom authentication scheme
        var builder = new AuthenticationBuilder(services);
        builder.AddScheme<PluginAuthenticationOptions, PluginAuthenticationHandler>(
            PluginAuthenticationSchemes.AccessKey, _ => { });

        // Add custom policies
        services.AddAuthorization(opts =>
        {
            foreach (var policy in PluginPolicies.AllPolicies)
            {
                opts.AddPolicy(policy, policyBuilder => policyBuilder
                    .AddRequirements(new PolicyRequirement(policy)));
            }
        });
    }
}
```

The custom policies might look like this:

```csharp
public class PluginPolicies
{
    public const string CanViewWallet = "btcpay.plugin.template.canviewwallet";
    public const string CanManageWallet = "btcpay.plugin.template.canmanagewallet";

    public static IEnumerable<string> AllPolicies
    {
        get
        {
            yield return CanViewWallet;
            yield return CanManageWallet;
        }
    }
}
```

### API

In case your plugin has an API and you want to add its OpenAPI documentation, add a class inheriting from our `ISwaggerProvider`:

```csharp
public class PluginSwaggerProvider : ISwaggerProvider
{
    private readonly IFileProvider _fileProvider;

    public PluginSwaggerProvider(IWebHostEnvironment webHostEnvironment)
    {
        _fileProvider = webHostEnvironment.WebRootFileProvider;
    }

    public async Task<JObject> Fetch()
    {
        JObject json = new();
        var fi = _fileProvider.GetFileInfo("Resources/swagger/v1/swagger.template.plugin.json");
        await using var stream = fi.CreateReadStream();
        using var reader = new StreamReader(fi.CreateReadStream());
        json.Merge(JObject.Parse(await reader.ReadToEndAsync()));
        return json;
    }
}
```

As you can see it references the Swagger files in `Resources/swagger/v1` — you can add them just like other [assets](#asset).
Once that is done, your plugin API documentation should appear on the instance `/docs` path alongside the [Greenfield API documentation](https://docs.btcpayserver.org/API/Greenfield/v1/).

## Publishing the plugin

The plugins are published via the [plugin builder](https://plugin-builder.btcpayserver.org/).
You can sign up, build and submit new versions of your plugin using this web UI.

![Plugin Builder: Create a new plugin](../img/plugins/plugin-builder-create-plugin.png)

Once you have a new version ready, you can create a new build.
To do so, you will need to reference the Git repository of your plugin, as well as the branch and path of your plugin.

![Plugin Builder: Create a new build](../img/plugins/plugin-builder-create-build.png)

The result will be a packaged version of your plugin in `prerelease` state.
A version in prerelease can be modified just by rebuilding your plugin in the plugin builder.

You can browse the prereleased plugin list on any BTCPay Server by going to `Server Settings > Policies`, check `Show plugins in pre-release` and `Save`.

Once you click the `Release` button on the build page, the package won't be in prerelease anymore and it is visible to everyone. Once the package is released, you won't be able to publish a new build with the same version number. So you will need to bump the `<Version>` of your plugin in the csproj before publishing any new adjustment to your plugin.

## Resources

For more information check out these repositories with existing plugins:

- [kukks' plugins](https://github.com/Kukks/BTCPayServerPlugins)
- [Trocador.app](https://github.com/saltrafael/trocador-plugin)
