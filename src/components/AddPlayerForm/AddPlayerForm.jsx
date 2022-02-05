import { getAllTeams } from "../../store/actions/actionPlayers";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";
import classes from "./AddPlayerForm.module.scss";
import useValidation from "../../hooks/useValidation";
import {
	isImageUrlValid,
	isNameValid,
	isPositionValid,
	isTeamValid,
} from "../../util/validationFunctions";
import { useDispatch } from "react-redux";
import { postPlayer } from "../../store/actions/actionPlayers";

const AddPlayerForm = ({ isEdit, playerDet }) => {
	const name = isEdit ? playerDet.name : "";
	const imageUrl = isEdit ? playerDet.imageUrl : "";
	const team = isEdit ? playerDet.team : "";
	const position = isEdit ? playerDet.position : "";
	const id = isEdit ? playerDet.id : "";
	const [teams, setteams] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		getAllTeams()
			.then((e) => {
				setteams(e.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	// useEffect(() => {
	// 	return () => {
	// 		resetSelected();
	// 	};
	// }, [resetSelected]);
	let teamOpt = (
		<option value=''>
			<Spinner />
		</option>
	);
	const {
		enteredValue: enteredName,
		hasError: nameHasError,
		onFieldBlur: onNameFieldBlur,
		onReset: onNameReset,
		isValid: nameValid,
		onValueChange: onNameValueChange,
	} = useValidation(isNameValid, name);
	const {
		enteredValue: enteredPosition,
		hasError: positionHasError,
		onFieldBlur: onPositionFieldBlur,
		onReset: onPositionReset,
		isValid: positionValid,
		onValueChange: onPositionValueChange,
	} = useValidation(isPositionValid, position);
	const {
		enteredValue: enteredTeam,
		hasError: teamHasError,
		onFieldBlur: onTeamFieldBlur,
		onReset: onTeamReset,
		isValid: teamValid,
		onValueChange: onTeamValueChange,
	} = useValidation(isTeamValid, team);
	const {
		enteredValue: enteredImageUrl,
		hasError: imageUrlHasError,
		onFieldBlur: onImageUrlFieldBlur,
		onReset: onImageUrlReset,
		isValid: imageUrlValid,
		onValueChange: onImageUrlValueChange,
	} = useValidation(isImageUrlValid, imageUrl);
	const formHasError =
		imageUrlHasError || nameHasError || teamHasError || positionHasError;
	const formValid = nameValid && positionValid && imageUrlValid && teamValid;
	const formReset = () => {
		onImageUrlReset();
		onNameReset();
		onPositionReset();
		onTeamReset();
	};
	const formSubmit = (event) => {
		event.preventDefault();
		if (!formValid || formHasError) {
			console.log("form not valid");
			return;
		}
		const player = {
			name: enteredName,
			position: enteredPosition,
			imageUrl: enteredImageUrl,
			team: enteredTeam,
			id: id,
		};

		dispatch(postPlayer(player, id ? "edit" : "add"));
		// axios
		// 	.post(`http://localhost:3050/player/addPlayer`, {
		// 		...player,
		// 	})
		// 	.then((e) => {
		// 		dispatch(playerModalActions.toggleModal());
		// 		alert(`player added with Id:${e.data.id}`);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		alert(err);
		// 	});
	};

	if (teams.length > 0) {
		teamOpt = teams.map((e) => (
			<option key={e.id} value={e.id}>
				{e.name}
			</option>
		));
	}

	return (
		<div className={classes.Container}>
			<form className={classes.Form} onSubmit={formSubmit}>
				<div className={classes.Form_Inputs}>
					<input
						value={enteredName}
						onBlur={onNameFieldBlur}
						onChange={onNameValueChange}
						placeholder='Enter Name'
					/>
					<select
						value={enteredPosition}
						onBlur={onPositionFieldBlur}
						onChange={onPositionValueChange}
						placeholder='Enter Position'
					>
						<option hidden value=''>
							Enter Position
						</option>
						<option value='Batter'>Batter</option>
						<option value='Bowler'>Bowler</option>
					</select>
					<select
						value={enteredTeam}
						onBlur={onTeamFieldBlur}
						onChange={onTeamValueChange}
						placeholder='Enter Team'
					>
						<option hidden value=''>
							Enter Team
						</option>
						{teamOpt}
					</select>
					<input
						value={enteredImageUrl}
						onBlur={onImageUrlFieldBlur}
						onChange={onImageUrlValueChange}
						placeholder='Enter Image URL'
					/>
					<div className={classes.imgg}>
						<img
							src={
								enteredImageUrl ||
								"https://images.vexels.com/media/users/3/140748/isolated/lists/5b078a59390bb4666df98b49f1cdedd0-male-profile-avatar.png"
							}
							alt='unable to load'
						/>
					</div>
				</div>
				<div className={classes.Form_Controls}>
					<Button disabled={!formValid} color='primary'>
						{isEdit ? "Edit Player" : "Add Player"}
					</Button>
					{!isEdit && (
						<Button type='button' onClick={formReset}>
							Clear
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default AddPlayerForm;
