'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// Comprehensive global address data
const mockAddresses = [
  // United Kingdom
  'Tunbridge Wells, UK',
  'Tunbridge Wells Hospital, Tonbridge Road, Tunbridge Wells, UK',
  'Tunbridge Wells Railway Station, Tunbridge Wells, UK',
  'London, UK',
  'London Bridge, London, UK',
  'London Eye, London, UK',
  'Manchester, UK',
  'Birmingham, UK',
  'Edinburgh, Scotland, UK',
  'Cardiff, Wales, UK',
  'Belfast, Northern Ireland, UK',

  // United Arab Emirates
  'Dubai, UAE',
  'Dubai International Airport, Dubai, UAE',
  'Burj Khalifa, Dubai, UAE',
  'Dubai Mall, Dubai, UAE',
  'Abu Dhabi, UAE',
  'Abu Dhabi International Airport, Abu Dhabi, UAE',
  'Sheikh Zayed Grand Mosque, Abu Dhabi, UAE',
  'Sharjah, UAE',
  'Ajman, UAE',
  'Fujairah, UAE',
  'Ras Al Khaimah, UAE',

  // Africa
  'Cairo, Egypt',
  'Cairo International Airport, Cairo, Egypt',
  'Pyramids of Giza, Cairo, Egypt',
  'Lagos, Nigeria',
  'Murtala Muhammed Airport, Lagos, Nigeria',
  'Cape Town, South Africa',
  'Cape Town International Airport, Cape Town, South Africa',
  'Johannesburg, South Africa',
  'OR Tambo International Airport, Johannesburg, South Africa',
  'Nairobi, Kenya',
  'Jomo Kenyatta International Airport, Nairobi, Kenya',
  'Casablanca, Morocco',
  'Mohammed V International Airport, Casablanca, Morocco',
  'Accra, Ghana',
  'Kotoka International Airport, Accra, Ghana',
  'Addis Ababa, Ethiopia',
  'Bole International Airport, Addis Ababa, Ethiopia',
  'Tunis, Tunisia',
  'Tunis-Carthage International Airport, Tunis, Tunisia',
  'Algiers, Algeria',
  'Houari Boumediene Airport, Algiers, Algeria',
  'Dakar, Senegal',
  'Blaise Diagne International Airport, Dakar, Senegal',

  // Europe
  'Paris, France',
  'Paris Charles de Gaulle Airport, Paris, France',
  'Eiffel Tower, Paris, France',
  'Berlin, Germany',
  'Berlin Brandenburg Airport, Berlin, Germany',
  'Brandenburg Gate, Berlin, Germany',
  'Rome, Italy',
  'Leonardo da Vinci Airport, Rome, Italy',
  'Colosseum, Rome, Italy',
  'Madrid, Spain',
  'Adolfo Suárez Madrid-Barajas Airport, Madrid, Spain',
  'Barcelona, Spain',
  'Barcelona-El Prat Airport, Barcelona, Spain',
  'Amsterdam, Netherlands',
  'Amsterdam Airport Schiphol, Amsterdam, Netherlands',
  'Vienna, Austria',
  'Vienna International Airport, Vienna, Austria',
  'Zurich, Switzerland',
  'Zurich Airport, Zurich, Switzerland',
  'Stockholm, Sweden',
  'Stockholm Arlanda Airport, Stockholm, Sweden',
  'Oslo, Norway',
  'Oslo Airport, Oslo, Norway',
  'Copenhagen, Denmark',
  'Copenhagen Airport, Copenhagen, Denmark',
  'Helsinki, Finland',
  'Helsinki-Vantaa Airport, Helsinki, Finland',
  'Warsaw, Poland',
  'Warsaw Chopin Airport, Warsaw, Poland',
  'Prague, Czech Republic',
  'Václav Havel Airport Prague, Prague, Czech Republic',
  'Budapest, Hungary',
  'Budapest Ferenc Liszt International Airport, Budapest, Hungary',
  'Brussels, Belgium',
  'Brussels Airport, Brussels, Belgium',
  'Lisbon, Portugal',
  'Lisbon Airport, Lisbon, Portugal',
  'Athens, Greece',
  'Athens International Airport, Athens, Greece',
  'Istanbul, Turkey',
  'Istanbul Airport, Istanbul, Turkey',
  'Moscow, Russia',
  'Sheremetyevo International Airport, Moscow, Russia',

  // Asia
  'Tokyo, Japan',
  'Tokyo Station, Tokyo, Japan',
  'Narita International Airport, Tokyo, Japan',
  'Beijing, China',
  'Beijing Capital International Airport, Beijing, China',
  'Shanghai, China',
  'Shanghai Pudong International Airport, Shanghai, China',
  'Hong Kong',
  'Hong Kong International Airport, Hong Kong',
  'Singapore',
  'Singapore Changi Airport, Singapore',
  'Seoul, South Korea',
  'Incheon International Airport, Seoul, South Korea',
  'Mumbai, India',
  'Chhatrapati Shivaji International Airport, Mumbai, India',
  'Delhi, India',
  'Indira Gandhi International Airport, Delhi, India',
  'Bangalore, India',
  'Kempegowda International Airport, Bangalore, India',
  'Bangkok, Thailand',
  'Suvarnabhumi Airport, Bangkok, Thailand',
  'Kuala Lumpur, Malaysia',
  'Kuala Lumpur International Airport, Kuala Lumpur, Malaysia',
  'Jakarta, Indonesia',
  'Soekarno-Hatta International Airport, Jakarta, Indonesia',
  'Manila, Philippines',
  'Ninoy Aquino International Airport, Manila, Philippines',
  'Ho Chi Minh City, Vietnam',
  'Tan Son Nhat International Airport, Ho Chi Minh City, Vietnam',

  // North America
  'New York, NY, USA',
  'New York Stock Exchange, New York, NY, USA',
  'John F. Kennedy International Airport, New York, NY, USA',
  'Los Angeles, CA, USA',
  'Los Angeles International Airport, Los Angeles, CA, USA',
  'Chicago, IL, USA',
  'Chicago O\'Hare International Airport, Chicago, IL, USA',
  'San Francisco, CA, USA',
  'San Francisco International Airport, San Francisco, CA, USA',
  'Miami, FL, USA',
  'Miami International Airport, Miami, FL, USA',
  'Seattle, WA, USA',
  'Seattle-Tacoma International Airport, Seattle, WA, USA',
  'Toronto, Canada',
  'Toronto Pearson International Airport, Toronto, Canada',
  'Vancouver, Canada',
  'Vancouver International Airport, Vancouver, Canada',
  'Montreal, Canada',
  'Pierre Elliott Trudeau International Airport, Montreal, Canada',
  'Mexico City, Mexico',
  'Mexico City International Airport, Mexico City, Mexico',

  // South America
  'São Paulo, Brazil',
  'São Paulo-Guarulhos International Airport, São Paulo, Brazil',
  'Rio de Janeiro, Brazil',
  'Rio de Janeiro-Galeão International Airport, Rio de Janeiro, Brazil',
  'Buenos Aires, Argentina',
  'Ezeiza International Airport, Buenos Aires, Argentina',
  'Lima, Peru',
  'Jorge Chávez International Airport, Lima, Peru',
  'Bogotá, Colombia',
  'El Dorado International Airport, Bogotá, Colombia',
  'Santiago, Chile',
  'Arturo Merino Benítez International Airport, Santiago, Chile',
  'Caracas, Venezuela',
  'Simón Bolívar International Airport, Caracas, Venezuela',

  // Oceania
  'Sydney, Australia',
  'Sydney Opera House, Sydney, Australia',
  'Sydney Kingsford Smith Airport, Sydney, Australia',
  'Melbourne, Australia',
  'Melbourne Airport, Melbourne, Australia',
  'Brisbane, Australia',
  'Brisbane Airport, Brisbane, Australia',
  'Perth, Australia',
  'Perth Airport, Perth, Australia',
  'Auckland, New Zealand',
  'Auckland Airport, Auckland, New Zealand',
  'Wellington, New Zealand',
  'Wellington Airport, Wellington, New Zealand',

  // Additional Global Cities
  'Doha, Qatar',
  'Hamad International Airport, Doha, Qatar',
  'Kuwait City, Kuwait',
  'Kuwait International Airport, Kuwait City, Kuwait',
  'Riyadh, Saudi Arabia',
  'King Khalid International Airport, Riyadh, Saudi Arabia',
  'Jeddah, Saudi Arabia',
  'King Abdulaziz International Airport, Jeddah, Saudi Arabia',
  'Tel Aviv, Israel',
  'Ben Gurion Airport, Tel Aviv, Israel',
  'Beirut, Lebanon',
  'Rafic Hariri International Airport, Beirut, Lebanon',
  'Amman, Jordan',
  'Queen Alia International Airport, Amman, Jordan'
];

export function AddressAutocomplete({ value, onChange, placeholder, className }: AddressAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = mockAddresses.filter(address =>
        address.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setHighlightedIndex(-1);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionClick(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      
      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => {
            const parts = suggestion.split(new RegExp(`(${value})`, 'gi'));
            return (
              <div
                key={index}
                className={cn(
                  "px-3 py-2 cursor-pointer text-sm",
                  index === highlightedIndex
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                )}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {parts.map((part, partIndex) => (
                  <span
                    key={partIndex}
                    className={
                      part.toLowerCase() === value.toLowerCase()
                        ? "font-semibold"
                        : ""
                    }
                  >
                    {part}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
