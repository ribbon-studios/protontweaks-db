## Protontweaks DB

> [!IMPORTANT]  
> This is the Protontweaks DB repository, you can find the `protontweaks` cli [over here](https://github.com/rain-cafe/protontweaks)

### Usage

Its highly recommended that if you're planning on fetching tweaks from our api that you lock into a specific version.

`https://tweaks.rains.cafe/api/v2/<app-id>.json`

### Adding a tweak?

- Lookup your the app id of your steam app.

> [!TIP]
> You can discover the app id by using [https://steamdb.info](https://steamdb.info/apps/)!

- Copy the contents of [template](./tweaks/.template.json) and create a json file with the name `[your-app-id].json`
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
