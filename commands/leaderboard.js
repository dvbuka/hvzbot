const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'leaderboard',
    description: "leaderboard of most tags by zombies",
    async execute(client, message, args) {
        players = await profileModel.aggregate([{ $match: { role: "Zombie", exposed: true }},{ $sort: { numtags: -1 } }]);
        format = "";
        i = 0;
        for await(const player of players) {
            try {
                //profile = (await message.guild.members.fetch(player.userID));
                //if(profile) {
                    i++;
                    //profile = profile.user;
                    format+= (i+".").padEnd(4) + player.name.padEnd(15) + player.numtags + "\n";
                //}
            }
            catch {
                //doesn't matter. if this fails, it means the user no longer is in the guild
            }
        }
        message.channel.send(':skull:Turned Leaderboard:skull:\n`' + format + '`');
    }
}