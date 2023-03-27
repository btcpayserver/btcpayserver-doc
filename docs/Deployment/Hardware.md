# Hardware Deployment

Hardware deployment is advised when you want to be in total control of your own infrastructure.

Those are very useful for personal use or for people who wants absolute control over their infrastructure.

The main downside of hardware deployment is that it requires some hardware investment, and higher learning curve. The availability of your server will also probably lower than using a VPS such as LunaNode, as you are more likely to suffer from internet down time or hardware failure.

If you are still not sure whether you need hardware deployment, please [see our diagram](./Readme.md).

While all hardware deployments are similar to one another, we document step by step the process on three different hardware settings.

- [Raspberry Pi 4](./RaspberryPi4.md)
- [Hack0](./Hack0.md) (based on Armbian and RockPro64)
- [LightningInABox](./LightningInABox.md) (based on Ubuntu and Gigabyte Brix GB-BXBT-1900)

You can easily adapt those documentation on the custom hardware you prefer, we support arm32, arm64 and amd64.

Note that those solutions are all based on our docker deployment system.
