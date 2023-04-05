const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'expose',
    description: "reveals zombies who are hidden [mod only]",
    async execute(client, message, args) {

        let caller = await profileModel.findOne({ userID: message.author.id });

        if (!caller.mod) {
            message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        if (args[0] == null || args[0].length < 17) {
            message.channel.send('Please specify a user with:\n\t`-expose @[name]`.');
            return;
        }

        var idString = args[0].substring(2, args[0].length - 1);
        let profile = await profileModel.findOne({ userID: idString });

        if (!profile) {
            message.channel.send("Invalid user.")
            return;
        }

        if (profile.role == 'Zombie' && !profile.exposed) {
            await profileModel.updateOne({ _id: profile._id }, { $set: { exposed: true } });
            message.guild.members.resolve(idString).roles.add("968258177013542993");
            message.guild.members.resolve(idString).roles.remove("968420862900441108");
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