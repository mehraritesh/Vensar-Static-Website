const menuToggle = document.querySelector('.menu-toggle')
const siteNav = document.querySelector('.site-nav')
const backdrop = document.querySelector('.mobile-nav-backdrop')
const navLinks = document.querySelectorAll('.site-nav a, .brand')

document.documentElement.classList.remove('no-js')
document.documentElement.classList.add('js')

function setMenuOpen(open) {
  if (!menuToggle || !siteNav || !backdrop) return

  menuToggle.classList.toggle('is-open', open)
  siteNav.classList.toggle('is-open', open)
  backdrop.classList.toggle('is-visible', open)
  menuToggle.setAttribute('aria-expanded', String(open))
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  backdrop.tabIndex = open ? 0 : -1
  document.body.style.overflow = open ? 'hidden' : ''
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    setMenuOpen(Boolean(siteNav && !siteNav.classList.contains('is-open')))
  })
}

if (backdrop) {
  backdrop.addEventListener('click', () => setMenuOpen(false))
}

navLinks.forEach((link) => link.addEventListener('click', () => setMenuOpen(false)))

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false)
  }
})

const desktopQuery = window.matchMedia('(min-width: 761px)')
const handleDesktopQueryChange = (event) => {
  if (event.matches) {
    setMenuOpen(false)
  }
}

if (desktopQuery.addEventListener) {
  desktopQuery.addEventListener('change', handleDesktopQueryChange)
} else {
  desktopQuery.addListener(handleDesktopQueryChange)
}

const revealItems = Array.from(document.querySelectorAll('.reveal'))

if (!('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'))
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.16, rootMargin: '0px 0px -60px' },
  )

  revealItems.forEach((item) => observer.observe(item))
}
