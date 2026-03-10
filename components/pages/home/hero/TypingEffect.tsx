'use client'
import { useState, useEffect, useCallback } from 'react'

interface TypingEffectProps {
  text: string
  speed?: number
  cursorColor?: string
  className?: string
}

export const TypingEffect = ({
  text,
  speed = 60,
  cursorColor = 'text-blue-400',
  className = '',
}: TypingEffectProps) => {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  const animate = useCallback(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    return animate()
  }, [animate])

  return (
    <span className={className}>
      {displayed}
      <span
        className={`ml-0.5 ${cursorColor} ${done ? 'animate-blink' : 'opacity-100'}`}
        aria-hidden="true"
      >
        |
      </span>
    </span>
  )
}
