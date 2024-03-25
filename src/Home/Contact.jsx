import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "tailwindcss/tailwind.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_lrpz57c", "template_fo32vq5", form.current, {
        publicKey: "PcLOgct5WmCIZ8F1p",
      })
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="max-w-sm mx-auto bg-orange-500 p-4 rounded-lg"
    >
      <label className="block mb-2">Enter Name: </label>
      <input
        type="text"
        name="user_name"
        placeholder="Enter Full Names"
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
      />
      <label className="block mb-2"> Enter Email:</label>
      <input
        type="email"
        name="user_email"
        placeholder="Enter The Email "
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
      />
      <label className="block mb-2">Enter Message: </label>
      <textarea
        name="message"
        placeholder="Enter the Intended Message"
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
      ></textarea>
      <input
        type="submit"
        value="Send"
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 cursor-pointer"
      />
    </form>
  );
};

export default Contact;




