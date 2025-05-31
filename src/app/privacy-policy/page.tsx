import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Shoolin Legal Consultancy',
  description: 'Our privacy policy outlines how we collect, use, and protect your personal information.',
  keywords: 'privacy policy, data protection, legal, personal information, data security',
  openGraph: {
    title: 'Privacy Policy | Shoolin Legal Consultancy',
    description: 'Learn about how we protect your privacy and handle your personal information.',
    type: 'website',
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-black-700 bg-gradient-to-r from-black-700 via-black-600 to-black-700 bg-clip-text text-transparent">
        Privacy Policy
      </h1>
      
      <div className="prose max-w-none">
        <p className="mb-4 text-gray-600">
          Last updated: May 24, 2025
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Information We Collect</h2>
        <p className="mb-4 text-gray-700">
          We collect information that you provide directly to us, information we obtain automatically when you visit our website,
          and information from third-party sources in accordance with applicable law.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">How We Use Your Information</h2>
        <p className="mb-4 text-gray-700">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Providing and improving our services</li>
          <li>Communicating with you about our services</li>
          <li>Protecting our legal rights and preventing misuse</li>
          <li>Complying with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Data Security</h2>
        <p className="mb-4 text-gray-700">
          We implement appropriate technical and organizational security measures to protect your personal information
          against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-black-700">Your Rights</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mt-4 mb-2 text-black-600">Access and Correction</h3>
          <p className="text-gray-700">You have the right to access and correct your personal information.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2 text-black-600">Data Portability</h3>
          <p className="text-gray-700">You may request a copy of your personal data in a structured format.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2 text-black-600">Deletion</h3>
          <p className="text-gray-700">You may request deletion of your personal information in certain circumstances.</p>
        </div>
      </div>
    </div>
  );
}
