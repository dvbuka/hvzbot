const profileModel = require('../models/profileSchema');

// TODO: Make less slow
module.exports = {
    name: 'updatenames',
    description: "enforces nicknames in the server of all non-moderators [mod only]",
    async execute(client, message, args) {

        let caller = await profileModel.findOne({ userID: message.author.id });

        if (!caller.mod) {
            await message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        for await (const player of profileModel.find()) {
            if (!player.mod) {
                try {
                await message.guild.members.resolve(player.userID).setNickname(player.name);
                }
                catch {
                    console.log("User left guild!");
                }
            }
        }

        message.channel.send("Updated all nicknames!");
    }
}