# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

### [0.3.0] (2021-05-03)

#### Added

- Live Client Data endpoint support under **`galeforce.lcd`**
- Game Client endpoint information using **`galeforce.gc.swagger()`** and **`galeforce.gc.openAPI()`**
- Support for an internal Javascript rate-limit cache using the **node-cache** library. (Use the *javascript* option in the `cache` section of your config.)
- DTO interfaces for TypeScript are now public-facing and can be accessed directly via **`GaleforceModule.dto`** or as another export:
  >
  > ```typescript
  > import GaleforceModule from 'galeforce';
  > 
  > const summonerData: GaleforceModule.dto.SummonerDTO = ... 
  > // get summoner data
  > ```

  > ```typescript
  > import GaleforceModule, { dto } from 'galeforce';
  > 
  > const summonerData: dto.SummonerDTO = ...
  > // get summoner data
  > ```
- Direct access to action URLs using the **`.URL()`** method
  >
  > ```typescript
  > const summonerURL = galeforce.lol.summoner().region(galeforce.regions.lol.NORTH_AMERICA).name('name').URL();
  > // https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/name
  > ```

#### Changed

- **[breaking]** Change the output of Data Dragon image and tarfile actions to a `Buffer` object.
  - Previous versions returned corrupted versions of the files which were unusable.
- Riot API keys are no longer required in the `GaleforceModule()` constructor, and the `options` parameter is now optional.

> ```typescript
  > import GaleforceModule from 'galeforce';
  > 
  > const galeforce = new GaleforceModule(); // now OK, but requests requiring an API key will return a 401 Unauthorized error.
  > ```

### [0.2.0] (2021-01-30)

#### Added

- Debugging features for action, payload, riot-api, and rate-limit using the **debug** library.
- Full Data Dragon endpoint support under **`galeforce.ddragon`**.

#### Changed

- **[breaking]** Rename the ~~`galeforce.*.match.matchlist`~~ functions to **`galeforce.*.match.list`**.
- **[breaking]** Split ~~`galeforce.lol.mastery.summoner`~~ into **`galeforce.lol.mastery.champion`** and **`galeforce.lol.mastery.list`**.
- **[breaking]** Change CommonJS / `require()` import method to no longer allow `.default`.

### [0.1.1] (2021-01-23)

#### Changed

- Fix a major bug preventing the library from initializing properly on Node.js ≤ 13.

### [0.1.0] (2021-01-23)

#### Added

- Initial release.
