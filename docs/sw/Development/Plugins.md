# Programu-jalizi

Programu-jalizi za BTCPay Server zimeandikwa kwa C#.
Zinapanua utendaji wa msingi na zinafanya kazi katika muktadha sawa na msimbo wa BTCPay Server.
Kama hitaji la awali la kuendeleza programu-jalizi, unapaswa kufahamu mchakato wa [maendeleo ya ndani](./LocalDev.md).

[[toc]]

## Usanidi wa programu-jalizi mpya

Unda folda kwa miradi ya BTCPay Server. Itakuwa na angalau:

- Hifadhi yako ya programu-jalizi
- Tawi lako la hifadhi ya BTCPay Server

Unaweza kuanza kwa kunakili [kiolezo cha programu-jalizi](https://github.com/btcpayserver/btcpayserver-plugin-template) au kuangalia [programu-jalizi zilizopo](#nyenzo).

## Utatuzi

Ikiwa ulitumia [kiolezo cha programu-jalizi](https://github.com/btcpayserver/btcpayserver-plugin-template), tafadhali [fuata maagizo hayo](https://github.com/btcpayserver/btcpayserver-plugin-template/tree/master#debugging-the-plugin).

Ikiwa haukutumia kiolezo cha programu-jalizi, utahitaji kuamuru BTCPay Server kwa mkono kuendesha programu-jalizi yako wakati wowote unapoendesha programu katika hali ya maendeleo. Ili kufanya hivyo, ongeza faili `BTCPayServer/appsettings.dev.json`. Haizingatiwi katika hifadhi na inarejelea toleo la ndani lililojengwa la programu-jalizi yako kwa utatuzi:

```bash
{
  "DEBUG_PLUGINS": "/absolute/path/btcpayserver-plugin-template/src/BTCPayServer.Plugins.Template/bin/Debug/net10.0/BTCPayServer.Plugins.Template.dll"
}
```

Unahitaji kurejelea faili ya DLL iliyojengwa kwa njia kamili ya toleo la ujenzi la programu-jalizi yako kwenye mfumo wako wa faili wa ndani.
Ikiwa unataka kurejelea programu-jalizi nyingi, zitenge kwa kutumia nusu koloni.
Jenga programu-jalizi yako kabla ya kuanzisha BTCPay Server, na uijenge upya wakati wowote unapotaka BTCPay Server ipakie mabadiliko yako ya hivi karibuni.

:::tip Kujenga suluhisho zima
Unaweza kutaka kusanidi hatua ya kabla ya ujenzi katika suluhisho, ili programu-jalizi yako ijengwe upya wakati wowote unapoendesha programu.
Fanya hivyo kwa kuhariri usanidi wa kuendesha/utatuzi na uchague kujenga suluhisho zima, badala ya mradi wa BTCPay Server pekee.
:::

Kisha unaweza kufuata maagizo ya [maendeleo ya ndani](./LocalDev.md) kuanzisha BTCPay Server.

## Kuandika msimbo wa programu-jalizi

Maelezo zaidi kuhusu mada zifuatazo yatatolewa hivi karibuni.
Kwa sasa, haya ndiyo mambo ya msingi unayopaswa kujua kuhusu...

### Rasilimali

Ili kurejelea rasilimali (CSS, JavaScript na picha), mradi wa programu-jalizi unahitaji [kupachika folda ya `Resources`](https://github.com/btcpayserver/btcpayserver-plugin-template/blob/master/BTCPayServer.Plugins.Template/BTCPayServer.Plugins.Template.csproj#L32) kama hivi:

```xml
<ItemGroup>
  <ProjectReference Include="..\btcpayserver\BTCPayServer\BTCPayServer.csproj" />
  <EmbeddedResource Include="Resources\**" />
</ItemGroup>
```

Kisha unaweza kurejelea rasilimali katika mionekano yako kama hivi:

```html
<img src="~/Resources/img/my.png" asp-append-version="true" />
<script src="~/Resources/js/my.js" asp-append-version="true"></script>
<link href="~/Resources/css/my.css" asp-append-version="true" rel="stylesheet" />
```

Mfano mzuri wa hii ni [programu-jalizi ya Bitcoin Whitepaper](https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.BitcoinWhitepaper) ambayo inaonyesha PDF ya karatasi nyeupe ya bitcoin kwenye BTCPay Server yako kwa kutumia rasilimali zilizopachikwa.

### Hifadhidata

Majedwali makuu ya hifadhidata ya BTCPay Server ni sehemu ya schema ya umma.
Programu-jalizi zina muktadha na schema yao wenyewe ya hifadhidata, iliyopewa jina la programu-jalizi:

```csharp
public class MyPluginDbContextFactory : BaseDbContextFactory<MyPluginDbContext>
{
    public MyPluginDbContextFactory(IOptions<DatabaseOptions> options) :
        base(options, "BTCPayServer.Plugins.Template") {}
}
```

Programu-jalizi zinaweza kuwa na mifano na uhamiaji wao wenyewe wa data:

```bash
# Ongeza uhamiaji mpya mara tu unapofafanua mfano mpya au masasisho
dotnet ef migrations add MoreData -p BTCPayServer.Plugins.Template -c PluginDbContext -o Data/Migrations

# Sasisha hifadhidata
dotnet ef database update -p BTCPayServer.Plugins.Template -c PluginDbContext
```

Unapokagua hifadhidata (kwa `psql`), ni majedwali ya schema ya umma pekee yanayoonyeshwa kwa chaguo-msingi.
Ikiwa unataka pia kuona na kuchagua majedwali ya programu-jalizi, unahitaji kupanua njia ya utafutaji:

```sql
# orodhesha schema za programu-jalizi
SELECT * FROM pg_catalog.pg_namespace WHERE nspname LIKE 'BTCPayServer.%';

# panua njia ya utafutaji
SET search_path TO "BTCPayServer.Plugins.Template", public;

# orodha ya majedwali sasa pia inaonyesha majedwali ya programu-jalizi ya kiolezo
\dt
```

### Sehemu za Upanuzi wa UI

Sehemu za upanuzi zinakupa njia za kuongeza mionekano na sehemu ndogo za programu-jalizi yako kwenye UI.
Zinafafanuliwa katika darasa la msingi la programu-jalizi.
Kipande kifuatacho kinaonyesha jinsi unavyoweza kuongeza kiungo cha programu-jalizi yako kwenye urambazaji mkuu:

```csharp
public class Plugin : BaseBTCPayServerPlugin
{
    public override void Execute(IServiceCollection services)
    {
        services.AddSingleton<IUIExtension>(new UIExtension("TemplatePluginHeaderNav", "header-nav"));
    }
}
```

Katika hali hii, `header-nav` ni jina la sehemu ya upanuzi.
Unaweza kupata sehemu za upanuzi zinazopatikana kwa kutafuta marejeleo ya `vc:ui-extension-point` ndani ya programu kuu.
Kwa `header-nav` marejeleo yanaonekana kama hivi:

```csharp
<vc:ui-extension-point location="header-nav" model="@Model" />
```

Mionekano na sehemu ndogo (k.m. `TemplatePluginHeaderNav.cshtml`) zinahitaji kuwa katika folda ya `Shared` ya saraka yako ya `Views` au `Pages`, ili programu kuu iweze kuzipata na kuzijumuisha.

:::tip Sehemu za upanuzi zinazokosekana
Ikiwa ungependa kupanua UI lakini sehemu ya upanuzi haipo bado, jisikie huru kufungua suala na ombi la kuiongeza.
Tunaziongeza kadri tunavyoendelea, sawa na [vitendo na vichujio](#vitendo-na-vichujio)...
:::

### Vitendo na Vichujio

Mbali na sehemu za upanuzi zinazoungana kwenye UI, unaweza pia kutumia ndoano zifuatazo kurekebisha na kupanua tabia:

- [Kitendo](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Abstractions/Contracts/IPluginHookAction.cs): Panua utendaji wa msingi
- [Vichujio](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Abstractions/Contracts/IPluginHookFilter.cs): Fanya jambo na pia rudisha data

Kama ilivyo na sehemu za upanuzi wa UI, unaweza kuzifafanua ndani ya mbinu ya `Execute` ya darasa la msingi la programu-jalizi:

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

Pata ndoano zinazopatikana kwa kutafuta miito ya `ApplyAction` na `ApplyFilter` ndani ya programu kuu.

### Uidhinishaji na Ruhusa

Unaweza kutumia tena `AuthenticationSchemes` na `Policies` za programu kuu:

```csharp
// Idhinisha watumiaji kupitia kuingia kwao kwa kuki
[Authorize(AuthenticationSchemes = AuthenticationSchemes.Cookie, Policy = Policies.CanViewProfile)]
public class UIPluginController : Controller
{
    // GET inaweza kurithi CanViewProfile
    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        return View();
    }

    // POST inaweza kuhitaji CanModifyProfile
    [HttpPost("update")]
    [Authorize(AuthenticationSchemes = AuthenticationSchemes.Cookie, Policy = Policies.CanModifyProfile)]
    public async Task<IActionResult> Modify()
    {
        return RedirectToAction(nameof(Index))
    }
}
```

Ili kuonyesha sehemu fulani za UI kulingana na ruhusa alizonazo mtumiaji, unaweza kutumia kisaidizi cha lebo ya mwonekano wa `permissions`:

```html
<li class="nav-item" permission="@Policies.CanModifyProfile"></li>
```

Kwa kuendeleza ruhusa mahususi za programu-jalizi, tafadhali soma [ukurasa huu](./Plugins-Permissions.md).

### API

Iwapo programu-jalizi yako ina API na unataka kuongeza nyaraka zake za OpenAPI, ongeza darasa linalorithi kutoka kwa `ISwaggerProvider` yetu:

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

Kama unavyoona inarejelea faili za Swagger katika `Resources/swagger/v1` — unaweza kuziongeza kama tu [rasilimali](#rasilimali) nyingine.
Mara hiyo itakapokamilika, nyaraka za API ya programu-jalizi yako zinapaswa kuonekana kwenye njia ya `/docs` ya mfano pamoja na [nyaraka za Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/).

## Kuchapisha programu-jalizi

Tumia [BTCPay Server Plugin Builder](https://plugin-builder.btcpayserver.org/) kujenga na kuchapisha programu-jalizi yako.
Unaweza kuvinjari miradi iliyoidhinishwa katika [saraka ya umma ya programu-jalizi](https://plugin-builder.btcpayserver.org/public/plugins).

### Kabla ya kuanza

Unda akaunti au ingia kwenye Plugin Builder, kisha thibitisha anwani yako ya barua pepe na akaunti ya GitHub kabla ya kuunda programu-jalizi au kuanza ujenzi.

Programu-jalizi yako lazima ipangishwe katika hifadhi ya umma ya GitHub au GitLab ambayo Builder inaweza kunakili kupitia HTTPS bila vitambulisho.
Endesha majaribio yako kabla ya kuwasilisha ujenzi: Builder inachapisha na kupakia programu-jalizi, lakini haitekelezi safu yako ya majaribio wala kusakinisha programu-jalizi.

### Unda programu-jalizi na ujenzi wake wa kwanza

1. Chagua **Create Plugin** na weka kifupi, kichwa na maelezo. Nembo na video ya onyesho ni vya hiari katika hatua hii, lakini vinahitajika kabla ya kuomba kuorodheshwa kwa umma.

   ![Fomu ya kuunda programu-jalizi mpya katika Plugin Builder](../../img/plugins/plugin-builder-create-plugin-form.png)

2. Chagua **Create Build** na weka URL ya HTTPS ya hifadhi ya Git.
3. Kwa hiari bainisha:
   - Tawi au lebo. Inapoachwa wazi, tawi la chaguo-msingi la hifadhi linatumika.
   - Saraka iliyo na mradi wa programu-jalizi. Inapoachwa wazi, mzizi wa hifadhi unatumika. Saraka iliyochaguliwa lazima iwe na faili moja tu ya `.csproj`.
   - Usanidi wa ujenzi wa .NET. Unapoachwa wazi, `Release` inatumika.
4. Wasilisha ujenzi na ufuate hali na matokeo yake kwenye ukurasa wa ujenzi.

Builder inanakili moduli ndogo za Git kwa kurudia, inaendesha `dotnet publish`, inathibitisha orodha dhahiri ya programu-jalizi na kupakia matokeo.
Ujenzi uliofaulu hapo awali unachapishwa kama toleo la kabla ya kutolewa.

![Ujenzi wa kabla ya kutolewa uliochapishwa katika Plugin Builder](../../img/plugins/plugin-builder-prerelease-build.png)

### Jaribu toleo la kabla ya kutolewa

Tumia mfano wa BTCPay Server usio wa uzalishaji unaoendana na programu-jalizi.
Nenda kwa **Server Settings > Policies**, wezesha **Show plugins in pre-release**, na uhifadhi.

![Chaguo la kuonyesha programu-jalizi katika hali ya kabla ya kutolewa kwenye ukurasa wa Sera za BTCPay Server](../../img/plugins/plugin-builder-show-prereleases.png)

Kisha fungua **Plugin Directory** na utafute programu-jalizi kwa jina lake halisi ikiwa bado haijaorodheshwa.
Isakinishe, anzisha upya BTCPay Server unapoombwa, na ujaribu usakinishaji, uanzishaji, usanidi, maboresho na mtiririko mkuu wa kazi wa programu-jalizi.
Baada ya usakinishaji, tumia **Installed Plugins** kuisimamia.

Wakati toleo liko katika hali ya kabla ya kutolewa, unaweza kusahihisha chanzo na kujenga upya toleo lile lile.
Matokeo ya Builder yaliyofaulu yanathibitisha tu kwamba programu-jalizi inaweza kuchapishwa na kupakiwa; haithibitishi kwamba programu-jalizi inafanya kazi kwa usahihi.

### Kutolewa na kuorodheshwa

Hali ya toleo na mwonekano wa mradi ni dhana tofauti:

| Lebo              | Inatumika kwa   | Maana                                                                                |
| ----------------- | --------------- | ------------------------------------------------------------------------------------ |
| **Pre-release**   | Toleo la programu-jalizi | Inapatikana kwa watumiaji wanaowezesha matoleo ya kabla ya kutolewa. Toleo lile lile linaweza kujengwa upya. |
| **Released**      | Toleo la programu-jalizi | Kifurushi thabiti. Hakiwezi kubadilishwa na ujenzi mwingine wakati kimeshatolewa.   |
| **Listed**        | Mradi wa programu-jalizi | Imeidhinishwa kwa ugunduzi wa kawaida katika saraka ya umma ya programu-jalizi.      |

Chagua **Release** tu baada ya kujaribu toleo la kabla ya kutolewa.
Kwa marekebisho na matoleo ya baadaye, sasisha `<Version>` katika `.csproj` ya programu-jalizi, unda ujenzi mwingine, ujaribu na kisha utoe.

:::warning Kutolewa siyo kuorodheshwa
Kutoa toleo hakuongezi programu-jalizi kwenye saraka kuu ya umma.
Miradi mipya inabaki **Haijaorodheshwa** hadi ombi la kuorodheshwa litakapopitiwa na kuidhinishwa.
Programu-jalizi isiyoorodheshwa bado ina ukurasa wa umma na inaweza kupatikana na watumiaji wanaotafuta jina lake halisi.
:::

### Omba kuorodheshwa kwa umma

Mara programu-jalizi inapokuwa na toleo, chagua **Request Listing** kutoka kwenye urambazaji wake.

![Orodha ya ukaguzi ya Ombi la Kuorodhesha Programu-jalizi katika Plugin Builder](../../img/plugins/plugin-builder-request-listing.png)

**Noti ya Kutolewa** katika fomu ya kuorodhesha inahitajika, imepunguzwa kwa herufi 200 na inatumika kama tangazo la kijamii la programu-jalizi.

Kabla ya kuwasilisha ombi:

- Kamilisha mipangilio ya programu-jalizi kwa maelezo wazi, nembo, hifadhi ya Git, URL ya nyaraka na video ya onyesho.
- Hakikisha kila mmiliki wa programu-jalizi amethibitisha barua pepe yake, GitHub na akaunti za Nostr.
- Chapisha ujumbe wa uthibitisho katika [kikundi rasmi cha Telegram cha BTCPay Server](https://t.me/btcpayserver) na toa URL ya ujumbe.
- Toa angalau mapitio moja yaliyochapishwa kwa umma kutoka kwa Mtu mwenye sifa nzuri wa Bitcoin ambaye alijaribu programu-jalizi.
- Kwa hiari toa tarehe na wakati unaopendelea wa kutangaza.

Ombi linapitiwa kwa mkono.
Ikiwa limekataliwa, shughulikia sababu iliyoonyeshwa katika **Listing History** na uwasilishe tena.
Mara kinapoidhinishwa, kuorodheshwa kunatumika kwa mradi, kwa hivyo matoleo ya baadaye yanahitaji tu kupitia mzunguko wa kujenga, kujaribu na kutoa.

Uidhinishaji wa kuorodheshwa siyo ukaguzi wa msimbo au usalama, na haujumuishi kuidhinishwa na timu ya BTCPay Server.

### Utatuzi wa matatizo na uendeshaji otomatiki

Ikiwa ujenzi unashindwa, kagua matokeo yake na uthibitishe kwamba:

- Hifadhi na moduli zake ndogo zinaweza kunakiliwa bila vitambulisho vya kibinafsi.
- Tawi au lebo ipo.
- Saraka iliyochaguliwa ina faili moja tu ya `.csproj`.
- Mradi unajengwa na majaribio yake yanapita kwa ndani na usanidi uliochaguliwa.
- Kitambulisho cha programu-jalizi ni cha mradi huu wa Plugin Builder.
- `<Version>` haijatolewa tayari.

Ili kuendesha ujenzi na matoleo ya baadaye kiotomatiki, angalia [nyaraka shirikishi za API ya Plugin Builder](https://plugin-builder.btcpayserver.org/docs).

## Notisi muhimu kuhusu programu-jalizi

Programu-jalizi zinatengenezwa na watu wa tatu. Zinahitaji kusasishwa na kudumishwa mara kwa mara, pamoja na BTCPay Server.

**Tumia kwa Hatari Yako Mwenyewe**: Programu-jalizi katika duka hili zinatengenezwa na watu huru wa tatu. Programu-jalizi hizi hazijapitiwa na timu ya BTCPay Server.

**Kanusho la Wajibu**: Wachangiaji wa BTCPay Server au Foundation hawawajibiki kwa madhara yoyote, hasara, au uharibifu unaotokana na kusakinisha au kutumia programu-jalizi. Watumiaji wanachukua wajibu kamili kwa usakinishaji wao, matumizi, ufahamu wa leseni na masharti ya huduma na matengenezo.

**Hakuna Uidhinishaji Rasmi**: Kujumuishwa katika orodha ya programu-jalizi za BTCPay Server hakujumuishi uidhinishaji au dhamana ya ubora, usalama, au upatanifu.

**Uangalifu Unashauriwa**: Tunapendekeza watumiaji wawe waangalifu na wafanye utafiti wao wenyewe au kushauriana na jamii kabla ya kusakinisha programu-jalizi yoyote.

**Maoni na Kuripoti**: Iwapo utapata matatizo na programu-jalizi, tafadhali toa maoni au ripoti wasiwasi moja kwa moja kwa watengenezaji husika wa programu-jalizi.

## Nyenzo

### Saraka ya programu-jalizi

Pata msukumo na upate programu-jalizi katika [saraka ya Programu-jalizi za BTCPay](https://plugin-builder.btcpayserver.org/).

### Maagizo ya msimbo wa mtindo wa programu-jalizi ya BTCPay ya Rockstardev

[![Maagizo ya programu-jalizi za msimbo wa mtindo wa RockstarDev](https://img.youtube.com/vi/dW9eSgA_dUg/mqdefault.jpg)](https://www.youtube.com/watch?v=dW9eSgA_dUg)

### Hifadhi za mifano

Kwa msukumo wa jinsi ya kuunda programu-jalizi, angalia hifadhi zifuatazo:

- [Programu-jalizi za BTCPay Server za kukks](https://github.com/Kukks/BTCPayServerPlugins)
- [Programu-jalizi za BTCPay Server za rockstardev](https://github.com/rockstardev/BTCPayServerPlugins.RockstarDev)
- [Programu-jalizi ya Boltz BTCPay Server](https://github.com/BoltzExchange/boltz-btcpay-plugin)
