const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'register',
    description: "use this to register for the game! format: -register [preferred name]",
    async execute(client, message, args) {
        if(args[0] == null) {
            message.channel.send('Please specify your name with:\n\t`-register @[name]`.');
        }
        else if(args[0].length > 15) {
            message.channel.send('Please specify a shorter name.');
        }
        else if(!(await profileModel.findOne({userID: message.author.id})))
            {
                if(await profileModel.findOne({name: args.join(" ")})) {
                    message.channel.send("That name is already in use, please add an initial or another identifier.");
                    return;
                }
                let profile = await profileModel.create({
                    userID: message.author.id,
                    role: "Human",
                    name: args.join(" ")
            });
            message.channel.send("Welcome to Humans vs. Zombies, " + profile.name + "!");
            
            message.guild.members.resolve(message.author.id).roles.add("968420862900441108");

        } else {
            message.channel.send("You're already registered!");
        };
    }
}