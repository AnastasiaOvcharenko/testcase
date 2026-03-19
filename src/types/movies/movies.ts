interface Genre {
  name?: string;
}

export interface Movie {
  poster?: {
    url?: string;
    previewUrl?: string;
  };
  name?: string;
  alternativeName?: string;
  year?: number;
  rating?: {
    imdb?: number;
  };
  genres?: Genre[];
  id?: number;
}

export interface MovieFullInfo extends Movie {
  movieLength?: number;
  description?: string;
}
