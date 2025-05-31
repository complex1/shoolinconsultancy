import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookies Policy | Shoolin Legal Consultancy',
  description: 'Our cookies policy explains how we use cookies and similar tracking technologies on our website to enhance your browsing experience.',
  keywords: 'cookies policy, privacy, legal, website cookies, cookie settings, cookie management',
  openGraph: {
    title: 'Cookies Policy | Shoolin Legal Consultancy',
    description: 'Learn about how we use cookies and how you can manage your cookie preferences.',
    type: 'website',
  },
}

export default function CookiesPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-black-700 bg-gradient-to-r from-black-700 via-black-600 to-black-700 bg-clip-text text-transparent">
        Cookies Policy
      </h1>
      
      <div className="prose max-w-none">
        <p className="mb-4 text-gray-600">
          Last updated: May 24, 2025
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">What Are Cookies</h2>
        <p className="mb-4 text-gray-700">
          Cookies are small text files that are stored on your computer or mobile device when you visit our website. 
          They allow us to remember your preferences and improve your browsing experience.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">How We Use Cookies</h2>
        <p className="mb-4 text-gray-700">
          We use cookies for the following purposes:
        </p>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Essential cookies: Required for the website to function properly</li>
          <li>Analytics cookies: Help us understand how visitors use our website</li>
          <li>Preference cookies: Remember your settings and preferences</li>
          <li>Marketing cookies: Used to deliver relevant advertisements</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Types of Cookies We Use</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mt-4 mb-2 text-black-600">Essential Cookies</h3>
          <p className="text-gray-700">These cookies are necessary for the website to function and cannot be switched off.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2 text-black-600">Performance Cookies</h3>
          <p className="text-gray-700">These cookies help us understand how visitors interact with our website.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2 text-black-600">Functional Cookies</h3>
          <p className="text-gray-700">These cookies enable enhanced functionality and personalization.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2 text-black-600">Targeting Cookies</h3>
          <p className="text-gray-700">These cookies may be set by our advertising partners.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Managing Cookies</h2>
        <p className="mb-4 text-gray-700">
          You can control and/or delete cookies as you wish. You can delete all cookies that are already 
          on your computer and you can set most browsers to prevent them from being placed.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Your Choices</h2>
        <p className="mb-4 text-gray-700">
          When you first visit our website, you will be presented with a cookie banner where you can choose 
          to accept or decline non-essential cookies. You can change your preferences at any time by clicking 
          the &quot;Cookie Settings&quot; button in the footer.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Contact Us</h2>
        <p className="mb-4 text-gray-700">
          If you have any questions about our use of cookies, please contact us through our contact page.
        </p>
      </div>
    </div>
  )
}
