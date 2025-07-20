export default function MobileTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mobile Menu Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Testing Instructions</h2>
          
          <div className="space-y-4 text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <p>Open this page on your mobile device or resize your browser to mobile width</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <p>Look for the hamburger menu button (three lines) in the top-right corner of the header</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <p>Tap the hamburger menu button - it should have a white background with a border</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
              <p>The mobile menu should slide in from the right with navigation links</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
              <p>Tap any menu item or the X button to close the menu</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h3 className="font-semibold text-yellow-800 mb-2">Debug Information</h3>
            <p className="text-yellow-700 text-sm">
              Open your browser's developer console (F12) and look for console.log messages when you tap the mobile menu button.
              You should see: "Mobile menu button clicked! Current state: false/true"
            </p>
          </div>
          
          <div className="mt-6">
            <a 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 