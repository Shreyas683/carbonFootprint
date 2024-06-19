import React from "react";
import "../styles/aboutus.css";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"; // Import icons from React Icons
import shreyas from "../assets/Photo.jpg";
import Rakshita from "../assets/raksh.jpg";
import amogh from "../assets/amogh.JPG";
import sindhu from "../assets/sindhu.jpg";
import vaibhav from "../assets/image.png"

const AboutUs = () => {
  return (
     <>
      <h1 className="author">Authors</h1>
    <div className="us">
      <div className="card1">
      <a href="https://sites.google.com/view/amoghrman" target="_blank" rel="noopener noreferrer"><img src={amogh} alt="Amogh Mangalvedi" /></a>
        <p>Amogh Mangalvedi</p>
        <div className="social-icons-contact1">
          <a
            href="https://www.linkedin.com/in/amogh-r-mangalvedi-879ba026a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/amogh1508"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
        </div>
      </div>
      
      <div className="card1">
        <a href="https://sites.google.com/kletech.ac.in/rakshitaportfolio" target="_blank" rel="noopener noreferrer"><img src={Rakshita} alt="Rakshita Wagh" /></a>
        <p>Rakshita Wagh</p>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/rakshita-wagh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/rakshita-wagh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
        </div>
      </div>
      <div className="card1">
      <a href="https://sites.google.com/kletech.ac.in/rakshitaportfolio" target="_blank" rel="noopener noreferrer"><img src={shreyas} alt="Shreyas Airani" /></a>
        <p>Shreyas Airani</p>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/shreyas-airani"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/shreyasairani"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
        </div>
      </div>
      <div className="card1">
      <a href="https://sites.google.com/view/sindhusportfolio" target="_blank" rel="noopener noreferrer"><img src={sindhu} alt="Sindhu Lakkannavar" /></a>
        <p>Sindhu Lakkannavar</p>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/sindhulakkannavar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/Sindhu03vl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
        </div>
      </div>
      <div className="card1">
      <a href="https://playful-froyo-3a340b.netlify.app/" target="_blank" rel="noopener noreferrer"><img src={vaibhav} alt="Vaibhav Mujumdar" /></a>
        <p>Vaibhav Mujumdar</p>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/vaibhav-mujumdar-a6369b220/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/vaibhavmujumdar08"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default AboutUs;



