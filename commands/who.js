const { MessageEmbed } = require('discord.js');

const profileModel = require('../models/profileSchema');
const { fetchUserProfile } = require('../utils/utils');

module.exports = {
    name: 'who',
    description: "this reveals the role of a user",
    async execute(client, message, args) {

        const profile = await fetchUserProfile(profileModel, args, message)

        if (!profile) return;

        if ((profile.role == 'Zombie' && !profile.exposed) || profile.role == 'Human') {
            message.channel.send(profile.name + " is human.");
        } 
        //Redundancy of Human role being here makes sure any coding changes in formatting never accidently exposes zombies.
        else {
            message.channel.send(profile.name + " is " + profile.role + ".");
        }
    }
}