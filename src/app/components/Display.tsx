"use client"
import React from "react"
import styled from "styled-components"
import Board from "./Bord"
import Button from "./Button"
import { useAtomValue } from "jotai"
import {UserState} from "../utils/atoms"
import { IoIosNotifications } from "react-icons/io";
import AvatarBord from "./AvatarBord"

const Display :React.FC = ()=>{
    const UserInfo = useAtomValue(UserState)

const firstUser = UserInfo[0];


return(<Container>
    <Boxtitle>
        <h2>Bonjour {firstUser.name} </h2>
        <BtnContainer>

        <Button title="+ Nouveau projet" onClick={()=>console.log("+ Nouveau projet")}/>
        <IoIosNotifications size={50} color="white"/>
        <AvatarBord img={firstUser.avatar} alter={firstUser.name}/>
        </BtnContainer>
    </Boxtitle>
    <Board/>
</Container>)
}
export default Display;

const Container = styled.div`
width:100%;
border-radius:15px;
background-color:red;
display: flex;
flex-direction:column;
align-items:center;
justify-content:space-between;
`

const Boxtitle = styled.div`
width:90%;
display: flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
`

const BtnContainer = styled.div`
width:30%;
display:flex;
flex-direction:row;
justify-content:space-around;
align-items:center;
`
