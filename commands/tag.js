const profileModel = require('../models/profileSchema');
const helper = require('../helper/helper');

module.exports = {
    name: 'tag',
    description: "tags humans and turns them in to zombies",
    async execute(client, message, args) {

        if (args[0] == null) {
            message.channel.send('Please specify a user with:\n\t`-tag [name or @]`.');
            return;
        }

        profile = null;
        if (args[0].length >= 17) {
            var idString = helper.getUserFromMention(args[0]);
            profile = await profileModel.findOne({ userID: idString });

            if (profile == null) {
                message.channel.send('That user is not registered.');
                return;
            }

        } else {
            profile = await profileModel.findOne({ name: args.join(" ") });
            if (!profile) {
                message.channel.send('That user is not registered.');
                return;
            }
        }

        await profileModel.updateOne({ _id: profile._id }, { $set: { role: "Zombie", tagged: true, exposed: true } });

        message.channel.send(profile.name + "'s role is now a Zombie");

        await message.guild.members.resolve(idString).roles.add("968258177013542993");
        await message.guild.members.resolve(idString).roles.remove("968420862900441108");


        let tagger = await profileModel.findOne({ userID: message.author.id });

        if (!tagger) {
            return;
        }
        if (tagger.role == "Zombie") {
            await profileModel.updateOne({ _id: tagger._id }, { $set: { numtags: (tagger.numtags + 1) } });

        }
    }
}