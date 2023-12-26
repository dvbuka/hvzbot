// set up
require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const fs = require('fs');
const mongoose = require("mongoose"); // for mongoDB
const guildIDs = {
    zombieRole: "968258177013542993",
    zombieChannel: "1092727051099852820",
    humanRole: "968420862900441108",
    humanChannel: "1092726703203303496"
}

// creates a list of commands and their properties by iterating through files in the commands folder
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// waiting for the Discord client to create an instance of the bot
client.once('ready', () => {
    console.log('HvZBot is online!')
});

// connecting to the mongoDB
mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to the database!');
}).catch((err) => {
    console.log(err);
})

// portion that responds to Discord input
client.on('message', message => {

    if ( message.author.bot || !message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        if (command === 'help') {
            client.commands.get('help').execute(message, client.commands).catch(err => console.log(err));
        }
        else {
            client.commands.get(command).execute(client, message, args, guildIDs).catch(err => console.log(err));
        }
    } catch (error) {
        message.channel.send("That didn't work, check your syntax!");
        console.error(error);
    }
});

client.login(process.env.DISCORD_TOKEN);