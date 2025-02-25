"use client"
import styled from "styled-components"

interface AvatarBordProps{
    img:string
    alter:string,
}


const AvatarImage = styled.div`
  width: 40px; 
  height: 40px; 
  margin:10px;
  border-radius: 50%;
  overflow: hidden;
  display: flex; 
  align-items: center;
  justify-content: center;

`;


const AvatarBord: React.FC<AvatarBordProps> = ({img ,alter })=>{
    return <>
        <AvatarImage>
        <img src={img || undefined} alt={alter} width="40" height="40" />
        </AvatarImage>
    </>
   
}

export default AvatarBord;