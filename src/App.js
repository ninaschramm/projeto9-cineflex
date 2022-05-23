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
	const [showBack, setShowBack] = useState(false);

	return (
		<BrowserRouter>
    <Header showBack={showBack}/>
			{/* Tudo que tiver uma rota entre Routes */}
			<Routes>
				{/* Cada rota tem que estar em Route */}
				<Route path="/" element={<MovieList setShowBack={setShowBack} />} />
				<Route path="/movies/:idmovie" element={<MovieSessions setShowBack={setShowBack} />}/>
        <Route path="/seats/:idsession" element={<SessionCheckout state={state} setState={setState} setShowBack={setShowBack} /> } />
        <Route path="/success" element={<Success state={state} setShowBack={setShowBack} />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
