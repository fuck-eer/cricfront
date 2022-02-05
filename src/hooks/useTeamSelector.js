import { useCallback, useState } from "react";
import { selectTeam } from "../util/teamSelection";

const useTeamSelector = () => {
	const [allPlayers, setallPlayers] = useState([]);
	const [teamPlayers, setteamPlayers] = useState([]);

	const setPlayers = (players) => {
		setallPlayers(players);
	};
	const setTeam = (tmPlayers) => {
		setteamPlayers(tmPlayers);
	};
	const resetSelector = useCallback((allps) => {
		const { team, reserve } = selectTeam(allps);
		setallPlayers(reserve);
		setteamPlayers(team);
	}, []);
	const recruitPlayer = (id) => {
		if (teamPlayers.length >= 11) {
			alert("team full");
			return;
		}
		const Player = allPlayers.find((e) => e.id === id);
		if (!Player) {
			return;
		}
		const newList = allPlayers.filter((e) => e.id !== id);
		setteamPlayers((prev) => [...prev, Player]);
		setallPlayers(newList);
	};
	const restorePlayer = (id) => {
		const Player = teamPlayers.find((e) => e.id === id);
		if (!Player) {
			return;
		}
		const newList = teamPlayers.filter((e) => e.id !== id);
		setallPlayers((prev) => [Player, ...prev]);
		setteamPlayers(newList);
	};

	return {
		recruitPlayer,
		restorePlayer,
		resetSelector,
		teamPlayers,
		allPlayers,
	};
};
export default useTeamSelector;
