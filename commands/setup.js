const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'setup',
    description: "update roles & channels in the server, use <prefix>setup for more info [mod only]",
    async execute(client, message, args) {

        let caller = await profileModel.findOne({ userID: message.author.id });

        if (!caller.mod) {
            message.channel.send("You don't have the permissions to run this command.")
            return;
        }
        
        if (message.content == null) {
            message.channel.send("Use " + process.env.PREFIX + "setup <subcommand> to update the bot.");
            message.channel.send("Subcommands: zombierole, humanrole, zombiechannel, humanchannel");
            return;
        }
        args = message.content.slice(process.env.PREFIX.length).split(/ +/);
        const subcommand = args.shift().toLowerCase();

    }
}
