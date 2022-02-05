import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	players: [],
	team: {},
};

const playerSlice = createSlice({
	name: "playerSlice",
	initialState,
	reducers: {
		setPlayers(state, action) {
			console.log(action.payload);
			state.players = [...action.payload];
		},
		setTeam(state, action) {
			state.team = { ...action.payload };
		},
		deletePlayer(state, action) {
			const playerz = state.players.filter((e) => e.id !== action.payload);
			state.players = playerz;
		},
		addPlayer(state, action) {
			const player = { ...action.payload };
			state.players = [...state.players, player];
		},
		updatePlayer(state, action) {
			const player = { ...action.payload };
			const indx = state.players.findIndex((e) => e.id === player.id);
			if (indx === -1) {
				console.log("player not found :(");
				return;
			}
			state.players[indx] = player;
		},
	},
});

export default playerSlice.reducer;
export const playerAction = playerSlice.actions;
