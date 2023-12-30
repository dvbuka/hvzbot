const { MessageEmbed } = require('discord.js');

const profileModel = require('../models/profileSchema');
const utils = require('../utils/utils');

module.exports = {
    name: 'tag',
    description: "tags humans and turns them in to zombies",
    async execute(client, message, args, guildIDs) {

        let profile = fetchUserProfile(profileModel, args, message);
        if (!profile) return;

        await profileModel.updateOne({ _id: profile._id }, { $set: { role: "Zombie", tagged: true, exposed: true } });

        message.channel.send(profile.name + "'s role is now a Zombie");

        await message.guild.members.fetch(profile.userID).roles.add(guildIDs.zombieRole);
        await message.guild.members.fetch(profile.userID).roles.remove(guildIDs.humanRole);

        let tagger = await profileModel.findOne({ userID: message.author.id });

        if (!tagger) {
            return;
        }
        if (tagger.role == "Zombie") {
            await profileModel.updateOne({ _id: tagger._id }, { $set: { numtags: (tagger.numtags + 1) } });

        }
    }
}