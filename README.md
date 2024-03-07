> [!IMPORTANT]  
> This is the Protontweaks UI repository, you can find its sister repositories at the following links!

- [CLI](https://github.com/rain-cafe/protontweaks)
- [App](https://github.com/rain-cafe/protontweaks-ui)
- [Database / API](https://github.com/rain-cafe/protontweaks-db) _(you are here)_

## Protontweaks DB + API

> Tweak database for your favorite games!

### Usage

Its highly recommended that if you're planning on fetching tweaks from our api that you lock into a specific version.

`https://api.protontweaks.com/v2/<app-id>.json`

Old versions will get any new apps that are added, however if a feature isn't supported in the old api it won't get mapped.

### Adding a tweak?

- Lookup your the app id of your steam app.

> [!TIP]
> You can discover the app id by using [https://steamdb.info](https://steamdb.info/apps/)!

- Copy the contents of [template](./apps/.template.json) and create a json file with the name `[your-app-id].json`
- Add any dlls, fonts, etc.
- Create a PR with your changes!

### Example Tweak File

```ts
{
  "name": "They Are Billions",
  "tweaks": {
    // Specify any protontricks here
    "tricks": ["gdiplus"],
    // Set any environment variables here
    "env": {},
    "settings": {
      // Informs the client that ESync should be disabled
      "esync": false,
      // Informs the client that FSync should be disabled
      "fsync": false
    }
  }
}
```

### TODO

- Add support for gpu vendor specific configs
