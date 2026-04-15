export default function About() {
  return (
    <div className="about-page page-enter" style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section style={{ background: 'var(--cream-dark)', padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
        <div className="container container-sm">
          <span className="label mb-3" style={{ display: 'block' }}>Our Story</span>
          <h1 className="display-md mb-4">Born in the clinic. Refined by science.</h1>
          <p className="body-lg" style={{ color: 'var(--stone)' }}>
            Reflection began with a simple pursuit: to bring the transformative results of clinical treatments into the daily ritual of home skincare.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="grid-2 align-center" style={{ gap: '4rem' }}>
            <div>
              <h2 className="heading-lg mb-3">The gap we saw.</h2>
              <p className="body-lg" style={{ marginBottom: '1.5rem' }}>
                For years in our London clinic, we noticed a pattern. Clients were forced to choose between highly effective, clinical-grade products that lacked sensory appeal, or beautifully packaged "luxury" items that did little to change the skin structurally.
              </p>
              <p className="body-lg">
                We wanted both. Formulations with the active percentages necessary to create real change, housed in a delivery system that feels like a daily indulgence. That's the essence of Reflection.
              </p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #e8ddd1, #c4b5a5)', aspectRatio: '4/5', borderRadius: 'var(--radius-lg)' }} />
          </div>

          <div className="grid-2 align-center" style={{ gap: '4rem', marginTop: 'var(--space-2xl)' }}>
            <div style={{ background: 'linear-gradient(135deg, #d4b8a0, #9e8e80)', aspectRatio: '4/5', borderRadius: 'var(--radius-lg)' }} />
            <div>
              <h2 className="heading-lg mb-3">Tested on real skin, not in focus groups.</h2>
              <p className="body-lg" style={{ marginBottom: '1.5rem' }}>
                Every Reflection product goes through a rigorous development process that spans years, not months. We don't rely on trends. Instead, we look at the common issues we treat in the clinic every day.
              </p>
              <p className="body-lg">
                Our active ingredients are selected based on peer-reviewed clinical data, and the final formulas are tested on our own clinic clients before they ever reach our shelves. If a product doesn't deliver visible results in the treatment room, it doesn't get made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--near-black)', color: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header text-center mb-5">
            <span className="label-gold mb-3" style={{ display: 'block' }}>Our Standards</span>
            <h2 className="heading-lg" style={{ color: 'var(--cream)' }}>No compromises.</h2>
          </div>
          <div className="grid-3 text-center">
            <div style={{ padding: '2rem' }}>
              <h3 className="heading-md mb-2" style={{ color: 'var(--gold-light)' }}>Transparent Efficacy</h3>
              <p style={{ color: 'var(--taupe)' }}>We state the exact percentage of our key actives. No fairy-dusting. Just proven science at optimal concentrations.</p>
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 className="heading-md mb-2" style={{ color: 'var(--gold-light)' }}>Barrier First</h3>
              <p style={{ color: 'var(--taupe)' }}>Even our most powerful exfoliants are formulated with barrier-supporting lipids to prevent inflammation and TEWL.</p>
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 className="heading-md mb-2" style={{ color: 'var(--gold-light)' }}>Conscious Creation</h3>
              <p style={{ color: 'var(--taupe)' }}>Cruelty-free forever. Refillable packaging where possible. Carbon-neutral shipping as standard.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
