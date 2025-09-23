import { homePage } from './pages/home.js'
import { aboutPage } from './pages/about.js'
import { servicesPage } from './pages/services.js'
import { contactPage } from './pages/contact.js'

const routes = {
  'home': homePage,
  'about': aboutPage,
  'services': servicesPage,
  'contact': contactPage
}

class Router {
  constructor() {
    this.currentRoute = 'home'
  }

  init() {
    // Handle initial load
    this.handleRoute()
    
    // Handle hash changes
    window.addEventListener('hashchange', () => {
      this.handleRoute()
    })

    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault()
        const route = e.target.getAttribute('href').substring(1)
        this.navigate(route)
      }
    })
  }

  handleRoute() {
    const hash = window.location.hash.substring(1)
    const route = hash || 'home'
    this.loadPage(route)
  }

  navigate(route) {
    window.location.hash = route
  }

  loadPage(route) {
    const page = routes[route] || routes['home']
    const content = document.getElementById('content')
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${route}`) {
        link.classList.add('active')
      }
    })

    // Load page content
    content.innerHTML = page()
    this.currentRoute = route

    // Scroll to top
    window.scrollTo(0, 0)
  }
}

export const router = new Router()