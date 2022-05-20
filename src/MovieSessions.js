import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

export default function MovieSessions() {

    const [days, setDays] = useState([]);
    
   useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies/12/showtimes");    
        promise.then(response => {
            setDays(response.data.days);
            console.log(days);
    });  
    }, [] )

   function showTimes(day) {

    return (
        <> <WeekDay>{day.weekday}</WeekDay> 
        <div>{day.showtimes.map(time => <TimeSession>{time.name}</TimeSession>)}</div>
    </>)
   }
   
   

   if (days) {
       return (
       
           <main>
               <Title>Selecione o horário</Title>
               <Container>
                   {days.map(day => showTimes(day))}
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
    color: #293845;
`;

const Container = styled.div`
    gap: 15px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
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
`;

const TimeSession = styled.div`
width: 83px;
height: 43px;
left: 23px;
top: 227px;

background: #E8833A;
border-radius: 3px;
color: #FFFFFF;
`;