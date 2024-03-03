## Protontweaks DB

> [!IMPORTANT]  
> This is the Protontweaks DB repository, you can find the [`protontweaks` cli over here](https://github.com/rain-cafe/protontweaks)

### Adding a tweak?

- Lookup your the app id of your steam app.

> [!TIP]
> You can discover the app id by using [https://steamdb.info](https://steamdb.info/apps/)!

- Copy the contents of [template](./tweaks/.template.json) and create a json file with the name `[your-app-id].json`
- Add any dlls, fonts, etc.
- Create a PR with your changes!

### Example Tweak File

```jsonc
{
  "name": "They Are Billions",
  "tweaks": {
    "dlls": ["gdiplus"]
  }
}
```
