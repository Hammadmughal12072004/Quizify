import "./tutorials.css";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Tutorials = () => {

  const [tutorials, setTutorials] = useState(null);

  useEffect(() => {
    (() => {
      axios
        .get("http://localhost:5000/tutorials/")
        .then((response) => {
          setTutorials(response.data);
        });
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className="tutorials">
        <h3>Tutorials</h3>
        <div className="tutorialsContainer">
          {tutorials && tutorials.length > 0 ? tutorials.map((tutorial, index) => <div
            className="tutorialBox"
            key={tutorial._id}
            onClick={() =>
              window.open(
                tutorial.url,
                "_blank"
              )
            }
          >
            <iframe
              className="tutorialVideo"
              src={tutorial.url}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <div className="tutorialTitle">
              <p>{tutorial.title}</p>
            </div>
          </div>) : <p>
            There are no tutorials available right now.  
          </p>}
        </div>
      </div>
    </>
  );
};
export default Tutorials;
