'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Settings } from 'lucide-react'

export default function AccessibilitySettings() {
  const [fontSize, setFontSize] = useState(16)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  return (
<<<<<<< HEAD
    <div className="fixed bottom-4 left-4 z-50">
=======
<<<<<<< HEAD
    <div className="fixed bottom-4 left-4 z-50">
=======
    <div className="fixed bottom-4 right-4 z-50">
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#B10DC9] hover:bg-[#8a0a9b] text-white rounded-full p-2"
        aria-label="Open accessibility settings"
      >
        <Settings className="h-6 w-6" />
      </Button>
      {isOpen && (
<<<<<<< HEAD
        <div className="absolute bottom-12 left-0 bg-white p-4 rounded-lg shadow-lg w-64">
=======
<<<<<<< HEAD
        <div className="absolute bottom-12 left-0 bg-white p-4 rounded-lg shadow-lg w-64">
=======
        <div className="absolute bottom-12 right-0 bg-white p-4 rounded-lg shadow-lg w-64">
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
          <h2 className="text-lg font-semibold mb-2">Accessibility Settings</h2>
          <div className="mb-4">
            <label htmlFor="font-size" className="block text-sm font-medium text-gray-700 mb-1">
              Font Size: {fontSize}px
            </label>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              aria-label="Adjust font size"
            />
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full bg-[#B10DC9] hover:bg-[#8a0a9b] text-white"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  )
}

