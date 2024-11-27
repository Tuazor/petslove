'use client'
import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-green-600 transition duration-300">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-green-600 transition duration-300">Contact</Link></li>
              <li><Link href="/sitemap" className="text-gray-600 hover:text-green-600 transition duration-300">Sitemap</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/adopt" className="text-gray-600 hover:text-green-600 transition duration-300">Adoption Process</Link></li>
              <li><Link href="/care-tips" className="text-gray-600 hover:text-green-600 transition duration-300">Pet Care Tips</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-green-600 transition duration-300">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 hover:text-green-600 transition duration-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-green-600 transition duration-300">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300" aria-label="Instagram">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">&copy; 2023 PetsLove. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

