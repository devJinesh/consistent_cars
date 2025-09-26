import React, { useEffect, useState } from "react";
import { Row, Col, Divider, DatePicker, Modal } from "antd";
import { DollarCircleOutlined, TagsOutlined } from "@ant-design/icons";
import DefaultLayout from "../components/DefaultLayout";
import { getAllBookServices, bookService } from "../redux/actions/bookServiceActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import Footer from "./Footer";

const { RangePicker } = DatePicker;

function BookService() {
  const { id } = useParams();
  const { bookServices } = useSelector((state) => state.bookServiceReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [service, setService] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (bookServices.length === 0) {
      dispatch(getAllBookServices());
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const foundService = bookServices.find((o) => o._id === id);
      if (foundService) setService(foundService);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [bookServices, dispatch, id]);

  useEffect(() => {
    if (totalDays > 0 && service.fixedCost) {
      setTotalAmount(totalDays * service.fixedCost);
    }
  }, [totalDays, service.fixedCost]);

  function selectDateRange(values) {
    if (values) {
      const startDate = moment(values[0]);
      const endDate = moment(values[1]);
      setFrom(startDate.format("MMM DD yyyy"));
      setTo(endDate.format("MMM DD yyyy"));
      setTotalDays(endDate.diff(startDate, "days") + 1); // Include end day
    } else {
      setTotalDays(0);
    }
  }

  function handlePayment() {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "Consistent Cars",
      description: "Booking for " + service.serviceType,
      handler: function (response) {
        const reqObj = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          user: JSON.parse(localStorage.getItem("user"))._id,
          service: id,
          totalDays,
          totalAmount,
          bookedDates: { from, to },
        };
        dispatch(bookService(reqObj)); // Dispatch the booking action
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
      <Row justify="center" className="d-flex align-items-center" style={{ minHeight: "90vh" }}>
        <Col lg={10} sm={24} xs={24}>
          {service.image && <img src={service.image} alt={service.serviceType} className="carimg2 bs2" />}
        </Col>
        <Col lg={10} sm={24} xs={24} style={{ marginLeft: "65px", bottom: "10px" }}>
          <div style={{ backgroundColor: "#28d8d8", borderRadius: "10px", width: "90%" }}>
            <Divider>
              <h4 style={{ color: "white" }}>DETAILS</h4>
            </Divider>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ margin: "4px" }} className="car-headings">
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons"><TagsOutlined /></span>
                  <span className="car-data">Service Type</span>
                </p>
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons"><DollarCircleOutlined /></span>
                  <span className="car-data">Fixed Cost</span>
                </p>
              </div>
              <div className="car-headData">
                <p><span className="car-data2">{service.serviceType}</span></p>
                <p><span className="car-data2">{service.fixedCost} Rs/-</span></p>
              </div>
            </div>
            <Divider>
              <h4 style={{ color: "white" }}>SELECT DATE RANGE</h4>
            </Divider>
            <div>
              <RangePicker className="RangePicker" format="MMM DD yyyy" onChange={selectDateRange} />
              <br />
              {from && to && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "end", marginRight: "56px", color: "white" }}>
                  <p>Total Days: <b>{totalDays}</b></p>
                  <h3 style={{ color: "white" }}>Total Amount: {totalAmount} Rs/-</h3>
                  <button
                    className="btn1"
                    style={{ marginBottom: "4px", borderRadius: "5px", fontWeight: "500", outline: "none", border: "none" }}
                    onClick={handlePayment}
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </Col>
        {service.serviceType && (
          <Modal visible={showModal} closable={false} footer={false} title="Booked Dates">
            <div className="p-2">
              {service.bookedDates && service.bookedDates.map((slot, index) => (
                <button className="btn1 mt-2 ml-2" key={index}>
                  {slot.from} - {slot.to}
                </button>
              ))}
              <div className="text-right mt-5">
                <button className="btn1" onClick={() => setShowModal(false)}>
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

export default BookService;