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
  createdById:string;
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
    fetchData()
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

const addTask = async (
  title: string,
  description: string,
  status: "todo" | "in progress" | "done",
  assigneeId: string
) => {
  console.log("Ajout d'une tâche...");

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
        assigneeId,
        date: new Date().toISOString(),
        createdById: "67acb0939dd32b0725bb95ff", // ID de l'utilisateur créateur
      }),
    });

    if (!response.ok) {
      throw new Error("Échec de la création d'une tâche");
    }

    const createdTask: TaskType = await response.json(); // Récupère l'ID depuis l'API
    console.log("Tâche créée :", createdTask);

    setTasks((prevTasks) => [...prevTasks, createdTask]);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
  }
};


const deleteTask = async (taskId: string) => {
  console.log("Suppression de la tâche :", taskId);

  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Échec de la suppression de la tâche");
    }

    console.log("Tâche supprimée avec succès");
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error);
  }
};



const groupedTasks = tasks.reduce(
  (acc, task) => {
    acc[task.status].push(task);
    return acc;
  },
  {
    todo: [] as TaskType[],
    "in progress": [] as TaskType[],
    done: [] as TaskType[],
  }
);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <BoardContainer>
      <Column id="todo" name="À faire" tasks={groupedTasks.todo} users={users} addTask={addTask} deleteTask={deleteTask} />
      <Column id="in progress" name="En cours" tasks={groupedTasks["in progress"]} users={users} addTask={addTask} deleteTask={deleteTask} />
      <Column id="done" name="Terminé" tasks={groupedTasks.done} users={users} addTask={addTask} deleteTask={deleteTask} />
      </BoardContainer>
    </DndContext>
  );
};

export default Board;
