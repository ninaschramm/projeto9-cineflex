import { BrowserRouter, Routes, Route } from "react-router-dom";

import './reset.css';
import './styles.css';

import MovieList from "./MovieList";
import MovieSessions from "./MovieSessions";
import SessionCheckout from "./SessionCheckout";
import Success from "./Success";
import Header from "./Header";
import { useState } from "react";

function App() {

	const [state, setState] = useState([]);

	return (
		<BrowserRouter>
    <Header />
			{/* Tudo que tiver uma rota entre Routes */}
			<Routes>
				{/* Cada rota tem que estar em Route */}
				<Route path="/" element={<MovieList />} />
				<Route path="/movies/:idmovie" element={<MovieSessions />}/>
        <Route path="/seats/:idsession" element={<SessionCheckout state={state} setState={setState} /> } />
        <Route path="/success" element={<Success state={state}/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
