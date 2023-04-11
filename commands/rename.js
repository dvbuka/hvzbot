const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'rename',
    description: "updates your name",
    async execute(client, message, args) {

        if(args.length < 2) {
            message.channel.send("Please specify a name and an initial!");
            return;
        }
        let newname = args.join(" ");

        if (newname > 20) {
            message.channel.send("This name is too long!");
            return;
        };

        let profile = await profileModel.findOne({ name: newname});

        if(profile) {
            message.channel.send("That name is already taken!")
            return;
        }

        profile = await profileModel.findOne({ userID: message.author.id });

        if(!profile) {
            message.channel.send("Register first!")
            return;
        }

        await profileModel.updateOne({ _id: profile._id }, { $set: { name: newname } });

        try {
            await message.guild.members.resolve(profile.userID).setNickname(profile.name);
        } catch (DiscordAPIError) {
            console.log("Can't change this person's nickname. Moving on!");
        }

        message.channel.send("Your name is now " + newname + "!");
        

    }
}