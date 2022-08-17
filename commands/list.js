const { Channel } = require('discord.js');
const model = require('../models/profileSchema');
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'list',
    description: "lists every registered player",
    async execute(message) {
        format = "";
        curLines = 0;
        for await(const player of profileModel.find()) {
    
            try {
                profile = (await message.guild.members.fetch(player.userID));
                if(profile) {
                    curLines++;
                    profile = profile.user;
                    role = (player.role == "Zombie" && !player.exposed) ? "Human" : player.role;
                    format+= player.name.padEnd(15) + profile.tag.padEnd(30).substring(0,30) + ""+ role.padEnd(7) + (player.mod ? "[Mod]" : "") + "\n";

                    if(curLines == 30) {
                        curLines = 0;
                        message.channel.send('`' + format + '`');
                        format="";
                    }
                }

            }
            catch {
                //doesn't matter. if this fails, it means the user no longer is in the guild
            }
        }
        if(format != "")
            message.channel.send('`' + format + '`');
    }
}