import Country from "../types/Country";
import SingleCountryView from "./SingleCountryView";

const CountrySearchResultView = ({ countries }: { countries: Country[] }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length == 1) {
    return <SingleCountryView country={countries[0]} />;
  }

  return (
    <ul>
      {countries.map((c) => (
        <li key={c.ccn3}>{c.name.common}</li>
      ))}
    </ul>
  );
};

export default CountrySearchResultView;
