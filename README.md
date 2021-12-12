# Cryptocurrency API

This is a minimal BE test API to work with cryptocurrency simulators.
## Table of Contents
1. [Installation](#installation)
2. [Available Scripts](#available-scripts)
3. [Folder Structure](#folder-structure)
4. [Models](#models)
	1. [Favorite](#favorite)
	2. [Profile](#profile) 
	3. [Simulator](#simulator)
5. [Routes](#routes)


## Installation
For a better dependency resolution and to make future enhancements possible, we use [Yarn Package Manager](https://yarnpkg.com/).
To install the dependencies simply run the following command at the root level of the project:
```bash
yarn
```
After the dependencies are all installed, please make sure that your MongoDB server is running and your `DBURL` is inside the `.env` file as well as the `PORT` that you need the app to be ran on (see the `.env.example` file). Then for testing purposes, you can seed your database by running the following command:
```bash
yarn seed
```
This command will execute the `seed.ts` script under the `scripts` directory which will result in the creation of some dummy data for testing purposes.
After all these are done, you can run the project in the development mode by running the following command:
```bash
yarn dev
```

## Available Scripts
Here's a complete list of all of the available scripts that you can run using the following syntax `yarn [SCRIPT]`:
| Script | Description | Prerequisites |
|--------|-------------|---------------|
| `dev`  | Runs the application in the development mode. | Make sure your MongoDB database server is up and running with data inside it. |
| `seed`  | Runs the DB seeding script located at `scripts/seed.ts` to populate the database with dummy data. | Make sure your MongoDB database server is up and running. |
| `start`  | Runs the application in the production mode. **Note:** The `build` script will run automatically before the script. | Make sure your MongoDB database server is up and running with data inside it. |
| `build`  | Builds the project and generates the final bundle inside the `dist` directory. **Note:** The tests will run automatically before the script and if they fail, the project will halt the build. This is to protect the bugs to sneak their way up into the production. | The tests should pass successfully otherwise the build will halt. |
| `format`  | Formats every code inside the `src` directory with [Prettier](https://prettier.io/). | There should be no syntax or tslint error in the code otherwise the script will fail. |
| `test`  | Runs the tests that are located inside the `tests` directory and generates the code coverage data to make sure the code is good and clean. **Note:** The `seed` script will run automatically before the script to make sure the DB is populated with dummy data. | The code should generate the same result that each test expects otherwise the tests would fail. |
| `test:watch`  | Runs the tests that are located inside the `tests` directory in the watch mode so every code change will rerun the tests. **Note:** The `seed` script will run automatically before the script to make sure the DB is populated with dummy data. | The code should generate the same result that each test expects otherwise the tests would fail. |
| `release`  | Releases a new version and generates the new changelog file for semantic versioning. See [the oficial standard-version Github](https://github.com/conventional-changelog/standard-version) for a guide on how to use this script. | There should be committed changes in the code. |
| `release:major`  | Releases a major tag and generates the changelog. Useful for when there are new feature implementations or any other major changes to the code. | There should be committed changes in the code. |
| `release:minor`  | Releases a minor tag and generates the changelog. Useful for when there are backward compatible changes that contain no major or breaking changes. | There should be committed changes in the code. |
| `release:patch`  | Releases a patch tag and generates the changelog. Useful for small interchangeable modifies like hotfixes or even simply bug fixes. | There should be committed changes in the code. |

## Folder Structure
Below you find the complete folder structure of the project with detailed descriptions:
```
project
|
|---> src
|     |
|     |---> @types (The main type files)
|     |
|     |---> configs (Project configs)
|     |
|     |---> models (Database models)
|     |
|     |---> routes (Main controllers)
|     |
|     |---> scripts (Project scripts)
|     |
|     |---> utils (Utility functions)
|
|---> tests
```
The entry point of the application is located at `src/api.ts` file.

## Models
The database models are located inside `src/models` directory. Each file in this directory represents one single model which you can see in details below:
### Favorite:
This model represents the favorite cryptocurrencies of each [Profile](#profile). Here's the schema for this model:
| Name | Type | Description |
|------|------|-------------|
| `profile_id` | String | The foreign key that points to the ID of the profile that is related to this record. |
| `name` | String | The name of this specific favorite collection. |
| `favorites` | String[] | The array of strings which each string represents one cryptocurrency that is favorited in this specific collection. |

### Profile:
This model represents the complete profile for each user. Here's the schema for this model:
| Name | Type | Description |
|------|------|-------------|
| `name` | String | The complete name of this specific user. |
| `nickname` | String | The username of this specific user. |
| `email` | String | The email address of this specific user. |
| `capital` | Number | The capital number of this specific user. |
| `divisia` | String | The divisia of this specific user. |
| `preferred_cryptocurrency` | String | The cryptocurrency that this specific user prefers to be its base currency. |

### Simulator:
This model represents the currently active simulator of each [Profile](#profile). Here's the schema for this model:
| Name | Type | Description |
|------|------|-------------|
| `profile_id` | String | The foreign key that points to the ID of the profile that is related to this record. |
| `name` | String | The name of this specific simulator specified by the user. |
| `cryptocurrency` | String | The cryptocurrency that this simulator works with. |
| `divisia` | String | The divisia of this specific simulator. |
| `start_date` | Date | The date that this simulator will run the first time. |
| `check_date` | Date | The date that this simulator will rerun and check again. |
| `crypto_price_start` | Number | The price that this simulator will run the first time if met. |
| `crypto_price_check` | Number | The price that if met, the simulator will rerun and check again. |

## Routes
The routes are all located inside `src/routes` directory. Each endpoint is prefixed with `/api`. Here you find a detailed list of each endpoint and their description:
| Endpoint | Type | Description |
|----------|------|-------------|
| `favorite` | GET | Returns a list of all of the existing favorite collections |
| `favorite/:profile_id` | GET | Returns a list of the currently existing favorite collections for the provided profile ID. |
| `profile` | GET | Returns a list of all of the existing profiles |
| `profile` | POST | Either returns the existing profile of the user or creates one for them if absent. |
| `simulator` | GET | Returns a list of all of the existing simulators |
| `simulator/:profile_id` | GET  | Returns a list of the currently existing simulators for the provided profile ID. |
| `simulator` | POST | Creates a new simulator. |
