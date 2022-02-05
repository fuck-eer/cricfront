import axios from "axios";
import { playerModalActions } from "../playerModalSlice";
import { playerAction } from "../playerSlice";

const baseUrl = "https://crick-backend.herokuapp.com";

export const getAllTeams = () => {
	return axios.get(`${baseUrl}/team/allTeams`);
};

export const getPlayers = (teamId) => {
	return (dispatch) => {
		axios
			.get(`${baseUrl}/team/${teamId}/showPlayers`)
			.then((e) => {
				dispatch(playerAction.setPlayers(e.data));
			})
			.catch((err) => {
				alert(err.error.message);
				console.log(err);
			});
	};
};

export const getTeam = (teamId) => {
	return (dispatch) => {
		axios
			.get(`${baseUrl}/team/${teamId}/`)
			.then((e) => {
				dispatch(playerAction.setTeam(e.data));
			})
			.catch((err) => console.log(err));
	};
};

export const postPlayer = (player, mode) => {
	return (dispatch) => {
		axios
			.post(`${baseUrl}/player/addPlayer`, {
				...player,
			})
			.then((e) => {
				dispatch(playerModalActions.toggleModal());

				if (mode === "add") {
					dispatch(playerAction.addPlayer(player));
					alert(`player added with Id:${e.data.id}`);
				} else {
					dispatch(playerAction.updatePlayer(player));
					alert(`player updated with Id:${e.data.id}`);
				}
			})
			.catch((err) => {
				console.log(err);
				alert(err);
			});
	};
};

export const deletePlayer = (id) => {
	return (dispatch) => {
		axios
			.get(`${baseUrl}/player/deletePlayer/${id}/`)
			.then((e) => {
				dispatch(playerAction.deletePlayer(id));
				alert(`player deleted with ID: ${e.data.id} `);
			})
			.catch((err) => alert(err));
	};
};
