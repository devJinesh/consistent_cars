import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row, Button } from "antd";
import Spinner from "../components/Spinner";
import moment from "moment";
import defaultcar from "../images/defaultcar.jpg";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  // Function to convert minutes to hours and minutes
  const convertMinutesToHrsMins = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours} hr ${minutes} min`;
  };

  // Function to format currency
  const formatCurrency = (amount) => {
    return `₹${Number(amount).toFixed(2).replace(/[^0-9.₹]/g, "")}`;
  };  

  // Function to format date and time
  const formatDateTime = (date) => {
    return moment(date).format("MMM DD YYYY, hA");
  };

  // Function to generate and download the PDF
  const generatePDF = (booking) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
  
    // Company Header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Consistent Cars", pageWidth / 2, 15, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("B202 Shopping Complex, Shivranjan Towers, Someshwar Wadi, Pashan, Pune- 411008", pageWidth / 2, 20, { align: "center" });
    doc.text("Phone: +91 86009 64138 | Email: consistentcars@rediffmail.com", pageWidth / 2, 25, { align: "center" });
  
    // Invoice Header
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice", 14, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Date: ${moment().format("MMM DD, YYYY")}`, 14, 50);
  
    // Customer Details
    doc.text("Customer Details:", 14, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${booking.user.name || "Not Provided"}`, 14, 65);
    doc.text(`Email: ${booking.user.email}`, 14, 70);
    doc.text(`Phone: ${booking.user.phone}`, 14, 75);
  
    // Booking Details
    doc.text("Booking Details:", 14, 85);
    doc.text(`Date of Booking: ${formatDateTime(booking.createdAt)}`, 14, 90);
    doc.text(`From: ${booking.bookedTimeSlots.from} Hrs`, 14, 95);
    doc.text(`To: ${booking.bookedTimeSlots.from} Hrs`, 14, 100);
  
    // Table
    const tableColumn = ["Car", "Rate (per hr)", "Duration", "Total"];
    const driverFee = booking.driverRequired ? booking.totalMins * 5 : 0;
    const ratePerHour = booking.car.rentPerHour
  
    const tableRows = [
      [
        booking.car ? booking.car.name : "Not Available",
        ratePerHour.toFixed(2),
        convertMinutesToHrsMins(booking.totalMins),
        booking.totalAmount.toFixed(2),
      ],
    ];
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 110,
      styles: {
        halign: "center",
        valign: "middle",
      },
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
      bodyStyles: { fillColor: [245, 245, 245] },
    });
  
    // Footer
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text("Thank you for choosing Consistent Cars!", pageWidth / 2, finalY, { align: "center" });
    doc.setFontSize(8);
    doc.text("Terms & Conditions: All bookings are subject to our terms and policies. Visit our website for more details.", pageWidth / 2, finalY + 10, { align: "center" });
  
    // Save PDF
    doc.save(`Invoice_${booking.transactionId}.pdf`);
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="d-flex justify-content-between align-items-center" style={{ alignContent: "center", marginTop: "50px", marginLeft: "50px"}}>
        <h3 className="text-center mt-4" style={{ alignContent: "center", color: "#00ffffdf" }}>
          Your Bookings
        </h3>
      </div>
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24} style={{ color: "darkslategray" }}>
          {user.admin
            ? bookings.map((booking) => {
                return (
                  <Row
                    gutter={16}
                    className="Userbooking bs1 mt-2 mb-2 text-left"
                    style={{
                      backgroundColor: "#00ffffdf",
                      borderRadius: "5px",
                    }}
                  >
                    <Col lg={6} sm={24}>
                      {booking.car ? (
                        <p>
                          <b>{booking.car.name}</b>
                        </p>
                      ) : (
                        <p>
                          <b>Not Available</b>
                        </p>
                      )}
                      <p>
                        User : <b>{booking.user.email}</b>
                      </p>
                      <p>
                        Total Duration : <b>{convertMinutesToHrsMins(booking.totalMins)}</b>
                      </p>
                      <p>
                        Driver :
                        {booking.driverRequired ? (
                          <b> Required</b>
                        ) : (
                          <b> Not Required</b>
                        )}
                      </p>
                      <p>
                        Total amount : <b>{formatCurrency(booking.totalAmount)}</b>
                      </p>
                    </Col>

                    <Col lg={12} sm={24}>
                      <br></br>
                      <p>
                        User Contact : <b>{booking.user.phone}</b>
                      </p>
                      <p>
                        From: <b>{booking.bookedTimeSlots.from}</b>
                      </p>
                      <p>
                        To: <b>{booking.bookedTimeSlots.to}</b>
                      </p>
                      <p>
                        Date of booking:{" "}
                        <b>{formatDateTime(booking.createdAt)}</b>
                      </p>
                    </Col>

                    <Col lg={6} sm={24} className="text-right">
                      {booking.car ? (
                        <img
                          style={{ borderRadius: 5 }}
                          src={booking.car.image}
                          height="140"
                          className="p-2"
                        />
                      ) : (
                        <img
                          style={{ borderRadius: 5 }}
                          src={defaultcar}
                          height="140"
                          className="p-2"
                        />
                      )}
                    </Col>

                    {/* Add PDF Download Button */}
                    <Col lg={24} sm={24} className="mt-2 text-center">
                      <Button
                        type="primary"
                        onClick={() => generatePDF(booking)}
                      >
                        Download Invoice
                      </Button>
                    </Col>
                  </Row>
                );
              })
            : bookings
                .filter((o) => o.user._id === user._id)
                .map((booking) => {
                  return (
                    <Row
                      gutter={16}
                      className="Userbooking bs1 mt-2 mb-2 text-left"
                      style={{
                        backgroundColor: "#00ffffdf",
                        borderRadius: "5px",
                      }}
                    >
                      <Col lg={6} sm={24}>
                        {booking.car ? (
                          <p>
                            <b>{booking.car.name}</b>
                          </p>
                        ) : (
                          <p>
                            <b>Not Available</b>
                          </p>
                        )}
                        <p>
                          User : <b>{booking.user.email}</b>
                        </p>
                        <p>
                          Total Duration : <b>{convertMinutesToHrsMins(booking.totalMins)}</b>
                        </p>
                        <p>
                          Driver :
                          {booking.driverRequired ? (
                            <b> Required</b>
                          ) : (
                            <b> Not Required</b>
                          )}
                        </p>
                        <p>
                          Total amount : <b>{formatCurrency(booking.totalAmount)}</b>
                        </p>
                      </Col>

                      <Col lg={12} sm={24}>
                        <br></br>
                        <p>
                          User Contact : <b>{booking.user.phone}</b>
                        </p>
                        <p>
                          From: <b>{booking.bookedTimeSlots.from} Hrs</b>
                        </p>
                        <p>
                          To: <b>{booking.bookedTimeSlots.to} Hrs</b>
                        </p>
                        <p>
                          Date of booking:{" "}
                          <b>{formatDateTime(booking.createdAt)}</b>
                        </p>
                      </Col>

                      <Col lg={6} sm={24} className="text-right">
                        {booking.car ? (
                          <img
                            style={{ borderRadius: 5 }}
                            src={booking.car.image}
                            height="140"
                            className="p-2"
                          />
                        ) : (
                          <img
                            style={{ borderRadius: 5 }}
                            src={defaultcar}
                            height="140"
                            className="p-2"
                          />
                        )}
                      </Col>

                      {/* Add PDF Download Button */}
                      <Col lg={24} sm={24} className="mt-2 text-center">
                        <Button
                          type="primary"
                          onClick={() => generatePDF(booking)}
                        >
                          Download Invoice
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;