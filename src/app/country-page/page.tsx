"use client";

import { Be_Vietnam_Pro } from "next/font/google";
import "./page.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const vietnam = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

interface CountryPageProps {}

const CountryPage: React.FC<CountryPageProps> = () => {
  const [region, setRegion] = useState([
    "Americas",
    "Antarctic",
    "Africe",
    "Asia",
    "Europe",
    "Oceania",
  ]);
  const [countries, setCountries] = useState([]);

  const fetchAllCountries = async () => {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,area,region"
    );

    if (response.status == 200) {
      const data = await response.json();
      setCountries(data.slice(0, 20));
    }
  };

  useEffect(() => {
    fetchAllCountries();
  });

  return (
    <main className={`country ${vietnam.className}`}>
      <div className="country-logo">
        <Image src="/04/Logo.svg" alt="" width={174} height={24} />
      </div>
      <section className="country-box">
        <div className="country-head">
          <h3>Found 234 countries</h3>
          <div className="country-search">
            <Image src="/04/Search.svg" alt="" width={24} height={24} />
            <input
              type="text"
              placeholder="Search by Name, Region, Subregion"
            />
          </div>
        </div>
        <div className="country-body">
          <div className="country-filter">
            {/* Sort by Filter */}
            <div className="country-filter-param">
              <span className="country-filter-label">Sort by</span>
              <select className="country-filter-dropdown">
                <option>Population</option>
                <option>Name</option>
                <option>Area(km)</option>
              </select>
            </div>
            {/* Country filter */}
            <div className="country-filter-param">
              <span className="country-filter-label">Region</span>
              <div className="country-filter-region">
                {region.map((e, index) => {
                  return (
                    <button
                      key={index}
                      className={`${
                        [0, 2, 3, 4].includes(index) && "selected"
                      }`}
                    >
                      {e}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Status filter */}
            <div className="country-filter-param">
              <span className="country-filter-label">Status</span>
              <div className="country-filter-check">
                <input type="checkbox" name="status" id="status" />
                <span>Member of the United Nations</span>
              </div>
              <div className="country-filter-check">
                <input type="checkbox" name="status" id="status" />
                <span>Independent</span>
              </div>
            </div>
          </div>
          <table className="country-table">
            <thead>
              <tr>
                <th>Flag</th>
                <th>Name</th>
                <th>Population</th>
                <th>
                  Area (km<sup>2</sup>)
                </th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((e: any, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Image src={e.flags.png} alt="" width={48} height={48} />
                    </td>
                    <td>{e.name.common}</td>
                    <td>{e.population}</td>
                    <td>{e.area}</td>
                    <td>{e.region}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default CountryPage;
