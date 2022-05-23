import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import Footer from './Footer';

export default function MovieSessions( { setShowBack }) {

    const movieIDdata = useParams();
    const movieID = movieIDdata.idmovie

    const [days, setDays] = useState([]);
    const [movie, setMovie] = useState([]);
    
    
   useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`);    
        promise.then(response => {
            setDays(response.data.days);
            setMovie(response.data)
            console.log(days);
    });  
    }, [] )

   function showTimes(day) {

    return (
        <> <WeekDay>{day.weekday} - {day.date}</WeekDay> 
        <TimesShown>{day.showtimes.map(time => <Link to={`/seats/${time.id}`}><TimeSession>{time.name}</TimeSession></Link>)}</TimesShown>
    </>)
   }
   
   

   if (days) {
       return (
       
           <main>
               {setShowBack(true)}
               <Title>Selecione o horário</Title>
               <Container>
                   {days.map(day => showTimes(day))}                   
               </Container>
               <Footer movie={movie} />
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
    color: #293845;
    background-color: #FFFFFF;
`;

const Container = styled.div`
    gap: 15px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 290px);
    border-bottom: 110px;
    overflow-y: scroll;
    max-height: 540px ;
    background-color: #FFFFFF;
    
`;

const WeekDay = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
    color: #293845;
    margin: 5px 0;
    margin-left: 25px;
`;

const TimeSession = styled.div`
    width: 83px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #E8833A;
    border-radius: 3px;
    color: #FFFFFF;

    a:visited    { 
        text-decoration: none;      
        }
`;

const TimesShown = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin-left: 25px;
`

