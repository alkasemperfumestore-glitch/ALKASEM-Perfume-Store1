export function servicesPage() {
  return `
    <section class="page-header">
      <div class="container">
        <h1>Our Services</h1>
        <p>Comprehensive solutions for your digital needs</p>
      </div>
    </section>

    <section class="services-content">
      <div class="container">
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">💻</div>
            <h3>Web Development</h3>
            <p>Custom websites and web applications built with modern technologies and best practices.</p>
            <ul class="service-features">
              <li>Responsive Design</li>
              <li>Fast Performance</li>
              <li>SEO Optimized</li>
              <li>Cross-browser Compatible</li>
            </ul>
            <div class="service-price">Starting at $2,999</div>
          </div>

          <div class="service-card">
            <div class="service-icon">📱</div>
            <h3>Mobile Apps</h3>
            <p>Native and cross-platform mobile applications for iOS and Android devices.</p>
            <ul class="service-features">
              <li>Native Performance</li>
              <li>User-friendly Interface</li>
              <li>App Store Optimization</li>
              <li>Push Notifications</li>
            </ul>
            <div class="service-price">Starting at $4,999</div>
          </div>

          <div class="service-card">
            <div class="service-icon">🎨</div>
            <h3>UI/UX Design</h3>
            <p>Beautiful and intuitive user interfaces that provide exceptional user experiences.</p>
            <ul class="service-features">
              <li>User Research</li>
              <li>Wireframing</li>
              <li>Prototyping</li>
              <li>Visual Design</li>
            </ul>
            <div class="service-price">Starting at $1,999</div>
          </div>

          <div class="service-card">
            <div class="service-icon">🚀</div>
            <h3>Digital Marketing</h3>
            <p>Comprehensive digital marketing strategies to grow your online presence.</p>
            <ul class="service-features">
              <li>SEO Optimization</li>
              <li>Social Media Marketing</li>
              <li>Content Strategy</li>
              <li>Analytics & Reporting</li>
            </ul>
            <div class="service-price">Starting at $1,499/month</div>
          </div>

          <div class="service-card">
            <div class="service-icon">☁️</div>
            <h3>Cloud Solutions</h3>
            <p>Scalable cloud infrastructure and deployment solutions for your applications.</p>
            <ul class="service-features">
              <li>Cloud Migration</li>
              <li>Auto Scaling</li>
              <li>Security & Backup</li>
              <li>24/7 Monitoring</li>
            </ul>
            <div class="service-price">Starting at $999/month</div>
          </div>

          <div class="service-card">
            <div class="service-icon">🛠️</div>
            <h3>Maintenance & Support</h3>
            <p>Ongoing maintenance and technical support to keep your systems running smoothly.</p>
            <ul class="service-features">
              <li>Regular Updates</li>
              <li>Bug Fixes</li>
              <li>Performance Monitoring</li>
              <li>Technical Support</li>
            </ul>
            <div class="service-price">Starting at $499/month</div>
          </div>
        </div>
      </div>
    </section>

    <section class="process">
      <div class="container">
        <h2 class="section-title">Our Process</h2>
        <div class="process-steps">
          <div class="process-step">
            <div class="step-number">1</div>
            <h3>Discovery</h3>
            <p>We start by understanding your business goals and requirements.</p>
          </div>
          <div class="process-step">
            <div class="step-number">2</div>
            <h3>Planning</h3>
            <p>We create a detailed project plan and timeline for execution.</p>
          </div>
          <div class="process-step">
            <div class="step-number">3</div>
            <h3>Development</h3>
            <p>Our team builds your solution using best practices and modern tools.</p>
          </div>
          <div class="process-step">
            <div class="step-number">4</div>
            <h3>Launch</h3>
            <p>We deploy your solution and provide ongoing support and maintenance.</p>
          </div>
        </div>
      </div>
    </section>
  `
}