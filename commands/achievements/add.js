const { MessageEmbed } = require('discord.js');

const profileModel = require('../../models/profileSchema');
const utils = require('../../utils/utils');

module.exports = {
    name: 'achieve_add',
    description: "adds an achievement",
    async execute(client, message, args, guildIDs) {

        let caller = await profileModel.findOne({ userID: message.author.id });

        if (!caller.mod) {
            await message.channel.send("You don't have the permissions to run this command.")
            return;
        }
    }
}