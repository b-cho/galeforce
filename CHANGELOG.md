# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Releases
 - [[0.2.0]](#020) (unreleased)
 - [[0.1.1]](#011) (2020-01-23)
 - [[0.1.0]](#010) (2020-01-23)

---

### [0.2.0]
#### Added
- Debugging features for action, payload, riot-api, and rate-limit.
- Full Data Dragon endpoint support under **`galeforce.ddragon`**.

#### Changed
- **[breaking]** Rename the ~~`galeforce.*.match.matchlist`~~ functions to **`galeforce.*.match.list`**.
- **[breaking]** Split ~~`galeforce.lol.mastery.summoner`~~ into **`galeforce.lol.mastery.champion`** and **`galeforce.lol.mastery.list`**.

### [0.1.1]
#### Changed
- Fix a major bug preventing the library from initializing properly on Node.js ≤ 13.


### [0.1.0]
#### Added
- Initial release.
