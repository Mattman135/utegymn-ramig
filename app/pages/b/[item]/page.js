import Header from "@/components/Header"
import Disclaimer from "@/components/Disclaimer"
import Footer from "@/components/Footer"
import rawData from "@/data/data.json"

export default async function ItemDetailPage(props) {
  const { item: encodedItemName } = await props.params
  const itemName = decodeURIComponent(encodedItemName)

  // Find item by title (what you use in the card link)
  const foundItem = rawData.find((entry) => {
    if (!entry.title) return false
    return entry.title.toLowerCase() === itemName.toLowerCase()
  })

  if (!foundItem) {
    return (
      <main className="p-4">
        <Header />
        <Disclaimer />
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-2xl font-bold">
            Hittade inte något för &quot;{itemName}&quot;
          </h1>
        </div>
        <Footer />
      </main>
    )
  }

  const category = foundItem.category ?? foundItem.categoryName
  const totalScore =
    typeof foundItem.totalScore === "number" ? foundItem.totalScore : 0
  const reviewsCount =
    typeof foundItem.reviewsCount === "number" ? foundItem.reviewsCount : 0
  const filledStars = Math.max(0, Math.min(5, Math.round(totalScore)))

  const fullAddress = [
    foundItem.street,
    foundItem.city,
    foundItem.state,
    foundItem.countryCode,
    foundItem.adress,
  ]
    .filter(Boolean)
    .join(", ")

  const mapQuery = fullAddress || foundItem.title || foundItem.city || "Sweden"

  return (
    <main className="">
      <Header />
      <Disclaimer />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            {/* Info card */}
            <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm p-6">
              <h1 className="text-2xl font-bold text-base-content">
                {foundItem.title}
              </h1>
              {category && (
                <p className="text-sm text-base-content/50 mt-1">{category}</p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 24 24"
                      className={`w-4 h-4 ${
                        i < filledStars ? "text-amber-400" : "text-base-300"
                      }`}
                      fill="currentColor"
                    >
                      <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.09L12 18.77l-6.18 2.73L7 14.41 2 9.27l7.1-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-base-content">
                  {totalScore ? totalScore.toFixed(1) : "0.0"}
                </span>
                <span className="text-sm text-base-content/50">
                  ({reviewsCount})
                </span>
              </div>

              {/* Address & phone */}
              <div className="mt-4 space-y-2 text-sm text-base-content/70">
                {fullAddress && (
                  <div className="flex items-start gap-2">
                    <span>{fullAddress}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {foundItem.phone ? (
                    <a
                      href={`tel:${foundItem.phone}`}
                      className="hover:text-primary transition-colors"
                    >
                      {foundItem.phone}
                    </a>
                  ) : (
                    <span className="text-base-content/60">Nummer saknas</span>
                  )}
                </div>

                {foundItem.website && (
                  <div className="flex items-center gap-2">
                    <a
                      href={foundItem.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary text-sm"
                    >
                      Webbplats
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Info + FAQ + Hours card */}
            <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm divide-y divide-base-200">
              {/* ── Overview ── */}
              <div className="p-6">
                <h2 className="text-base font-bold text-base-content mb-3">
                  Om {foundItem.title}
                </h2>
                <p className="text-sm text-base-content/70 leading-relaxed">
                  {foundItem.title} är en plats för {foundItem.categoryName}
                  {typeof totalScore === "number" && totalScore > 0
                    ? `, betygsatt ${totalScore.toFixed(1)}.`
                    : "."}
                  {foundItem.phone ? ` Ring oss på ${foundItem.phone}` : ""}
                  {fullAddress ? ` eller besök oss på ${fullAddress}.` : ""}
                </p>

                <blockquote className="mt-4 pl-4 border-l-4 border-primary/30 text-sm italic text-base-content/60 leading-relaxed">
                  {foundItem.title}
                  {foundItem.city ? `, ${foundItem.city}` : ""}. Hitta
                  öppettider, recensioner och kontaktuppgifter för{" "}
                  {foundItem.title}.
                </blockquote>
              </div>

              {/* ── FAQ ── */}
              <div className="p-6">
                <h2 className="text-base font-bold text-base-content mb-4">
                  Vanliga frågor
                </h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-base-content mb-1">
                      Vilka är öppettiderna på {foundItem.title}?
                    </h3>
                    <p className="text-sm text-base-content/70 leading-relaxed">
                      Ta reda på öppettiderna för {foundItem.title} så att du
                      kan planera ditt besök. Se öppettider nedan för att
                      säkerställa att du och din hund hinner njuta av
                      anläggningen.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-base-content mb-1">
                      Kostar det något att besöka {foundItem.title}?
                    </h3>
                    <p className="text-sm text-base-content/70 leading-relaxed">
                      Avgiftspolicyn på {foundItem.title} kan variera. Vissa
                      parker erbjuder fri entré, medan andra tar ut en mindre
                      avgift för underhåll.
                      {foundItem.website ? (
                        <>
                          {" "}
                          Kontrollera parkens webbplats eller kontakta dem
                          direkt för aktuell prisinformation.
                        </>
                      ) : (
                        " Kontakta parken direkt för aktuell prisinformation."
                      )}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-base-content mb-1">
                      Vilka faciliteter finns på {foundItem.title}?
                    </h3>
                    <p className="text-sm text-base-content/70 leading-relaxed">
                      {foundItem.title} erbjuder ett antal faciliteter för att
                      göra ditt besök trevligare.
                      {category
                        ? ` Dessa inkluderar ${category} och mer.`
                        : ""}{" "}
                      Kontakta parken för fullständig information om
                      tillgängliga faciliteter.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Hours (optional) ── */}
              <div className="p-6">
                <h2 className="text-base font-bold text-base-content mb-4">
                  Öppettider – {foundItem.title}
                </h2>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-base-200">
                    {[
                      ["Måndag", foundItem.hours?.monday],
                      ["Tisdag", foundItem.hours?.tuesday],
                      ["Onsdag", foundItem.hours?.wednesday],
                      ["Torsdag", foundItem.hours?.thursday],
                      ["Fredag", foundItem.hours?.friday],
                      ["Lördag", foundItem.hours?.saturday],
                      ["Söndag", foundItem.hours?.sunday],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-1.5 text-base-content/70">{label}</td>
                        <td className="py-1.5 text-right font-medium text-base-content">
                          {value || "Se webbplats eller kontakta parken"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Extra info / location summary ── */}
              <div className="p-6">
                <h2 className="text-base font-bold text-base-content mb-3">
                  {foundItem.title} – Plats
                </h2>
                <p className="text-sm text-base-content/70 leading-relaxed">
                  {foundItem.city && (
                    <>
                      {foundItem.city}
                      {foundItem.countryCode
                        ? `, ${foundItem.countryCode}`
                        : ""}
                      .{" "}
                    </>
                  )}
                  Denna plats är en del av ett nätverk av parker och
                  fritidsområden som gör det enklare att aktivera hundar och
                  ägare i närområdet.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — map */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-hidden sticky top-6">
              <iframe
                title="Location Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  mapQuery,
                )}&z=15&output=embed`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
              <div className="p-4">
                {fullAddress && (
                  <>
                    <p className="text-sm font-medium text-base-content">
                      {foundItem.street || foundItem.title}
                    </p>
                    <p className="text-xs text-base-content/50 mt-0.5">
                      {foundItem.city} {foundItem.state} {foundItem.countryCode}
                    </p>
                  </>
                )}
                {foundItem.url && (
                  <a
                    href={foundItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl bg-primary text-primary-content text-sm font-medium py-2.5 hover:opacity-90 transition-opacity"
                  >
                    Visa på Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
