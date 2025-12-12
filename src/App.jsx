import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,languages,population"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <h2 className="text-center mt-3">Cargando...</h2>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Tabla de Países Edson Quintero</h1>

      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Bandera</th>
            <th>Nombre</th>
            <th>Oficial</th>
            <th>Capital</th>
            <th>Población</th>
            <th>Moneda(s)</th>
            <th>Idioma(s)</th>
          </tr>
        </thead>

        <tbody>
          {countries.map((country) => (
            <tr key={country.name.common}>
              <td>
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  width={50}
                />
              </td>
              <td>{country.name.common}</td>
              <td>{country.name.official}</td>
              <td>{country.capital ? country.capital[0] : "N/A"}</td>
              <td>{country.population.toLocaleString()}</td>
              <td>
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => c.name)
                      .join(", ")
                  : "N/A"}
              </td>
              <td>
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
