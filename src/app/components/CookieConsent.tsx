'use client'

import { useState, useEffect } from 'react'
import { setCookie, getCookie } from 'cookies-next'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = getCookie('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const updateAnalyticsConsent = (granted: boolean) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: granted ? 'granted' : 'denied'
      });
    }
  }

  const handleAccept = () => {
    setCookie('cookie-consent', 'accepted', { maxAge: 60 * 60 * 24 * 365 }) // 1 year
    setIsVisible(false)
    updateAnalyticsConsent(true)
  }

  const handleDecline = () => {
    setCookie('cookie-consent', 'declined', { maxAge: 60 * 60 * 24 * 365 }) // 1 year
    setIsVisible(false)
    updateAnalyticsConsent(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 flex-1">
          <p>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and
            analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            {' '}
            <a
              href="/cookies-policy"
              className="text-maroon-600 hover:text-maroon-700 underline"
              onClick={(e) => e.stopPropagation()}
            >
              Read Our Cookie Policy
            </a>
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-md transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-maroon-600 hover:bg-maroon-700 rounded-md transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
