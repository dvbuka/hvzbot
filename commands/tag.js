const { MessageEmbed } = require('discord.js');

const profileModel = require('../models/profileSchema');
const helper = require('../helper/helper');

module.exports = {
    name: 'tag',
    description: "tags humans and turns them in to zombies",
    async execute(client, message, args, guildIDs) {

        profile = null;
        if (args[0].length >= 17) {
            const idString = helper.fetchUserId(args[0]);
            if (idString == false) { /* Invalid ID or Mention Provided */
                const embed = new MessageEmbed()
                    .setTitle("Woah, invalid User provided")
                    .setDescription("Please ensure you mention a current server member or provide their ID.")
                    .setColor(0xFF0000);

                message.channel.send({ embeds: [embed] });
                return false;
            };

            profile = await profileModel.findOne({ userID: idString });

            if (profile == null) {
                message.channel.send('That user is not registered.');
                return;
            }

            await profileModel.updateOne({ _id: profile._id }, { $set: { role: "Zombie", tagged: true, exposed: true } });

            message.channel.send(profile.name + "'s role is now a Zombie");
    
            await message.guild.members.resolve(idString).roles.add(guildIDs.zombieRole);
            await message.guild.members.resolve(idString).roles.remove(guildIDs.humanRole);
            
        } else {
            profile = await profileModel.findOne({ name: args.join(" ") });
            if (!profile) {
                message.channel.send('That user is not registered.');
                return;
            }
        }


        let tagger = await profileModel.findOne({ userID: message.author.id });

        if (!tagger) {
            return;
        }
        if (tagger.role == "Zombie") {
            await profileModel.updateOne({ _id: tagger._id }, { $set: { numtags: (tagger.numtags + 1) } });

        }
    }
}