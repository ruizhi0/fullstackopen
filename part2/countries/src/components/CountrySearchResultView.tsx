import { useState } from "react";
import Country from "../types/Country";
import SingleCountryView from "./SingleCountryView";

const CountrySearchResultView = ({ countries }: { countries: Country[] }) => {
  const [selectedCountry, setSelectedCountry] = useState<null | Country>(null);

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length == 1) {
    return <SingleCountryView country={countries[0]} />;
  }

  return (
    <div>
      <ul>
        {countries.map((c) => (
          <li key={c.ccn3}>
            {c.name.common}
            <button onClick={() => setSelectedCountry(c)}>show</button>
          </li>
        ))}
      </ul>
      <SingleCountryView country={selectedCountry} />
    </div>
  );
};

export default CountrySearchResultView;
