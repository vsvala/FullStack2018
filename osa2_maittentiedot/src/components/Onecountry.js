import React from 'react'

const OneCountry = ({country}) => {
    return(
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <img 
                src={country.flag} 
                alt="flag"
                width="33%"
                height='auto'
            />
        </div>
    )
}

export default OneCountry