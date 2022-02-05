import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import useTeamSelector from "../../hooks/useTeamSelector";
import { getTeamPlayers } from "../../store/actions/actionRecruit";
import ListCard from "../../UI/ListCard/ListCard";
import { selectTeam } from "../../util/teamSelection";
// import { allPlayers as Data } from "../../data";

const TeamSelector = () => {
	// const [allPlayers, setallPlayers] = useState([]);
	// const [teamPlayers, setteamPlayers] = useState([]);
	const {
		teamPlayers,
		allPlayers,
		resetSelector,
		recruitPlayer,
		restorePlayer,
	} = useTeamSelector();
	useEffect(() => {
		getTeamPlayers("india")
			.then((e) => {
				const pl = Object.values(e.data);
				resetSelector(pl);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [resetSelector]);
	const flexCont = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexFlow: "column nowrap",
	};

	// const recruitPlayer = (id) => {
	// 	if (teamPlayers.length >= 11) {
	// 		alert("team full");
	// 		return;
	// 	}
	// 	const Player = allPlayers.find((e) => e.id === id);
	// 	if (!Player) {
	// 		return;
	// 	}
	// 	const newList = allPlayers.filter((e) => e.id !== id);
	// 	setteamPlayers((prev) => [...prev, Player]);
	// 	setallPlayers(newList);
	// };

	// const restorePlayer = (id) => {
	// 	const Player = teamPlayers.find((e) => e.id === id);
	// 	if (!Player) {
	// 		return;
	// 	}
	// 	const newList = teamPlayers.filter((e) => e.id !== id);
	// 	setallPlayers((prev) => [Player, ...prev]);
	// 	setteamPlayers(newList);
	// };

	return (
		<div>
			<Row noGutters>
				<Col style={flexCont}>
					<ListCard
						players={allPlayers}
						tag='All Players'
						listAction={recruitPlayer}
					/>
				</Col>
				<Col style={flexCont}>
					<ListCard
						players={teamPlayers}
						tag='Team Players'
						listAction={restorePlayer}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default TeamSelector;
