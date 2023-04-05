const { Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { curTimestamp } = require('../helper/helper');
const model = require('../models/profileSchema');
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'update',
    description: "updates embeds [mod only]",
    async execute(client, message, args) {

        let caller = await profileModel.findOne({ userID: message.author.id });

        if (!caller.mod) {
            message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        if (args[0] === 'list') {

            const embedMessage = await message.channel.fetch(1024196270904049664);

            const listEmbed = new MessageEmbed()
                .setColor(0xFFA500)
                .setTitle('Registered Players')
                .setDescription('Last updated: ' + curTimestamp());

            for await (const player of profileModel.find()) {
                try {
                    var profile = (await message.guild.members.fetch(player.userID));
                    if (profile) {
                        profile = profile.user;
                        role = (player.role == "Zombie" && !player.exposed) ? "Human" : player.role;
                        if (role != 'Unregistered') {
                            listEmbed.addFields({ name: player.name, value: (role.padEnd(7) + (player.mod ? "[Mod]" : "")) });
                            //format += player.name.padEnd(15) + profile.tag.padEnd(30).substring(0, 30) + "" + role.padEnd(7) + (player.mod ? "[Mod]" : "") + "\n";
                        }
                    }
                }
                catch {
                    console.log(":(");
                    //doesn't matter. if this fails, it means the user no longer is in the guild
                }
            }
            embedMessage.edit(listEmbed); // edits message with newembed
        }
    }
}