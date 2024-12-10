import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsAction";
import Footer from "./Footer";
import airport from "../images/resources/airport.jpg";
import lona from "../images/resources/lonavala.jpg";
import goa from "../images/resources/goa.jpg";
import mahab from "../images/resources/mahabaleshwar.jpg";
import ratna from "../images/resources/ratnagiri.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

function Service() {
  const { cars } = useSelector((state) => state.carsReducer);
  const [showCars, setShowCars] = useState(false);
  const dispatch = useDispatch();
  const [totalCars, setTotalcars] = useState([])

  // Fetch cars from the database
  useEffect(() => {
    dispatch(getAllCars());
  }, []);
  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  const services = [
    { name: "Airport Drop", image: airport },
    { name: "Lonavala", image: lona },
    { name: "Mahabaleshwar", image: mahab },
    { name: "Ratnagiri", image: ratna },
    { name: "Goa", image: goa },
  ];

  // Handle "Book Now" click to show all cars
  const handleService = () => {
    window.scrollTo({ top: 825, behavior: "smooth" });
    setShowCars(true);
  };

  return (
    <DefaultLayout>
      <div className="services-section">
        <h2 style={{ fontSize: "35px" }}>Our Services</h2>
        <p style={{ width: "60%", textAlign: "center", fontSize: "20px" }}>
          Check out the stellar services and benefits that we provide here at Consistent Cars!
        </p>
        <p style={{ width: "60%", textAlign: "center", fontSize: "20px" }}>
        We can take you to all the best places to visit in the beautiful city of Pune,
        make sure you reach the Pune Airport comfortably on time before your flight and more!
        </p>
      </div>
  
      <Row justify="center" gutter={16}>
        {services.map((service, index) => (
          <Col lg={5} sm={24} xs={24} key={index}>
            <div
              className="car p-2 bs1 mb-2"
              style={{
                marginTop: "50px",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <img src={service.image} className="carimg" alt={service.name} />
              <div className="car-content d-flex align-items-center justify-content-between">
                <div className="text-left pl-2">
                  <p>{service.name}</p>
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {service.name === "Airport Drop" ? "*Min 12 hrs of booking required." : "*Daily limit 250 kms."}
                  </p>
                </div>
              </div>
              <div>
                <button className="btn1 mr-2" onClick={handleService}>
                  Book Now
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {showCars && (
        <div className="cars-section">
          <h3 style={{ textAlign: "center", marginTop: "20px" , color: "cyan"}}>
            Available Cars
          </h3>
          <Row justify="center" gutter={[24, 16]}>
            {totalCars.map((car) => (
              <Col xl={5} lg={5} md={8} sm={12} xs={24} key={car._id}>
                <Link to={`/booking/${car._id}`}>
                  <div className="car p-2 box-shadow2 mt-3">
                    <div>
                      <img src={car.image} alt={car.name} className="carimg" />
                    </div>
                    <div className="car-content d-flex align-items-center justify-content-between">
                      <div>
                        <p style={{ fontWeight: "bold", color: "#222f35 " }}>
                          {car.name}
                        </p>
                        <p style={{ color: "#222f35" }}>
                          Rs{car.rentPerHour} Per Hour /-
                        </p>
                        <p style={{ fontSize: "12px", color: "red" }}>
                          {(() => {
                            switch (car.name) {
                              case "Toyota Innova":
                                return "*Rs 20 per km beyond daily limit.";
                              case "Toyota Etios":
                                return "*Rs 12 per km beyond daily limit.";
                              case "Swift DZire":
                                return "*Rs 10 per km beyond daily limit.";
                              default:
                                return "";
                            }
                          })()}
                        </p>
                      </div>
                      <div>
                      <button 
                        className="btn1 mr-2" 
                        style={{
                          padding: "8px 8px",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                          <Link to={`/booking/${car._id}`}> Book Now</Link>
                        </button>
                      </div>
                    </div>

                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      )}

      <Footer />
    </DefaultLayout>
  );
}

export default Service;
