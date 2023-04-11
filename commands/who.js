const profileModel = require('../models/profileSchema');
const { getUserFromMention } = require('../helper/helper');

module.exports = {
    name: 'who',
    description: "this reveals the role of a user",
    async execute(client, message, args) {

        if(args[0] == null || args[0].length < 17) {
            message.channel.send("Please tag a user!");
            return;
        }

        var idString = getUserFromMention(args[0]);

        let profile = await profileModel.findOne({userID: idString});

        if(!profile) return;
        
        if((profile.role == 'Zombie' && !profile.exposed) || profile.role == 'Human') {
            message.channel.send(profile.name + " is a human.");
        } //Redundancy of Human role being here makes sure any coding changes in formatting never accidently exposes zombies.
        else {
            message.channel.send(profile.name + " is a " + profile.role + ".");
        }
    }
}