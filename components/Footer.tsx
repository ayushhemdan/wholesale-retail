import Link from 'next/link';

const PHONE_NUMBER = '+919761396049'; // Update with your phone number
const WHATSAPP_NUMBER = '+919761396049'; // Update with your WhatsApp number

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Rashmi Traders</h3>
            <p className="text-gray-400">
              Your trusted retail and wholesale supplier. Quality products at the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>📞</span>
                  <span>{PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Rashmi Traders. All rights reserved.</p>
          <div className="mt-4 text-sm">
            <p>
              Website designed & developed by <span className="font-semibold text-white">Ayush Hemdan</span>
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
              <a
                href="tel:+918057842292"
                className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>📞</span>
                <span>+91-8057842292</span>
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="mailto:ayush.hemdan04@email.com"
                className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>✉️</span>
                <span>ayush.hemdan04@email.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

