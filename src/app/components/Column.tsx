"use client";
import styled from "styled-components";
import Task from "./Task";
import Button from "./Button";
import { useDroppable } from "@dnd-kit/core";

const ColumnContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #f1f1f1;
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 30%;
  margin: 10px;
`;

interface TaskType {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done";
  assigneeId: string;
  date: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface ColumnProps {
  id: string;
  name: string;
  tasks: TaskType[];
  users: User[];
}

const Column: React.FC<ColumnProps> = ({id, name, tasks, users }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
<ColumnContainer ref={setNodeRef}>
      <h3>{name}</h3>
      <Button title="Add task" onClick={() => console.log("addTask")} />
      {tasks.map((task) => (
        <Task key={task.id} {...task} users={users} />
      ))}
    </ColumnContainer>
  );
};

export default Column;
