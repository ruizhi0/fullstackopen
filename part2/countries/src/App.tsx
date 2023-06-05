import { useState } from "react";
import countryService from "./services/countries";
import Country from "./types/Country";
import CountrySearchResultView from "./components/CountrySearchResultView";

const App = () => {
  const [countries, setCountries] = useState([] as Country[]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const findCountryByName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    countryService.findByName(searchTerm).then((c) => {
      setCountries(c);
    });
  };

  return (
    <div>
      <form onSubmit={findCountryByName}>
        find countries{" "}
        <input
          placeholder="name"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </form>
      <CountrySearchResultView countries={countries} />
    </div>
  );
};

export default App;
