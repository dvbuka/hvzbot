// functions that are used by multiple commands. this declutters code and makes it more consistent

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return mention;
	}
}

async function checkMod(profileModel, message) {
	let caller = await profileModel.findOne({ userID: message.author.id });

	if (!caller.mod) {
		message.channel.send("You don't have the permissions to run this command.")
		return false;
	}
	return true;
}

//source: https://tecadmin.net/get-current-date-time-javascript/
function curTimestamp() {

	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + ' ' + time;

	return dateTime;
}

module.exports = { getUserFromMention, curTimestamp };
