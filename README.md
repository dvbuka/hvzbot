# 🧟 UCD HvZBot 🧟
HvZBot is a Discord bot that tracks the state of HvZ events at UC Davis. As of April 2023, it is actively maintained.

## Current Features 
`v2.5 April 11, 2023`

The database tracks:
* Player roles
* Zombie tags
* Mod permissions
* Whether a zombie is hidden or not (OZs (original zombies) when introduced play like humans until exposed).


Gameplay features
* Hidden zombies may access the Human channel, but when exposed, lose viewing permissions immediately!
* There is a leaderboard commands, which shows which Zombies have the most tagged. Hidden zombies do not appear on the LB.
* A list of all players
* Total player accounts, with the real totals (meaning that hidden zombies are counted as zombies here).

State updates
* `who` command reveals a player's name and publicly known role using their Discord tag.
* `assign` allows mods to change a player's role
* `hide` / 'expose' allow OZs to be added and exposed.
* `tag` allows players themselves to tag themselves (selftagging is only used for Humans to change their roles when tagged) and each other.

## Set up
I use Heroku and MongoDB Altas (cloud-hosted noSQL database), to host the Davis HVZ bot. There are ample resources for making a Discord bot using these tools. When testing, I utilize .env to fetch the important keys (make sure this is never found on your GitHub repositories!).

The .env contains:
```
DISCORD_TOKEN=[found in the Discord Developer portal]
MONGODB_SRV=[found on the Atlas site]
PREFIX=[prefix your bot uses; my choice was "-"]
```

To start the bot all that is needeed to clone and type:
```
node main.js
```

For Heroku setup, only a worker dyno is required. They unfortunately no longer carry free dynos, so this will cost money. Hosting is fairly straightforward:
1. Enter the .env keys in the settings
2. Connect a GitHub repository
3. Add a ```worker node main.js``` dyno under Deploy.

## Future Updates
* Achievements
* Communication with website
* Mission-dependant features, such as allowing players to unlock bot features by successfully completing missions.

