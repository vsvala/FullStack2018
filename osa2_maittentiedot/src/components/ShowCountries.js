import React from 'react'
import OneCountry from './Onecountry'

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
                    <p>{country.name}</p>
                )
            )
        }
    }

    return (
        <div>{display()}</div>
    )
}

export default ShowCountries
