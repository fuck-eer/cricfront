import axios from "axios";

const baseUrl =
	"https://todoer-dark-default-rtdb.asia-southeast1.firebasedatabase.app";
export const getTeamPlayers = (team) => {
	return axios.get(`${baseUrl}/${team}/players.json`);
};
