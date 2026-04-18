import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Rituals() {
  useReveal();
  const [step, setStep] = useState(0);

  const questions = [
    {
      q: "How does your skin feel an hour after cleansing?",
      options: ["Tight and uncomfortable", "Comfortable all over", "Oily on the nose/forehead, dry elsewhere", "Oily all over"]
    },
    {
      q: "What is your primary skin concern?",
      options: ["Fine lines and loss of firmness", "Dark spots and hyperpigmentation", "Acne and congestion", "Redness and sensitivity"]
    },
    {
      q: "How many products are you willing to use daily?",
      options: ["Just the essentials (3 steps)", "A balanced routine (4-5 steps)", "Give me the full ritual (6+ steps)"]
    }
  ];

  if (step === questions.length) {
    return (
      <div className="page-enter" style={{ paddingTop: '72px' }}>
        <section className="premium-split-section container">
          <div className="premium-split-text reveal-on-scroll">
            <span className="label" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'block' }}>Your Defined Protocol</span>
            <h1 className="display-md mb-4">The <em>Radiance</em> Ritual.</h1>
            <p className="body-lg" style={{ color: 'var(--gray-dark)', marginBottom: '2.5rem' }}>
              Based on your answers, your skin needs gentle resurfacing without compromising the lipid barrier. We've curated a focused routine to address pigmentation while maintaining deep hydration and structural integrity.
            </p>
            
            <div className="features-list">
              {[
                { step: '1', name: 'Cleanse', product: 'Silk Cleanser' },
                { step: '2', name: 'Treat', product: 'Luminance Serum' },
                { step: '3', name: 'Hydrate', product: 'Velvet Moisturiser' },
                { step: '4', name: 'Protect (AM)', product: 'Shield SPF 50' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: idx !== 3 ? '1px solid var(--gray-light)' : 'none' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {item.step}
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--black-soft)', fontSize: '1.05rem', marginBottom: '0.2rem' }}>{item.name}</strong>
                    <span style={{ fontSize: '0.95rem', color: 'var(--gray-dark)' }}>{item.product}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="hero-actions" style={{ marginTop: '3rem' }}>
              <Link to="/shop" className="btn btn-primary">Shop Your Routine <ArrowRight size={20} /></Link>
              <button className="btn btn-outline" onClick={() => setStep(0)}>Retake Quiz</button>
            </div>
          </div>

          <div className="premium-split-grid reveal-on-scroll stagger-2">
             <div className="premium-grid-img img-corner-1" style={{ backgroundImage: "url('/reflectio webp/face skin.webp')" }} />
             <div className="premium-grid-img img-corner-2 glass-overlay" style={{ backgroundImage: "url('/reflectio webp/water on skin.webp')" }} />
             <div className="premium-grid-img img-corner-3 glass-overlay" style={{ backgroundImage: "url('/reflectio webp/Hand.webp')" }} />
             <div className="premium-grid-img img-corner-4" style={{ backgroundImage: "url('/reflectio webp/back.webp')" }} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-enter flex-center" style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--base-bg)', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px', marginTop: '4rem' }}>
        <div className="reveal-on-scroll" style={{ background: 'var(--white)', padding: '5rem 4rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 60px rgba(0,0,0,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Progress bar subtle indicator */}
          <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', background: 'var(--primary)', width: `${((step) / questions.length) * 100}%`, transition: 'width 0.4s ease' }} />
          
          <Sparkles color="var(--primary)" size={32} style={{ marginBottom: '2rem', opacity: 0.8 }} />
          
          <span className="label" style={{ display: 'block', marginBottom: '1rem', color: 'var(--gray-md)' }}>Question {step + 1} of {questions.length}</span>
          <h2 className="display-md" style={{ marginBottom: '4rem' }}>{questions[step].q}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '500px', margin: '0 auto' }}>
            {questions[step].options.map((opt, i) => (
              <button 
                key={i}
                className="btn btn-outline" 
                style={{ width: '100%', justifyContent: 'space-between', padding: '1.25rem 2rem', fontWeight: '500', fontSize: '1rem', textTransform: 'none', letterSpacing: 'normal', color: 'var(--black-soft)', borderColor: 'var(--gray-light)' }}
                onClick={() => setStep(step + 1)}
              >
                <span>{opt}</span>
                <ArrowRight size={18} style={{ opacity: 0.5 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
