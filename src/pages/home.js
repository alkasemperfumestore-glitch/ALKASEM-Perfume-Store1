export function homePage() {
  return `
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">Welcome to My Website</h1>
          <p class="hero-subtitle">Creating amazing digital experiences</p>
          <div class="hero-buttons">
            <a href="#about" class="btn btn-primary">Learn More</a>
            <a href="#contact" class="btn btn-secondary">Get Started</a>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="section-title">Why Choose Us</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🚀</div>
            <h3>Fast Performance</h3>
            <p>Lightning-fast loading times and optimized performance for the best user experience.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Modern, clean, and responsive designs that look great on all devices.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>Easy to Use</h3>
            <p>Intuitive interfaces and user-friendly experiences that anyone can navigate.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of satisfied customers who trust our services.</p>
          <a href="#contact" class="btn btn-primary">Contact Us Today</a>
        </div>
      </div>
    </section>
  `
}