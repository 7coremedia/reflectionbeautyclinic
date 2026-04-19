import { useState } from 'react';
import SEO from '../../components/SEO';
import { useReveal } from '../../hooks/useReveal';
import { Calendar, Phone, Mail, Clock } from 'lucide-react';
import './BookPage.css';

export default function BookPage() {
  useReveal();
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="book-page page-enter">
      <SEO 
        title="Book a Clinic Appointment | Reflection Beauty Clinic Lagos"
        description="Book your skin consultation or treatment at Reflection Beauty Clinic, Alimosho. Fill out our simple form to secure your appointment today."
        keywords="book appointment Lagos, skin clinic booking Alimosho, beauty clinic reservation"
      />

      <section className="page-title-bar">
        <div className="container">
          <span className="label">Appointments</span>
          <h1 className="page-title-bar__heading reveal-on-scroll stagger-1">Book Your Session</h1>
          <p className="page-title-bar__sub reveal-on-scroll stagger-2">
            Take the first step towards transforming your skin. Complete the form below, and our concierges will contact you to confirm your appointment time.
          </p>
        </div>
      </section>

      <section className="booking-form-section container">
        <div className="booking-grid">
          
          <div className="booking-details-sidebar reveal-on-scroll stagger-1">
            <h2 className="display-sm">What to expect.</h2>
            <p className="body-md" style={{ color: 'var(--gray-dark)', marginBottom: '2rem' }}>
              Your journey with us begins with a comprehensive skin assessment. From there, we design a clinically-backed treatment plan tailored precisely to you.
            </p>
            
            <ul className="booking-contact-list">
              <li>
                <Calendar size={20} className="icon" />
                <span><strong>Consultations:</strong> Require a ₦5,000 to ₦10,000 deposit</span>
              </li>
              <li>
                <Clock size={20} className="icon" />
                <span><strong>Arrive Early:</strong> Please arrive 10 minutes before your scheduled time</span>
              </li>
              <li>
                <Phone size={20} className="icon" />
                <span><strong>Call Us:</strong> Need immediate assistance? Call us directly</span>
              </li>
              <li>
                <Mail size={20} className="icon" />
                <span><strong>Email:</strong> bookings@reflection.ng</span>
              </li>
            </ul>
          </div>

          <div className="booking-form-wrapper reveal-on-scroll stagger-2">
            {formStatus === 'success' ? (
              <div className="booking-success glass-effect">
                <Calendar size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                <h3>Request Received.</h3>
                <p>Thank you. A member of our team will call you shortly to confirm your scheduled time.</p>
                <button className="btn btn-outline" onClick={() => setFormStatus('idle')} style={{ marginTop: '2rem' }}>
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="input-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" required placeholder="Joy" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" required placeholder="Okonkwo" />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="input-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" required placeholder="080..." />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required placeholder="joy@example.com" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Requested</label>
                  <select id="service" required>
                    <option value="">Select a service category...</option>
                    <option value="consultation">Initial Skin Consultation</option>
                    <option value="hyperpigmentation">Hyperpigmentation Treatment</option>
                    <option value="acne">Acne Treatment</option>
                    <option value="facial">Facial Treatment</option>
                    <option value="medical-spa">Medical Spa (Spa / Tag Removal)</option>
                    <option value="teeth">Teeth Whitening / Scaling</option>
                    <option value="other">Not Sure / Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message / Specific Concerns (Optional)</label>
                  <textarea id="message" rows="4" placeholder="Tell us about your skin concerns..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Submitting...' : 'Request Appointment'}
                </button>
                <p className="form-note">By submitting, you agree to our clinic terms and policies.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
