const { EmbedBuilder } = require('discord.js');

const profileModel = require('../models/profileSchema');
const { fetchUserId } = require('../helper/helper');

module.exports = {
    name: 'who',
    description: "this reveals the role of a user",
    async execute(client, message, args) {


        const idString = fetchUserId(args[0]);
        if (idString == false) { /* Invalid ID or Mention Provided */
            const embed = new EmbedBuilder()
                .setTitle("Woah, invalid User provided")
                .setDescription("Please ensure you mention a current server member or provide their ID.")
                .setColor("RED");

            message.channel.send({ embeds: [embed] });
            return false;
        };

        let profile = await profileModel.findOne({userID: idString});

        if(!profile) return;
        
        if((profile.role == 'Zombie' && !profile.exposed) || profile.role == 'Human') {
            message.channel.send(profile.name + " is human.");
        } //Redundancy of Human role being here makes sure any coding changes in formatting never accidently exposes zombies.
        else {
            message.channel.send(profile.name + " is " + profile.role + ".");
        }
    }
}