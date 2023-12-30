const { MessageEmbed } = require('discord.js');

const profileModel = require('../models/profileSchema');
const utils = require('../utils/utils');

module.exports = {
    name: 'hide',
    description: "hides zombies who are revealed [mod only]",
    async execute(client, message, args) {

        if ((profileModel.findOne({ userID: message.author.userID }).mod) == false) {
            message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        let profile = utils.fetchUserProfile(profileModel, args, message);
        if (!profile) return;

        if (profile.role == 'Zombie' && profile.exposed) {
            await profileModel.updateOne({ _id: profile._id }, { $set: { exposed: false } });
            message.channel.send(profile.name + " is now hidden!");
        }
        else if (profile.role == 'Zombie') {
            message.channel.send(profile.name + " was already hidden!");
        }
        else {
            message.channel.send(profile.name + " is not a zombie, so you can't hide them!");
        }
    }
}