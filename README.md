# Sightstone

---

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![HitCount](http://hits.dwyl.com/bcho04/sightstone.svg)](http://hits.dwyl.com/bcho04/sightstone) [![Node CI](https://github.com/bcho04/sightstone/workflows/Node%20CI/badge.svg)](https://github.com/bcho04/sightstone/workflows/Node%20CI/badge.svg) [![CodeQL](https://github.com/bcho04/sightstone/workflows/CodeQL/badge.svg)](https://github.com/bcho04/sightstone/workflows/CodeQL/badge.svg) [![Code Climate](https://codeclimate.com/github/bcho04/sightstone/badges/gpa.svg)](https://codeclimate.com/github/bcho04/sightstone) [![codecov](https://codecov.io/gh/bcho04/sightstone/branch/master/graph/badge.svg?token=7BJHF5KVX9)](https://codecov.io/gh/bcho04/sightstone) [![David](https://david-dm.org/bcho04/sightstone.svg)](https://david-dm.org/bcho04/sightstone) [![GitHub last commit](https://img.shields.io/github/last-commit/bcho04/sightstone.svg?style=flat)](https://img.shields.io/github/last-commit/bcho04/sightstone.svg?style=flat) 

A customizable, promise-based, and command-oriented TypeScript library for the Riot Games API.

## Table of Contents
- [Sightstone](#sightstone)
  - [Table of Contents](#table-of-contents)
  - [Examples](#examples)
  - [Config structure](#config-structure)

---

## Examples

If you're using **ES6/TypeScript**, simply add
```typescript
import SightstoneModule from 'sightstone';

const Sightstone = new SightstoneModule(/* config */);
```
to use the project. Or, if you're using **CommonJS** and `require()`, add Sightstone to your project like this:
```javascript
const SightstoneModule = require('sightstone').default;

const Sightstone = new SightstoneModule(/* config */);
```
<details>
<summary>Get summoner data for a list of summoners</summary>

```javascript
const summoners = ['a', 'b', 'c'];
const promises = summoners.map(summoner => (
    Sightstone.summoner.name(Sightstone.regions.NORTH_AMERICA, summoner).exec()
)); // list of request promises
Promise.all(promises).then((result) => {
    console.log(result); // [{ name: 'a', ... }, ...]
});
```
</details>

<details>
<summary>Get list of recent matchId values for a given accountId</summary>

```javascript
const matchIds = (await Sightstone.match.matchlist.accountId(Sightstone.regions.NORTH_AMERICA, accountId).exec())
    .matches.map(matchInfo => matchInfo.gameId);
```
</details>

<details>
<summary>Get match data using await</summary>

```javascript
const matchData = await Sightstone.match.matchId(Sightstone.regions.NORTH_AMERICA, matchId).exec();
```
</details>

<details>
<summary>Get total number of mastery points for a summoner</summary>

```javascript
const totalMasteryPoints = (await Sightstone.mastery.summonerId(Sightstone.regions.NORTH_AMERICA, summonerId).exec())
        .reduce((previous, current) => previous + current.championPoints, 0);
```
</details>

---

## Config structure

When initializing Sightstone, a config object (JSON) or a path to a YAML file must be passed to the `SightstoneModule()` constructor as an argument:
```javascript
const Sightstone = new SightstoneModule(/* config file path or object */);
```
Such an object must have the following structure:

```yaml
riot-api: # REQUIRED
  key: ${RIOT_KEY} # (string) Your Riot API key from https://developer.riotgames.com
cache: # OPTIONAL
  type: ${CACHE_TYPE} # (string) What kind of cache to use ('redis', 'null')
  uri: ${REDIS_URL} # (string) The cache URI to connect to (optional when type is 'null')
rate-limit: # OPTIONAL, Requires a cache to be configured.
  prefix: riotapi-ratelimit- # The prefix for the Riot API rate limit keys in the cache.
  intervals: # key <secs>: value <number of requests>. 
    120: 100
    1: 20

```

---

**Disclaimer**

Sightstone isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.