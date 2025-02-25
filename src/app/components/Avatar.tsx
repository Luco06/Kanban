"use client"
import styled from "styled-components"
import Image from "next/image"

interface AvatarProps{
    img:string
    alter:string,
    statut:string,
}

const AvatarBox = styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-around;
width:100%;
`
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


const Avatar: React.FC<AvatarProps> = ({img ,alter ,statut})=>{
    return <AvatarBox>
        {statut}
        <AvatarImage>
        <Image src={img} alt={alter} width={40} height={40} />
        </AvatarImage>
    </AvatarBox>
}

export default Avatar;