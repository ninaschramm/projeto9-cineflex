import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

export default function MovieList() {

    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
    const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");    
	promise.then(response => {
		setMovies(response.data);
	});
    
    }, [] )

    if (movies) {
        return (
        
            <main>
                <Title>Selecione o filme</Title>
                <Container>
                    {movies.map(movie => <Link to="/sessoes/:idFilme"><img src={movie.posterURL} alt={movie.title}/></Link> )}
                </Container>
            </main>
        
    )
    }
    else {
        return (
            <Title>Carregando...</Title>
        )
    }
}

const Title = styled.div`
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
`;

const Container = styled.div`
    gap: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    img {
        width: 129px;
        height: 193px;
    }
`;

