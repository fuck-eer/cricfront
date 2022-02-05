import React from "react";
import {
	Alert,
	Badge,
	Button,
	Card,
	CardBody,
	CardSubtitle,
	CardTitle,
	Fade,
	ListGroup,
	ListGroupItem,
} from "reactstrap";
import classes from "./ListCard.module.scss";

const ListCard = ({ tag, players, listAction }) => {
	let ListItems = (
		<Alert color='danger' style={{ textAlign: "center" }}>
			No Players Found
		</Alert>
	);

	if (players.length > 0) {
		ListItems = players.map((e) => (
			<ListGroupItem key={e.id}>
				<Fade>
					<div className={classes.CardDetails}>
						<div className={classes.imgg}>
							<img src={e.imageUrl} alt='pl1' />
						</div>
						<div className={classes.det}>
							<div style={{ position: "relative" }}>
								{e.badge && (
									<Badge
										className={classes.bdg}
										pill
										color={e.badge === "wk" ? "warning" : "info"}
									>
										{e.badge}
									</Badge>
								)}
								<p className={classes.name}>{e.name}</p>
							</div>
							<p className={classes.city}>{e.position}</p>
						</div>
						{tag === "All Players" ? (
							<Button
								color='success'
								onClick={() => {
									listAction(e.id);
								}}
							>
								Recruit
							</Button>
						) : (
							<Button
								color='danger'
								onClick={() => {
									listAction(e.id);
								}}
							>
								Restore
							</Button>
						)}
					</div>
				</Fade>
			</ListGroupItem>
		));
	}

	return (
		<div style={{ width: "95%" }}>
			<Card outline color={tag === "All Players" ? "danger" : "success"} body>
				<CardBody>
					<CardTitle tag='h5'>{tag}</CardTitle>
					<CardSubtitle className='mb-2 text-muted' tag='h6'>
						Count:{players.length}
					</CardSubtitle>
					<ListGroup
						style={{ height: "62vh", overflow: "auto", scrollbarWidth: "none" }}
						flush
					>
						{ListItems}
					</ListGroup>
				</CardBody>
			</Card>
		</div>
	);
};

export default ListCard;
