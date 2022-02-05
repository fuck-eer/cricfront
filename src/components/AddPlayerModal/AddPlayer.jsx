import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { playerModalActions } from "../../store/playerModalSlice";
import AddPlayerForm from "../AddPlayerForm/AddPlayerForm";

const OverLayModal = ({ header, Component, isEdit, playerDet }) => {
	const isModalOpen = useSelector(
		(state) => state.playerModalSlice.isModalOpen
	);

	const dispatch = useDispatch();
	const toggle = () => {
		dispatch(playerModalActions.toggleModal());
	};
	return (
		<Modal
			centered
			fullscreen='sm'
			scrollable
			size='md'
			toggle={toggle}
			isOpen={isModalOpen}
		>
			<ModalHeader toggle={toggle}>{header}</ModalHeader>
			<ModalBody>
				<Component isEdit={isEdit} playerDet={isEdit ? playerDet : {}} />
			</ModalBody>
			<ModalFooter></ModalFooter>
		</Modal>
	);
};

const AddPlayerModal = ({ header, isEdit, playerDet }) => {
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

export default AddPlayerModal;
