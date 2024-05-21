import React from "react";
import "../styles/homepage.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Track and Reduce Factory Carbon Footprints</h1>
        <p>A transparent and secure system powered by blockchain technology.</p>
        <div className="cta-container">
          <Link to="/registerFactory">
            <button>Register Your Factory</button>
          </Link>
          <Link to="/analysis">
            <button>Explore Carbon Footprint Data</button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <h2>Benefits for All</h2>
        <div className="benefit-grid">
          <div className="benefit">
            <h3>Factories</h3>
            <ul>
              <li>Transparency and accountability</li>
              <li>Streamlined data collection and reporting</li>
              <li>Access to resources for emission reduction</li>
            </ul>
          </div>
          <div className="benefit">
            <h3>Regulators</h3>
            <ul>
              <li>Easier verification of compliance</li>
              <li>Improved data integrity and security</li>
              <li>Informed policy making for sustainability</li>
            </ul>
          </div>
          <div className="benefit">
            <h3>Consumers</h3>
            <ul>
              <li>Make informed choices about products</li>
              <li>Support sustainable businesses</li>
              <li>Confidence in the data's accuracy</li>
            </ul>
          </div>
          <div className="benefit">
            <h3>Investors</h3>
            <ul>
              <li>Evaluate sustainability practices before investment</li>
              <li>Identify potential environmental liabilities</li>
              <li>Encourage factories to reduce their carbon footprint</li>
            </ul>
          </div>
        </div>
      </section>

      {/* About Us Section (Optional)*/}
      <section className="about-us">
        <h2>About the System</h2>
        <p>
          This innovative platform leverages blockchain technology to create a
          transparent and secure system for monitoring factory carbon
          footprints. By tracking emissions data and facilitating responsible
          practices, we empower factories to reduce their environmental impact.
          Together, we can build a more sustainable future for our planet.
        </p>
      </section>
    </div>
  );
}

export default HomePage;
