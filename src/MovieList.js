import { useState } from 'react';
import axios from 'axios';

export default function MovieList() {

    const [movies, setMovies] = useState([]);

	const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

	promise.then(response => {
		setMovies(response.data);
	});


    return (
       
        <main>
            <div className='title'>Selecione o filme</div>
            <div className='movieList'>
			    {movies.map(movie => <img src={movie.posterURL} />)}
		    </div>
        </main>
        
    )
}