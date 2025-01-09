// LocationMap.js
import React from 'react';

function LocationMap() {
  return (
    <div className="container mx-auto p-6">
      {/* Title Section */}
      <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">
        Our Car Rental Locations in Bangladesh
      </h1>

      {/* Map Section */}
      <div className="mb-8">
        <iframe
          title="Bangladesh Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=88.0%2C20.0%2C92.0%2C26.0&layer=mapnik"
          width="100%"
          height="500"
          style={{ border: 0 }}
          className="rounded-lg shadow-md"
        ></iframe>
      </div>

      {/* Location Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Location 1 */}
        <div className="card bg-white shadow-xl rounded-lg p-4">
          <h3 className="text-xl font-bold text-purple-600 mb-2">Dhaka</h3>
          <p className="text-gray-600 mb-2">
            <strong>Location:</strong> The capital city of Bangladesh, home to many car rental services.
          </p>
          <p className="text-gray-600">
            <strong>Available Vehicles:</strong> Sedans, SUVs, and Hatchbacks.
          </p>
        </div>

        {/* Location 2 */}
        <div className="card bg-white shadow-xl rounded-lg p-4">
          <h3 className="text-xl font-bold text-purple-600 mb-2">Chittagong</h3>
          <p className="text-gray-600 mb-2">
            <strong>Location:</strong> A major port city with vibrant tourism and transport needs.
          </p>
          <p className="text-gray-600">
            <strong>Available Vehicles:</strong> Luxury cars and minivans.
          </p>
        </div>

        {/* Location 3 */}
        <div className="card bg-white shadow-xl rounded-lg p-4">
          <h3 className="text-xl font-bold text-purple-600 mb-2">Sylhet</h3>
          <p className="text-gray-600 mb-2">
            <strong>Location:</strong> Known for its tea gardens, a tourist spot with growing rental demand.
          </p>
          <p className="text-gray-600">
            <strong>Available Vehicles:</strong> Hatchbacks and compact cars.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LocationMap;
