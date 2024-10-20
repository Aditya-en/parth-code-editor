import React from 'react';
import "./Home.css"
import { Link } from 'react-router-dom';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

const Home = () => {
  return (
    <div className='body'>
        <div className="main-section">
                <h2>Build software faster</h2>
                <p>Code, create, and learn together.</p>
                <br/>
                <p>Parth is a powerful IDE, compiler, & interpreter in your browser.</p>
                <Link to="/signup" className="no-underline">
                <div className="buttons">
                    <button className="sign-up">Sign up for free</button>
                </div>
                </Link>
        </div>
        <div className='features'>
        <div>
            <img src="https://th.bing.com/th/id/OIP.Vx-8EOX-W5sZvJN9r4sxxgHaGr?w=1024&h=923&rs=1&pid=ImgDetMain" className='image'/>
        </div>
        <div>
        <section className="why-choose">
  <div className="container">
    <h2 className="heading">Why choose Parth?</h2>
    <div className="features-grid">
      <div className="feature-item">
        <FaCode className="icon" />
        <h3 className="feature-title">Code Anywhere</h3>
        <p className="feature-description">Access your projects from any device with an internet connection.</p>
      </div>
      <div className="feature-item">
        <svg className="icon" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <h3 className="feature-title">Collaborate Easily</h3>
        <p className="feature-description">Work on projects together in real-time with built-in version control.</p>
      </div>
    </div>
  </div>
</section>

        </div>
        </div>

<section className="testimonials">
  <div className="container">
  <img 
  src="https://th.bing.com/th/id/OIP.IrUBHhdMo6wWLFueKNreRwHaHa?rs=1&pid=ImgDetMain" 
  style={{ height: '250px', width: '250px' }} 
  alt="User"
/>
    <h2 className="heading">What our users say</h2>
    <div className="testimonial-content">
      <blockquote className="testimonial-quote">
        "Parth has revolutionized the way I teach coding. It's an invaluable tool for my students!"
      </blockquote>
      <div className="testimonial-user">
        <div className="avatar">
        <FaUser className="avatar-icon" />
          <div className="avatar-fallback">JD</div>
        </div>
        <div className="user-info">
          <div className="user-name">Jane Doe</div>
          <div className="user-title">Computer Science Teacher</div>
        </div>
      </div>
    </div>
  </div>
</section>


    <footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div>
                <h3 class="footer-heading">Product</h3>
                <ul class="footer-list">
                    <li><a href="#" class="footer-link">IDE</a></li>
                    <li><a href="#" class="footer-link">Multiplayer</a></li>
                    <li><a href="#" class="footer-link">Community</a></li>
                    <li><a href="#" class="footer-link">Teams</a></li>
                </ul>
            </div>
            <div>
                <h3 class="footer-heading">Company</h3>
                <ul class="footer-list">
                    <li><a href="#" class="footer-link">About</a></li>
                    <li><a href="#" class="footer-link">Careers</a></li>
                    <li><a href="#" class="footer-link">Press</a></li>
                    <li><a href="#" class="footer-link">Contact</a></li>
                </ul>
            </div>
            <div>
                <h3 class="footer-heading">Resources</h3>
                <ul class="footer-list">
                    <li><a href="#" class="footer-link">Docs</a></li>
                    <li><a href="#" class="footer-link">Blog</a></li>
                    <li><a href="#" class="footer-link">Tutorials</a></li>
                    <li><a href="#" class="footer-link">Support</a></li>
                </ul>
            </div>
            <div>
                <h3 class="footer-heading-icons">Connect</h3>
                <div class="footer-icons">
                    <a href="#" class="footer-icon-link">
                    <FaTwitter className="icon" />
                    </a>
                    <a href="#" class="footer-icon-link">
                    <FaGithub className="icon" />
                    </a>
                    <a href="#" class="footer-icon-link">
                    <FaLinkedin className="icon" />
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            © Parth. All rights reserved.
        </div>
    </div>
</footer>


    </div>
  );
};

export default Home;
