"use client";
import { useState, useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "./Column";
import styled from "styled-components";

const BoardContainer = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
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

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, usersRes] = await Promise.all([
          fetch("/api/tasks"),
          fetch("/api/users"),
        ]);
        const tasksData = await tasksRes.json();
        const usersData = await usersRes.json();

        setTasks(tasksData);
        setUsers(usersData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

// Gestion du drag and drop
const onDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over || !active) return; // Vérifie si le drop est valide

  const taskId = active.id.toString();

  // Mapper l'ID de la colonne à un statut
  const newStatusMap: Record<string, "todo" | "in progress" | "done"> = {
    todo: "todo",
    "in progress": "in progress",
    done: "done",
  };

  const newStatus = newStatusMap[over.id.toString()];

  // Vérifiez si newStatus est défini avant de mettre à jour les tâches
  if (newStatus) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }
};


  return (
    <DndContext onDragEnd={onDragEnd}>
      <BoardContainer>
      <Column id="todo" name="À faire" tasks={tasks.filter((t) => t.status === "todo")} users={users} />
      <Column id="in progress" name="En cours" tasks={tasks.filter((t) => t.status === "in progress")} users={users} />
      <Column id="done" name="Terminé" tasks={tasks.filter((t) => t.status === "done")} users={users} />
      </BoardContainer>
    </DndContext>
  );
};

export default Board;
