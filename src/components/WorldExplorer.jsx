import { useEffect, useState } from "react";

export default function WorldExplorer() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🌍 World Explorer</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "10px",
        }}
      >
        {countries.slice(0, 20).map((country, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: 10 }}>
            <img src={country.flags.png} width="100%" />
            <h3>{country.name.common}</h3>
            <p>{country.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
