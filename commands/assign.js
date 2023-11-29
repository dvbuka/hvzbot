const profileModel = require('../models/profileSchema');
const helper = require('../helper/helper');

module.exports = {
    name: 'assign',
    description: "assigns a role to the tagged user [mod only]",
    async execute(client, message, args, guildIDs) {

        let caller = await profileModel.findOne({ userID: message.author.id });

        if (!caller.mod) {
            await message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        if (args[0] == null || args[0].length < 17) {
            await message.channel.send("Please tag the user you want to assign.")
            return;
        }

        const idString = helper.fetchUserId(args[0]);
        let profile = await profileModel.findOne({ userID: idString });

        if (!profile) {
            await message.channel.send("That user is not registered!");
            return;
        }

        playerAcct = await message.guild.members.resolve(idString);

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
        if (args[1] == "Human")
            playerAcct.roles.add(guildIDs.humanRole);

        else if (args[1] == "Zombie") {
            if (profile.exposed == true)
                playerAcct.roles.add(guildIDs.zombieRole);
            else {
                message.guild.channels.resolveId(zombieChannel).permissionOverwrites.create(playerAcct, {
                    VIEW_CHANNEL: true
                });
            }

        }

        await profileModel.updateOne({ _id: profile._id }, { $set: { role: args[1] } });

        message.channel.send(profile.name + "'s role is now " + args[1]);
    }
}