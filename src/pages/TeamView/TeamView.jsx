import React from "react";
import TeamViewer from "../../components/TeamViewer/TeamViewer";
import FullPageLayout from "../../UI/Layout/FullPageLayout";

const TeamView = () => {
	return (
		<FullPageLayout title='Players'>
			<TeamViewer />
		</FullPageLayout>
	);
};

export default TeamView;
