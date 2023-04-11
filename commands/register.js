const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'register',
    description: "use this to register for the game! format: -register [preferred name]",
    async execute(client, message, args, guildIDs) {
        if (args[0] == null) {
            message.channel.send('Please specify your name with:\n\t`-register @[name]`.');
        }
        else if (args[0].length + args[1].length > 20) {
            message.channel.send('Please specify a shorter name.');
        }
        else if (!(await profileModel.findOne({ userID: message.author.id }))) {
            if (await profileModel.findOne({ name: args.join(" ") })) {
                message.channel.send("That name is already in use, please add an initial or another identifier.");
                return;
            }
            let profile = await profileModel.create({
                userID: message.author.id,
                role: "Human",
                name: args.join(" ")
            });
            message.channel.send("Welcome to Humans vs. Zombies, " + profile.name + "!");

            message.guild.members.resolve(message.author.id).roles.add(guildIDs.humanRole);

        } else {

            let profile = await profileModel.findOne({ userID: message.author.id });
            if (profile.role == 'Unregistered') {
                await profileModel.updateOne({ _id: profile._id }, { $set: { role: 'Human', name: args.join(" ") } });
                message.channel.send("You've been registered for this event!");
                
                message.guild.members.resolve(message.author.id).roles.add(guildIDs.humanRole);
                message.guild.members.resolve(message.author.id).setNickname(profile.name);

            }
            else {
                message.channel.send("You're already registered!");
            }
        };
    }
}