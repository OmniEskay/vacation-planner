import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: '', type: '' });

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ message: '', type: '' });

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setSubmitStatus({ message: 'Please fill in all fields.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    const contactData = {
        name: contactName.trim(),
        email: contactEmail.trim(),
        message: contactMessage.trim(),
        submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", errorBody);
        throw new Error(Network response was not ok. Status: ${response.status});
      }

      setSubmitStatus({ message: 'Thank you for your message! We have received it.', type: 'success' });
      setContactName('');
      setContactEmail('');
      setContactMessage('');

    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus({ message: 'Failed to send message. Please try again later.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between mb-8">
          <div className="mb-6 md:mb-0 md:w-1/3 lg:w-1/4">
            <Link to="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
              Dream Vacation Planner
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              Plan your perfect getaway to destinations around the world.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Navigation</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white text-sm">Home</Link></li>
                <li><Link to="/explore" className="text-gray-300 hover:text-white text-sm">Explore</Link></li>
                <li><Link to="/my-trip" className="text-gray-300 hover:text-white text-sm">My Trip</Link></li>
                <li><Link to="/add-destination" className="text-gray-300 hover:text-white text-sm">Add Destination</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Travel Tips</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">FAQ</a></li>
                <li><a href="#contact-form" className="text-gray-300 hover:text-white text-sm">Contact Us</a></li>
              </ul>
            </div>
             <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div id="contact-form" className="bg-gray-700 p-6 rounded-lg mb-8">
           <h3 className="text-lg font-semibold mb-4 text-center">Contact Us</h3>
           <form onSubmit={handleContactSubmit} className="space-y-4 max-w-xl mx-auto">
             <div>
               <label htmlFor="contact-name" className="sr-only">Name</label>
               <input
                 type="text"
                 id="contact-name"
                 name="name"
                 value={contactName}
                 onChange={(e) => setContactName(e.target.value)}
                 placeholder="Your Name"
                 className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                 required
               />
             </div>
             <div>
               <label htmlFor="contact-email" className="sr-only">Email</label>
               <input
                 type="email"
                 id="contact-email"
                 name="email"
                 value={contactEmail}
                 onChange={(e) => setContactEmail(e.target.value)}
                 placeholder="Your Email"
                 className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                 required
               />
             </div>
             <div>
               <label htmlFor="contact-message" className="sr-only">Message</label>
               <textarea
                 id="contact-message"
                 name="message"
                 rows="4"
                 value={contactMessage}
                 onChange={(e) => setContactMessage(e.target.value)}
                 placeholder="Your Message"
                 className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                 required
               ></textarea>
             </div>
             {submitStatus.message && (
                <div className={text-sm p-3 rounded-md ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}}>
                    {submitStatus.message}
                </div>
             )}
             <div className="text-center">
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className={`px-6 py-2 rounded-md text-white font-semibold transition duration-300 ease-in-out ${
                   isSubmitting
                     ? 'bg-gray-500 cursor-not-allowed'
                     : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500' // Active style
                 }`}
               >
                 {isSubmitting ? 'Sending...' : 'Send Message'}
               </button>
             </div>
           </form>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="flex flex-col items-center justify-between md:flex-row">
          <span className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} Dream Vacation Planner. All rights reserved.
          </span>
          <div className="flex space-x-6">
             <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Facebook">
               <span className="sr-only">Facebook</span>
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
             </a>
             <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Instagram">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
             </a>
             <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;