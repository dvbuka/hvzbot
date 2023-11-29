const profileModel = require('../models/profileSchema');
const helper = require('../helper/helper')
module.exports = {
    name: 'expose',
    description: "reveals zombies who are hidden [mod only]",
    async execute(client, message, args, guildIDs) {

        let caller = await profileModel.findOne({ userID: message.author.id });

        if (!caller.mod) {
            message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        const idString = helper.fetchUserId(args[0]);
        let profile = await profileModel.findOne({ userID: idString });

        if (!profile) {
            message.channel.send("Invalid user.")
            return;
        }

        if (profile.role == 'Zombie' && !profile.exposed) {
            await profileModel.updateOne({ _id: profile._id }, { $set: { exposed: true } });
            message.guild.members.resolve(idString).roles.add(guildIDs.zombieRole);
            message.guild.members.resolve(idString).roles.remove(guildIDs.humanRole);
            message.channel.send(profile.name + " was revealed to be a hidden zombie!");
        }
        else if (profile.role == 'Zombie') {
            message.channel.send(profile.name + " was already exposesd!");
        }
        else {
            message.channel.send(profile.name + " is not a zombie, so you can't expose them!");
        }
    }
}