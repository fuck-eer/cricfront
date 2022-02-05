import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
	Collapse,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink,
	Spinner,
	UncontrolledDropdown,
} from "reactstrap";
import { getAllTeams } from "../../store/actions/actionPlayers";
import { playerModalActions } from "../../store/playerModalSlice";

const MainHead = () => {
	const [teams, setteams] = useState([]);

	const dispatch = useDispatch();

	const toggle = () => {
		dispatch(playerModalActions.toggleModal());
		dispatch(playerModalActions.toggleMode("add"));
	};

	useEffect(() => {
		getAllTeams()
			.then((e) => {
				setteams(e.data);
			})
			.catch((err) => {
				console.log(err);
			});
		return () => {};
	}, []);

	let tms = <Spinner />;
	const imgStyle = {
		width: "20px",
		height: "20px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	if (teams.length > 0) {
		tms = teams.map((e) => (
			<DropdownItem key={e.id}>
				<Link
					style={{
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "stretch",
						textDecorationLine: "none",
						gap: "1rem",
					}}
					to={`/team/${e.id}/players`}
				>
					<span style={imgStyle}>
						<img style={{ maxHeight: "100%" }} src={e.logo} alt={e.org} />
					</span>
					<span style={{ color: "#555" }}>{e.name}</span>
				</Link>
			</DropdownItem>
		));
	}
	return (
		<Navbar color='dark' dark expand='md' fixed='top' full>
			<NavbarBrand href='/'>Cric8</NavbarBrand>
			<NavbarToggler onClick={function noRefCheck() {}} />
			<Collapse navbar>
				<Nav className='me-auto' navbar>
					<NavItem>
						<NavLink onClick={toggle}>Add Player</NavLink>
					</NavItem>
					<UncontrolledDropdown inNavbar nav>
						<DropdownToggle caret nav>
							Teams
						</DropdownToggle>
						<DropdownMenu end>{tms}</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default MainHead;
