const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'totals',
    description: "the total number of humans and zombies [including hidden ones]",
    async execute(client, message, args) {
        let zombies = 0;
        let humans = 0;

        for await (const player of profileModel.find()) {
            if (player.role == 'Zombie') {
                zombies++;
            }
            if (player.role == 'Human') {
                humans++;
            }
        }

        message.channel.send("There are " + zombies + " zombies and " + humans + " humans.");
    }
}