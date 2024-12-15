import React, { useEffect, useState } from "react";
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import {
  DollarCircleOutlined,
  TagsOutlined,
  CarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import Footer from "./Footer";

const { RangePicker } = DatePicker;

function BookingCar() {
  const { id } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalMins, setTotalMins] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCar(cars.find((o) => o._id === id));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [cars]);

  useEffect(() => {
    if (car.rentPerHour) {
      let calculatedAmount = (totalMins * car.rentPerHour) / 60; // Calculate exact per-minute rent
      if (driver) {
        calculatedAmount = (calculatedAmount + totalMins * (300/1440))
      }
      // Round the amount to the nearest multiple of 5
      calculatedAmount = Math.round(calculatedAmount / 5) * 5;
      setTotalAmount(calculatedAmount);
    }
  }, [driver, totalMins, car.rentPerHour]);   

  function selectTimeSlots(values) {
    if (values) {
      setFrom(moment(values[0]).format("MMM DD yyyy HH"));
      setTo(moment(values[1]).format("MMM DD yyyy HH"));
      setTotalMins(values[1].diff(values[0], "minutes"));
    } else {
      setTotalMins(0);
    }
  }

  function handlePayment() {
    const options = {
      key: "rzp_live_0e95CHFRJ2E9Kp", // Replace with your Razorpay key
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "Consistent Cars",
      description: "Booking for " + car.name,
      handler: function (response) {
        const reqObj = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          user: JSON.parse(localStorage.getItem("user"))._id,
          car: id,
          totalMins,
          totalAmount,
          driverRequired: driver,
          bookedTimeSlots: {
            from,
            to,
          },
        };
        dispatch(bookCar(reqObj)); // Dispatch the booking action
      },
      prefill: {
        name: JSON.parse(localStorage.getItem("user")).name,
        email: JSON.parse(localStorage.getItem("user")).email,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} alt={car.name} className="carimg2 bs2" />
        </Col>
        <Col
          lg={10}
          sm={24}
          xs={24}
          style={{ marginLeft: "65px", bottom: "10px" }}
        >
          <div
            style={{
              backgroundColor: "#28d8d8",
              borderRadius: "10px",
              width: "90%",
            }}
          >
            <Divider>
              <h4 style={{ color: "white" }}>DETAILS</h4>
            </Divider>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "0.5px",
                marginRight: "0.5px",
              }}
            >
              <div style={{ margin: "4px" }} className="car-headings">
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons">
                    <TagsOutlined />
                  </span>
                  <span className="car-data">Model</span>
                </p>
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons">
                    <DollarCircleOutlined />
                  </span>
                  <span className="car-data">Rent</span>
                </p>
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons">
                    <CarOutlined />
                  </span>
                  <span className="car-data">Fuel Type</span>
                </p>
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons">
                    <UsergroupAddOutlined />
                  </span>
                  <span className="car-data">Max Persons</span>
                </p>
              </div>
              <div className="car-headData">
                <p>
                  <span className="car-data2">{car.name}</span>
                </p>
                <p>
                  <span className="car-data2">{car.rentPerHour} Rs/- per hour</span>
                </p>
                <p>
                  <span className="car-data2">{car.fuelType}</span>
                </p>
                <p>
                  <span className="car-data2">{car.capacity}</span>
                </p>
              </div>
            </div>
            <Divider>
              <h4 style={{ color: "white" }}>SELECT TIME SLOTS</h4>
            </Divider>
            <div>
              <RangePicker
                className="RangePicker"
                showTime={{ format: "HH:mm a" }}
                format="MMM DD yyyy HH:mm"
                onChange={selectTimeSlots}
              />
              <br />
              <button
                className="btn1 mt-2 mb-2"
                style={{
                  marginBottom: "4px",
                  borderRadius: "5px",
                  outline: "none",
                  border: "none",
                }}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                See Booked Slots
              </button>
              {from && to && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    marginRight: "56px",
                    color: "white",
                  }}
                >
                  <p>
                    Total Minutes : <b>{totalMins}</b>
                  </p>
                  <Checkbox
                    onChange={(e) => {
                      setDriver(e.target.checked);
                    }}
                  >
                    <span style={{ color: "white" }}> Driver Required</span>
                  </Checkbox>
                  <h3 style={{ color: "white" }}>
                    Total Amount : {totalAmount}
                  </h3>
                  <button
                    className="btn1"
                    style={{
                      marginBottom: "4px",
                      borderRadius: "5px",
                      fontWeight: "500",
                      outline: "none",
                      border: "none",
                    }}
                    onClick={handlePayment}
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </Col>
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot, index) => {
                return (
                  <button className="btn1 mt-2 ml-2" key={index}>
                    {slot.from} - {slot.to}
                  </button>
                );
              })}
              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
      <Footer />
    </DefaultLayout>
  );
}

export default BookingCar;