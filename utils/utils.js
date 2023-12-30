// functions that are used by multiple commands, this declutters code and makes it more consistent

function fetchUserId(string) {
	if (!string) return false;

	/* Is it a valid mention? */
	const mentionMatches = string.match(/^<@!?(\d+)>$/);
	if (mentionMatches && mentionMatches.length > 1 && mentionMatches[1]) {
		return mentionMatches[1];
	};

	/* Non Valid Mentions: Assume ID Provided */
	const idMatches = string.match(/^\d{18}$/);
	if (idMatches && idMatches.length > 1 && idMatches[1]) {
		return idMatches[1];
	};

	/* ID has not been found */
	return false;
};

async function fetchUserProfile(profileModel, args, message) {
	/* Try parsing as userID */
	let id = fetchUserId(args[0]);

	if (id) {
		return await profileModel.findOne({ userID: id });
	}

	/* Try parsing as name */
	let name = args[0] + " " + args[1];

	let profile = await profileModel.findOne({ name: name })

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

/* Distance between two strings */
function levenshteinDistance(s, t) {
	const m = s.length;
	const n = t.length;

	const dp = [];
	for (let i = 0; i <= m; i++) {
		dp[i] = [];
		for (let j = 0; j <= n; j++) {
			dp[i][j] = 0;
		}
	}

	// Initialize the first row and column
	for (let i = 0; i <= m; i++) {
		dp[i][0] = i;
	}

	for (let j = 0; j <= n; j++) {
		dp[0][j] = j;
	}

	// Fill in the rest of the matrix
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			const cost = s[i - 1] === t[j - 1] ? 0 : 1;
			dp[i][j] = Math.min(
				dp[i - 1][j] + 1, // Deletion
				dp[i][j - 1] + 1, // Insertion
				dp[i - 1][j - 1] + cost // Substitution
			);
		}
	}

	// The final value in the bottom-right corner is the Levenshtein distance
	return dp[m][n];
};

function closestString(string, list) {
	let min = Number.MAX_SAFE_INTEGER
	let best = ""
	for (let j = 0; j < list.length; j++) {
		let dist = levenshteinDistance(string, list[j])
		if (dist < min) {
			best = list[k]
			min = dist
		}
	}

	return best
}

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
