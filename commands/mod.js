const profileModel = require('../models/profileSchema');
const helper = require('../helper/helper');

module.exports = {
    name: 'mod',
    description: "gives mod perm for the bot",
    async execute(client, message, args) {

        let caller = await profileModel.findOne({userID: message.author.id});

        if(!caller.mod) {
            message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        if(args[0] == null || args[0].length < 17)
            return;

        var idString = helper.getUserFromMention(args[0]);
        let profile = await profileModel.findOne({userID: idString});

        if(!profile) {
            message.channel.send("Invalid user.")
            return;
        }

        if(!profile.mod) {
            await profileModel.updateOne({_id: profile._id}, { $set: {mod : true}});
            message.channel.send(profile.name + " is now a mod!");
        }
        else {
            message.channel.send(profile.name + " is already a mod!");
        }
    }
}