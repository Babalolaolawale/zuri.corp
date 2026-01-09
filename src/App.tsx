import { Route, Routes } from "react-router";
import LandingPage from "./components/LandingPage";
import Careers from "./components/Careers";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/careers" element={<Careers />} />
		</Routes>
	);
}
