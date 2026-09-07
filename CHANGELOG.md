# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

***

### \[0.7.0] (unreleased)

#### Added

*   Add support for `spectator-tft-v5` and `tft-status-v1` under **`galeforce.tft.spectator`** and **`galeforce.tft.status`**, respectively
*   Add support for `val-console` endpoints under the existing `galeforce.val.match` and `galeforce.val.ranked` endpoints
    *   Accessible by passing in `true` to the action constructor
    > ```typescript
    > const list = await galeforce.val.match.list(true) // access val-console endpoints
    >   ...
    > ```
*   Add support for `riftbound-content-v1` under **`galeforce.riftbound.content`**, along with the corresponding `RiftboundContentDTO`
*   Add support for the `account-v1` active region endpoint (`/riot/account/v1/region/by-game/{game}/by-puuid/{puuid}`) under **`galeforce.riot.account.activeRegion`**, along with the corresponding `AccountRegionDTO`
    *   Note that this endpoint accepts a *different* set of games (`lol`, `tft`) than the active shard endpoint (`val`, `lor`), so `galeforce.game` is now namespaced by endpoint in the same way as `galeforce.region` and `galeforce.queue`
    > ```typescript
    > const region = await galeforce.riot.account.activeRegion()
    >   .game(galeforce.game.region.LEAGUE_OF_LEGENDS) // lol, tft
    >   ...
    >
    > const shard = await galeforce.riot.account.activeShard()
    >   .game(galeforce.game.shard.VALORANT) // val, lor
    >   ...
    > ```
*   Add support for the `match-v5` replay endpoint (`/lol/match/v5/matches/by-puuid/{puuid}/replays`) under **`galeforce.lol.match.replay`**, along with the corresponding `ReplayDTO`
*   Add support for the `tournament-stub-v5` code lookup endpoint (`/lol/tournament-stub/v5/codes/{tournamentCode}`) under the existing `galeforce.lol.tournament.code.get`
    *   Accessible by passing in `true` to the action constructor
    > ```typescript
    > const code = await galeforce.lol.tournament.code.get(true) // access tournament-stub endpoints
    >   ...
    > ```

#### Changed

