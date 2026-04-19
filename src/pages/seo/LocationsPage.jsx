import SEO from '../../components/SEO';
import { useReveal } from '../../hooks/useReveal';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import './LocationsPage.css';

export default function LocationsPage() {
  useReveal();

  return (
    <div className="locations-page page-enter">
      <SEO 
        title="Reflection Beauty Clinic Location | Alimosho, Lagos"
        description="Visit Reflection Beauty Clinic at 10 Idimu Rd, Egbeda, Lagos 102213. Get directions from Ikotun, Iyana Ipaja, Gowon Estate, and Shasha."
        keywords="reflection beauty clinic location, egbeda beauty spa, alimosho skin clinic address"
      />

      <section className="page-title-bar">
        <div className="container">
          <span className="label">Location</span>
          <h1 className="page-title-bar__heading reveal-on-scroll stagger-1">Visit Our Clinic</h1>
          <p className="page-title-bar__sub reveal-on-scroll stagger-2">
            Located in the heart of Alimosho. A sanctuary of science and calm.
          </p>
        </div>
      </section>

      <section className="locations-content container">
        <div className="locations-grid">
          
          <div className="locations-info reveal-on-scroll stagger-1">
            <div className="info-block">
              <h3><MapPin size={24} className="icon" /> Address</h3>
              <address>
                Reflection Beauty Clinic<br />
                10 Idimu Rd, Egbeda,<br />
                Lagos 102213
              </address>
              {/* Note: This exactly matches the required GBP format */}
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                Open in Google Maps
              </a>
            </div>

            <div className="info-block">
              <h3><Clock size={24} className="icon" /> Hours</h3>
              <ul className="hours-list">
                <li><span>Monday - Friday</span> <span>9:00 AM - 6:00 PM</span></li>
                <li><span>Saturday</span> <span>10:00 AM - 4:00 PM</span></li>
                <li><span>Sunday</span> <span>Closed</span></li>
              </ul>
            </div>

            <div className="info-block">
              <h3><Phone size={24} className="icon" /> Contact</h3>
              <p>+234 800 000 0000</p>
              <p>hello@reflection.ng</p>
            </div>
          </div>

          <div className="locations-map reveal-on-scroll stagger-2">
            {/* Embedded Google Map - placeholder iframe */}
            <div className="map-container glass-effect">
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.666872922757!2d3.2925181147708573!3d6.570177795247952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b906429555555%3A0x8fc0485a3a0e68e4!2s10%20Idimu%20Rd%2C%20Egbeda%20102213%2C%20Ikeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1655000000000!5m2!1sen!2sng" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Reflection Beauty Clinic Location"
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="directions-section container reveal-on-scroll">
        <h2 className="display-sm" style={{ marginBottom: '3rem', textAlign: 'center' }}>Getting Here</h2>
        
        <div className="directions-grid">
          <div className="direction-card">
            <Navigation size={24} className="icon" />
            <h4>From Ikotun</h4>
            <p>Take the Ikotun-Idimu road straight down. Continue past Idimu bus stop towards Egbeda. We are located on the right side before Egbeda bus stop.</p>
          </div>
          <div className="direction-card">
            <Navigation size={24} className="icon" />
            <h4>From Iyana Ipaja</h4>
            <p>Take the Egbeda road from Iyana Ipaja underbridge. Pass through Egbeda bus stop and continue onto Idimu road. The clinic will be on your left.</p>
          </div>
          <div className="direction-card">
            <Navigation size={24} className="icon" />
            <h4>From Gowon Estate</h4>
            <p>Exit the estate towards Egbeda. At Egbeda bus stop, turn right onto Idimu Rd. We are situated shortly down the road on the left.</p>
          </div>
          <div className="direction-card">
            <Navigation size={24} className="icon" />
            <h4>From Shasha</h4>
            <p>Drive down Shasha road to Akowonjo roundabout. Turn right towards Egbeda. Pass Egbeda bus stop onto Idimu road. We are on the left.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
