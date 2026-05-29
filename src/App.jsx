import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import BioHeader from './components/BioHeader'
import BriefBio from './components/BriefBio'
import BookSection from './components/BookSection'
import LargeBio from './components/LargeBio'
import AILLMSkillsSection from './components/AILLMSkillsSection'
import PortfolioQuestSection from './components/PortfolioQuestSection'
import WhoHiredMe from './components/WhoHiredMe'
import HireMe from './components/HireMe'
import PortfolioList from './components/PortfolioList'
import XPSPage from './components/XPSPage'
import './less/style.less'
function App() {
  const [showTop, setShowTop] = useState(false)
  const [showBookDesc, setShowBookDesc] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > window.innerHeight * 1.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className={`${showTop ? 'show-top' : ''} ${showBookDesc ? 'show-book-desc-section' : ''}`}>
            <div className="move-wrap">
              <a href="#top" className="move-to-top-wrap">TOP</a>
            </div>
            
            <div id="top"></div>
            
            <section id="slide">
              <Navigation />
              <BioHeader />
            </section>
            
            <div id="cover">
              <BriefBio />
              <BookSection showBookDesc={showBookDesc} setShowBookDesc={setShowBookDesc} />
              <PortfolioQuestSection />
              <AILLMSkillsSection />
              <LargeBio />
              <WhoHiredMe />
              <HireMe />
            </div>
          </div>
        } />
        <Route path="/portfolio" element={
          <div className="port-body">  
          <div className="container">
            <Navigation />
            <PortfolioList />
            </div>
          </div>
          } />
        <Route path="/port/xps" element={<XPSPage />} />
      </Routes>
    </Router>
  )
}

export default App