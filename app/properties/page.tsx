import { getProperties } from "./actions/propertiesActions";
import PropertyCard from "./components/PropertiesCard";


export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen bg-[#0b0b0b] p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Property Management
        </h1>
        <p className="mt-1 text-neutral-400">
          Manage and explore all listed properties
        </p>
      </div>

      {/* EMPTY STATE */}
      {!properties || properties.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center text-neutral-500">
          No properties available.
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard
                key={property.property_id}
                property={property}
              />
            ))}
          </div>

          {/* FOOTER */}
          <p className="mt-8 text-center text-sm text-neutral-500">
            Showing {properties.length} propert
            {properties.length === 1 ? "y" : "ies"}
          </p>
        </>
      )}
    </main>
  );
}
