'use client'

import { useEffect } from 'react'

export function TitanConsoleEgg() {
  useEffect(() => {
    const gold = 'color: #F2A900; font-weight: bold; font-size: 14px;'
    const dim = 'color: #8B7500; font-size: 11px;'
    const reset = 'color: #666; font-size: 10px; font-style: italic;'

    console.log(
      `%c
    ████████╗██╗████████╗ █████╗ ███╗   ██╗
    ╚══██╔══╝██║╚══██╔══╝██╔══██╗████╗  ██║
       ██║   ██║   ██║   ███████║██╔██╗ ██║
       ██║   ██║   ██║   ██╔══██║██║╚██╗██║
       ██║   ██║   ██║   ██║  ██║██║ ╚████║
       ╚═╝   ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝
`,
      gold,
    )

    console.log('%c  Junior Enterprise of Computer Engineering at UFBA', dim)

    console.log(
      '%c  🌀 Where it all began — this is where I learned to build, lead and grow.',
      reset,
    )

    console.log(
      '%c  You found the hidden message! Try clicking the heart 5 times... 💛',
      reset,
    )
  }, [])

  return null
}
