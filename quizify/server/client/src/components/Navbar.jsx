import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import MCQGenerator from './MCQGenerator'; // Import the MCQGenerator component

const Container = styled.div`
  height: 60px;
  background-color: #393E46;
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  font-family: 'Square Peg', cursive;
  font-size: 32px;
  font-weight: 600;
  cursor: pointer;
  color: #00ADB5;
  margin-left: 10%;
  padding: 10px 12px;
`;

const MenuItem = styled.button`
  font-size: 14px;
  cursor: pointer;
  background-color: #393E46;
  color: #EEEEEE;
  padding: 20px 12px;
  border: none;
  &:hover {
    background-color: #222831;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItemFirst = styled.div`
  width: 55px;
  margin-right: 10%;
  margin-left: 25px;
  cursor: pointer;
  border: none;
  background-color: #5cb85c;
  color: #EEEEEE;
  padding: 10px 20px;
  border-radius: 50px;
  &:hover {
    background-color: #75DB75;
  }
`;

const MenuItemSecond = styled.div`
  margin-left: 25px;
  cursor: pointer;
  border: none;
  background-color: #0275d8;
  color: #EEEEEE;
  padding: 10px 20px;
  border-radius: 5px;
  &:hover {
    background-color: #228CE9;
  }
`;

const Navbar = () => {
  const [showMCQGenerator, setShowMCQGenerator] = useState(false);

  const toggleMCQGenerator = () => {
    setShowMCQGenerator(!showMCQGenerator);
    window.open('http://127.0.0.1:5001/', '_blank'); // Open the specified URL in a new tab
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <Left>
            <Logo>QUIZIFY</Logo> {/* online exam maker */}
            <Link to="/">
              <MenuItem>Home</MenuItem>
            </Link>
          
            <Link to="/tutorials">
              <MenuItem>Tutorials</MenuItem>
            </Link>
            <Link to="/chatbot">
              <MenuItem>Chatbot</MenuItem>
            </Link>
            <Link to="/help">
              <MenuItem>Help</MenuItem>
            </Link>
          </Left>
          <Right>
            <MenuItem onClick={toggleMCQGenerator}>MCQ Generator</MenuItem>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <MenuItemSecond>Login</MenuItemSecond>
            </Link>
            <Link to="/register" style={{ textDecoration: "none", marginRight: "10%" }}>
              <MenuItemFirst>Sign up</MenuItemFirst>
            </Link>
          </Right>
        </Wrapper>
      </Container>
      {showMCQGenerator && <MCQGenerator />} {/* Conditionally render the MCQGenerator */}
    </div>
  );
};

export default Navbar;
