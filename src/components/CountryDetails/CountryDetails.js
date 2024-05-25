import './CountryDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft} from '@fortawesome/free-solid-svg-icons'
const CountryDetails = ({
  mode,
    goBack,
    imageSource,
  countryName,
  nativeName,
  population,
  region,
  subRegion,
  capital,
  topLevelDomain,
  currencies,
    languages,
  borderCountries
}) => {
  return(
    <div className='details'>
      <div className={`back-button ${mode ? "back-button-light" : "back-button-dark"}`}>
        
             
        <p onClick={goBack}><span > <FontAwesomeIcon className='iconAwesome' icon={faLongArrowLeft} size="1x" /></span> Back</p>
      </div>
      <main className={`countrydetails-div ${mode ? "countrydetails-div-light" : "countrydetails-div-dark"}`}>
        <div className="image-div">
          <img className='countrydetails-img' src={imageSource} alt="country flag" />
        </div>
        <div className="countrydetails-details-div">
                  <h4>{countryName}</h4>
                  
                  <div className="countrydetails-text-div">
                          <div className="details-text-1">
            <p className='countrydetails-p'>Native Name: <span className='countrydetails-span'>{nativeName}</span></p>
            <p className='countrydetails-p'>Population: <span className='countrydetails-span'>{population}</span> </p>
            <p className='countrydetails-p'>Region: <span className='countrydetails-span'>{region}</span></p>
            <p className='countrydetails-p'>Sub-Region: <span className='countrydetails-span'>{subRegion}</span></p>
            <p className='countrydetails-p'>Capital: <span className='countrydetails-span'>{capital}</span> </p>
          </div>

          <div className="countrydetails-text-2">
            <p className='countrydetails-p'>Top Level Domain: <span className='countrydetails-span'>{topLevelDomain}</span></p>
            <p className='countrydetails-p'>Currencies: <span className='countrydetails-span'>{currencies}</span></p>
            <p className='countrydetails-p'>Languages: <span className='countrydetails-span'>{languages}</span></p>
          </div> 
                  </div>
                  <div className="border-countries-div">
                      <p className='countrydetails-p'>Border Countries:</p>
                          <div>{borderCountries} </div> 
                  </div>

     
        </div>
      </main>
    </div>
  );
};
export default CountryDetails;