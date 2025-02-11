"use client";
import styled from "styled-components";
import Avatar from "./Avatar";
import Info from "./Info";
import { useDraggable } from "@dnd-kit/core";
import { MdDeleteForever } from "react-icons/md";

const TaskContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.Bordprimary};
  color: black;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;

const TaskResume = styled.div`
  margin: 10px;
  color: #adb5bd;
  text-align: center;
`;
const BoxDelete = styled.div`
width:10px;
height: 10px;
margin:5px;
margin-left:95%;
scale:1;
transition: all ease-out 0.2s ;
&:hover{
scale:1.5;
}
`

interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done";
  assigneeId: string;
  date: string;
  users: { id: string; name: string; avatar: string }[];
  deleteTask: (taskId: string)=>void;
}
const Task: React.FC<TaskProps> = ({ id, title, description, status, assigneeId, date, users, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : {};
  const assignee = users.find((user) => user.id === assigneeId);

  return (
    <TaskContainer key={id}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style} // Style pour le déplacement
   
    >
     <BoxDelete>
     <MdDeleteForever 
  color="red" 
  onPointerDownCapture={(e) => e.stopPropagation()} // Bloque l'interception du clic par le drag
  onClick={() => {
    deleteTask(id);
  }} 
  style={{ cursor: "pointer" }}
/>

     </BoxDelete>
      <h4>{title}</h4>
      <TaskResume>{description}</TaskResume>
      {assignee && <Avatar statut={status} img={assignee.avatar} alter={assignee.name} />}
      <Info date={formattedDate} lien="3" commentaire="5" />
    </TaskContainer>
  );
};

export default Task;
