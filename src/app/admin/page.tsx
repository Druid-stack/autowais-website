'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AdminContent() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const searchParams = useSearchParams();
  
  // Secret access methods
  const SECRET_KEY = 'autowais2025';
  const SECRET_URL_PARAM = 'access';

  useEffect(() => {
    // Check URL parameter access
    const accessParam = searchParams.get(SECRET_URL_PARAM);
    if (accessParam === SECRET_KEY) {
      setIsAuthorized(true);
    }

    // Keyboard shortcut listener (Ctrl+Shift+A)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        setIsAuthorized(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchParams]);

  if (!isAuthorized) {
    return (
      <main className="pt-20">
        {/* Access Denied Section */}
        <section className="bg-gradient-to-br from-red-50 to-red-100 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-red-900 sm:text-5xl">
                Access Denied
              </h1>
              <p className="mt-6 text-lg leading-8 text-red-700">
                This page requires special authorization to access.
              </p>
              <div className="mt-8">
                <Link
                  href="/"
                  className="rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden Access Hints */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">🔐 Special access required</p>
                  <p className="text-xs text-gray-500">
                    Hint: Try the keyboard shortcut or check the URL parameters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-green-900 sm:text-5xl">
              Admin Dashboard
              <span className="text-green-600"> Authorized</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-green-700">
              Welcome to the secure admin portal. Access granted.
            </p>
          </div>
        </div>
      </section>

      {/* Admin Controls */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Website Analytics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Analytics</h3>
              </div>
              <p className="text-gray-600 mb-4">View website traffic and performance metrics</p>
              <button className="text-emerald-600 hover:text-blue-700 font-semibold">View Details →</button>
            </div>

            {/* Contact Form Management */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Messages</h3>
              </div>
              <p className="text-gray-600 mb-4">Manage contact form submissions and inquiries</p>
              <button className="text-green-600 hover:text-green-700 font-semibold">View Messages →</button>
            </div>

            {/* Content Management */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Content</h3>
              </div>
              <p className="text-gray-600 mb-4">Update website content and manage pages</p>
              <button className="text-purple-600 hover:text-purple-700 font-semibold">Edit Content →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Access Methods */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Access Methods</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p className="mb-2">🔑 URL Parameter: Add <code className="bg-green-100 px-1 rounded">?access=autowais2025</code> to the URL</p>
                    <p>⌨️ Keyboard Shortcut: Press <code className="bg-green-100 px-1 rounded">Ctrl+Shift+A</code> on any page</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Admin() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
} 