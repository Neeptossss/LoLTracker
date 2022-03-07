
# LoLTracker🪄
A Node.JS Discord bot that track using Riot API stats of summoners. Create a server leaderboard and beat your friends !


## Prerequisites

- Docker Engine
- Docker Compose
- Make sure Docker Daemon is running and working before starting the application
## Installation
#### Create a Discord application and bot 🤖
- [Follow this tutorial to create your Discord bot token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token)
- Add your bot to your server by generating a link in your developper dashboard (make sure to give enought permissions)
#### Create your Riot Developer account 🪄
- Login to [Riot Developper Portal](https://developer.riotgames.com/)
- Click 'Register a product' button
- Select Personnal API Key and follow the steps
- Go to your profile and you should have your Personnal API Key (Riot must approve your app, it can take several days) (TIP: You can use your developpement key while waiting this key expire every day)
- Go to config/config.json and replace 'x' with your keys like below :
```env
LOL_TOKEN=RGAPI-xxxxxxx-xxxx-xxxxx-xxxxx-xxxxxxxxxxx
DS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Get started 🐋
Build the docker image
```bash
> docker-compose build
```
Run the application
```bash
> docker-compose up
```
You should see something like this :
```bash
Successfully connected to the database!
Logged in as LoL Tracker#XXXX!
Present in 1 guild(s)
```

## Miscellaneous
- You can update your database password in the `docker-compose.yml` file
## Authors

- [@Neeptossss](https://www.github.com/Neeptossss)

