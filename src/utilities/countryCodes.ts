/**
 * Maps human-readable country names to their ISO 3166-1 alpha-2 codes.
 *
 * Used by the Flag component and country marquees so content authors can write
 * plain country names (e.g. "Saudi Arabia") and still get the right flag.
 */

const COUNTRY_CODE_MAP: Record<string, string> = {
  'saudi arabia': 'SA',
  'united arab emirates': 'AE',
  uae: 'AE',
  qatar: 'QA',
  kuwait: 'KW',
  oman: 'OM',
  bahrain: 'BH',
  malaysia: 'MY',
  romania: 'RO',
  poland: 'PL',
  'united kingdom': 'GB',
  uk: 'GB',
  iraq: 'IQ',
  algeria: 'DZ',
  'south korea': 'KR',
  japan: 'JP',
  belarus: 'BY',
  turkey: 'TR',
  türkiye: 'TR',
  pakistan: 'PK',
  germany: 'DE',
  italy: 'IT',
  hungary: 'HU',
  croatia: 'HR',
  serbia: 'RS',
  france: 'FR',
  spain: 'ES',
  portugal: 'PT',
  libya: 'LY',
  jordan: 'JO',
  kazakhstan: 'KZ',
  kyrgyzstan: 'KG',
  uzbekistan: 'UZ',
  azerbaijan: 'AZ',
  canada: 'CA',
  australia: 'AU',
  // Added for migrated destination markets
  greece: 'GR',
  cyprus: 'CY',
  lithuania: 'LT',
  latvia: 'LV',
  estonia: 'EE',
  georgia: 'GE',
  armenia: 'AM',
  bulgaria: 'BG',
  'czech republic': 'CZ',
  czechia: 'CZ',
  slovakia: 'SK',
  slovenia: 'SI',
  malta: 'MT',
  netherlands: 'NL',
  belgium: 'BE',
  austria: 'AT',
  sweden: 'SE',
  denmark: 'DK',
  finland: 'FI',
  norway: 'NO',
  ireland: 'IE',
  switzerland: 'CH',
  turkmenistan: 'TM',
  tajikistan: 'TJ',
  'south africa': 'ZA',
  egypt: 'EG',
  morocco: 'MA',
  tunisia: 'TN',
  nigeria: 'NG',
  kenya: 'KE',
  ghana: 'GH',
  tanzania: 'TZ',
  uganda: 'UG',
  'united states': 'US',
  usa: 'US',
}

/**
 * Resolve an ISO 3166-1 alpha-2 country code from a country name.
 *
 * The lookup is case-insensitive and tolerant of surrounding whitespace.
 * Returns `undefined` when the name is not recognised.
 */
export function countryCodeFromName(name: string): string | undefined {
  const normalized = name.trim().toLowerCase()
  if (!normalized) return undefined
  return COUNTRY_CODE_MAP[normalized]
}
