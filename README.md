# Galeforce

***

[![NPM](https://nodei.co/npm/galeforce.png?compact=true)](https://www.npmjs.com/package/galeforce)

![npm](https://img.shields.io/npm/dt/galeforce)
[![Node CI](https://github.com/bcho04/galeforce/workflows/Node%20CI/badge.svg)](https://github.com/bcho04/galeforce/workflows/Node%20CI/badge.svg)
[![CodeQL](https://github.com/bcho04/galeforce/workflows/CodeQL/badge.svg)](https://github.com/bcho04/galeforce/workflows/CodeQL/badge.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/18a92440f7a5457db04632699c3546a6)](https://www.codacy.com/gh/bcho04/galeforce/dashboard?utm_source=github.com\&utm_medium=referral\&utm_content=bcho04/galeforce\&utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/bcho04/galeforce/branch/master/graph/badge.svg?token=7BJHF5KVX9)](https://codecov.io/gh/bcho04/galeforce)
[![shields.io dependencies](https://img.shields.io/librariesio/release/npm/galeforce)](https://img.shields.io/librariesio/release/npm/galeforce)
[![GitHub last commit](https://img.shields.io/github/last-commit/bcho04/galeforce.svg?style=flat)](https://img.shields.io/github/last-commit/bcho04/galeforce.svg?style=flat)

A customizable, promise-based, and command-oriented TypeScript library and fluent interface for the Riot Games API.

## Features

*   **Full API support** for all Riot games, Data Dragon (LoL and LoR), and the Live Client Data API
    *   Environment variable config integration for API keys and other values on both the desktop and platforms including Heroku
*   **Customizable rate limiting** with Redis clustering support and automated retries
*   **Fully-typed DTOs and parameters** for *all* endpoints
*   **Fluent interface** for seamless method chaining
*   **Built-in, informative debugging** using `debug`

Automatically-generated **documentation** is available [here](https://bcho04.github.io/galeforce/), and code **examples** can be found the section [below](#examples).

## Table of Contents

*   [Galeforce](#galeforce)
    *   [Features](#features)
    *   [Table of Contents](#table-of-contents)
    *   [Examples](#examples)
    *   [Guide](#guide)
        *   [Actions](#actions)
        *   [Using DTOs](#using-dtos)
        *   [Config structure](#config-structure)
        *   [Documentation](#documentation)
    *   [Disclaimer](#disclaimer)

***

## Examples

If you're using **ES6/TypeScript**, simply add

```typescript
import GaleforceModule from 'galeforce';

const galeforce = new GaleforceModule(/* config */);
```

to use the library. Or, if you're using **CommonJS** and `require()`, add Galeforce to your project like this:

```javascript
const GaleforceModule = require('galeforce');

const galeforce = new GaleforceModule(/* config */);
```

<details>
<summary>Get summoner data for a list of summoners</summary>

```javascript
const summoners = ['a', 'b', 'c'];
const promises = summoners.map(summoner => galeforce.lol.summoner()
  .region(galeforce.region.lol.NORTH_AMERICA)
  .name(summoner)
  .exec()
); // list of request promises
Promise.all(promises).then((result) => {
  console.log(result); // [{ name: 'a', ... }, ...]
});
```

</details>

<details>
<summary>Get list of recent matchId values for a given puuid</summary>

```javascript
const matchIds = await galeforce.lol.match.list()
  .region(galeforce.region.riot.AMERICAS)
  .puuid(puuid)
  .exec();
```

</details>

<details>
<summary>Get match data using await</summary>

```javascript
const matchData = await galeforce.lol.match.match()
  .region(galeforce.region.riot.AMERICAS)
  .matchId(matchId)
  .exec();
```

</details>

<details>
<summary>Get total number of mastery points for a summoner</summary>

```javascript
const totalMasteryPoints = (await galeforce.lol.mastery.list()
  .region(galeforce.region.lol.NORTH_AMERICA)
  .summonerId(summonerId)
  .exec())
  .reduce((previous, current) => previous + current.championPoints, 0);
```

</details>

***

## Guide

### Actions

Each endpoint in the Galeforce library is an instance of an `Action` containing the following methods:

<details>
<summary><code>.exec()</code></summary>

> Executes the `Action` with the parameters set by methods such as `.region()`, `.summonerId()`, etc., returning a *Promise*.
>
> **Example**
>
> ```javascript
> /* Gets Valorant platform and status data. */
> galeforce.val.status() // Target the /val/status/v1/platform-data endpoint
>   .region(galeforce.region.val.NORTH_AMERICA) // See below for documentation.
>   .exec() // Sends a Valorant server status request to the val-status-v1 endpoint
>   .then((data) => { // Use the returned data
>     /* manipulate status data */
>   });
> ```

</details>

<details>
<summary><code>.URL()</code></summary>

> Returns the endpoint URL associated with the `Action` and its previously-set parameters.
>
> **Example**
>
> ```javascript
> /* Gets the Data Dragon URL associated with the Galeforce icon. */
> const galeforceURL = galeforce.lol.ddragon.item.art() // Fetch item icon art from Data Dragon
>   .version('11.9.1') // See the .<property>() section for documentation. Sets the version to retrieve data from.
>   .assetId(6671) // See below for documentation. Get the icon for the Galeforce item.
>   .URL(); // Get the encoded URL corresponding with the selected endpoint as a string.
>
> console.log(galeforceURL); // 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/6671.png'
> ```

</details>

<details>
<summary><code>.<em>&lt;property&gt;</em>()</code></summary>

> Sets the *property* (`region`, `summonerId`, `puuid`, etc.) in the Action request payload. Different methods are exposed for each endpoint depending on the required path, query, and body parameters.
>
> **Example**
>
> ```javascript
> /* Gets current game info for a specific summonerId. */
> const currentGameInfo = await galeforce.lol.spectator.active() // Target the /lol/spectator/v4/active-games/by-summoner/{summonerId} endpoint
>   .region(galeforce.region.lol.NORTH_AMERICA) // Sets the request region to 'na1' (i.e., target the NA server)
>   .summonerId('summonerId') // Sets the request summonerId to 'summonerId'
>   .exec(); // See .exec() above.
> ```
>
> `.<property>()` methods may only be called once and are removed from the Action after being used.
>
> ```javascript
> /* Gets current game info for a specific summonerId. */
> const currentGameInfo = await galeforce.lol.spectator.active() // Target the /lol/spectator/v4/active-games/by-summoner/{summonerId} endpoint
>   .region(galeforce.region.lol.NORTH_AMERICA) // Sets the request region to 'na1' (i.e., target the NA server)
>   .region(galeforce.region.lol.KOREA) // galeforce.lol.spectator.active(...).region(...).region is not a function
> ```

</details>

<details>
<summary><code>.set()</code></summary>

> Sets multiple *properties* (`region`, `summonerId`, `puuid`, etc.) in the Action request payload simultaneously.
>
> **Example**
>
> ```javascript
> /* Gets league entries for a given Teamfight Tactics ranked league. */
> const TFTLeagueInfo = await galeforce.tft.league.entries() // Target the /tft/league/v1/entries/{tier}/{division} endpoint
>   .set({ // Set multiple Action payload properties simultaneously
>     region: galeforce.region.lol.NORTH_AMERICA, // Sets the request region to 'na1' (i.e., target the NA server)
>     tier: galeforce.tier.DIAMOND, // Sets the request tier to 'DIAMOND' (i.e., search for players in Diamond)
>     division: galeforce.division.IV, // Sets the request division to 'IV' (i.e., search for players in division IV of their tier)
>   })
>   .exec(); // See .exec() above.
> ```

</details>

### Using DTOs

Galeforce includes DTOs for all Riot API responses as TypeScript interfaces. Although all actions already return an object typed with the corresponding DTO, these can be accessed explicitly via **`GaleforceModule.dto`** or as another export:

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

### Config structure

When initializing Galeforce, a config object (JSON) or a path to a YAML file may *optionally* be passed to the `GaleforceModule()` constructor as an argument:

```javascript
const galeforce = new GaleforceModule(/* optional config file path or object */);
```

Omitting the config will prevent Galeforce from being able to interface with the [Riot Games API](https://developer.riotgames.com/) (as no API key will be specified), although Data Dragon and the Live Client Data API will still be available.

Template string-like values (such as `${RIOT_KEY}`) will be evaluated using environment variables in `process.env`. The configuration file may contain any of the following structure (all top-level fields are optional):

```yaml
riot-api:
  key: 'RGAPI-???' # (string) Your Riot API key from https://developer.riotgames.com
rate-limit:
  type: 'bottleneck' # (string) The type of rate limiter Galeforce should use ('bottleneck', 'null')
  cache:
    type: ${CACHE_TYPE} # (string) What kind of cache to use ('redis', 'internal')
    uri: ${CACHE_URI} # (string) The cache URI to connect to (required for 'redis' cache)
    key-id: 'galeforce' # (string) The key ID to use for rate-limiting keys in the Redis cache
  options:
    intervals: # (key <seconds>: value <number of requests>) Manually-set local rate limits, applied per region
      120: 100
      1: 20
    max-concurrent: null # (null | number) The maximum number of concurrent requests allowed. Setting to null allows unlimited concurrent requests.
    min-time: 0 # (number) The minimum amount of time between consecutive requests
    retry-count-after-429: 3 # (number) The number of retry attempts after an HTTP 429 error is received, delayed by response header
debug: [] # A list containing any of 'action', 'payload', 'rate-limit', 'riot-api', '*' (all)
```

### Documentation

See [here](https://bcho04.github.io/galeforce/) for further documentation and a complete list of methods.

***

## Disclaimer

Galeforce isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
