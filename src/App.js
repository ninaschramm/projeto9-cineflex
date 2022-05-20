import { BrowserRouter, Routes, Route } from "react-router-dom";

import './styles.css';

import MovieList from "./MovieList";
import MovieSessions from "./MovieSessions";
import SessionCheckout from "./SessionCheckout";
import SessionConfirm from "./SessionConfirm";
import Header from "./Header";

function App() {
	return (
		<BrowserRouter>
    <Header />
			{/* Tudo que tiver uma rota entre Routes */}
			<Routes>
				{/* Cada rota tem que estar em Route */}
				<Route path="/" element={<MovieList />} />
				<Route path="/movie:idmovie" element={<MovieSessions />}/>
        <Route path="/session:idmovie" element={<SessionCheckout />}/>
        <Route path="/confirm" element={<SessionConfirm  />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
