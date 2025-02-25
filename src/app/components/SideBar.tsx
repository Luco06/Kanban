"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  title: string;
  items: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Container $isOpen={isOpen}>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <RiSubtractFill/> : <FaPlus/>}
      </ToggleButton>
      <Title>{title}</Title>
      <Menu>
        {items.map((item, index) => (
          <MenuItem key={index}>
            {isOpen && 
            <>
            {item.icon}
             <span>  {item.name}</span>
            </>
             }
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div<{ $isOpen: boolean }>`
  width: ${(isOpen) => (isOpen ? 250 : 20)};
  background-color: white;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  @media (min-width: 768px) {
    height: 100vh;
  }
  @media (max-width: 767px) {
    height: ${({ $isOpen }) => ($isOpen ? 250 : 60)};
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: black;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin: 0;
  text-align: center;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  color: black;

  span {
    margin-left: 10px;
  }

  &:hover {
    background-color: #444; 
    cursor:pointer;
  }
`;
