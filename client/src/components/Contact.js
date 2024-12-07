import React from "react";
import Footer from "../pages/Footer";
import DefaultLayout from "./DefaultLayout";

const Contact = () => {
  return (
    <>
      <DefaultLayout />
      <div className="contact">
        <h2
          style={{
            color: "white",
            marginBottom: "2rem",
            display: "block",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          Contact <span style={{ color: "#00ffffdf" }}>US</span>
        </h2>
        <div>
          <div className="contact-container">
            <form
              action="https://formsubmit.co/consistent.cars@rediffmail.com"
              method="POST"
              className="form-container"
            >
              {/* Hidden inputs for FormSubmit customization */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="" />
              <input type="hidden" name="_replyto" />
              <input type="hidden" name="_subject" value="New Contact Form Submission" />

              <div className="row mx-auto">
                <div className="col-8 form-group mx-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    required
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <textarea
                    className="form-control message-area"
                    placeholder="Message"
                    name="message"
                    rows="4"
                    required
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <button
                    type="submit"
                    className="btn btn-info"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
