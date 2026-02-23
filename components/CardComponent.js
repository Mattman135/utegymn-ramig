"use client"

import Link from "next/link"
import Image from "next/image"

const CardComponent = ({ item }) => {
  // Basic fields
  const title = item["title"] ?? "Missing title"
  const imageUrl = "/icon.jpg"
  const category =
    item["category"] ?? item["categoryName"] ?? "Missing category"

  // Rating fields
  const totalScore =
    typeof item["totalScore"] === "number" ? item["totalScore"] : 0
  const reviewsCount =
    typeof item["reviewsCount"] === "number" ? item["reviewsCount"] : 0
  const filledStars = Math.max(0, Math.min(5, Math.round(totalScore)))

  // Address line: street, city, state, countryCode, adress
  const fullAddress = [
    item["street"],
    item["city"],
    item["state"],
    item["countryCode"],
    item["adress"],
  ]
    .filter(Boolean)
    .join(", ")

  // Detail route: use title for the detail page slug
  const detailKey = title

  return (
    <div className="card bg-base-100 w-96 shadow-sm group overflow-hidden">
      {imageUrl && (
        <figure className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </figure>
      )}

      <div className="card-body w-full max-w-full overflow-hidden">
        {/* Title */}
        <h2 className="card-title font-bold text-lg leading-tight break-words">
          {title}
        </h2>

        {/* Category */}
        {category && (
          <p className="text-sm text-base-content/60 break-words">{category}</p>
        )}

        {/* Rating: stars + (reviewsCount) */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                viewBox="0 0 24 24"
                className={`w-4 h-4 ${
                  index < filledStars ? "text-amber-400" : "text-base-300"
                }`}
                fill="currentColor"
              >
                <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.09L12 18.77l-6.18 2.73L7 14.41 2 9.27l7.1-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-semibold text-base-content/80 leading-none">
            {totalScore.toFixed(1)}
          </span>
          <span className="text-xs text-base-content/50 leading-none">
            ({reviewsCount})
          </span>
        </div>

        {/* Address line */}
        {fullAddress && (
          <p className="text-sm text-base-content/80 mt-2 break-words">
            {fullAddress}
          </p>
        )}

        {/* Button aligned to the right */}
        <div className="card-actions justify-end mt-4">
          <Link
            href={`/pages/b/${encodeURIComponent(detailKey)}`}
            className="btn btn-sm btn-primary rounded-full"
          >
            Visa
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardComponent
