export type CarAd = {
  city_1: string;
  ad_url: string;
  list_id: string;
  photo: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: colors;
  engineType: '1' | '2' | '3' | '4' | '5' | '6' | '7';
  gearbox: '1' | '2';
  location: string;
  publishDate: string;
};

export type CarAdFilter = {
  title: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  engineType: string;
  gearbox: string;
  location: string;
};

export type carAdKey =
  | 'brand'
  | 'model'
  | 'year'
  | 'price'
  | 'mileage'
  | 'engineType'
  | 'gearbox'
  | 'location';

export type colors =
  | 'noir'
  | 'marron'
  | 'bleu'
  | 'blanc'
  | 'autre'
  | 'gris'
  | 'rouge'
  | 'orange'
  | 'argent';

export type engineType =
  | 'petrol'
  | 'diesel'
  | 'LPG'
  | 'electric'
  | 'other'
  | 'hybrid'
  | 'CNG';

export interface AnalyticsApi {
  actaction_successfulion: boolean;
  results: CarAd[];
}
