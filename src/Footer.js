import styled from "styled-components";

export default function Footer ({ movie, day, session }) {
    let isDay = false;
    if (day !== undefined) {isDay = true}
    return (
        <FooterDiv><div><img src={`${movie.posterURL}`} alt={`${movie.title}`} /></div> {movie.title}<br></br>
        { isDay ? `${day.date} ${session.name}` : ""}</FooterDiv>
        )
}

const FooterDiv = styled.div`
    display: flex;
    height: 110px;
    width: 100%;
    background: #DFE6ED;
    border-top: 1px solid #9EADBA;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #293845;

    div {
    width: 64px;
    height: 89px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 15px;
    }

    img {
        width: 48px;
        height: 72px;
    }
`