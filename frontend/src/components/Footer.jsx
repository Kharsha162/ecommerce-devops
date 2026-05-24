import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

/**
 * Footer Component
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* About */}
        <div>
          <h3 className="font-bold text-white mb-4">eCommerce</h3>
          <p className="text-sm">
            Your trusted online marketplace for quality products at competitive prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-bold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Track Order</a></li>
            <li><a href="#" className="hover:text-white transition">Returns</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-bold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition"><FiFacebook size={20} /></a>
            <a href="#" className="hover:text-white transition"><FiTwitter size={20} /></a>
            <a href="#" className="hover:text-white transition"><FiInstagram size={20} /></a>
            <a href="#" className="hover:text-white transition"><FiLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 mb-6" />

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p>&copy; 2024 eCommerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
