"use client";
import styled from "styled-components";
import Avatar from "./Avatar";
import Info from "./Info";
import { useDraggable } from "@dnd-kit/core";

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
  cursor:pointer;

`;

const TaskResume = styled.div`
  margin: 10px;
  color: #adb5bd;
  text-align: center;
`;

interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done";
  assigneeId: string;
  date: string;
  users: { id: string; name: string; avatar: string }[];
}

const Task: React.FC<TaskProps> = ({ id, title, description, status, assigneeId, date, users }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : {};
  const assignee = users.find((user) => user.id === assigneeId);

  return (
    <TaskContainer
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style} // Style pour le déplacement
   
    >
      <h4>{title}</h4>
      <TaskResume>{description}</TaskResume>
      {assignee && <Avatar statut={status} img={assignee.avatar} alter={assignee.name} />}
      <Info date={date} lien="3" commentaire="5" />
    </TaskContainer>
  );
};

export default Task;
