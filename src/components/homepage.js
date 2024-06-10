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
        <div className="Cta-container">
          <Link to="/registerFactory">
            <button className="button-home">Register Your Factory</button>
          </Link>
          <Link to="/analysis">
            <button className="button-home">Explore Carbon Footprint Data</button>
          </Link>
          <Link to="/upload">
            <button className="button-home" >Upload File</button>
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
            <h2>SDG 12: Responsible Consumption and Production</h2>
            <p><strong>Reduction of Carbon Footprint through Sustainable Practices</strong></p>
            <p>At the heart of Sustainable Development Goal 12 is the promotion of responsible consumption and production patterns. One critical aspect of achieving this goal involves reducing our carbon footprint.</p>
            <h3>What is a Carbon Footprint?</h3>
            <p>A carbon footprint is the total amount of greenhouse gases, particularly carbon dioxide (CO2), emitted directly or indirectly by human activities. These activities include transportation, energy production, food consumption, and waste generation.</p>
            <h3>How Does it Relate to SDG 12?</h3>
            <p>Reducing one's carbon footprint aligns perfectly with the principles of responsible consumption and production outlined in SDG 12. Here's how:</p>
            <ul>
                <li><strong>Conscious Consumption:</strong> By being mindful of the products we buy and the services we use, we can opt for those with lower carbon footprints.</li>
                <li><strong>Waste Reduction:</strong> Many products contribute to greenhouse gas emissions throughout their lifecycle. By reducing waste and recycling materials, we can minimize the energy required for manufacturing new products.</li>
                <li><strong>Energy Efficiency:</strong> Embracing energy-efficient technologies and practices not only reduces utility bills but also cuts down on carbon emissions.</li>
                <li><strong>Transportation Choices:</strong> Transportation is a significant contributor to carbon emissions. By opting for public transportation, carpooling, biking, or walking whenever possible, individuals can significantly reduce their carbon footprint.</li>
            </ul>
            <p><strong>Our Commitment to SDG 12</strong></p>
            <p>[Your Organization/Website Name] is committed to promoting responsible consumption and production practices. Through our [products/services/initiatives], we strive to minimize our carbon footprint and contribute to a more sustainable future. Join us in our journey towards a greener, more sustainable world.</p>
        </section>
    </div>
  );
}

export default HomePage;
