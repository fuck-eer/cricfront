import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { playerModalActions } from "../../store/playerModalSlice";
import AddPlayerForm from "../AddPlayerForm/AddPlayerForm";

const OverLayModal = ({ header, Component, isEdit, playerDet }) => {
	const isEditModalOpen = useSelector(
		(state) => state.playerModalSlice.isEditModalOpen
	);

	const dispatch = useDispatch();
	const toggle = () => {
		dispatch(playerModalActions.toggleEditModal());
	};
	return (
		<Modal
			centered
			fullscreen='sm'
			scrollable
			size='md'
			toggle={toggle}
			isOpen={isEditModalOpen}
		>
			<ModalHeader toggle={toggle}>{header}</ModalHeader>
			<ModalBody>
				<Component isEdit={isEdit} playerDet={playerDet ? playerDet : {}} />
			</ModalBody>
			<ModalFooter></ModalFooter>
		</Modal>
	);
};

const EditPlayerModal = ({ header, isEdit, playerDet }) => {
	return (
		<>
			{ReactDOM.createPortal(
				<div>
					<OverLayModal
						header={header}
						Component={AddPlayerForm}
						isEdit={isEdit}
						playerDet={playerDet}
					/>
				</div>,
				document.getElementById("modal")
			)}
		</>
	);
};

export default EditPlayerModal;
