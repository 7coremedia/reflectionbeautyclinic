import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Rituals() {
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
      <div className="page-enter flex-center flex-column" style={{ paddingTop: '100px', paddingBottom: 'var(--space-2xl)', minHeight: '80vh' }}>
        <div className="container text-center" style={{ maxWidth: '600px' }}>
          <span className="label-gold mb-3" style={{ display: 'block' }}>Your Protocol</span>
          <h1 className="display-md mb-4">The Radiance Ritual</h1>
          <p className="body-lg" style={{ color: 'var(--stone)', marginBottom: '2.5rem' }}>
            Based on your answers, your skin needs gentle resurfacing without compromising the lipid barrier. We've curated a 4-step routine to address pigmentation while maintaining deep hydration.
          </p>
          
          <div style={{ background: 'var(--pearl)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--sand)', paddingBottom: '1rem' }}>
              <div style={{ background: 'var(--gold)', color: 'var(--near-black)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>1</div>
              <div>
                <strong style={{ display: 'block', color: 'var(--near-black)' }}>Cleanse</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Silk Cleanser</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--sand)', paddingBottom: '1rem' }}>
              <div style={{ background: 'var(--gold)', color: 'var(--near-black)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>2</div>
              <div>
                <strong style={{ display: 'block', color: 'var(--near-black)' }}>Treat</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Luminance Serum</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--sand)', paddingBottom: '1rem' }}>
              <div style={{ background: 'var(--gold)', color: 'var(--near-black)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>3</div>
              <div>
                <strong style={{ display: 'block', color: 'var(--near-black)' }}>Hydrate</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Velvet Moisturiser</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--gold)', color: 'var(--near-black)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>4</div>
              <div>
                <strong style={{ display: 'block', color: 'var(--near-black)' }}>Protect (AM)</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Shield SPF 50</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/shop" className="btn btn-primary">Shop Your Routine</Link>
            <button className="btn btn-outline" onClick={() => setStep(0)}>Retake Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter flex-center" style={{ paddingTop: '100px', minHeight: '80vh', backgroundColor: 'var(--cream-dark)' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <div style={{ background: 'var(--warm-white)', padding: '3.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
          <span className="label mb-3" style={{ display: 'block' }}>Question {step + 1} of {questions.length}</span>
          <h2 className="heading-lg mb-5">{questions[step].q}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {questions[step].options.map((opt, i) => (
              <button 
                key={i}
                className="btn btn-outline" 
                style={{ width: '100%', justifyContent: 'flex-start', padding: '1rem 1.5rem', fontWeight: '400', fontSize: '0.95rem', textTransform: 'none', letterSpacing: 'normal' }}
                onClick={() => setStep(step + 1)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
