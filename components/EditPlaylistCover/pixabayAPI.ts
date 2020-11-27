import { PIXABAY_API_KEY } from '../../configs/services';

export interface PixabayHit {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  // This one is broken. Always returns undefined
  // Use either largeImageURL or webfromatURL
  // imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  favorites: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayHit[];
}

export const searchPixabay = async ({ q, page = 1, limit = 20 }: {
  q: string; page?: number; limit?: number;
}): Promise<PixabayResponse> => {
  const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURI(q)}&page=${page}&per_page=${limit}`);
  return await response.json();
};
