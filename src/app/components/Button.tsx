"use client"
import styled from "styled-components"

interface ButtonProps{
    title:string,
    onClick:any,

}

const BtnApp = styled.button`
width:150px;
height:40px;
border-radius:10px;
color:black;
font-size:15px;
margin:10px;
cursor:pointer;


`

const Button: React.FC<ButtonProps> = ({title, onClick})=>{
    return <div>
    <BtnApp onClick={onClick}>{title}</BtnApp>
    </div>
}

export default Button