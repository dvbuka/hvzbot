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

        var idString = helper.getUserFromMention(args[0]);
        let profile = await profileModel.findOne({ userID: idString });

        if (!profile) {
            await message.channel.send("That user is not registered!");
            return;
        }

        playerAcct = await message.guild.members.resolve(idString);

        if (args[1] == "Human")
            playerAcct.roles.add(guildIDs.humanRole);

        if (args[1] == "Zombie") {
            client.guilds.resolve(message.guild).channels.resolve(guildIDs.zombieChannel).permissionOverwrites.create(playerAcct, {
                VIEW_CHANNEL: true
            });
            /*message.guild.channels.resolveId("968280975261978645").permissionOverwrites.create(playerAcct, {
                VIEW_CHANNEL: true
            });*/
        }

        await profileModel.updateOne({ _id: profile._id }, { $set: { role: args[1] } });

        message.channel.send(profile.name + "'s role is now " + args[1]);
    }
}