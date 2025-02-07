"use client";
import styled from "styled-components";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import Info from "./Info";



const TaskContainer = styled.div`
width:25%;
  background: ${({ theme }) => theme.colors.Bordprimary};
  color: black;
  border-radius: ${({ theme }) => theme.borderRadius};
margin:30px;
  text-align:center;
  display:flex;
  flex-direction: column;
  align-items:center;
`;
const TaskResume = styled.div`
margin:10px;
color:#ADB5BD;
text-align:center;
`
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assigneeId: string;
  date: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

const Task = () => {

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Charger les données de l'API
    const fetchData = async () => {
      try {
        const [tasksRes, usersRes] = await Promise.all([
          fetch("/api/tasks"),
          fetch("/api/users"),
        ]);
        const tasksData = await tasksRes.json();
        const usersData = await usersRes.json();

        setTaskList(tasksData);
        setUsers(usersData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }


  return <>
     {taskList.map((task) => {
          const assignee = users.find((user) => user.id === task.assigneeId);
          return (
            <TaskContainer key={task.id}>
              {task.title}
              <TaskResume>{task.description}</TaskResume>
              {assignee && (
              <Avatar statut={task.status} img={assignee.avatar} alter={assignee.name}/>
              )}
              <Info date={task.date} lien="3" commentaire="5"/>
            </TaskContainer>
          );
        })}
  </>;
};

export default Task;
