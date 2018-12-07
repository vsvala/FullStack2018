import React from 'react'
import OneCountry from './Onecountry'

const show = (country) => () => {
    this.setState({ filter: country.name })

}

const s = ({country}) => {
    return(
        <div>
            <h2>{country}test</h2>
            {/* <p>Capital: {country.capital}</p>
            <p>Populatio: {country.population}</p>
            <img 
                src={country.flag} 
                alt="flag"
                width="33%"
                height='auto'
            /> */}
        </div>
    )
}
const ShowCountries= ({countries, filter}) => {
    const filterByName = (country) => {
        return country.name.toUpperCase().includes(filter.toUpperCase())
    }


    const display = () => {
        const filteredCountries = countries.filter(filterByName)

        if (filteredCountries.length >= 10) {
            return <p>Too many matches, specify another filter</p>
       } else if (filteredCountries.length === 1) {
        return <OneCountry country={filteredCountries[0]} />
        }
        else {
            return (
                filteredCountries.map(country => 
        
                    // <div key={country.name} onClick = {show(country)}>
                    // <div key={country.name} onClick = {()=>this.setState({filter: country.name })}>
                    <div>
                    <p>{country.name}</p>
                    </div>

                )
            )
       
        }
    }


    return (

        <div>{display()}</div>
    )
}
 


export default ShowCountries
