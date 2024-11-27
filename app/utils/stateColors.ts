// Map regions to colors and information
export const regionInfo: { [key: string]: { 
  color: string, 
  name: string,
  description: string 
} } = {
  northeast: {
    color: 'blue',
    name: 'Northeast',
    description: 'New England and Mid-Atlantic states'
  },
  southeast: {
    color: 'orange',
    name: 'Southeast',
    description: 'Southern Atlantic and Gulf states'
  },
  midwest: {
    color: 'green',
    name: 'Midwest',
    description: 'Great Lakes and Plains states'
  },
  southwest: {
    color: 'red',
    name: 'Southwest',
    description: 'South Central states'
  },
  west: {
    color: 'purple',
    name: 'West',
    description: 'Pacific and Mountain states'
  }
};

// Map states to regions
export const stateRegions: { [key: string]: string } = {
  // Northeast
  'ME': 'northeast', 'NH': 'northeast', 'VT': 'northeast', 'MA': 'northeast', 'RI': 'northeast', 'CT': 'northeast', 'NY': 'northeast', 'NJ': 'northeast', 'PA': 'northeast',
  // Southeast
  'FL': 'southeast', 'GA': 'southeast', 'SC': 'southeast', 'NC': 'southeast', 'VA': 'southeast', 'WV': 'southeast', 'KY': 'southeast', 'TN': 'southeast', 'AL': 'southeast', 'MS': 'southeast', 'AR': 'southeast', 'LA': 'southeast',
  // Midwest
  'OH': 'midwest', 'MI': 'midwest', 'IN': 'midwest', 'IL': 'midwest', 'WI': 'midwest', 'MN': 'midwest', 'IA': 'midwest', 'MO': 'midwest', 'ND': 'midwest', 'SD': 'midwest', 'NE': 'midwest', 'KS': 'midwest',
  // Southwest
  'TX': 'southwest', 'OK': 'southwest', 'NM': 'southwest', 'AZ': 'southwest',
  // West
  'CO': 'west', 'WY': 'west', 'MT': 'west', 'ID': 'west', 'UT': 'west', 'NV': 'west', 'CA': 'west', 'OR': 'west', 'WA': 'west', 'AK': 'west', 'HI': 'west'
};

export const getStateColor = (state: string): { 
  bg: string, 
  text: string,
  region: string,
  description: string 
} => {
  const region = stateRegions[state] || 'unknown';
  const info = regionInfo[region] || { color: 'gray', name: 'Other', description: 'Other regions' };
  
  const colors = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
    green: { bg: 'bg-green-50', text: 'text-green-600' },
    red: { bg: 'bg-red-50', text: 'text-red-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
    gray: { bg: 'bg-gray-50', text: 'text-gray-600' }
  };

  return {
    ...colors[info.color],
    region: info.name,
    description: info.description
  };
}; 