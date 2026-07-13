import locations from "@/data/locations.json";

const STATE_ABBR = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
  colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
  kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS",
  missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV",
  "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
  "north carolina": "NC", "north dakota": "ND", ohio: "OH", oklahoma: "OK",
  oregon: "OR", pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC",
  "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT",
  virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI",
  wyoming: "WY",
};

const VALID_ABBRS = new Set(Object.values(STATE_ABBR));

// Pulls the 2-letter state code out of "Homewood, AL" -> "AL"
function extractStateAbbr(cityState) {
  if (!cityState) return null;
  const parts = cityState.split(",");
  if (parts.length < 2) return null;
  const abbr = parts[1].trim().toUpperCase();
  return VALID_ABBRS.has(abbr) ? abbr : null;
}

// Pulls the city out of "Homewood, AL" -> "Homewood"
function extractCity(cityState) {
  if (!cityState) return null;
  return cityState.split(",")[0].trim();
}

function toAbbr(input) {
  if (!input) return null;
  const normalized = input.trim().toLowerCase();
  if (STATE_ABBR[normalized]) return STATE_ABBR[normalized];
  const upper = input.trim().toUpperCase();
  return VALID_ABBRS.has(upper) ? upper : null;
}

export function findLocationsByState(input) {
  const abbr = toAbbr(input);
  if (!abbr) return [];
  return locations.filter((loc) => extractStateAbbr(loc.cityState) === abbr);
}

export function findLocationsByCity(input) {
  if (!input) return [];
  const normalized = input.trim().toLowerCase();
  return locations.filter((loc) => {
    const city = extractCity(loc.cityState);
    return city && city.toLowerCase().includes(normalized);
  });
}

export function findLocationsByZip(zip) {
  if (!zip) return [];
  return locations.filter((loc) => loc.zip === zip);
}

// Scans free text (e.g. the user's latest message) for a ZIP code, state
// name/abbreviation, or a city name, and returns matching locations.
export function findLocationsFromText(text) {
  if (!text) return [];
  const lower = text.toLowerCase();

  // Check for a 5-digit ZIP code first — most specific match
  const zipMatch = lower.match(/\b\d{5}\b/);
  if (zipMatch) {
    const zipMatches = locations.filter((loc) => loc.zip === zipMatch[0]);
    if (zipMatches.length > 0) return zipMatches;
  }

  // Check for a full state name or standalone abbreviation
  for (const [name, abbr] of Object.entries(STATE_ABBR)) {
    const abbrPattern = new RegExp(`\\b${abbr.toLowerCase()}\\b`);
    if (lower.includes(name) || abbrPattern.test(lower)) {
      const stateMatches = findLocationsByState(abbr);
      if (stateMatches.length > 0) return stateMatches;
    }
  }

  // Fall back to city name matching
  const cityMatches = locations.filter((loc) => {
    const city = extractCity(loc.cityState);
    return city && lower.includes(city.toLowerCase());
  });
  return cityMatches;
}

function formatHours(hours) {
  if (!hours) return "";
  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });
  return hours[today] ? ` (today: ${hours[today]})` : "";
}

export function formatLocationsForPrompt(matches, limit = 5) {
  if (!matches || matches.length === 0) return "";
  return matches
    .slice(0, limit)
    .map((loc) => {
      const phone = loc.phone ? `, ${loc.phone}` : "";
      return `- ${loc.name}: ${loc.address}, ${loc.cityState} ${loc.zip}${phone}${formatHours(loc.hours)}`;
    })
    .join("\n");
}