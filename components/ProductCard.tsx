'use client';

import ProductImage from './ProductImage';

interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  image: string;
  availability: 'in-stock' | 'out-of-stock' | 'limited';
  category?: string;
  description?: string;
  showWhatsApp?: boolean;
}

const categoryLabels: Record<string, string> = {
  'biscuits-snacks': 'Biscuits & Snacks',
  'rice-pulses': 'Rice & Pulses',
  'cooking-oil': 'Cooking Oil',
  'spices': 'Spices & Masala',
  'namkeen': 'Namkeen',
  'soap-shampoo': 'Soap & Shampoo',
  'detergents': 'Detergents',
  'household': 'Household Items',
  'general': 'General',
};

const WHATSAPP_NUMBER = '+919761396049'; // Update with your WhatsApp number

export default function ProductCard({
  name,
  price,
  image,
  availability,
  category,
  description,
  showWhatsApp = true,
}: ProductCardProps) {
  const getAvailabilityColor = () => {
    switch (availability) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'limited':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = () => {
    switch (availability) {
      case 'in-stock':
        return 'In Stock';
      case 'limited':
        return 'Limited Stock';
      case 'out-of-stock':
        return 'Out of Stock';
      default:
        return 'Unknown';
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${name} (Price: ₹${price}). Can you provide more details?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-200">
        <ProductImage
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {category && (
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
              {categoryLabels[category] || category}
            </span>
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{name}</h3>
        
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary-600">₹{price}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor()}`}>
            {getAvailabilityText()}
          </span>
        </div>

        {showWhatsApp && (
          <button
            onClick={handleWhatsApp}
            disabled={availability === 'out-of-stock'}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
          >
            <span>💬</span>
            <span>Enquire on WhatsApp</span>
          </button>
        )}
      </div>
    </div>
  );
}

