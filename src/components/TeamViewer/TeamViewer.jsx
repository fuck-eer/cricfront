import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Col, Row, Spinner } from "reactstrap";
import AddPlayerModal from "../AddPlayerModal/AddPlayer";
import PlayerCard from "../PlayerCard/PlayerCard";
import { getPlayers, getTeam } from "../../store/actions/actionPlayers";
import { useDispatch, useSelector } from "react-redux";

const TeamViewer = () => {
	// const [players, setPlayers] = useState([]);
	const { players, team } = useSelector((state) => state.playerSlice);
	const [selectedPlayer, setSeletedPlayer] = useState({});
	const { mode } = useSelector((state) => state.playerModalSlice);
	// const [team, setTeam] = useState("");
	// const [error, setError] = useState("");
	let plrCards = <Spinner />;
	const { teamId } = useParams();
	const dispatch = useDispatch();

	// const resetSelected = useCallback(() => {
	// 	console.log("resetting");
	// 	setSeletedPlayer({});
	// }, []);

	useEffect(() => {
		dispatch(getPlayers(teamId));
		// axios
		// 	.get(`http://localhost:3050/team/${teamId}/showPlayers`)
		// 	.then((e) => {
		// 		setPlayers(e.data);
		// 	})
		// 	.catch((err) => {
		// 		setError(err.error.message);
		// 		console.log(err);
		// 	});

		dispatch(getTeam(teamId));

		// axios
		// 	.get(`http://localhost:3050/team/${teamId}/`)
		// 	.then((e) => setTeam(e.data))
		// 	.catch((err) => console.log(err));
	}, [teamId, dispatch]);
	const onEdit = (playerDet) => {
		setSeletedPlayer(playerDet);
	};
	if (players.length > 0) {
		plrCards = players.map((e) => (
			<Col key={e.id}>
				<PlayerCard
					name={e.name}
					team={e.team}
					id={e.id}
					onEdit={onEdit}
					bgColor={team.baseColor}
					position={e.position}
					imageUrl={e.imageUrl}
				/>
			</Col>
		));
	}

	return (
		<Row xs='4' noGutters>
			{plrCards.length > 0 ? (
				plrCards
			) : (
				<Alert color='danger'>No players found</Alert>
			)}
			<AddPlayerModal
				header={mode === "add" ? "Add Player" : "Edit Player"}
				isEdit={mode === "add" ? false : true}
				playerDet={mode === "add" ? "" : selectedPlayer}
			/>
		</Row>
	);
};

export default TeamViewer;
