import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="bg-base-200 py-16 mt-5 mb-5 rounded-lg">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Contact Us
        </h2>
        
       
        <div className="lg:grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Get in Touch
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              If you have any questions, inquiries, or need support, please fill out the form below or contact us via the details provided.
            </p>
            <form action="your-api-endpoint" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Full Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Email Address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Message"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You can also reach us directly through the following:
            </p>

            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <FaPhoneAlt size={24} className="mr-3 text-blue-600" />
                <a href="tel:+8801303572144" className="text-lg font-medium">
                  +880 1300 357 2144
                </a>
              </div>

              <div className="flex items-center text-gray-700">
                <FaEnvelope size={24} className="mr-3 text-blue-600" />
                <a href="mailto:pranaychowdhury00@gmail.com" className="text-lg font-medium">
                  pranaychowdhury00@gmail.com
                </a>
              </div>

              <div className="flex items-center text-gray-700">
                <FaWhatsapp size={24} className="mr-3 text-green-600" />
                <a
                  href="https://wa.me/8801303572144"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
