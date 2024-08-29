import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "suggestion", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300 text-yellow-50">
      <div className="max-w-lg mx-auto bg-richblack-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-300 mb-6">Contact Us</h1>
        <p className="text-gray-400 mb-6">
          We're here to help! Please use the form below to send us your suggestions or report any bugs.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 ">
          <div className="flex gap-x-4">
            <label className="w-1/2">
              <p className="mb-1 text-sm leading-5 text-gray-400">Name</p>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-700 p-3 text-gray-300 placeholder-gray-500 text-black"
                placeholder="Your name"
                required
              />
            </label>
            <label className="w-1/2">
              <p className="mb-1 text-sm leading-5 text-gray-400">Email Address</p>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-700 p-3 text-gray-300 placeholder-gray-500 text-black"
                placeholder="Your email address"
                required
              />
            </label>
          </div>
          <label className="w-full">
            <p className="mb-1 text-sm leading-5 text-gray-400">Subject</p>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-700 p-3 text-gray-300 placeholder-gray-500 text-black"
              placeholder="Subject of your message"
              required
            />
          </label>
          <label className="w-full">
            <p className="mb-1 text-sm leading-5 text-gray-400">Message</p>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-700 p-3 text-gray-300 placeholder-gray-500 text-black"
              placeholder="Your message"
              rows="4"
              required
            ></textarea>
          </label>
          <label className="w-full">
            <p className="mb-1 text-sm leading-5 text-gray-400">Type of Inquiry</p>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-700 p-3 text-gray-300 placeholder-gray-500 text-black"
            >
              <option value="suggestion">Suggestion</option>
              <option value="bug">Report a Bug</option>
            </select>
          </label>
          <button
            type="submit"
            className="mt-6 rounded-md bg-yellow-300 py-2 px-4 text-gray-900 hover:bg-yellow-400 font-bold text-black"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
