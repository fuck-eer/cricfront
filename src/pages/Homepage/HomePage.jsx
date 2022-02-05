import React from "react";
import AddPlayerModal from "../../components/AddPlayerModal/AddPlayer";
import TeamSelector from "../../components/TeamSelector/TeamSelector";
import FullPageLayout from "../../UI/Layout/FullPageLayout";

const HomePage = () => {
	return (
		<FullPageLayout title='Team Selector'>
			<TeamSelector />
		</FullPageLayout>
	);
};

export default HomePage;
