// Country data with flags and coordinates
const countriesData = {
    'A': [
        { name: 'Afghanistan', flag: '🇦🇫', id: 'AF' },
        { name: 'Albania', flag: '🇦🇱', id: 'AL' },
        { name: 'Algeria', flag: '🇩🇿', id: 'DZ' },
        { name: 'Andorra', flag: '🇦🇩', id: 'AD' },
        { name: 'Angola', flag: '🇦🇴', id: 'AO' },
        { name: 'Antigua and Barbuda', flag: '🇦🇬', id: 'AG' },
        { name: 'Argentina', flag: '🇦🇷', id: 'AR' },
        { name: 'Armenia', flag: '🇦🇲', id: 'AM' },
        { name: 'Australia', flag: '🇦🇺', id: 'AU' },
        { name: 'Austria', flag: '🇦🇹', id: 'AT' },
        { name: 'Azerbaijan', flag: '🇦🇿', id: 'AZ' }
    ],
    'B': [
        { name: 'Bahamas', flag: '🇧🇸', id: 'BS' },
        { name: 'Bahrain', flag: '🇧🇭', id: 'BH' },
        { name: 'Bangladesh', flag: '🇧🇩', id: 'BD' },
        { name: 'Barbados', flag: '🇧🇧', id: 'BB' },
        { name: 'Belarus', flag: '🇧🇾', id: 'BY' },
        { name: 'Belgium', flag: '🇧🇪', id: 'BE' },
        { name: 'Belize', flag: '🇧🇿', id: 'BZ' },
        { name: 'Benin', flag: '🇧🇯', id: 'BJ' },
        { name: 'Bhutan', flag: '🇧🇹', id: 'BT' },
        { name: 'Bolivia', flag: '🇧🇴', id: 'BO' },
        { name: 'Bosnia and Herzegovina', flag: '🇧🇦', id: 'BA' },
        { name: 'Botswana', flag: '🇧🇼', id: 'BW' },
        { name: 'Brazil', flag: '🇧🇷', id: 'BR' },
        { name: 'Brunei', flag: '🇧🇳', id: 'BN' },
        { name: 'Bulgaria', flag: '🇧🇬', id: 'BG' },
        { name: 'Burkina Faso', flag: '🇧🇫', id: 'BF' },
        { name: 'Burundi', flag: '🇧🇮', id: 'BI' }
    ],
    'C': [
        { name: 'Cambodia', flag: '🇰🇭', id: 'KH' },
        { name: 'Cameroon', flag: '🇨🇲', id: 'CM' },
        { name: 'Canada', flag: '🇨🇦', id: 'CA' },
        { name: 'Cape Verde', flag: '🇨🇻', id: 'CV' },
        { name: 'Central African Republic', flag: '🇨🇫', id: 'CF' },
        { name: 'Chad', flag: '🇹🇩', id: 'TD' },
        { name: 'Chile', flag: '🇨🇱', id: 'CL' },
        { name: 'China', flag: '🇨🇳', id: 'CN' },
        { name: 'Colombia', flag: '🇨🇴', id: 'CO' },
        { name: 'Comoros', flag: '🇰🇲', id: 'KM' },
        { name: 'Congo', flag: '🇨🇬', id: 'CG' },
        { name: 'Costa Rica', flag: '🇨🇷', id: 'CR' },
        { name: 'Croatia', flag: '🇭🇷', id: 'HR' },
        { name: 'Cuba', flag: '🇨🇺', id: 'CU' },
        { name: 'Cyprus', flag: '🇨🇾', id: 'CY' },
        { name: 'Czech Republic', flag: '🇨🇿', id: 'CZ' }
    ],
    'D': [
        { name: 'Denmark', flag: '🇩🇰', id: 'DK' },
        { name: 'Djibouti', flag: '🇩🇯', id: 'DJ' },
        { name: 'Dominica', flag: '🇩🇲', id: 'DM' },
        { name: 'Dominican Republic', flag: '🇩🇴', id: 'DO' }
    ],
    'E': [
        { name: 'Ecuador', flag: '🇪🇨', id: 'EC' },
        { name: 'Egypt', flag: '🇪🇬', id: 'EG' },
        { name: 'El Salvador', flag: '🇸🇻', id: 'SV' },
        { name: 'Equatorial Guinea', flag: '🇬🇶', id: 'GQ' },
        { name: 'Eritrea', flag: '🇪🇷', id: 'ER' },
        { name: 'Estonia', flag: '🇪🇪', id: 'EE' },
        { name: 'Eswatini', flag: '🇸🇿', id: 'SZ' },
        { name: 'Ethiopia', flag: '🇪🇹', id: 'ET' }
    ],
    'F': [
        { name: 'Fiji', flag: '🇫🇯', id: 'FJ' },
        { name: 'Finland', flag: '🇫🇮', id: 'FI' },
        { name: 'France', flag: '🇫🇷', id: 'FR' }
    ],
    'G': [
        { name: 'Gabon', flag: '🇬🇦', id: 'GA' },
        { name: 'Gambia', flag: '🇬🇲', id: 'GM' },
        { name: 'Georgia', flag: '🇬🇪', id: 'GE' },
        { name: 'Germany', flag: '🇩🇪', id: 'DE' },
        { name: 'Ghana', flag: '🇬🇭', id: 'GH' },
        { name: 'Greece', flag: '🇬🇷', id: 'GR' },
        { name: 'Grenada', flag: '🇬🇩', id: 'GD' },
        { name: 'Guatemala', flag: '🇬🇹', id: 'GT' },
        { name: 'Guinea', flag: '🇬🇳', id: 'GN' },
        { name: 'Guinea-Bissau', flag: '🇬🇼', id: 'GW' },
        { name: 'Guyana', flag: '🇬🇾', id: 'GY' }
    ],
    'H': [
        { name: 'Haiti', flag: '🇭🇹', id: 'HT' },
        { name: 'Honduras', flag: '🇭🇳', id: 'HN' },
        { name: 'Hungary', flag: '🇭🇺', id: 'HU' }
    ],
    'I': [
        { name: 'Iceland', flag: '🇮🇸', id: 'IS' },
        { name: 'India', flag: '🇮🇳', id: 'IN' },
        { name: 'Indonesia', flag: '🇮🇩', id: 'ID' },
        { name: 'Iran', flag: '🇮🇷', id: 'IR' },
        { name: 'Iraq', flag: '🇮🇶', id: 'IQ' },
        { name: 'Ireland', flag: '🇮🇪', id: 'IE' },
        { name: 'Israel', flag: '🇮🇱', id: 'IL' },
        { name: 'Italy', flag: '🇮🇹', id: 'IT' },
        { name: 'Ivory Coast', flag: '🇨🇮', id: 'CI' }
    ],
    'J': [
        { name: 'Jamaica', flag: '🇯🇲', id: 'JM' },
        { name: 'Japan', flag: '🇯🇵', id: 'JP' },
        { name: 'Jordan', flag: '🇯🇴', id: 'JO' }
    ],
    'K': [
        { name: 'Kazakhstan', flag: '🇰🇿', id: 'KZ' },
        { name: 'Kenya', flag: '🇰🇪', id: 'KE' },
        { name: 'Kiribati', flag: '🇰🇮', id: 'KI' },
        { name: 'Kuwait', flag: '🇰🇼', id: 'KW' },
        { name: 'Kyrgyzstan', flag: '🇰🇬', id: 'KG' }
    ],
    'L': [
        { name: 'Laos', flag: '🇱🇦', id: 'LA' },
        { name: 'Latvia', flag: '🇱🇻', id: 'LV' },
        { name: 'Lebanon', flag: '🇱🇧', id: 'LB' },
        { name: 'Lesotho', flag: '🇱🇸', id: 'LS' },
        { name: 'Liberia', flag: '🇱🇷', id: 'LR' },
        { name: 'Libya', flag: '🇱🇾', id: 'LY' },
        { name: 'Liechtenstein', flag: '🇱🇮', id: 'LI' },
        { name: 'Lithuania', flag: '🇱🇹', id: 'LT' },
        { name: 'Luxembourg', flag: '🇱🇺', id: 'LU' }
    ],
    'M': [
        { name: 'Madagascar', flag: '🇲🇬', id: 'MG' },
        { name: 'Malawi', flag: '🇲🇼', id: 'MW' },
        { name: 'Malaysia', flag: '🇲🇾', id: 'MY' },
        { name: 'Maldives', flag: '🇲🇻', id: 'MV' },
        { name: 'Mali', flag: '🇲🇱', id: 'ML' },
        { name: 'Malta', flag: '🇲🇹', id: 'MT' },
        { name: 'Marshall Islands', flag: '🇲🇭', id: 'MH' },
        { name: 'Mauritania', flag: '🇲🇷', id: 'MR' },
        { name: 'Mauritius', flag: '🇲🇺', id: 'MU' },
        { name: 'Mexico', flag: '🇲🇽', id: 'MX' },
        { name: 'Micronesia', flag: '🇫🇲', id: 'FM' },
        { name: 'Moldova', flag: '🇲🇩', id: 'MD' },
        { name: 'Monaco', flag: '🇲🇨', id: 'MC' },
        { name: 'Mongolia', flag: '🇲🇳', id: 'MN' },
        { name: 'Montenegro', flag: '🇲🇪', id: 'ME' },
        { name: 'Morocco', flag: '🇲🇦', id: 'MA' },
        { name: 'Mozambique', flag: '🇲🇿', id: 'MZ' },
        { name: 'Myanmar', flag: '🇲🇲', id: 'MM' }
    ],
    'N': [
        { name: 'Namibia', flag: '🇳🇦', id: 'NA' },
        { name: 'Nauru', flag: '🇳🇷', id: 'NR' },
        { name: 'Nepal', flag: '🇳🇵', id: 'NP' },
        { name: 'Netherlands', flag: '🇳🇱', id: 'NL' },
        { name: 'New Zealand', flag: '🇳🇿', id: 'NZ' },
        { name: 'Nicaragua', flag: '🇳🇮', id: 'NI' },
        { name: 'Niger', flag: '🇳🇪', id: 'NE' },
        { name: 'Nigeria', flag: '🇳🇬', id: 'NG' },
        { name: 'North Korea', flag: '🇰🇵', id: 'KP' },
        { name: 'North Macedonia', flag: '🇲🇰', id: 'MK' },
        { name: 'Norway', flag: '🇳🇴', id: 'NO' }
    ],
    'O': [
        { name: 'Oman', flag: '🇴🇲', id: 'OM' }
    ],
    'P': [
        { name: 'Pakistan', flag: '🇵🇰', id: 'PK' },
        { name: 'Palau', flag: '🇵🇼', id: 'PW' },
        { name: 'Panama', flag: '🇵🇦', id: 'PA' },
        { name: 'Papua New Guinea', flag: '🇵🇬', id: 'PG' },
        { name: 'Paraguay', flag: '🇵🇾', id: 'PY' },
        { name: 'Peru', flag: '🇵🇪', id: 'PE' },
        { name: 'Philippines', flag: '🇵🇭', id: 'PH' },
        { name: 'Poland', flag: '🇵🇱', id: 'PL' },
        { name: 'Portugal', flag: '🇵🇹', id: 'PT' }
    ],
    'Q': [
        { name: 'Qatar', flag: '🇶🇦', id: 'QA' }
    ],
    'R': [
        { name: 'Romania', flag: '🇷🇴', id: 'RO' },
        { name: 'Russia', flag: '🇷🇺', id: 'RU' },
        { name: 'Rwanda', flag: '🇷🇼', id: 'RW' }
    ],
    'S': [
        { name: 'Saint Kitts and Nevis', flag: '🇰🇳', id: 'KN' },
        { name: 'Saint Lucia', flag: '🇱🇨', id: 'LC' },
        { name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', id: 'VC' },
        { name: 'Samoa', flag: '🇼🇸', id: 'WS' },
        { name: 'San Marino', flag: '🇸🇲', id: 'SM' },
        { name: 'Saudi Arabia', flag: '🇸🇦', id: 'SA' },
        { name: 'Senegal', flag: '🇸🇳', id: 'SN' },
        { name: 'Serbia', flag: '🇷🇸', id: 'RS' },
        { name: 'Seychelles', flag: '🇸🇨', id: 'SC' },
        { name: 'Sierra Leone', flag: '🇸🇱', id: 'SL' },
        { name: 'Singapore', flag: '🇸🇬', id: 'SG' },
        { name: 'Slovakia', flag: '🇸🇰', id: 'SK' },
        { name: 'Slovenia', flag: '🇸🇮', id: 'SI' },
        { name: 'Solomon Islands', flag: '🇸🇧', id: 'SB' },
        { name: 'Somalia', flag: '🇸🇴', id: 'SO' },
        { name: 'South Africa', flag: '🇿🇦', id: 'ZA' },
        { name: 'South Korea', flag: '🇰🇷', id: 'KR' },
        { name: 'South Sudan', flag: '🇸🇸', id: 'SS' },
        { name: 'Spain', flag: '🇪🇸', id: 'ES' },
        { name: 'Sri Lanka', flag: '🇱🇰', id: 'LK' },
        { name: 'Sudan', flag: '🇸🇩', id: 'SD' },
        { name: 'Suriname', flag: '🇸🇷', id: 'SR' },
        { name: 'Sweden', flag: '🇸🇪', id: 'SE' },
        { name: 'Switzerland', flag: '🇨🇭', id: 'CH' },
        { name: 'Syria', flag: '🇸🇾', id: 'SY' }
    ],
    'T': [
        { name: 'Taiwan', flag: '🇹🇼', id: 'TW' },
        { name: 'Tajikistan', flag: '🇹🇯', id: 'TJ' },
        { name: 'Tanzania', flag: '🇹🇿', id: 'TZ' },
        { name: 'Thailand', flag: '🇹🇭', id: 'TH' },
        { name: 'Timor-Leste', flag: '🇹🇱', id: 'TL' },
        { name: 'Togo', flag: '🇹🇬', id: 'TG' },
        { name: 'Tonga', flag: '🇹🇴', id: 'TO' },
        { name: 'Trinidad and Tobago', flag: '🇹🇹', id: 'TT' },
        { name: 'Tunisia', flag: '🇹🇳', id: 'TN' },
        { name: 'Turkey', flag: '🇹🇷', id: 'TR' },
        { name: 'Turkmenistan', flag: '🇹🇲', id: 'TM' },
        { name: 'Tuvalu', flag: '🇹🇻', id: 'TV' }
    ],
    'U': [
        { name: 'Uganda', flag: '🇺🇬', id: 'UG' },
        { name: 'Ukraine', flag: '🇺🇦', id: 'UA' },
        { name: 'United Arab Emirates', flag: '🇦🇪', id: 'AE' },
        { name: 'United Kingdom', flag: '🇬🇧', id: 'GB' },
        { name: 'United States', flag: '🇺🇸', id: 'US' },
        { name: 'Uruguay', flag: '🇺🇾', id: 'UY' },
        { name: 'Uzbekistan', flag: '🇺🇿', id: 'UZ' }
    ],
    'V': [
        { name: 'Vanuatu', flag: '🇻🇺', id: 'VU' },
        { name: 'Vatican City', flag: '🇻🇦', id: 'VA' },
        { name: 'Venezuela', flag: '🇻🇪', id: 'VE' },
        { name: 'Vietnam', flag: '🇻🇳', id: 'VN' }
    ],
    'W': [
        
    ],
    'X': [
        
    ],
    'Y': [
        { name: 'Yemen', flag: '🇾🇪', id: 'YE' }
    ],
    'Z': [
        { name: 'Zambia', flag: '🇿🇲', id: 'ZM' },
        { name: 'Zimbabwe', flag: '🇿🇼', id: 'ZW' }
    ]
};

// The new world map SVG uses ISO 2-letter country codes directly as IDs
// No mapping needed since our country data already uses the correct ISO codes
const countryIdMapping = {
    // Most countries use their ISO 2-letter code directly
    // Only special cases need mapping
};
