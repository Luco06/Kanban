"use client";
import styled from "styled-components";
import Avatar from "./Avatar";
import Next from "../../../public/next.svg"
import Info from "./Info";


interface TaskProps{
    title:string,
    taskResume: string,
}

const TaskContainer = styled.div`
  background: ${({ theme }) => theme.colors.Bordprimary};
  color: black;
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 8px;
  text-align:center;
  display:flex;
  flex-direction: column;
  align-items:center;
`;
const TaskResume = styled.div`
color:#ADB5BD;
text-align:center;
`


const Task: React.FC<TaskProps> = ({ title, taskResume }) => {
  return <TaskContainer>{title}
  <TaskResume>{taskResume}</TaskResume>
  <Avatar statut="en cours" img={Next} alter="Vercel"/>
  <Info date="Demain" />
  </TaskContainer>;
};

export default Task;
