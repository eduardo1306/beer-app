export interface BrewerCreateOptions {
  name: string;
  latitude: number;
  longitude: number;
  email: string;
  password: string;
  photo: string;
  city: string;
  uf: string;
  whatsapp: string;
}

export interface BrewerUpdatePhotoOptions {
  id: string;
  photo: string;
}
