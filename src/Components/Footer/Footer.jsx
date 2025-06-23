import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo.png'
import instagram_icon from '../Assets/instagram_icon.png';
import pinterest_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-logo-section">
          <img src={footer_logo} alt="logo" />
          <p>LUXE NEST</p>
          <span>Style for Every Story</span>
        </div>

        <div className="footer-links-grid">
          <ul>
            <li>Weebly Themes</li>
            <li>Pre-Sale FAQs</li>
            <li>Submit a Ticket</li>
          </ul>
          <ul>
            <li>Services</li>
            <li>Theme Tweak</li>
          </ul>
          <ul>
            <li>Showcase</li>
            <li>Widgetkit</li>
            <li>Support</li>
          </ul>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Affiliates</li>
            <li>Resources</li>
          </ul>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <div className="footer-icons">
          <img src={instagram_icon} alt="Instagram" />
          <img src={pinterest_icon} alt="Pinterest" />
          <img src={whatsapp_icon} alt="WhatsApp" />
        </div>
        <p>© Copyright. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
