import React, { useState } from 'react';

const Contact = () => {
  const latitude = '18.04642';
  const longitude = '78.26225';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert("Failed to send message");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <section className="text-center my-5">
        <h1>Contact Us</h1>
        <p className="lead">
          We'd love to hear from you! Please fill out the form below or contact us through our social media.
        </p>
      </section>

      {/* Contact Form */}
      <section className="row justify-content-center my-5">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-dark w-100">Send Message</button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="text-center my-5">
        <h2>Our Location</h2>
        <p className="lead">Jn road 9, Medhak, Telangana, India</p>
        <div className="my-3">
          <iframe
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`}
            width="800"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