*   Update DTOs corresponding to `spectator-v5`, `tft-league-v1`, and `tournament-v5` endpoints to match current API specifications.
*   Updated `match-v5` DTOs ([#28](https://github.com/bcho04/galeforce/pull/28)) and Data Dragon DTOs ([#28](https://github.com/bcho04/galeforce/pull/28), [#26](https://github.com/bcho04/galeforce/pull/26))
*   Update enums to include new tiers (`galeforce.tier.EMERALD`)
*   Expose new TFTQueue object at top-level under **`galeforce.queue.tft`**
*   Update `galeforce.lol.tournament` to be compatible with `tournament-v5`
*   Include top champion mastery entries endpoint under **`galeforce.lol.mastery.top`**
*   Include top rated ladder entries for TFT queues under **`galeforce.tft.league.ladders.top`**
*   Update `galeforce.tft.league.entries` to use the current `tft-league-v1` path (`/tft/league/v1/by-puuid/{puuid}`), which replaces the removed ~~`/tft/league/v1/entries/by-puuid/{puuid}`~~ path
*   Restore the full `DataDragonChampionDTO` interface (`spells`, `passive`, `skins`, `lore`, `allytips`, `enemytips`, and `recommended`), which was replaced by the champion *list* shape in [#28](https://github.com/bcho04/galeforce/pull/28)
*   Update DTOs to match current API specifications: `summonerId` is no longer returned by `spectator-v5` (replaced by `riotId`/`puuid`), and fields that Riot marks as optional (`MatchDTO.bountyLevel`, the Arena-only `playerScore*`/`playerAugment*` fields, `TournamentCodeDTO.participants` and `spectators`, `LobbyEventDTO.puuid`) are now optional
*   Add the missing `KR`, `PH`, `SG`, `TH`, `TW`, and `VN` regions to `TournamentCodeDTO`
*   Migrate the test suite to ES modules to support `chai` v5 and `chai-as-promised` v8, and update the specs to match the current API surface

#### Fixed

*   Fix **`galeforce.tft.league.ladders.top`**, which rejected every valid input. The action sets a `lol` payload type (TFT shares the League regions), but the runtime queue guard only accepted `LeagueQueue` values, so the endpoint's only valid queue (`RANKED_TFT_TURBO`) always threw `Invalid /lol queue type provided.` TFT queues are now accepted on `lol`-typed payloads.

#### Removed

*   **\[breaking]** Remove support for ~~`.summonerId()`~~, ~~`.accountId()`~~, and ~~`.summonerName()`~~ mixins following Riot's decision to [deprecate](https://developer.riotgames.com/docs/lol#summoner-names-to-riot-ids) these fields in November 2023. All endpoints should now take encrypted PUUIDs.
*   **\[breaking]** Namespace `galeforce.game` by endpoint, matching the existing `galeforce.region` and `galeforce.queue` pattern. ~~`galeforce.game.VALORANT`~~ is now `galeforce.game.shard.VALORANT`, and ~~`galeforce.game.LOR`~~ is now `galeforce.game.shard.LOR`
*   **\[breaking]** Remove support for ~~`galeforce.lol.spectator.featured()`~~ and ~~`galeforce.tft.spectator.featured()`~~ following Riot's removal of the featured games endpoints from `spectator-v5` and `spectator-tft-v5`
*   **\[breaking]** Remove support for the ~~`.leagueId()`~~ mixin on `galeforce.lol.league.league` and `galeforce.tft.league.league` following Riot's removal of the ~~`/lol/league/v4/leagues/{leagueId}`~~ and ~~`/tft/league/v1/leagues/{leagueId}`~~ endpoints

### \[0.6.1] (2023-01-13)

#### Added

*   Update region parameters for the League of Legends API endpoints (new servers in Southeast Asia) ([#24](https://github.com/bcho04/galeforce/pull/24), by [xEcEz](https://github.com/xEcEz))

### \[0.6.0] (2022-12-27)

#### Added

*   Add support for `lol-challenges-v1` under **`galeforce.lol.challenges`**
*   Add the SEA routing value for OC1 shard `match-v5` requests ([#22](https://github.com/bcho04/galeforce/issues/22))
*   Add support for `tournament-stub-v4`
    *   Accessible by passing in `true` to the action constructor
    > ```typescript
    > const events = await galeforce.lol.tournament.events(true) // use tournament-stub-v4
    >   ...
    > ```

#### Changed

*   **\[breaking]** Remove ~~`galeforce.lol.platform.thirdPartyCode()`~~ (deprecated by Riot, see [here](https://twitter.com/RiotGamesDevRel/status/1491217397965258752))
*   **\[breaking]** Dropped support for Node versions *<14.0*
*   Fixed an issue where using Redis caching would prevent API requests from properly executing ([#21](https://github.com/bcho04/galeforce/issues/21))

### \[0.5.2] (2022-03-05)

#### Changed

*   Fix the query parameters in the type definitions for `galeforce.lol.match.list().query()`
*   **\[breaking]** Update region parameters for the Legends of Runeterra API endpoints (`ASIA` was merged into `SEA`)
*   Fix an issue where Data Dragon champion splash art methods returned loading art and vice versa
*   Update `match-v5` match DTO values

### \[0.5.1] (2021-09-04)

#### Added

*   Add additional methods under `galeforce.lol.ddragon`
    *   Retrieve assets from an arbitrary path using **`galeforce.lol.ddragon.asset()`**
    *   Fetch Runes Reforged data and image assets with **`galeforce.lol.ddragon.rune`** ([#12](https://github.com/bcho04/galeforce/issues/12))
    *   Get champion tile image assets with **`galeforce.lol.ddragon.champion.art.tile()`**

#### Changed

*   Update DTOs corresponding to `val-match-v1` endpoints ([#6](https://github.com/bcho04/galeforce/issues/6))
*   **\[breaking]** Update the handling of the `assetId` parameter in `galeforce.lol.ddragon.sprite.art()` and `galeforce.lol.ddragon.minimap.art()`
    *   `.sprite.art().assetId()` now requires the type of sprite to be specified (see the filenames in the Data Dragon compressed tarball for more information)
    *   `.sprite.map().assetId()` now requires the word *map* to be included (for example, ~~`.assetId(11)`~~ → `.assetId('map11')`)
*   Fix the valid region input types for the `tournament-v4` set of endpoints

### \[0.5.0] (2021-08-07)

#### Changed

*   **\[breaking]** Update **`galeforce.lol.match`** from ~~`match-v4`~~ to **`match-v5`**
    *   Remove ~~`galeforce.lol.match.tournament`~~
    *   Update required parameters for `galeforce.lol.match.match`, `galeforce.lol.match.list`, `galeforce.lol.match.timeline` to conform to Riot `match-v5` specifications
    *   Rewrite DTOs for match and timeline JSON responses
*   **\[breaking]** Dropped support for Node versions *<12.0*
*   Fix a bug preventing the library from being used in environments where `fs` is not available

### \[0.4.0] (2021-06-22)

#### Added

*   Add significant rate limiting functionality using the **bottleneck** library
    *   Support for a user-specified number of retry attempts after receiving *HTTP 429* errors
    *   Automatic rate limiting with retry timing automatically determined based on response headers
    *   New `max-concurrent` and `min-time` options for Riot API requests
*   Setting multiple Action properties simultaneously from an object using **`.set()`**
    > ```typescript
    > const summonerData = await galeforce.lol.summoner().set({
    >   region: galeforce.region.lol.NORTH_AMERICA,
    >   summonerName: 'name'
    > }).exec();
    > ```
*   Expose the `Division`, `Tier`, `Game`, `Queue`, and `Region` enums directly via **`GaleforceModule.*`**
    > ```typescript
    > import GaleforceModule, { Region } from 'galeforce';
    >
    > console.log(Region.lol.NORTH_AMERICA) // na1
    > ```
*   Legends of Runeterra Data Dragon support under **`galeforce.lor.ddragon`**

#### Changed

*   **\[breaking]** Update the structure of the config object passed into the `GaleforceModule()` constructor
    *   Now merges the provided configuration object with a default object

        ```javascript
        {
          'riot-api': {
              key: undefined,
          },
          'rate-limit': {
              type: 'bottleneck',
              cache: {
                  type: 'internal',
                  'key-id': 'galeforce',
                  uri: undefined,
              },
              options: {
                  intervals: {},
                  'max-concurrent': null,
                  'min-time': 0,
                  'retry-count-after-429': 3,
              },
          },
          debug: [],
        }
        ```
*   **\[breaking]** Rename enums to have singular names
    *   ~~`galeforce.regions`~~ → **`galeforce.region`**
    *   ~~`galeforce.queues`~~ → **`galeforce.queue`**
    *   ~~`galeforce.tiers`~~ → **`galeforce.tier`**
    *   ~~`galeforce.divisions`~~ → **`galeforce.division`**
    *   ~~`galeforce.games`~~ → **`galeforce.game`**
*   Update the **`galeforce.region`** object to better represent available API regions
    *   Add an `esports` routing value to associated Riot and Valorant region objects (check Riot documentation for endpoints where this is valid)
    *   **\[breaking]** Split off Legends of Runeterra request regions into their own **`galeforce.region.lor`** enum, which is now used in all `galeforce.lor.*` endpoints
*   Update `galeforce:rate-limit` debugging output
*   **\[breaking]** Move existing League of Legends Data Dragon functionality from **`galeforce.ddragon`** to **`galeforce.lol.ddragon`**

### \[0.3.0] (2021-05-03)

#### Added

*   Live Client Data endpoint support under **`galeforce.lcd`**
*   Game Client endpoint information using **`galeforce.gc.swagger()`** and **`galeforce.gc.openAPI()`**
*   Support for an internal Javascript rate-limit cache using the **node-cache** library. (Use the *javascript* option in the `cache` section of your config.)
*   DTO interfaces for TypeScript are now public-facing and can be accessed directly via **`GaleforceModule.dto`** or as another export:

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
*   Direct access to action URLs using the **`.URL()`** method
    > ```typescript
    > const summonerURL = galeforce.lol.summoner().region(galeforce.regions.lol.NORTH_AMERICA).name('name').URL();
    > // https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/name
    > ```

#### Changed

*   **\[breaking]** Change the output of Data Dragon image and tarfile actions to a `Buffer` object.
    *   Previous versions returned corrupted versions of the files which were unusable.
*   Riot API keys are no longer required in the `GaleforceModule()` constructor, and the `options` parameter is now optional.

    > ```typescript
    > import GaleforceModule from 'galeforce';
    >
    > const galeforce = new GaleforceModule(); // now OK, but requests requiring an API key will return a 401 Unauthorized error.
    > ```

### \[0.2.0] (2021-01-30)

#### Added

*   Debugging features for action, payload, riot-api, and rate-limit using the **debug** library.
*   Full Data Dragon endpoint support under **`galeforce.ddragon`**.

#### Changed

*   **\[breaking]** Rename the ~~`galeforce.*.match.matchlist`~~ functions to **`galeforce.*.match.list`**.
*   **\[breaking]** Split ~~`galeforce.lol.mastery.summoner`~~ into **`galeforce.lol.mastery.champion`** and **`galeforce.lol.mastery.list`**.
*   **\[breaking]** Change CommonJS / `require()` import method to no longer allow `.default`.

### \[0.1.1] (2021-01-23)

#### Changed

*   Fix a major bug preventing the library from initializing properly on Node.js ≤ 13.

### \[0.1.0] (2021-01-23)

#### Added

*   Initial release.
