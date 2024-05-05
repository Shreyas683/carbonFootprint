import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "../styles/footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="socialMedia">
        <InstagramIcon />
        <FacebookIcon />
        <XIcon />
        <LinkedInIcon />
      </div>
      <p>&copy; 2024 carbon Foot Print</p>
    </div>
  );
};

export default Footer;
