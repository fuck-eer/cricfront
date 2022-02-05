import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { playerModalActions } from "../../store/playerModalSlice";
import { deletePlayer } from "../../store/actions/actionPlayers.js";
import classes from "./PlayerCard.module.scss";
const PlayerCard = ({
	id,
	bgColor,
	imageUrl,
	team,
	position,
	name,
	onEdit,
}) => {
	const dispatch = useDispatch();
	const [hover, setHover] = useState(false);
	const hovStyle = {
		borderColor: "#000",
		background: `linear-gradient(
			270deg,
			${bgColor}66 1%,
			${bgColor}00 50%
		)`,
	};
	const sty = {
		minHeight: "220px",
		minWidth: "360px",
		background: `linear-gradient(
		270deg,
		${bgColor}59 0%,
		${bgColor}00 40%
	)`,
		transition: "all 0.5s ease-in",
	};
	const playerDet = {
		name,
		id,
		imageUrl,
		position,
		team,
	};
	const onDelete = () => {
		// axios
		// 	.get(`http://localhost:3050/player/deletePlayer/${id}/`)
		// 	.then((e) => {
		// 		alert(`player deleted with ID: ${e.data.id} `);
		// 	})
		// 	.catch((err) => alert(err));
		dispatch(deletePlayer(id));
	};
	return (
		<div
			style={{
				width: "95%",
				display: "flex",
				marginLeft: "2.5%",
				marginBottom: "5%",
				alignItems: "center",
				justifyContent: "center",
				flexFlow: "column nowrap",
			}}
		>
			<Card
				onMouseEnter={() => {
					setHover(true);
				}}
				onMouseLeave={() => {
					setHover(false);
				}}
				style={{ ...sty, ...(hover ? hovStyle : {}) }}
				outline
				className={classes.card}
			>
				<CardBody
					style={{
						position: "relative",
						display: "flex",
						justifyContent: "space-around",
						alignItems: "flex-start",
						flexFlow: "column nowrap",
					}}
				>
					<CardTitle tag='h5'>{name}</CardTitle>
					<CardSubtitle className='mb-2 text-muted' tag='h6'>
						{position}
					</CardSubtitle>
					{/* <CardText style={{ width: "70%", textAlign: "left" }}>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</CardText> */}
					<div>
						<Button
							onClick={() => {
								dispatch(playerModalActions.toggleModal());
								dispatch(playerModalActions.toggleMode("edit"));
								onEdit({ ...playerDet });
							}}
						>
							Edit
						</Button>
						<Button
							style={{ marginLeft: "1rem" }}
							onClick={onDelete}
							color='danger'
						>
							Delete
						</Button>
					</div>

					<div className={classes.imgg}>
						<img src={imageUrl} alt='img' />
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default PlayerCard;
