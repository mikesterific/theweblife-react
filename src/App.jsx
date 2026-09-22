import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { trackPageview } from './utils/track'
import Navigation from './components/Navigation'
import HireMe from './components/HireMe'
import SignalHome from './components/signal/SignalHome'
import PortfolioList from './components/PortfolioList'
import XPSPage from './components/XPSPage'
import './less/style.less'

const TRACKED_PATHS = ['/', '/portfolio']

// Module-level guard so StrictMode's double effect invocation in dev
// doesn't record duplicate pageviews for the same path.
let lastTrackedPath = null

function PageviewTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (TRACKED_PATHS.includes(pathname) && pathname !== lastTrackedPath) {
      lastTrackedPath = pathname
      trackPageview()
    }
  }, [pathname])

  return null
}

function App() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > window.innerHeight * 1.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Router>
      <PageviewTracker />
      <Routes>
        <Route path="/" element={<SignalHome />} />
        <Route path="/portfolio" element={
          <div className={`port-body${showTop ? ' show-top' : ''}`}>
            <div className="move-wrap">
              <a href="#portfolio-top" className="move-to-top-wrap">TOP</a>
            </div>
            <div id="portfolio-top"></div>
            <Navigation />
            <div className="container">
              <PortfolioList />
            </div>
            <HireMe />
          </div>
        } />
        <Route path="/portfolio.html" element={<Navigate to="/portfolio" replace />} />
        <Route path="/port/xps" element={<XPSPage />} />
      </Routes>
    </Router>
  )
}

export default App