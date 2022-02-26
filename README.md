
# LoLTracker🪄
A Node.JS Discord bot that track using Riot API stats of summoners. Create a server leaderboard and beat your friends !



## Installation
#### Prerequisites

Node >= v16.14.0
#### Add Firebase 🔥

- [Follow this tutorial to create a Firebase project](https://cloud.google.com/firestore/docs/client/get-firebase)
- In your Firebase dashboard, enable Realtime Database
- [Continue by creating a Web app for this project](https://firebase.google.com/docs/web/setup)
- Your JSON file should be something like this :
```json
  {
  "type": "service_account",
  "project_id": "xxxx-xxxxx",
  "private_key_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nxxxxxxxxxxxxxxxxxxxxx\n-----END PRIVATE KEY-----\n",
  "client_email": "xxxxxxxx-xxxxxx@appspot.gserviceaccount.com",
  "client_id": "xxxxxxxxxxxxxxxxxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/xxxxxxx-xxxxx"
}
```
- Rename your JSON file `firebase.json`
- Create a `cred` directory at the root of the project and put your `firebase.json` inside

#### Create a Discord application and bot 🤖
- [Follow this tutorial to create your Discord bot token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token)
- Add your bot to your server by generating a link in your developper dashboard (make sure to give enought permissions)
- Login to [Riot Developper Portal](https://developer.riotgames.com/)
- Click 'Register a product' button
- Select Personnal API Key and follow the steps
- Go to your profile and you should have your Personnal API Key (Riot must approve your app, it can take several days)
Create a `.env` file at the root of the directory and put your keys in like the example below :
```env
LOL_TOKEN=RGAPI-xxxxxxx-xxxx-xxxxx-xxxxx-xxxxxxxxxxx
DS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Get started ✅
Install all the project dependencies
```bash
> npm install
```
Run the bot
```bash
> node dsbot.js
```
You should see something like this :
```bash
Logged in as LoL Tracker#XXXX!
Present in 1 guild(s)
```

## Authors ✒️

- [@Neeptossss](https://www.github.com/Neeptossss)

