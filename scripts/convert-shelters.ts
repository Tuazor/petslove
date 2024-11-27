import * as fs from 'fs-extra';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

interface Shelter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email?: string;
  phone?: string;
  latitude: number;
  longitude: number;
}

function processCSV(): Shelter[] {
  // Read the CSV file
  const csvFilePath = path.join(process.cwd(), 'app', 'data', 'petfinder_shelters.csv');
  const csvData = fs.readFileSync(csvFilePath, 'utf8');

  // Parse CSV
  const records = parse(csvData, { 
    columns: true,
    skip_empty_lines: true
  });

  // Transform data
  return records.map((row: any) => ({
    id: row.id || '',
    name: row.name || 'Unnamed Shelter',
    address: (row.address1 || row.address2 || '').trim(),
    city: row.city || '',
    state: row.state || '',
    zip: row.zip || '',
    email: row.email || '',
    phone: row.phone ? row.phone.replace(/\s+/g, '') : '',
    latitude: parseFloat(row.latitude) || 0,
    longitude: parseFloat(row.longitude) || 0
  }));
}

// Sample data if CSV is not available
const sampleShelters: Shelter[] = [
  {
    id: "1",
    name: "Happy Tails Rescue",
    address: "123 Main St",
    city: "Austin",
    state: "TX",
    zip: "78701",
    email: "contact@happytails.org",
    phone: "512-555-0123",
    latitude: 30.2672,
    longitude: -97.7431
  },
  {
    id: "2",
    name: "Paws & Love Shelter",
    address: "456 Oak Ave",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    email: "info@pawslove.org",
    phone: "206-555-0456",
    latitude: 47.6062,
    longitude: -122.3321
  },
  {
    id: "3",
    name: "Furry Friends Forever",
    address: "789 Pine St",
    city: "New York",
    state: "NY",
    zip: "10001",
    email: "help@fff.org",
    phone: "212-555-0789",
    latitude: 40.7128,
    longitude: -74.0060
  },
  {
    id: "4",
    name: "Loving Hearts Animal Rescue",
    address: "321 Maple Dr",
    city: "Chicago",
    state: "IL",
    zip: "60601",
    email: "info@lovinghearts.org",
    phone: "312-555-0321",
    latitude: 41.8781,
    longitude: -87.6298
  },
  {
    id: "5",
    name: "Desert Paws Sanctuary",
    address: "567 Palm Blvd",
    city: "Phoenix",
    state: "AZ",
    zip: "85001",
    email: "adopt@desertpaws.org",
    phone: "602-555-0567",
    latitude: 33.4484,
    longitude: -112.0740
  },
  {
    id: "6",
    name: "Coastal Pet Haven",
    address: "890 Beach Rd",
    city: "Miami",
    state: "FL",
    zip: "33101",
    email: "info@coastalhaven.org",
    phone: "305-555-0890",
    latitude: 25.7617,
    longitude: -80.1918
  }
];

function main() {
  try {
    let shelters: Shelter[];
    
    try {
      // Try to read from CSV first
      shelters = processCSV();
    } catch (error) {
      console.log('Using sample data instead of CSV');
      shelters = sampleShelters;
    }
    
    // Ensure the output directory exists
    const outputDir = path.join(process.cwd(), 'app', 'data');
    fs.ensureDirSync(outputDir);

    // Write to JSON file
    const outputPath = path.join(outputDir, 'shelters.json');
    fs.writeJsonSync(outputPath, shelters, { spaces: 2 });

    console.log(`Processed ${shelters.length} shelters. Output saved to ${outputPath}`);
  } catch (error) {
    console.error('Error processing shelters:', error);
  }
}

main(); 