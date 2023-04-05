const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'rename',
    description: "updates your name",
    async execute(client, message, args) {

        console.log("HI!");
        let newname = args.join(" ");

        if (newname > 20) {
            message.channel.send("This name is too long!");
            return;
        };

        profile = await profileModel.findOne({ userID: message.author.id });
        await profileModel.updateOne({ _id: profile._id }, { $set: { name: newname } });
        message.guild.members.resolve(profile.userID).setNickname(profile.name);
        message.channel.send("Your name is now " + newname + "!");
        

    }
}