const profileModel = require('../models/profileSchema');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: "all commands DavisHvZ can use",
    async execute(message, commands) {
        /*
        OLD HELP:

        format = "\n";
        commands.forEach(command => {
            format += "**" + command.name + "**" + ":\n\t" + command.description + "\n";
        });
        message.channel.send(format);

        */

        // inside a command, event listener, etc.
        const helpEmbed = new MessageEmbed()
            .setColor(0xFFA500)
            .setTitle('Bot Commands')
            .setDescription('Usage: -[command]')
            .setThumbnail('https://runescape.wiki/images/thumb/Zombie_cow.png/400px-Zombie_cow.png')
            .setTimestamp();

        commands.forEach(command => {
            helpEmbed.addFields(
                { name: command.name, value: command.description },
            )
        });
        message.channel.send({ embeds: [helpEmbed] });
    }
}
