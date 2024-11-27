'use client'
import { default as NextLink } from 'next/link'
import { Search } from 'lucide-react'
import { useState } from 'react'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Pet Shelter Network"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-3 text-xl font-semibold text-gray-900">Pet Shelter Network</span>
            </Link>
          </div>
          
          <nav className="flex space-x-8">
            <Link href="/find-shelters" className="text-gray-600 hover:text-gray-900">
              Find Shelters
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

