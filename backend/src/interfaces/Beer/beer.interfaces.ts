export interface BeerCreateOptions {
  title: string;
  coloring: string;
  ibu: string;
  description: string;
  image: string;
  brewer_id: string;
}

export interface BeerRequestOptions {
  brewer_id: string;
  beer_id: number;
}

export interface BeerUpdateImageOptions {
  id: number;
  brewer_id: string;
  image: string;
}
