"use client";
import styled from "styled-components";
import { useState } from "react";
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
  width: 32%;
  margin: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  width: ;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
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
  addTask: (title: string, description: string, status: "todo" | "in progress" | "done", assigneeId: string) => void;
  deleteTask: (taskId: string)=>void;
}

const Column: React.FC<ColumnProps> = ({ id, name, tasks, users, addTask, deleteTask }) => {
  const { setNodeRef } = useDroppable({ id });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim() && taskDescription.trim()) {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9), // Génère un ID unique
        title: taskTitle,
        description: taskDescription,
        status: id as "todo" | "in progress" | "done",
        assigneeId: users[0]?.id || "",
        date: new Date().toISOString(),
      };
  
      addTask(newTask.title, newTask.description, newTask.status, newTask.assigneeId);
      
      console.log("Dernière tâche ajoutée :", newTask);
  
      setTaskTitle("");
      setTaskDescription("");
      setIsModalOpen(false);
    }
  };
  

  return (
    <ColumnContainer ref={setNodeRef}>
      <h3>{name}</h3>

      {/* Bouton pour ouvrir le modal */}
      <Button title="Ajouter tâche" onClick={() => setIsModalOpen(true)} />

      {/* Modal (pop-up) */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h4>Nouvelle tâche</h4>
            <Input
              type="text"
              placeholder="Titre"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />

            <ButtonGroup>
              <Button title="Annuler" onClick={() => setIsModalOpen(false)} />
              <Button title="Ajouter" onClick={handleAddTask} />
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Liste des tâches */}
      {tasks.map((task) => (
        <Task key={task.id} {...task} users={users} deleteTask={ deleteTask} />
      ))}
    </ColumnContainer>
  );
};

export default Column;