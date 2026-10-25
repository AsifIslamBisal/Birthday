import { useEffect, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import Balloons from './components/Balloons'
import Countdown from './components/Countdown'
import Finale from './components/Finale'
import Footer from './components/Footer'
import GiftBox from './components/GiftBox'
import GlowBackdrop from './components/GlowBackdrop'
import Hero from './components/Hero'
import IntroGate from './components/IntroGate'
import Kiss from './components/Kiss'
import LoveLetter from './components/LoveLetter'
import MusicPlayer from './components/MusicPlayer'
import Particles from './components/Particles'
import PhotoGallery from './components/PhotoGallery'
import ScrollProgress from './components/ScrollProgress'
import Wishes from './components/Wishes'
import { celebrate } from './utils/confetti'

function hasEnteredThisSession() {
  try {
    const forced = new URLSearchParams(window.location.search).get('intro') === '1'
    if (forced) return false
    return window.sessionStorage.getItem('birthday:entered') === '1'
  } catch {
    return false
  }
}

function App() {
  const [entered, setEntered] = useState(hasEnteredThisSession)

  useEffect(() => {
    if (!entered) return
    celebrate(3500)
  }, [entered])

  const handleEnter = () => {
    try {
      window.sessionStorage.setItem('birthday:entered', '1')
    } catch {
      // private mode / blocked storage: the intro simply shows again
    }
    setEntered(true)
  }

  const scrollToKiss = () => {
    document.getElementById('kiss')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-hidden">
        <GlowBackdrop />
        <Particles count={26} />
        <Balloons />
        <ScrollProgress />

        {entered && (
          <motion.main
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <Hero />
            <GiftBox onContinue={scrollToKiss} />
            <Kiss />
            <Countdown />
            <PhotoGallery />
            <LoveLetter />
            <Wishes />
            <Footer />
            <Finale />
          </motion.main>
        )}

        {!entered && <IntroGate onEnter={handleEnter} />}

        <MusicPlayer />
      </div>
    </MotionConfig>
  )
}

export default App
