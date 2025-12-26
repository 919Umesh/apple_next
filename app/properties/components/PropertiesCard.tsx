import { Property } from "../model/PropertiesModel";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Image Section */}
      {property.images?.length > 0 && (
        <div className="mb-4 h-48 overflow-hidden rounded-lg">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {property.title}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            property.is_active
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {property.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
        {property.description}
      </p>

      {/* Location */}
      <div className="mb-4">
        <p className="text-gray-500 text-sm">Location</p>
        <p className="font-medium text-sm">
          {property.address}, {property.city}, {property.state} - {property.pincode}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-gray-500">Property Type</p>
          <p className="font-medium capitalize">
            {property.property_type.replace("_", " ")}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Area</p>
          <p className="font-medium">{property.area_sqft.toLocaleString()} sqft</p>
        </div>

        <div>
          <p className="text-gray-500">Furnishing</p>
          <p className="font-medium capitalize">
            {property.furnishing_status.replace("_", " ")}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Available From</p>
          <p className="font-medium">
            {property.available_from 
              ? new Date(property.available_from).toLocaleDateString()
              : "Immediately"
            }
          </p>
        </div>
      </div>

      {/* Attributes */}
      {property.attributes?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {property.attributes.map((attr, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md"
            >
              {attr}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          Created: {new Date(property.created_at).toLocaleDateString()}
        </span>
        <span>
          Updated: {new Date(property.updated_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}