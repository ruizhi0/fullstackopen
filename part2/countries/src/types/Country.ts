export default interface Country {
  ccn3: string;
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  area: number;
  languages: {
    [abbreviation: string]: string;
  };
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  latlng: string[];
}
