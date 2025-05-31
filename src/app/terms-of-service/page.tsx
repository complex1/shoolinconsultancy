import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Shoolin Legal Consultancy',
  description: 'Our terms of service outline the rules, guidelines, and legal agreements between you and Shoolin Legal Consultancy.',
  keywords: 'terms of service, legal terms, conditions, user agreement, service terms',
  openGraph: {
    title: 'Terms of Service | Shoolin Legal Consultancy',
    description: 'Review our terms of service and legal agreements.',
    type: 'website',
  },
}

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-black-700 bg-gradient-to-r from-black-700 via-black-600 to-black-700 bg-clip-text text-transparent">
        Terms of Service
      </h1>
      
      <div className="prose max-w-none">
        <p className="mb-4 text-gray-600">
          Last updated: May 24, 2025
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Acceptance of Terms</h2>
        <p className="mb-4 text-gray-700">
          By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Use License</h2>
        <p className="mb-4 text-gray-700">
          Permission is granted to temporarily access the materials on our website for personal, non-commercial transitory viewing only.
        </p>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Transfer the materials to another person</li>
          <li>Attempt to decompile or reverse engineer any software</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Disclaimer</h2>
        <p className="mb-4 text-gray-700">
          The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied,
          and hereby disclaim and negate all other warranties including, without limitation, implied warranties or
          conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Limitations</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mt-4 mb-2 text-black-600">Liability</h3>
          <p className="text-gray-700">We shall not be held liable for any damages arising from the use of our website.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2 text-black-600">Accuracy of Materials</h3>
          <p className="text-gray-700">The materials appearing on our website could include technical, typographical, or photographic errors.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2 text-black-600">Links</h3>
          <p className="text-gray-700">We have not reviewed all of the sites linked to our website and are not responsible for their contents.</p>
        </div>
      </div>
    </div>
  );
}
