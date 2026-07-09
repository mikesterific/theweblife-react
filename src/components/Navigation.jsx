import { useLocation } from 'react-router-dom'
import { track } from '../utils/track'

const navItems = [
  {
    label: 'Home',
    href: '/',
    className: 'show-mobile show-tablet nav-home-link',
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    className: 'show-mobile',
  },
  {
    label: 'Performance',
    href: '/#performance',
    className: 'show-mobile show-tablet',
  },
  {
    label: 'Author',
    href: '/#author',
    className: 'show-mobile',
  },
  
  {
    label: 'Play Games',
    href: '/#portfolio-quest',
    className: 'show-mobile',
  },
  {
    label: 'AI / LLM',
    href: '/#ai-llm',
    className: 'show-sm-screen',
  },
  {
    label: 'My Story',
    href: '/#story',
    className: 'show-sm-screen',
  },
  {
    label: 'Contact',
    href: '/#contact',
    className: 'show-mobile',
  },
]

const Navigation = () => {
  const { pathname } = useLocation()
  const showHome = pathname !== '/'

  const handleNavigation = (href) => {
    if (href === '/portfolio') {
      track('cta_click', 'nav')
    }
    window.location.href = href
  }

  return (
    <nav className="main-nav-wrap" role="navigation" aria-labelledby="main_site_navigation">
      <h2 className="visually-hidden" id="main_site_navigation">
        Main Site Navigation
      </h2>
      <ul className={showHome ? 'show-home' : undefined}>
        {navItems.map((item) => (
          <li className={item.className} key={item.href}>
            <button type="button" onClick={() => handleNavigation(item.href)}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation