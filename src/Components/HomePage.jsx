// HomePage.js
import React from 'react';
import './Homepage.css';
import robo from '../images/robo1.png';
import {Link} from 'react-router-dom';
const HomePage = () => {
  

  return (
    <>
      <div className="HPcover">
        <div className="top">
          <div className="heading">Unleash the power of <br /> <span>Conversational</span> AI</div>
          <div className="subHeading">Dive into the future of communication with Longshot Ai Chat Tech, Your gateway to seamless, intelligent conversations. <br /> Elevated user experience, automated support and solutions - All in one place</div>
          <div>
            <Link to='/chat-manager'>
            <button className='butt' >Get Started</button>
            </Link>
          </div>
        </div>
        <div className="bottom">
          <img className='roboImg' src={robo} alt="" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
