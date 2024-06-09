import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";
import LoginNavbar from "../LoginNavbar";
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  text-align: center;
`;

const Result = () => {
  const [score, setScore] = useState([{score:3}]);
  // const [passGrade, setPassGrade] = useState(null);
  
  const [passGrade, setPassGrade] = useState([{ passGrade: 3 }]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getExamNames();
  }, [id]);

  const getExamNames = async () => {
    try {
      const data = await axios.get(`http://localhost:5000/userexams/exam/${id}`);
      setScore(data);
      const { data: passGradeData } = await axios.get(`http://localhost:5000/exam/exam/${id}`);
      setPassGrade(passGradeData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <LoginNavbar />
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "60vh" 
        }}>
          <div style={{ 
            border: "16px solid #f3f3f3", 
            borderRadius: "50%", 
            borderTop: "16px solid #3498db", 
            width: "120px", 
            height: "120px", 
            animation: "spin 2s linear infinite" 
          }} />
        </div>
        <Footer />
      </>
    );
  }

  const isPassed = passGrade && score && passGrade[0]?.passGrade <= score.data[0].grade;

  return (
    <>
      <LoginNavbar />
      <Container>
        <span>Final Score : {score[0]?.grade}</span> <br />
        {isPassed ? (
          <>
            <span>Congratulations, you passed the Quiz!</span><br />
            <img 
              src="https://i.ibb.co/7vPw6r4/Png-Item-30479.png" 
              style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} 
            />
          </>
        ) : (
          <>
            <span>Sorry, you failed the Quiz.</span><br />
            <img 
              src="https://www.onlygfx.com/wp-content/uploads/2020/05/fail-stamp-7.png" 
              style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} 
            />
          </>
        )}
        <Link to="/dashboard">
          <button
            variant="contained"
            color="secondary"
            size="large"
            style={{ alignSelf: "center", marginTop: 20, cursor: "pointer" }}
          >
            Go to dashboard
          </button>
        </Link>
      </Container>
      <Footer />
    </>
  );
};

export default Result;
