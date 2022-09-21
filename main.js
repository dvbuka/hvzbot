require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const fs = require('fs');
const mongoose = require("mongoose"); // for mongoDB

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('HvZBot is online!')
});

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //userFindAndModify: false
}).then(() => {
    console.log('Connected to the database!');
}).catch((err) => {
    console.log(err);
})

client.on('message', message => {

    if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
    
    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try { 
        if(command === 'assign') {
            client.commands.get('assign').execute(client, message, args).catch(err => console.log(err));
        }
        if(command === 'help') {
            client.commands.get('help').execute(message, client.commands).catch(err => console.log(err));
        }
        if(command === 'ping') {
            client.commands.get('ping').execute(message, args).catch(err => console.log(err));
        }
        if(command === 'register') {
            client.commands.get('register').execute(client, message, args).catch(err => console.log(err));
        }
        if(command === 'tag') {
            client.commands.get('tag').execute(client, message, args).catch(err => console.log(err));
        }
        if(command === 'leaderboard') {
            client.commands.get('leaderboard').execute(client, message, args).catch(err => console.log(err));
        }
        if(command === 'expose') {
            client.commands.get('expose').execute(client, message, args).catch(err => console.log(err));
        }
        if(command === 'hide') {
            client.commands.get('hide').execute(client, message, args).catch(err => console.log(err));
        }

        if(command === 'list') {
            client.commands.get('list').execute(message).catch(err => console.log(err));
        }

        if(command === 'totals') {
            client.commands.get('totals').execute(message).catch(err => console.log(err));
        }

        if(command === 'mod') {
            client.commands.get('mod').execute(client, message, args).catch(err => console.log(err));
        }

        if(command === 'who') {
            client.commands.get('who').execute(client, message, args).catch(err => console.log(err));
        }
      } catch (error) {
        console.error(error);
      }
});

// put at end
client.login(process.env.DISCORD_TOKEN);