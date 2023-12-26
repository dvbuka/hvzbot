// functions that are used by multiple commands, this declutters code and makes it more consistent

function fetchUserId(string) {
	if (!string) return false;

	/* Is it a valid mention? */
	const mentionMatches = string.match(/^<@!?(\d+)>$/);
	if (mentionMatches[1]) {
		return mentionMatches[1];
	};

	/* Non Valid Mentions: Assume ID Provided */
	const idMatches = string.match(/^\d{18}$/);
	if (idMatches[1]) {
		return idMatches[1];
	};

	/* ID has not been found */
	return false;
};

async function fetchUserProfile(profileModel, args, message) {
	/* Try parsing as userID */
	let id = fetchUserId(args[0]);

	if(id) {
		return await profileModel.findOne({ userID: id });
	}

	/* Try parsing as name */
	let name = args[0] + " " + args[1];

	let profile = await profileModel.findOne({ name: name });	

	if (!profile) { /* Invalid ID or Mention Provided */
	const embed = new MessageEmbed()
		.setTitle("Invalid user provided")
		.setDescription("Please ensure you mention a current server member or provide their ID.")
		.setColor(0xFF0000);

	message.channel.send({ embeds: [embed] });
	return false;
	}

	return profile;
};

async function checkMod(profileModel, message) {
	let caller = await profileModel.findOne({ userID: message.author.id });

	if (!caller.mod) {
		message.channel.send("You don't have the permissions to run this command.")
		return false;
	}
	return true;
}

// source: https://tecadmin.net/get-current-date-time-javascript/
function curTimestamp() {
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + ' ' + time;
	return dateTime;
}

module.exports = { fetchUserId, fetchUserProfile, checkMod, curTimestamp };
