import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country/Country";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleDown,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import Button from "./components/Buton/Button";

let globalCountryData = [];

function App() {
  const [country, setCountry] = useState([]);
  const [regions, setRegions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pickedRegion, setPickedRegion] = useState("Filter by Region");
  const [mode, setMode] = useState(false);
  const [filterDisplay, setFilterDisplay] = useState(false);
  const [countryDetail, setCountryDetail] = useState({
    imageSource: "",
    countryName: "",
    nativeName: "",
    population: "",
    region: "",
    subRegion: "",
    capital: "",
    topLevelDomain: "",
    currencies: "",
    languages: [],
    borderCountries: [],
  });
  const [toDetailsScreen, setToDetailsScreen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      let regionData = [];
      if (response.data) {
        globalCountryData = response.data;
        setCountry(response.data);
        response.data.forEach((element) => {
          if (!regionData.includes(element.region)) {
            regionData.push(element.region);
          }
        });
        regionData.sort();
        setRegions(regionData);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mode === false) {
      document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
    } else {
      document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
    }
  }, [mode]);

  const pickRegion = (picked) => {
    let pickedName = regions.find((n) => n === picked);
    let regionData = globalCountryData.filter((n) => n.region === pickedName);
    switch (pickedName) {
      case "Africa":
        setPickedRegion("Africa");
        setCountry(regionData);
        setFilterDisplay(!filterDisplay);
        break;
      case "Americas":
        setPickedRegion("Americas");
        setCountry(regionData);
        setFilterDisplay(!filterDisplay);
        break;
      case "Antarctic":
        setPickedRegion("Antarctic");
        setCountry(regionData);
        setFilterDisplay(!filterDisplay);
        break;
      case "Asia":
        setPickedRegion("Asia");
        setCountry(regionData);
        setFilterDisplay(!filterDisplay);
        break;
      case "Europe":
        setPickedRegion("Europe");
        setCountry(regionData);
        setFilterDisplay(!filterDisplay);
        break;
      case "Oceania":
        setPickedRegion("Oceania");
        setCountry(regionData);
        setFilterDisplay(!filterDisplay);
        break;
      default:
        setPickedRegion("Filter by Region");
        setFilterDisplay(!filterDisplay);
    }
  };

  const toggleMode = () => {
    setMode(!mode);
    document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
  };

  const toggleFilterDisplay = () => {
    setFilterDisplay(!filterDisplay);
  };

  const goBack = () => {
    setToDetailsScreen(false);
  };






  const goHome = () => {
    setToDetailsScreen(false);
    setPickedRegion("Filter by Region")
    setSearchValue("")
    setCountry(globalCountryData)
  }







  const goToDetails = (id) => {
    let getCountry;
    getCountry = country.find((n) => n.name.official === id);
    if (getCountry === undefined) {
      getCountry = country.find((n) => n.name.common === id);
    }
    if (getCountry) {
      const borders = [];

      if (getCountry.hasOwnProperty("borders")) {
        getCountry.borders.forEach((element) => {
          const border = globalCountryData.find((n) => n.cca3 === element);
          borders.push(border.name.common);
        });
      }

      setCountryDetail({
        imageSource: getCountry.flags.png,
        countryName: getCountry.name.common,
        population: getCountry.population,
        region: getCountry.region,
        subRegion: getCountry.subregion,
        capital: getCountry.capital,
        topLevelDomain: getCountry.tld,
        currencies: Object.values(getCountry.currencies)[0].name,
        languages: Object.values(getCountry.languages),
        borderCountries: borders,
        nativeName: Object.values(getCountry.name.nativeName)[0].common,
      });
      setToDetailsScreen(true);
    }
  };

  const handleSearchCountry = (e) => {
    let value = e.target.value;
    setSearchValue(e.target.value);
    if (value !== "") {
      let searchData;
      if (pickedRegion !== "Filter by Region") {
        searchData = globalCountryData.filter((n) =>
          n.name.common
            .toLowerCase()
            .includes(value.toLowerCase()) && n.region === pickedRegion
        );
      } else {
        searchData = globalCountryData.filter((n) =>
          n.name.common.toLowerCase().includes(value.toLowerCase())
        );
      }

      setCountry(searchData);
    } else {
      if (pickedRegion === "Filter by Region") {
        setCountry(globalCountryData);
      } else {
        setCountry(globalCountryData.filter((n) => n.region === pickedRegion));
      }
    }
  };
  return (
    <div className={mode ? "body-light" : "body-dark"}>
      <header className={`header ${mode ? "header-light" : "header-dark"}`}>
        <div className="header-container container">
          <h1 onClick={goHome}>Where in the world?</h1>
          <p onClick={toggleMode}>
            <span>
              {" "}
              <FontAwesomeIcon icon={faMoon} size="1x" />
            </span>{" "}
            Dark Mode
          </p>
        </div>
      </header>
      <div className="container">
        {toDetailsScreen ? (
          <CountryDetails
            mode={mode}
            goBack={goBack}
            nativeName={countryDetail.nativeName}
            imageSource={countryDetail.imageSource}
            countryName={countryDetail.countryName}
            population={countryDetail.population}
            region={countryDetail.region}
            subRegion={countryDetail.subRegion}
            capital={countryDetail.capital}
            topLevelDomain={countryDetail.topLevelDomain}
            currencies={countryDetail.currencies}
            languages={countryDetail.languages.map((val) => (
              <span key={val}>{val},</span>
            ))}
            borderCountries={countryDetail.borderCountries.map((val) => (
              <Button
                key={val}
                mode={mode}
                buttonText={val}
                click={() => goToDetails(val)}
              />
            ))}
          />
        ) : (
          <>
            <div className="input-div">
              <div
                className={`searchinput-div ${
                  mode ? "searchinput-div-light" : "searchinput-div-dark"
                }`}
              >
                  <FontAwesomeIcon
                    icon={faSearch}
                    size="1x"
                    width={11}
                    className="search-icon"
                    color={mode?"hsl(200, 15%, 8%)":"white"}
                />

                <input
                  type="text"
                  className={`search-box ${
                    mode ? "search-box-light" : "search-box-dark"
                  }`}
                  placeholder="Search for a country..."
                  onChange={handleSearchCountry}
                  value={searchValue}
                />
              </div>

              <div className="select-div">
                <div
                  className={`filter-div ${
                    mode ? "filter-div-light" : "filter-div-dark"
                  }`}
                  onClick={toggleFilterDisplay}
                >
                  <p>{pickedRegion}</p>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    size="1x"
                    className="angledown"
                  />
                </div>
                {filterDisplay ? (
                  <div
                    className={`options-div ${
                      mode ? "options-div-light" : "options-div-dark"
                    }`}
                  >
                    {regions.map((n) => (
                      <p key={n} onClick={() => pickRegion(n)}>
                        {n}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <main className="main">
              {country.map((n) => (
                <Country
                  mode={mode}
                  click={() => goToDetails(n.name.official)}
                  key={n.name.official}
                  imageSource={n.flags.png}
                  countryName={n.name.common}
                  population={n.population}
                  region={n.region}
                  capital={n.capital}
                />
              ))}
            </main>
          </>
        )}
      </div>
    </div>
  );
}

export default App;