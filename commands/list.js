const { Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { curTimestamp } = require('../utils/utils');
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'list',
    description: "lists every registered player",
    async execute(client, message, args) {

        const listEmbed = new MessageEmbed()
            .setColor(0xFFA500)
            .setTitle('Registered Players')
            .setDescription('Last updated: ' + curTimestamp());


        var humanString = "";
        var zombieString = "";

        for await (const player of profileModel.find()) {

            try {
                    role = (player.role == "Zombie" && !player.exposed) ? "Human" : player.role;

                    if (role == 'Zombie')
                        zombieString = zombieString + (player.name + ", ");

                    if (role == 'Human')
                        humanString = humanString + (player.name + ", ");

                    //if (role != 'Unregistered') {
                    //listEmbed.addFields({ name: player.name, value: (role.padEnd(7) + (player.mod ? "[Mod]" : "")) });
                    //format += player.name.padEnd(15) + profile.tag.padEnd(30).substring(0, 30) + "" + role.padEnd(7) + (player.mod ? "[Mod]" : "") + "\n";
                    //}

                }
            catch {
                //doesn't matter. if this fails, it means the user no longer is in the guild
            }
        }

        if (humanString.length < 2)
            humanString = "No humans! :(";
        else {
            humanString = humanString.slice(0, humanString.length - 2);
        }

        if (zombieString.length < 2)
            zombieString = "No zombies! :(";
        else {

            zombieString = zombieString.slice(0, zombieString.length - 2);
        }

        listEmbed.addField('Humans', humanString);
        listEmbed.addField('Zombies', zombieString);

        message.channel.send({ embeds: [listEmbed] });

        //message.channel.send(humanString);


    }
}