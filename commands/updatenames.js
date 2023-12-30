const profileModel = require('../models/profileSchema');

// TODO: Make less slow
module.exports = {
    name: 'updatenames',
    description: "enforces nicknames in the server of all non-moderators [mod only]",
    async execute(client, message, args) {

        /* TODO: Fix crash when higher perms */
        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES'))
            return message.channel.send("I don't have permission to change nicknames!")

        message.channel.send("Currently disabled.")

        /*
        let caller = await profileModel.findOne({ userID: message.author.id });

        if (!caller.mod) {
            await message.channel.send("You don't have the permissions to run this command.")
            return;
        }

        for await (const player of await profileModel.find()) {
            if (!player.mod) {
                try {
                    await message.guild.members.fetch(player.userID).setNickname(player.name);
                }
                catch {
                    console.log("User left guild!");
                }
            }
        }

        message.channel.send("Updated all nicknames!");
        */
    }
}