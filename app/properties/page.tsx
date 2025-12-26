import { getProperties } from "./actions/propertiesActions";
import PropertyCard from "./components/PropertiesCard";


export default async function PropertiesPage() {
  const properties = await getProperties();

  if (!properties || properties.length === 0) {
    return (
      <main className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No properties available.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Properties</h1>
        <p className="text-gray-600 mt-2">
          Browse through our collection of premium properties
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.property_id} property={property} />
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Showing {properties.length} propert{properties.length === 1 ? 'y' : 'ies'}
      </div>
    </main>
  );
}