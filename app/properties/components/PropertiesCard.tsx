import { Property } from "../model/PropertiesModel";
import {
  MapPin,
  Ruler,
  Home,
  Calendar,
  Star,
} from "lucide-react";

export default function PropertyCard({ property }: { property: Property }) {
  const rating = 4.3;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[#121212] border border-white/10 shadow-lg transition hover:shadow-2xl">
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {property.images?.length ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-neutral-800">
            <Home className="h-12 w-12 text-neutral-600" />
          </div>
        )}

        {/* STATUS BADGE */}
        <span
          className={`absolute left-3 top-3 rounded-lg px-3 py-1 text-xs font-semibold
          ${
            property.is_active
              ? "bg-emerald-500 text-black"
              : "bg-neutral-600 text-white"
          }`}
        >
          {property.is_active ? "Available" : "Rented"}
        </span>

        {/* PROPERTY TYPE */}
        <span className="absolute right-3 top-3 rounded-lg bg-black/70 px-3 py-1 text-xs text-white capitalize">
          {property.property_type.replace("_", " ")}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        {/* TITLE */}
        <h3 className="line-clamp-1 text-lg font-semibold text-white">
          {property.title}
        </h3>

        {/* LOCATION */}
        <div className="flex items-center gap-1 text-sm text-neutral-400">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">
            {property.city}, {property.state}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="line-clamp-2 text-sm text-neutral-400">
          {property.description}
        </p>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-3 rounded-xl bg-neutral-900 p-3">
          <div>
            <p className="flex items-center gap-1 text-xs text-neutral-500">
              <Ruler className="h-3 w-3" /> Area
            </p>
            <p className="text-sm font-semibold text-white">
              {property.area_sqft.toLocaleString()} sqft
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1 text-xs text-neutral-500">
              <Calendar className="h-3 w-3" /> Furnishing
            </p>
            <p className="text-sm font-semibold text-white capitalize">
              {property.furnishing_status.replace("_", " ")}
            </p>
          </div>
        </div>

        {/* ATTRIBUTES */}
        {property.attributes?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {property.attributes.slice(0, 3).map((attr, i) => (
              <span
                key={i}
                className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400"
              >
                {attr}
              </span>
            ))}
            {property.attributes.length > 3 && (
              <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-400">
                +{property.attributes.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div>
            <p className="text-xs text-neutral-500">Available From</p>
            <p className="text-sm font-medium text-white">
              {property.available_from
                ? new Date(property.available_from).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Immediately"}
            </p>
          </div>

          <div className="flex items-center gap-1 text-sm text-yellow-400">
            <Star className="h-4 w-4 fill-yellow-400" />
            {rating}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400">
          View Details
        </button>
      </div>
    </div>
  );
}
