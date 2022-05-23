import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header( {showBack} ) {

        let history = useNavigate();

    return (
        <>
            <HeaderStyle>
                {showBack ? <button onClick={() => history(-1)}><ion-icon name="arrow-back-outline"></ion-icon></button> : ""}
                CINEFLEX
            </HeaderStyle>
        </>
        
    )
}

const HeaderStyle = styled.div `
    width: 100%;
    max-width: 390px;
    height: 67px;
    background-color: #C3CFD9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #E8833A;
    position: relative;

    button {
        display: flex;
        position: absolute;
        left: 20px;
        top: 25px;
        width: 25px;
        background-color: #E8833A;
        border: solid 1px #FFFFFF;
        color: #FFFFFF;
    }
`