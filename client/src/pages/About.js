import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsAction";
import { Col, Row } from "antd";
import Footer from "./Footer";

function About() {
  const { cars } = useSelector((state) => state.carsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  return (
    <DefaultLayout>

      <div className="about-us-section">
        <h1 style={{ fontSize: "35px"}}>About Us</h1>
        <p>
          Consistent Cars (CC) is a premier Car Rental company and the best Cab service provider in Pune renowned since 2005.
          Mr. Himanshu Mandke, our leading agency, is a management graduate and he worked as an Sr. Manager in India’s leading travel
          company, started Consistent Cars (CC) with just one car though it was a challenge to meet the requirements of the customers
          with just one car at the disposal. But the sincerity to serve did not go unnoticed and soon the company was associated with
          many cars and corporate clients.
        </p>
        <p>
          We are one of the leading online car service company agency providing reliable Local and outstation cabs with online booking,
          tracking & payment facility.
        </p>
        <p></p>
        <p></p>
        <h2>Our Customers: Who We Serve</h2>
        <p>At Consistent Cars, we cater to a diverse range of travelers in Pune, Goa, and nearby destinations, all of whom share a need for reliable, comfortable, and convenient transportation.</p>
        
        <h3>Business Travelers</h3>
        <p>Business travelers rely on us for timely and stress-free airport transfers and corporate travel, ensuring they arrive at their destinations on time and in comfort.</p>

        <h3>Tourists & Vacationers</h3>
        <p>Tourists and vacationers enjoy hassle-free journeys to top destinations like Lonavala, Mahabaleshwar, and Goa, with our safe and comfortable vehicles offering the perfect way to explore.</p>

        <h3>Families & Groups</h3>
        <p>Families and groups appreciate our spacious vehicles for group trips, weekend getaways, and family vacations, providing ample space and comfort for everyone.</p>

        <h3>Locals & Residents</h3>
        <p>Locals and residents choose Consistent Cars for intercity travel, airport drops, and special events, knowing they can rely on our punctual and professional service.</p>

        <p>Our customers trust us for personalized, high-quality service every step of the way, whether they’re traveling for business, leisure, or a family outing.</p>
        <p>
          From the past 15 years, we are highly recommended local and outstation Car on the Hire service provider in entire India for top
          quality service at discounted rates, for complete transparency and outstanding customer service.
        </p>
      </div>
      <div className="wf-cell shown">
        
        <div className="the7-icon-box-grid-wrapper">
          <div className="the7-icon-box-grid">
            <div className="box-content-wrapper">
              <div className="box-content">
                <h4 className="box-heading">
                  <span>18</span>
                </h4>
                <div className="box-description">Years of Experience</div>
              </div>
            </div>
          </div>
          
          <div className="the7-icon-box-grid">
            <div className="box-content-wrapper">
              <div className="box-content">
                <h4 className="box-heading">
                  <span>200+</span>
                </h4>
                <div className="box-description">Successful Rides</div>
              </div>
            </div>
          </div>
          
          <div className="the7-icon-box-grid">
            <div className="box-content-wrapper">
              <div className="box-content">
                <h4 className="box-heading">
                  <span>450+</span>
                </h4>
                <div className="box-description">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Row justify="center" gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1 mb-2" style={{ marginTop: "50px", alignContent:"center", justifyContent: "center" }}>
                <img src={car.image} className="carimg" alt="" />

                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{car.name}</p>
                    <p> Rent Per Hour {car.rentPerHour} /-</p>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    <Footer />
    </DefaultLayout>
  );
}

export default About;
