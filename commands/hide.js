const profileModel = require('../models/profileSchema');
const helper = require('../helper/helper');

module.exports = {
    name: 'hide',
    description: "hides zombies who are revealed [mod only]",
    async execute(client, message, args) {

        if ((await profileModel.findOne({ userID: message.author.userID }).mod) == false) {
            message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        if (args[0] == null) {
            message.channel.send('Please specify a user with:\n\t`-hide @[name]`.');
            return;
        }

        if (args[0].length < 17) {
            message.channel.send('Please specify a user with:\n\t`-hide @[name]`. [mod only]');
            return;
        }

        var idString = helper.getUserFromMention(args[0]);
        let profile = await profileModel.findOne({ userID: idString });

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