const { MessageEmbed } = require('discord.js');

const profileModel = require('../models/profileSchema');
const utils = require('../utils/utils');

module.exports = {
    name: 'assign',
    description: "assigns a role to the tagged user [mod only]",
    async execute(client, message, args, guildIDs) {

        let caller = await profileModel.findOne({ userID: message.author.id });

        if (!caller.mod) {
            await message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        let profile = await utils.fetchUserProfile(profileModel, args, message);
        if (!profile) return;

        let playerAcct = await message.guild.members.fetch(profile.userID);

        // reset roles
        playerAcct.roles.remove(guildIDs.humanRole);
        playerAcct.roles.remove(guildIDs.zombieRole);
        client.guilds.resolve(message.guild).channels.resolve(guildIDs.zombieChannel).permissionOverwrites.create(playerAcct, {
            VIEW_CHANNEL: false
        });
        client.guilds.resolve(message.guild).channels.resolve(guildIDs.humanChannel).permissionOverwrites.create(playerAcct, {
            VIEW_CHANNEL: false
        });

        // update accordingly
        if (args[args.length - 1] == "Human")
            playerAcct.roles.add(guildIDs.humanRole);

        else if (args[args.length - 1] == "Zombie") {
            if (profile.exposed == true)
                playerAcct.roles.add(guildIDs.zombieRole);
            else {
                client.guilds.resolve(message.guild).channels.resolve(guildIDs.zombieChannel).permissionOverwrites.create(playerAcct, {
                    VIEW_CHANNEL: true
                });
            }

        }

        await profileModel.updateOne({ _id: profile._id }, { $set: { role: args[args.length - 1] } });

        message.channel.send(profile.name + "'s role is now " + args[args.length - 1]);
    }
}