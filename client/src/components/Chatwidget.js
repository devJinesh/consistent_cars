import React, { useEffect } from "react";
import chatbot from "../images/chatbot.png";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

const responses = {
  greetings: ["hi", "hello", "hey", "hye", "hi there", "hello there"],
  name: ["your name", "who are you"],
  age: ["how old are you"],
  badWords: ["kill", "dead", "destroy", "damage"],
  bookingInfo: ["how to book", "how to rent", "how do I book", "book a car"],
  contactInfo: ["address", "location", "phone", "number"],
  payment: ["how to pay", "payment method", "stripe"],
  free: ["free", "no cost", "charge"],
  humor: ["hacker", "joke", "haha", "hehe"],
  farewell: ["bye", "goodbye"],
};

const Chatwidget = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { username: "sir" };

  useEffect(() => {
    addResponseMessage(
      `Welcome ${user.username}, I'm Marvin 🤖🖐️ a bot. How can I help you today?`
    );
  }, [user.username]);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    const messageLower = newMessage.toLowerCase();

    const getResponse = (category) => {
      switch (category) {
        case "greetings":
          return `Hello ${user.username}, How can I help you?`;
        case "name":
          return `I'm Marvin, your friendly bot!`;
        case "age":
          return `Don't ask me my age 😠`;
        case "badWords":
          return `Please, don't use bad words 🥺`;
        case "bookingInfo":
          return `Select a time slot, choose a vehicle, and book with just a click!`;
        case "contactInfo":
          return `You can reach us at 6429, NITTE Meenakshi College Rd, BSF Campus, Yelahanka, Bengaluru. Or contact the owner via +91234568901.`;
        case "payment":
          return `We accept payments via Stripe only.`;
        case "free":
          return `I don't understand "free".`;
        case "humor":
          return `Haha, nice joke! 😄`;
        case "farewell":
          return `Goodbye ${user.username}, have a great day!`;
        default:
          return `Sorry, I don't know that. Please contact us at +91 86009 64138 for further assistance.`;
      }
    };

    // Check message against predefined categories
    for (const [category, keywords] of Object.entries(responses)) {
      if (keywords.some((keyword) => messageLower.includes(keyword))) {
        addResponseMessage(getResponse(category));
        return;
      }
    }

    // Default message for unrecognized input
    addResponseMessage(getResponse("default"));
  };

  return (
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chat with us!"
        subtitle="We typically reply in a few minutes."
        profileAvatar={chatbot}
        emojis={true}
      />
    </div>
  );
};

export default Chatwidget;
