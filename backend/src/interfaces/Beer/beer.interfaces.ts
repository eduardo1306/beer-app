export interface BeerCreateOptions {
  title: string;
  coloring: string;
  ibu: string;
  description: string;
  image: string;
  brewer_id: string;
}

export interface BeerDeleteOptions {
  brewer_id: string;
  beer_id: number;
}
