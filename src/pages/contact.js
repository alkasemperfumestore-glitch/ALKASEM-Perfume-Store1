export function contactPage() {
  return `
    <section class="page-header">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in touch with our team</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Get In Touch</h2>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            
            <div class="contact-details">
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>
                  <h3>Address</h3>
                  <p>123 Business Street<br>Suite 100<br>City, State 12345</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>hello@mywebsite.com</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">🕒</div>
                <div>
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br>Saturday: 10:00 AM - 4:00 PM<br>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="contact-form-container">
            <form class="contact-form" id="contactForm">
              <div class="form-group">
                <label for="name">Full Name *</label>
                <input type="text" id="name" name="name" required>
              </div>
              
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" required>
              </div>
              
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone">
              </div>
              
              <div class="form-group">
                <label for="subject">Subject *</label>
                <input type="text" id="subject" name="subject" required>
              </div>
              
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="map">
      <div class="container">
        <h2 class="section-title">Find Us</h2>
        <div class="map-placeholder">
          <p>🗺️ Interactive Map Would Go Here</p>
          <p>123 Business Street, Suite 100, City, State 12345</p>
        </div>
      </div>
    </section>

    <script>
      document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
          alert('Please fill in all required fields.');
          return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      });
    </script>
  `
}