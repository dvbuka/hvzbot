const profileModel = require('../models/profileSchema');
const helper = require('../helper/helper');

module.exports = {
    name: 'assign',
    description: "assigns a role to the tagged user [mod only]",
    async execute(client, message, args) {

        let caller = await profileModel.findOne({ userID: message.author.id });

        if (!caller.mod) {
            message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        if (args[0] == null || args[0].length < 17) return;

        var idString = helper.getUserFromMention(args[0]);
        let profile = await profileModel.findOne({ userID: idString });

        if (!profile) {
            message.channel.send("That user is not registered!");
            return;
        }

        playerAcct = await message.guild.members.resolve(idString);

        if (args[1] == "Human")
            playerAcct.roles.add("968420862900441108");

        if (args[1] == "Zombie") {
            message.guild.channels.resolveId("960989922095923320").permissionOverwrites.create(playerAcct, {
                VIEW_CHANNEL: true
            });
            message.guild.channels.resolveId("968280975261978645").permissionOverwrites.create(playerAcct, {
                VIEW_CHANNEL: true
            });
        }

        await profileModel.updateOne({ _id: profile._id }, { $set: { role: args[1] } });

        message.channel.send(profile.name + "'s role is now " + args[1]);
    }
}