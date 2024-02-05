import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoteContextProvider } from "./contexts/NoteContext";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NoteItem from "./pages/NoteItem";
import Blogs from "./pages/Blogs";
import Lab from "./pages/Lab";
import NoPage from "./pages/NoPage";

const App = () => {

	// render the fetched Contentful data
	return (
		<NoteContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="notes" element={<Notes />} />
						<Route path="noteitem/:id" element={<NoteItem />} />
						<Route path="blogs" element={<Blogs />} />
						<Route path="buddhism" element={<Lab />} />
						<Route path="lab" element={<Lab />} />
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</NoteContextProvider>
	);//return();
}

export default App;
