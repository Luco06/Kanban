"use client"
import styled from "styled-components"
import Image from "next/image"
import Window from "../../../public/window.svg"
import Globe from "../../../public/globe.svg"
import File from "../../../public/file.svg"

interface InfoProps{
date: string,
}

const InfoBox = styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-around;
width:60%;
`
const BoxIcon= styled.div`
width:20%;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-around;
`
const IconLeft = styled.div`
  width: 50px; 
  height: 50px; 
  border-radius: 50%;
  overflow: hidden;
  display: flex; 
  align-items: center;
  justify-content: center;
`;

const BoxIconRight= styled.div`
width:70%;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-around;
`

const Info: React.FC<InfoProps> = ({ date})=>{
return<InfoBox>
    <BoxIcon>
        <IconLeft>
            <Image src={Window} alt={Window}/>
        </IconLeft>
        <IconLeft>
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