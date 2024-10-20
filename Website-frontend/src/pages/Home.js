import React from 'react';
import "./Home.css"
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='body'>
        <div className="main-section">
                <h2>Build software faster</h2>
                <p>Parth is an AI-powered software development & deployment platform for building, sharing, and shipping software fast.</p>
                <Link to="/signup">
                <div className="buttons">
                    <button className="sign-up">Sign up for free</button>
                </div>
                </Link>
        </div>
        <div className='features'>
        <div>
            <img src="https://th.bing.com/th/id/OIP.Vx-8EOX-W5sZvJN9r4sxxgHaGr?w=1024&h=923&rs=1&pid=ImgDetMain" className='image'/>
        </div>
        <div className='languages'>
            <div className='lang-title'>
                Language Supported
            </div>
            <div className='language'>
            <div>
            
            <img  className="symbol"src="https://th.bing.com/th/id/OIP.h9oTRvv1kXA4fw8scH8-sgAAAA?rs=1&pid=ImgDetMain"/>
            </div>
            <div>
            
            <img className="symbol"src="https://th.bing.com/th/id/OIP.DEt_TbohHcb6KhpldP6vMwHaEK?rs=1&pid=ImgDetMain"/>
            </div>
            <div>
           
            <img className="symbol"src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png"/>
            </div>
            <div>
           
            <img className="symbol"src="https://logos-world.net/wp-content/uploads/2021/02/Rust-Emblem.png"/>
            </div>
            </div>
        </div>
        </div>

    </div>
  );
};

export default Home;
