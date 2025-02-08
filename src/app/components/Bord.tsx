import styled from "styled-components";
import Column from "./Column";

const BoardContainer = styled.div`
  display: flex;
  justify-content: center; 
  gap: 20px; 
  width: 100%;
  max-width: 1200px;
  margin: auto;
  overflow: hidden; 
`;


const Board: React.FC= () => {
  return (
    <BoardContainer>
        <Column/>
        <Column/>
        <Column/>
    </BoardContainer>
  );
};

export default Board;
