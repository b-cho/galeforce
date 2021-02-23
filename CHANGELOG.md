# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Releases
 - [[0.3.0]](#030) (2021-02-22)
 - [[0.2.0]](#020) (2021-01-30)
 - [[0.1.1]](#011) (2021-01-23)
 - [[0.1.0]](#010) (2021-01-23)

---

### [0.3.0]
#### Added
- Live Client Data endpoint support under **`galeforce.lcd`**
- Game Client endpoint information using **`galeforce.gc.swagger()`** and **`galeforce.gc.openAPI()`**

#### Changed
- **[breaking]** Change the output of Data Dragon image and tarfile actions to a `Buffer` object.

### [0.2.0]
#### Added
- Debugging features for action, payload, riot-api, and rate-limit using the **`debug`** library.
- Full Data Dragon endpoint support under **`galeforce.ddragon`**.

#### Changed
- **[breaking]** Rename the ~~`galeforce.*.match.matchlist`~~ functions to **`galeforce.*.match.list`**.
- **[breaking]** Split ~~`galeforce.lol.mastery.summoner`~~ into **`galeforce.lol.mastery.champion`** and **`galeforce.lol.mastery.list`**.
- **[breaking]** Change CommonJS / `require()` import method to no longer allow `.default`.

### [0.1.1]
#### Changed
- Fix a major bug preventing the library from initializing properly on Node.js ≤ 13.


### [0.1.0]
#### Added
- Initial release.
