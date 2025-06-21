
export interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  merchant: string;
  category: string;
  imageUrl?: string; // Optional image URL
  userLiked?: boolean; // For adaptive filtering simulation
}

export interface UserPreferences {
  categories: string[];
  location: string;
  keywords: string; // For general search terms
}

export interface PriceDataPoint {
  date: string; // e.g., "2023-10-26"
  price: number;
}

export interface DealVerification {
  summary: string;
  score: number; // 1-5
}

export interface GroundingChunkWeb {
  uri?: string; 
  title?: string;
}

export interface GroundingChunkRetrievedContext {
  uri?: string;
  title?: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  retrievedContext?: GroundingChunkRetrievedContext;
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  searchQueries?: string[];
}
