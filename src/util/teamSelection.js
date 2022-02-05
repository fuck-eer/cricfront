export const selectTeam = (allPlayers) => {
	let team = [];
	let reserve = [];

	const allbatters = allPlayers.filter(
		(e) => e.position.toLowerCase() === "batter"
	);

	const allbowlers = allPlayers.filter(
		(e) => e.position.toLowerCase() === "bowler"
	);

	const allallrs = allPlayers.filter((e) => e.position.includes("Allrounder"));

	const batters = allbatters.splice(0, 5);
	const bowlers = allbowlers.splice(0, 4);
	const allrs = allallrs.splice(0, 2);

	team = [...batters, ...allrs, ...bowlers];
	reserve = [...allbatters, ...allbowlers, ...allallrs];
	return { team, reserve };
};
