const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'help',
    description: "all commands DavisHvZ can use",
    execute(message, commands) {
        format = "\n";
        commands.forEach(command => {
            format+="**"+command.name+ "**" + ":\n\t" + command.description + "\n";
        });
        message.channel.send(format);
    }
}
