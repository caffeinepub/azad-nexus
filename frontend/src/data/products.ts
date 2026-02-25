export interface ProductSpec {
  grainLength: string;
  moistureContent: string;
  purity: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'basmati' | 'non-basmati';
  description: string;
  specs: ProductSpec;
  badge?: string;
  imagePath?: string;
}

export const products: Product[] = [
  {
    id: '1121-basmati',
    name: '1121 Basmati Rice',
    category: 'basmati',
    description: 'The world\'s longest grain Basmati, prized for its extraordinary length and exquisite aroma. A premium choice for Middle Eastern and European markets.',
    specs: {
      grainLength: '8.35 mm (avg)',
      moistureContent: '≤ 12.5%',
      purity: '≥ 98%',
    },
    badge: 'Best Seller',
    imagePath: 'rice-1121-basmati.dim_800x600.png',
  },
  {
    id: 'pusa-basmati',
    name: 'Pusa Basmati Rice',
    category: 'basmati',
    description: 'A high-yielding variety with classic Basmati fragrance and elongation on cooking. Widely exported to Europe and Southeast Asia.',
    specs: {
      grainLength: '7.20 mm (avg)',
      moistureContent: '≤ 12.5%',
      purity: '≥ 97%',
    },
    imagePath: 'rice-pusa-basmati.dim_800x600.png',
  },
  {
    id: 'steam-basmati',
    name: 'Steam Basmati Rice',
    category: 'basmati',
    description: 'Parboiled Basmati processed with steam for enhanced nutrition retention and non-sticky texture. Ideal for bulk institutional buyers.',
    specs: {
      grainLength: '7.80 mm (avg)',
      moistureContent: '≤ 13%',
      purity: '≥ 97%',
    },
    imagePath: 'rice-steam-basmati.dim_800x600.png',
  },
  {
    id: 'long-grain',
    name: 'Long Grain White Rice',
    category: 'non-basmati',
    description: 'Premium long-grain white rice with a clean, neutral flavor profile. Versatile for diverse culinary applications across global markets.',
    specs: {
      grainLength: '6.61 mm (avg)',
      moistureContent: '≤ 14%',
      purity: '≥ 95%',
    },
    imagePath: 'rice-long-grain.dim_800x600.png',
  },
  {
    id: 'ir64',
    name: 'IR64 Rice',
    category: 'non-basmati',
    description: 'A high-quality non-Basmati variety with consistent grain size and excellent milling recovery. Popular in Africa and Southeast Asia.',
    specs: {
      grainLength: '6.20 mm (avg)',
      moistureContent: '≤ 14%',
      purity: '≥ 95%',
    },
    badge: 'High Demand',
    imagePath: 'rice-ir64.dim_800x600.png',
  },
  {
    id: 'parboiled',
    name: 'Parboiled Rice (IR64)',
    category: 'non-basmati',
    description: 'Steam-pressure processed for superior nutritional value and firm texture. Preferred by West African and Caribbean markets.',
    specs: {
      grainLength: '6.00 mm (avg)',
      moistureContent: '≤ 14%',
      purity: '≥ 95%',
    },
    imagePath: 'rice-parboiled.dim_800x600.png',
  },
];
