import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Field from './../../components/Field';
import TextField from './../../components/TextField';
import Navbar from './../../components/Navbar';

import './Search.scss';

const Search = ({ history }) => {
    const [state, setState] = useReducer((state, nextState) => ({...state, ...nextState}), { selectedPlanet: null, value: '', planets: [], filteredPlanets: [] });

    const changeHandler = (event) => { 
        const { value } = event.target;
        const { planets } = state;
        const filteredPlanets = planets.filter((planet) => planet.name.toLowerCase().includes(value.toLowerCase())) || [];
        setState({ value, selectedPlanet: null, filteredPlanets })
    }

    const selectPlanet = (event) => {
        const { filteredPlanets } = state;
        const index = event.target.dataset['index']
        setState({
            selectedPlanet: filteredPlanets[index]
        })
    }

    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
        !isLoggedIn && history.push("/login");
        axios.defaults.baseURL = 'https://www.swapi.co/api'
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios({
            method: 'get',
            url: `/planets?format=json`
        }).then((response) => {
            setState({
                planets: response.data.results.sort((a, b) => {
                    if(a.population < b.population) { return -1; }
                    if(a.population > b.population) { return 1; }
                    return 0;
                })
            })
        })
    }, [])

    const { value, filteredPlanets, selectedPlanet, planets } = state;
    let sortedPlanets;

    {/* Added Condition for sorted according to population Planet Lists */}
    if (filteredPlanets.length > 0 && filteredPlanets.length !== planets.length) {
        sortedPlanets = sortedPlanets = !selectedPlanet && <div className="columns">
                                        <div className="column">
                                            {value.length > 0 && <ul>
                                                { filteredPlanets.map((planet, index) => {
                                                    return (<li data-index={index} onClick={selectPlanet} key={index}>{planet.name}</li>)
                                                }) }
                                            </ul> }
                                        </div>
                                    </div>
    } else {
        sortedPlanets =   <div className="columns">
                <div className="column">
                    {<ul>
                        { planets.map((planet, index) => {
                            return (<li style = {{ width: (index+2)*50 }} data-index={index} onClick={selectPlanet} key={index}>{planet.name}</li>)
                        }) }
                    </ul> }
                </div>
            </div>
    }
    return (
        <div>
            <Navbar />
            <div className="search-container">
                <div className="search-form">
                    <div className="columns">
                        <div className="column">
                            <Field>
                                <TextField
                                    type="search"
                                    placeholder="Search Planet"
                                    onChange={changeHandler}
                                    value={value}
                                    name="search"
                                />
                            </Field>
                        </div>
                    </div>
                    {sortedPlanets}
                    {selectedPlanet && <div className="columns">
                        <div className="column">
                            <div className="columns">
                                <div className="column is-text-left">Name</div>
                                <div className="column is-text-right">{selectedPlanet && selectedPlanet.name}</div>
                            </div>
                            <div className="columns">
                                <div className="column is-text-left">Population</div>
                                <div className="column is-text-right">{selectedPlanet && selectedPlanet.population}</div>
                            </div>
                            <div className="columns">
                                <div className="column is-text-left">Diameter</div>
                                <div className="column is-text-right">{selectedPlanet && selectedPlanet.diameter}</div>
                            </div>
                            <div className="columns">
                                <div className="column is-text-left">Gravity</div>
                                <div className="column is-text-right">{selectedPlanet && selectedPlanet.gravity}</div>
                            </div>
                            <div className="columns">
                                <div className="column is-text-left">Climate</div>
                                <div className="column is-text-right">{selectedPlanet && selectedPlanet.climate}</div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

Search.propTypes = {
    history: PropTypes.object.isRequired
}

export default withRouter(Search);