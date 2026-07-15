import "./Contact.css";

function Contact() {
  return (
    <section className="contact-page">

      <h1>Contact NyumbaConnect</h1>

      <p className="contact-intro">
        We'd love to hear from you. Reach out to us for property inquiries,
        support, or partnership opportunities.
      </p>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Contact Information</h2>

          <p>📍 Nairobi, Kenya</p>

          <p>📞 +254 700 000 000</p>

          <p>📧 info@nyumbaconnect.co.ke</p>

          <p>🕒 Monday - Friday (8:00 AM - 5:00 PM)</p>

        </div>

        <form className="contact-form">

          <input
            type="text"
            placeholder="Your Name"
          />

          <input
            type="email"
            placeholder="Your Email"
          />

          <input
            type="text"
            placeholder="Subject"
          />

          <textarea
            rows="6"
            placeholder="Write your message..."
          ></textarea>

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;