<p align="center">
    <img src="docs/logo.svg" height="184px"/>
</p>

<p align="center"><i>Enhance your spiritual practice and deepen your understanding of the Vedas with Shlokas, the mobile app that makes it easy to memorize and recite Vedic verses. <a href='https://shlokas.app'>Try it out</a> today and take your spiritual journey to the next level.</i></p><br>

<p align="center">
  <a href="https://shlokas.app">
    <img src="docs/showcase.png"/>
  </a>
  <a href="https://apps.apple.com/rs/app/learn-shlokas/id1663506324">
    <img src="docs/download-app-store.png" height="50">
  </a>
  <a href="https://play.google.com/store/apps/details?id=com.akdasa.shlokas">
    <img src="docs/download-google-play.png" height="50">
  </a>
</p>


<p align="center">
  <a href="https://github.com/akdasa-studios/shlokas/actions/workflows/tests.yml"><img src="https://github.com/akdasa-studios/shlokas/actions/workflows/tests.yml/badge.svg" alt="Tests"></a>
  <a href="https://github.com/akdasa-studios/shlokas-e2e/actions/workflows/tests-nightly.yml"><img src="https://github.com/akdasa-studios/shlokas-e2e/actions/workflows/tests-nightly.yml/badge.svg?event=schedule" alt="Tests"></a>
  <a href="https://codecov.io/gh/akdasa-studios/shlokas"><img src="https://codecov.io/gh/akdasa-studios/shlokas/branch/main/graph/badge.svg?token=QUAOR54W17"/></a>
  <a href="https://www.codacy.com/gh/akdasa-studios/shlokas/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=akdasa-studios/shlokas&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/45de0ace9ee248c9a7b722035dbb4657" alt="Codacy Badge"></a>
  <a href="https://github.com/akdasa-**studios**/shlokas/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"><img src="https://img.shields.io/github/issues/akdasa-studios/shlokas/good%20first%20issue"></a>
  <a title="Crowdin" target="_blank" href="https://crowdin.com/project/shlokas"><img src="https://badges.crowdin.net/shlokas/localized.svg"></a>
  <!--
  <a href="https://app.netlify.com/sites/shlokas-staging/deploys"><img src="https://api.netlify.com/api/v1/badges/c005fb9b-d8a8-410e-ae86-89e3dc213202/deploy-status" alt="Netlify Status"></a>-->
</p>


## Get involved
If you'd like to help develop the project, here's a list of links to get you started:

1. [Good first issues](https://github.com/akdasa-studios/shlokas/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) – a list of simple issues any developer could start from.
2. [Roadmap](https://github.com/orgs/akdasa-studios/projects/1/views/7) - list of tasks we are working on.


## Documentation
1. [Architecture](./docs/architecture.md) – Overall project architecture
1. [Models](./docs/models.md) – Domain models

## Develop
1. `npm run dev` – run the application at `http://localhost:8080`
2. `npm run run:device` – run application on a device
3. `npm run run:device:hot` – run an application on a device with hot reloading

### Develop in VSCode decvontainer
1. Generate Personal Access Token with "package:read" permission from GitHub
2. Export GITHUB_TOKEN: `echo "GITHUB_PAT_TOKEN=XXXXX > ~/.profile"`
3. Use "Rebuild and run in container" command in VSCoder

### Environment
There are two options for launching services:
1. Use prebuild containers — a fast and easy way to run the application. You don't need to build anything. This option is for you if you are working on the Shlokas app but not the services.
2. Build all the services from the sources. This option is for you if you are working on a specific service and want to modify, build, and run it.

### Use prebuild containers
To run the application in a full environment, you need to start all the services. You can do that by cloning the `shlokas-server` repository and running `./dev.run.sh` command.
It will download all the necessary images and run all the services in the docker containers.

```sh
# somewhere in your projects folder outside of this repo
gh repo clone akdasa-studios/shlokas-server
cd ./shlokas-server
./shlokas.run.sh
```

### Build all the services from the sources
If you are working on a specific service and you want to build it and run you should do the following:

1. Clone all the repositories in the same folder like `shlokas`
2. Run `shlokas.build.sh` script to build all the services from the sources
4. Run all the services with `shlokas.run.sh` script

```bash
# clone all the repos
gh search repos --owner akdasa-studios --match name shlokas --visibility public | while read -r repo _; do
  gh repo clone "$repo" "$repo"
done

# build and run all the services
cd ./akdasa-studios/shlokas-server
./shlokas.build.sh
./shlokas.run.sh
```

## Services

The following services will be started:

| Repo                                                           | Description                                                                          | Link                       |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------- |
| [Landing](https://github.com/akdasa-studios/shlokas-landing)   | Landing page.                                                                        | http://localhost           |
| [Admin](https://github.com/akdasa-studios/shlokas-admin)       | Admin panel to manage content. You can add verses, images, declamations and so on    | http://localhost/admin     |
| [Database](https://github.com/akdasa-studios/shlokas-db)       | Database and bootstrap scripts. Starts CouchDB and bootstraps it with necessary data | http://localhost/db/_utils |
| [Auth](https://github.com/akdasa-studios/shlokas-auth)         | Authenticatoin service. Registers and logins user via CouchDB                        | No UI                      |
| [Balancer](https://github.com/akdasa-studios/shlokas-balancer) | Balancer                                                                             | No UI                      |
| [Content](https://github.com/akdasa-studios/shlokas-content)   | Content server. Allows to download and upload images and declamations                | No UI                      |
| [TOTP](https://github.com/akdasa-studios/shlokas-totp)         | One time password service                                                            | No UI                      |
| Mailcather                                                     | Email service. Used only for debugging purposes in dev environment.                  | http://localhost:1080      |


## Related Repositories

Here is a list of related repositories:

| Repo                                                           | Description                                                             |
| -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Core](https://github.com/akdasa-studios/shlokas-core)         | Core Library. Contains business logic.                                  |
| [Server](https://github.com/akdasa-studios/shlokas-server)     | Scripts to run related services                                         |
| [E2E](https://github.com/akdasa-studios/shlokas-e2e)           | End to end tests                                                        |
| [UiKit](https://github.com/akdasa-studios/shlokas-uikit)       | UI Kit                                                                  |
| [Utils](https://github.com/akdasa-studios/shlokas-utils)       | Utils                                                                   |
| [Protocol](https://github.com/akdasa-studios/shlokas-protocol) | Interfaces describes communication protocol between services and client |
