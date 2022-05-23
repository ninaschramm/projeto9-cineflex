import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import Footer from './Footer';

export default function SessionCheckout({ state, setState, setShowBack }) {

    const [movie, setMovie] = useState([]);
    const [seats, setSeats] = useState([]);
    const [session, setSession] = useState([]);
    const [day, setDay] = useState([]);
    const [seatNumbers, setSeatNumbers] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const sessionIDdata = useParams();
    const sessionID = sessionIDdata.idsession
    const [name, setName] = useState("");
    const [CPF, setCPF] = useState("");
    const navigate = useNavigate();
  
    
    
   useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`);    
        promise.then(response => {
            setMovie(response.data.movie)
            setSeats(response.data.seats)
            setDay(response.data.day)
            setSession(response.data)
    });  
    }, [] )
   

    function showSeats(seat) {
        seat.isAvailable ? seat.status = "available" : seat.status = "not-available";
        return (
            <SeatSelect color={`${seat.status}`} onClick={(seatdiv) => checkSeat(seatdiv)}>{seat.name}</SeatSelect>
        )
        
    }

    function checkSeat(seat) {
        let seatNumber = parseInt(seat.target.innerText) - 1
        let seatID = seats[seatNumber].id;
        if (seats[seatNumber].isAvailable == false) {
            alert("Este assento não está disponível")
        }        
        else {selectSeat(seat, seatID)}
        
    }

    function selectSeat(seat, seatID) {
        seat.target.classList.toggle("selecionado")
        let newSeat = seatID;
        let newSeatNumber = seat.target.innerText;
        let newSeatNumbers = [...seatNumbers]
        let newSelectedSeats = [...selectedSeats]
        if (selectedSeats.includes(newSeat)) {
            for (let i=0; i<newSelectedSeats.length; i++) {
                if (newSelectedSeats[i] === newSeat) {
                    if (i===0) {newSelectedSeats.splice(0); newSeatNumbers.splice(0)}
                    else {newSelectedSeats.splice(i,i); newSeatNumbers.splice(i,i)}                    
                }
            }        
        }
        else {newSelectedSeats.push(newSeat); newSeatNumbers.push(newSeatNumber)}
        setSelectedSeats(newSelectedSeats)
        setSeatNumbers(newSeatNumbers)
    }

    function validateCPF() {
        return (/^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/.test(CPF));
    }

    function postSeats (event) {
        event.preventDefault();
        if (selectedSeats.length === 0) {
            return (alert("Você não selecionou nenhum assento"))
        }
        
        if (validateCPF()) {

            if (CPF.length === 14) {
                const newCPF = CPF.replace("-", "").replaceAll(".", "")
                setCPF(newCPF)
            }

            const seatsToPost = {
            ids: selectedSeats,
            name: name,
            cpf: CPF
            } 

            setState(
                {movie: movie, 
                session: session,
                day: day, 
                seatNumbers: seatNumbers,
                name: name,
                CPF: CPF,})
            
                const promise = axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, seatsToPost)
                promise.then(response => {
                    navigate('/success')                
                })
                promise.catch(err => console.log(err))
        }
        else {
            alert("CPF inválido")
            setCPF("")
        }
    }
    

   
   if (movie) {
       return (
       
           <main>
               {setShowBack(true)}
               <Container><Title>Selecione o(s) assento(s)</Title>
                    <SeatList>{seats.map(seat => showSeats(seat))}</SeatList>
                    <Label>
                        <div><SeatLabel color="selected"></SeatLabel> Selecionado </div>
                        <div><SeatLabel color="available"></SeatLabel> Disponível </div>
                        <div><SeatLabel color="not-available"></SeatLabel> Indisponível</div>
                    </Label>  
                    <Form>
                        <form action="#" onSubmit={postSeats}>
                            <label for="nameInput">Nome do comprador:</label>
                            <input type="text" id="NameInput" placeholder='Digite seu nome...' value={name} onChange={(e) => setName(e.target.value)} />  
                            <label for="CPF">CPF do comprador:</label>
                            <input type="text" id="CPF" placeholder='Digite seu CPF...' value={CPF} onChange={(e) => setCPF(e.target.value)} />  
                            <button type="submit">Reservar assento(s)</button>
                        </form>
                    </Form>
               </Container>
               <Footer movie={movie} session={session} day={day}/>
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
        return "#8DD7CF";
      case "not-available":
        return "#FBE192";
      default:
        return "#C3CFD9";
    }
  };

  const handleBorderColorType = color => {
    switch (color) {
      case "selected":
        return "#1AAE9E";
      case "not-available":
        return "#F7C52B";
      default:
        return "#7B8B99";
    }
  };

const Title = styled.div`
    min-height: 110px;
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
    height: calc(100vh - 180px);
    border-bottom: 110px;
    overflow-y: scroll;
    background-color: #FFFFFF;
`;

const SeatSelect = styled.div`
    width: 26px;
    height: 26px;
    background: ${({ color }) => handleColorType(color)};
    border: 1px solid ${({ color }) => handleBorderColorType(color)};
    border-radius: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

        :hover {
            filter: brightness(105%);
        }
`

const SeatList = styled.div` 
    display: flex;
    flex-wrap: wrap;
    margin: 0 25px;
    gap: 5px;
    justify-content: space-evenly;
`

const Label = styled.div`
    display: flex ;
    height: 70px;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 15px;

div {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    color: #4E5A65;
}
`

const SeatLabel = styled.div` 

    width: 26px;
    height: 26px;
    background: ${({ color }) => handleColorType(color)};
    border: 1px solid ${({ color }) => handleBorderColorType(color)};
    border-radius: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
`


const Form = styled.div` 
    padding: 25px;
    form {
        display: flex;
        flex-direction: column;
        gap: 15px;

        input {
            height: 50px;
            width: 327px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 3px;
            font-family: 'Roboto';
            font-weight: 400;
            font-size: 18px;
            padding-left: 10px;

            ::placeholder {

            font-style: italic;
            }
            }

        

        button {
            width: 225px;
            height: 42px;
            background: #E8833A;
            border-radius: 3px;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
            display: flex;
            align-items: center;
            justify-content: center;
            align-self: center;
            letter-spacing: 0.04em;
            color: #FFFFFF;
        }

        button:hover {
            filter: brightness(115%);
            cursor: pointer;
            }
    }
`