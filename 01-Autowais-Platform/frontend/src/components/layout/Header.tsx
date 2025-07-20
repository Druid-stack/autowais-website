'use client';

import Link from 'next/link';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
import { useState } from 'react';
>>>>>>> d65c44c1018ee7fa15ae995eb2628bac95e8c0c1

const navigation = [
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    console.log('Mobile menu button clicked! Current state:', mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <img src="/images/autowais-logo-original.png" alt="AUTOWAIS" className="h-24 w-auto" />
          </Link>
        </div>
        
        {/* Mobile menu button - Made more visible */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-3 text-gray-700 hover:bg-gray-100 border border-gray-300 bg-white shadow-sm"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon - Made thicker and more visible */}
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={3}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
          >
            Let's Discuss Your Needs
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <img src="/images/autowais-logo-original.png" alt="AUTOWAIS" className="h-16 w-auto" />
              </Link>
              <button
                type="button"
                className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-6">
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-lg font-medium text-gray-900 hover:text-emerald-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-emerald-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-emerald-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Let's Discuss Your Needs
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 