import Country from "../types/Country";
const SingleCountryView = ({ country }: { country: Country | null }) => {
  if (!country) {
    return null;
  }

  return (
    <div>
      <h1>{country.name.common}</h1>

      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <p>
        <strong>languages:</strong>
      </p>
      <ul>
        {Object.values(country.languages).map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>

      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        width="200"
        height="auto"
      />
    </div>
  );
};

export default SingleCountryView;
