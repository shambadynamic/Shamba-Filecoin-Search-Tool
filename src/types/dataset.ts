export interface Dataset {
  code: string;
  name: string;
  url: string;
  available_bands: Array<string>;
  preferred_scale: number;
}
