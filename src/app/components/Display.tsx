"use client";
import React from "react";
import styled from "styled-components";
import Board from "./Bord";
import { useAtomValue } from "jotai";
import { UserState } from "../utils/atoms";
import Sidebar from "./SideBar";
import { FaHome, FaFolder, FaCog, FaSignOutAlt } from "react-icons/fa"; // Exemples d'icônes

const Display: React.FC = () => {
  const UserInfo = useAtomValue(UserState);
  const firstUser = UserInfo[0];

  const menuItems = [
    { name: "Accueil", icon: <FaHome /> },
    { name: "Projets", icon: <FaFolder /> },
    { name: "Paramètres", icon: <FaCog /> },
    { name: "Déconnexion", icon: <FaSignOutAlt /> },
  ];

  return (
    <Container>
      <BoxApp>
        <Sidebar title={firstUser.name} items={menuItems} />
        <ContentContainer>
          <Board />
        </ContentContainer>
      </BoxApp>
    </Container>
  );
};

export default Display;

const Container = styled.div`
  width: 100%;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.Bordprimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const BoxApp = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  @media (min-width: 768px) {
    padding: 50px;
  }
`;
