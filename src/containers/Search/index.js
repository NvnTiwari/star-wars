import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Field from './../../components/Field';
import TextField from './../../components/TextField';
import Button from './../../components/Button';
import Navbar from './../../components/Navbar';

import './Search.scss';

const Search = ({ history }) => {
    const [state, setState] = useReducer((state, nextState) => ({...state, ...nextState}), { selectedPlanet: null, value: '', planets: [], filteredPlanets: [] });

    const changeHandler = (event) => { 
        const { value } = event.target;
        const { planets } = state;
        const filteredPlanets = planets.filter((planet) => planet.name.toLowerCase().includes(value.toLowerCase())) || []
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
                planets: response.data.results
            })
        })
    }, [])

    const { value, filteredPlanets, selectedPlanet } = state

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
                    {!selectedPlanet && <div className="columns">
                        <div className="column">
                            {value.length > 0 && <ul>
                                { filteredPlanets.map((planet, index) => {
                                    return (<li data-index={index} onClick={selectPlanet} key={index}>{planet.name}</li>)
                                }) }
                            </ul> }
                        </div>
                    </div>}
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