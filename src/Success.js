import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Success({ state }) {

    
    
    
    console.log(state)
    function forTicket() {
        for (let i of state.seatNumbers) {
            <div>Assento {i}</div>
        }
    }
    
    return (

        <main>
           
        <Container>
            <Title>
                Pedido feito com sucesso!
            </Title>
            
<h1>Filme e Sessão:</h1> <div>{state.movie.title}</div> <div>{state.day.date} {state.session.name}</div>
 
           <h1>Ingressos:</h1>

        {state.seatNumbers.map(seat => <div>{`Assento ${seat}`}</div>)}

 <h1>Comprador:</h1>          
<div>{state.name}</div> <div>{state.CPF}</div>


            
            <Link to="/"><button>Voltar pra Home</button></Link>
        </Container>
        </main>
    )
}

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
    box-sizing: border-box;
    gap: 10px;
    display: flex;
    flex-direction: column;
    padding: 0 25px;
    width: 100%;    
    height: 100vh;
    border-bottom: 110px;
    overflow-y: scroll;
    max-height: 540px ;
    background-color: #FFFFFF;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;

    h1 {
        font-weight: 700;
        font-size: 24px;
        margin-top: 20px;
        margin-bottom: 5px;
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
            margin-top: 40px;
        }

        button:hover {
            filter: brightness(115%);
            cursor: pointer;
            }
`;

