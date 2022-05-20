import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import Footer from './Footer';

export default function SessionCheckout() {

    const [movie, setMovie] = useState([]);
    const [seats, setSeats] = useState([]);
    let selectedSeats = [];
    const sessionIDdata = useParams();
    const sessionID = sessionIDdata.idsession
    
    
   useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`);    
        promise.then(response => {
            setMovie(response.data.movie)
            setSeats(response.data.seats)
    });  
    }, [] )
   

    function showSeats(seat) {
        seat.isAvailable ? seat.status = "available" : seat.status = "not-available";
        return (
            <SeatSelect color={`${seat.status}`} onClick={(seat) => selectSeat(seat)}>{seat.name}</SeatSelect>
        )
        
    }

    function selectSeat(seat) {
        seat.target.classList.toggle("selecionado")
        let newSeat = (seat.target.innerText)
        if (selectedSeats.includes(newSeat)) {
            for (let i=0; i<selectedSeats.length; i++) {
                if (selectedSeats[i] == newSeat) {
                    if (i==0) {selectedSeats.splice(0)}
                    else {selectedSeats.splice(i,i)}                    
                }
            }        
        }
        else {selectedSeats.push(newSeat)}
        
        console.log(selectedSeats)
    }
    

   
   if (movie) {
       return (
       
           <main>
               <Title>Selecione o(s) assento(s)</Title>
               <Container>
                    <SeatList>{seats.map(seat => showSeats(seat))}</SeatList>  
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

const handleColorType = color => {
    switch (color) {
      case "selected":
        return "#03a9f3";
      case "not-available":
        return "#f56342";
      default:
        return "#fff";
    }
  };

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
    height: calc(100% - 287px);
    border-bottom: 110px;
    overflow-y: scroll;
    max-height: 540px ;
    background-color: #FFFFFF;
`;

const SeatSelect = styled.div`
    width: 26px;
    height: 26px;
    background: ${({ color }) => handleColorType(color)};
    border: 1px solid #808F9D;
    border-radius: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SeatList = styled.div` 
    display: flex;
    flex-wrap: wrap;
    margin: 0 25px;
    gap: 5px;
    justify-content: space-evenly;
`