"use client"
import styled from "styled-components"
import Image from "next/image"
import Window from "../../../public/window.svg"
import Globe from "../../../public/globe.svg"
import File from "../../../public/file.svg"

interface InfoProps{
date: string,
commentaire:string,
lien:string,
}

const InfoBox = styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-around;
width:100%;
`
const BoxIcon= styled.div`
width:95%;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
`
const IconLeft = styled.div`
  width: 50px; 
  height: 50px; 
  border-radius: 50%;
  overflow: hidden;
  display: flex; 
  align-items: center;
  justify-content: space-around;
`;

const BoxIconRight= styled.div`
width:30%;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
`

const Info: React.FC<InfoProps> = ({lien, commentaire, date})=>{
return<InfoBox>
    <BoxIcon>
        <IconLeft>
            {lien}
            <Image src={Window} alt={Window}/>
        </IconLeft>
        <IconLeft>
            {commentaire}
            <Image src={Globe} alt={Globe}/>
        </IconLeft>
        <BoxIconRight>
            <IconLeft> <Image src={File} alt={File}/> </IconLeft>
            {date}
        </BoxIconRight>
    </BoxIcon>
</InfoBox>
}

export default Info;