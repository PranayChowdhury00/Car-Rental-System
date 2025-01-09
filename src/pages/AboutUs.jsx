import carImg from "/carImg.webp";
import { FaRegHandshake, FaCar, FaUsers, FaHeadset } from "react-icons/fa";
import person1 from "/person1.avif";
import person2 from "/person2.jpg";
import person3 from "/person3.jpg";
const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-16 rounded-lg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            About Flexi-Drive
          </h2>
          <p className="text-lg text-gray-600">
            At Flexi-Drive, we provide more than just a car rental service. We
            offer freedom, flexibility, and the convenience of premium vehicles
            tailored to your travel needs.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="w-100% grid md:grid-cols-2 gap-12 mb-16">
          <div className="max-w-md mx-auto">
            {" "}
            {/* Apply max width to match image */}
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Story
            </h3>
            <p className="text-lg text-gray-700  leading-9">
              Flexi-Drive was founded with a simple mission: to make car rental
              as easy and convenient as possible. Over the years, we’ve grown
              into one of the most trusted car rental services, offering a wide
              range of vehicles to suit every need. Whether you're traveling for
              business or pleasure, we ensure that you have the right car for
              your journey, at competitive prices.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={carImg}
              alt="About Us"
              className="rounded-lg shadow-xl w-full max-w-[330px]"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-gray-900 text-center mb-8">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4 text-gray-700">
              <FaRegHandshake size={40} className="text-blue-600" />
              <div>
                <h4 className="text-xl font-semibold">Customer First</h4>
                <p>
                  We prioritize your needs and ensure exceptional service
                  throughout your rental experience.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-700">
              <FaCar size={40} className="text-green-600" />
              <div>
                <h4 className="text-xl font-semibold">Quality Vehicles</h4>
                <p>
                  We offer a wide range of well-maintained vehicles to suit your
                  travel needs and budget.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-700">
              <FaUsers size={40} className="text-purple-600" />
              <div>
                <h4 className="text-xl font-semibold">Reliable Service</h4>
                <p>
                  Our team is committed to ensuring that you have a smooth and
                  hassle-free rental experience.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-700">
              <FaHeadset size={40} className="text-red-600" />
              <div>
                <h4 className="text-xl font-semibold">24/7 Support</h4>
                <p>
                  Our customer support team is available 24/7 to assist with any
                  questions or issues you may have.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-gray-900 text-center mb-8">
            Meet the Team
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: "Alice",
                img: person1,
                role: "CEO",
                description:
                  "With a passion for innovation, Alice is driving the company's vision to new heights, ensuring that Flexi-Drive remains a leader in the car rental industry.",
              },
              {
                name: "Bob",
                img: person2,
                role: "CTO",
                description:
                  "Bob is the technological mastermind behind our platform, creating seamless and efficient solutions that make the car rental experience smoother for our users.",
              },
              {
                name: "Charlie",
                img: person3,
                role: "COO",
                description:
                  "As Chief Operating Officer, Charlie ensures the smooth functioning of daily operations, optimizing everything from customer service to fleet management.",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="text-center bg-white shadow-lg rounded-lg p-6"
              >
                <img
                  src={member.img} // Use the imported images
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h4>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-gray-500">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg mb-6 text-gray-600">
            Ready to hit the road? Discover the perfect vehicle for your journey
            today.
          </p>
          <a
            href="/available-car"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Browse Our Cars
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
