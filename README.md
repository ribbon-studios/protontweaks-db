> [!IMPORTANT]  
> This is the Protontweaks Database repository, you can find its sister repositories at the following links!

- [CLI](https://github.com/rain-cafe/protontweaks)
- [App](https://github.com/rain-cafe/protontweaks-ui)
- [Database / API](https://github.com/rain-cafe/protontweaks-db) _(you are here)_

## Protontweaks DB + API

> Tweak database for your favorite games!

### Usage

Its highly recommended that if you're planning on fetching tweaks from our api that you lock into a specific version.

`https://api.protontweaks.com/v4/<app-id>.json`

Old versions will get any new apps that are added, however if a feature isn't supported in the old api it won't get mapped.

Prior versions will be removed approximately a year after they're added.

- **V4:** Active
- **V3:** March 1st, 2025
- **V2:** March 1st, 2025
- **V1:** March 1st, 2025

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
    // Set any cli args here
    "args": ["--use-d3d11"],
    // true      => cli is confirmed to work.
    // false     => cli is confirmed to cause problems.
    //
    // If the option is not present then the given cli has not been tested.
    // Consumers of the API can interpret this however they want.
    // In the case of `protontweaks` it will do the following:
    // - gamemode => run unless the user has explicitly disabled it (or it isn't installed)
    // - mangohud => not run unless the user has explicitly enabled it and it is installed
    //
    // Because of how mangohud functions it tends to be safer to assume it'll cause problems unless confirmed
    "settings": {
      "gamemode": true,
      "mangohud": false
    },
    "system": {
      // Specify any gpu specific tweaks
      "gpu_driver": {
        "amd": {},
        "nvidia": {}
      }
    }
  },
  // Any flags / tricks that are utilized and not overtly obvious how they resolve an issue should be documented.
  "issues": [
    {
      "solution": "--use-d3d11",
      "description": "Renders a black screen and various other issues."
    }
  ]
}
```

### TODO

- Add support for gpu vendor specific configs
