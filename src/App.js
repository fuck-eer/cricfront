import AddPlayerModal from "./components/AddPlayerModal/AddPlayer";
import MainHead from "./components/mainHead/MainHead";
import HomePage from "./pages/Homepage/HomePage";
import TeamView from "./pages/TeamView/TeamView";
import { Route, Switch } from "react-router-dom";
import AddPlayerForm from "./components/AddPlayerForm/AddPlayerForm";
function App() {
	return (
		<div>
			<MainHead />
			<AddPlayerModal>
				<AddPlayerForm />
			</AddPlayerModal>
			<Switch>
				<Route path='/team/:teamId/players'>
					<TeamView />
				</Route>
				<Route path='/' exact>
					<HomePage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
