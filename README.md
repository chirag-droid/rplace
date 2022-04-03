![https://i.imgur.com/rmWnNBG.png](https://i.imgur.com/rmWnNBG.png)

# r/place bot

A bot for the 2022 reddit place. Multiple users support.

## Requirements

- NodeJs latest version installed.

If you want to help develop this bot you need to have yarn installed.

## Installation

```bash
npm install -g rplacebot
```

and run using `rplace`

## How to get Client ID and Secret

- Go to https://reddit.com/prefs/apps
- Create a new app and give it the type Script
- Put http://localhost:3000/ in redirect_url

After getting client id and secret you can either make two environment variable `CLIENT_ID` and `CLIENT_SECRET`. Even if you don't you will be prompted to do so. don't worry about filling it again and again, the config is persisted.

![Image showing how the app prompts for client id and secret](https://i.imgur.com/ONIMrNJ.png)

## Setting up users

Make sure every username, and password you use to login must be added to the developers list of the app, otherwise you will get an error.

![The user prompt](https://i.imgur.com/oY1yhZq.png)

## Setting Up Image

> TODO

## Running (developer)

Clone the repo.

Clone the project

```bash
  git clone https://github.com/chirag-droid/rplace
```

Go to the project directory

```bash
  cd rplace
```

Install dependencies

```bash
  yarn install
```

Start the script in dev mode

```bash
  yarn dev
```
