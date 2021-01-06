# Galeforce

---

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![HitCount](http://hits.dwyl.com/bcho04/galeforce.svg)](http://hits.dwyl.com/bcho04/galeforce) [![Node CI](https://github.com/bcho04/galeforce/workflows/Node%20CI/badge.svg)](https://github.com/bcho04/galeforce/workflows/Node%20CI/badge.svg) [![CodeQL](https://github.com/bcho04/galeforce/workflows/CodeQL/badge.svg)](https://github.com/bcho04/galeforce/workflows/CodeQL/badge.svg) [![Code Climate](https://codeclimate.com/github/bcho04/galeforce/badges/gpa.svg)](https://codeclimate.com/github/bcho04/galeforce) [![codecov](https://codecov.io/gh/bcho04/galeforce/branch/master/graph/badge.svg?token=7BJHF5KVX9)](https://codecov.io/gh/bcho04/galeforce) [![David](https://david-dm.org/bcho04/galeforce.svg)](https://david-dm.org/bcho04/galeforce) [![GitHub last commit](https://img.shields.io/github/last-commit/bcho04/galeforce.svg?style=flat)](https://img.shields.io/github/last-commit/bcho04/galeforce.svg?style=flat) 

A customizable, promise-based, and command-oriented TypeScript library for the Riot Games API.

## Table of Contents
- [Galeforce](#galeforce)
  - [Table of Contents](#table-of-contents)
  - [Examples](#examples)
  - [Config structure](#config-structure)

---

## Examples

If you're using **ES6/TypeScript**, simply add
```typescript
import GaleforceModule from 'Galeforce';

const Galeforce = new GaleforceModule(/* config */);
```
to use the project. Or, if you're using **CommonJS** and `require()`, add Galeforce to your project like this:
```javascript
const GaleforceModule = require('galeforce').default;

const Galeforce = new GaleforceModule(/* config */);
```
<details>
<summary>Get summoner data for a list of summoners</summary>

```javascript
const summoners = ['a', 'b', 'c'];
const promises = summoners.map(summoner => Galeforce.summoner()
    .region(Galeforce.regions.NORTH_AMERICA)
    .name(summoner)
    .exec()
); // list of request promises
Promise.all(promises).then((result) => {
    console.log(result); // [{ name: 'a', ... }, ...]
});
```
</details>

<details>
<summary>Get list of recent matchId values for a given accountId</summary>

```javascript
const matchIds = (await Galeforce.match.matchlist()
    .region(Galeforce.regions.NORTH_AMERICA)
    .accountId(accountId)
    .exec())
    .matches.map(matchInfo => matchInfo.gameId);
```
</details>

<details>
<summary>Get match data using await</summary>

```javascript
const matchData = await Galeforce.match.match()
    .region(Galeforce.regions.NORTH_AMERICA)
    .matchId(matchId)
    .exec();
```
</details>

<details>
<summary>Get total number of mastery points for a summoner</summary>

```javascript
const totalMasteryPoints = (await Galeforce.mastery.summoner()
    .region(Galeforce.regions.NORTH_AMERICA)
    .summonerId(summonerId)
    .exec())
    .reduce((previous, current) => previous + current.championPoints, 0);
```
</details>

---

## Config structure

When initializing Galeforce, a config object (JSON) or a path to a YAML file must be passed to the `GaleforceModule()` constructor as an argument:
```javascript
const Galeforce = new GaleforceModule(/* config file path or object */);
```
Such an object must have the following structure:

```yaml
riot-api: # REQUIRED
  key: ${RIOT_KEY} # (string) Your Riot API key from https://developer.riotgames.com
cache: # OPTIONAL
  type: ${CACHE_TYPE} # (string) What kind of cache to use ('redis', 'null')
  uri: ${CACHE_URI} # (string) The cache URI to connect to (optional when type is 'null')
rate-limit: # OPTIONAL, Requires a cache to be configured.
  prefix: riotapi-ratelimit- # The prefix for the Riot API rate limit keys in the cache.
  intervals: # key <secs>: value <number of requests>. 
    120: 100
    1: 20
```

---

**Disclaimer**

Galeforce isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.