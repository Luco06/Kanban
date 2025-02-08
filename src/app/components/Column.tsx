"use client"
import styled from "styled-components";
import Task from "./Task";
import {  useState } from "react";
import Button from "./Button";

const ColumnContainer = styled.div`
display:flex;
align-items:center;
flex-direction:column;
  background: #f1f1f1;
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  width:30%;
  margin: 10px;
`;

interface TaskType {
    id: string;
    title: string;
    description: string;
    status: string;
    assigneeId: string;
    date: string;
  }

const Column: React.FC = () => {
    const [tasks, setTasks] = useState<TaskType[]>([])

    const handleTasksFetched = (fetchedTasks: TaskType[]) => {
        setTasks(fetchedTasks);
      };
    return (
      <ColumnContainer>
      <Button title="Add task" onClick={()=>console.log("addTask")}/>
      <Task onTasksFetched={handleTasksFetched} />
      </ColumnContainer>
    );
  };
  
  export default Column;