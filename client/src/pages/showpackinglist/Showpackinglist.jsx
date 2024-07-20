import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PackingListView() {
    const { travelplacename } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (travelplacename) {
            axios.get(`http://localhost:8070/api/packinglists/search?query=${travelplacename}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setSearchResults(res.data);
                    } else {
                        setSearchResults([]);
                        console.error('API response is not an array:', res.data);
                    }
                })
                .catch(err => {
                    console.error('Error during search:', err);
                    setSearchResults([]);
                });
        }
    }, [travelplacename]);

    return (
        <Container className="mt-4">
            <h5>Welcome ..</h5>
            <div>
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map(result => (
                            <li key={result._id}>
                                <h5>{result.travelplacename}</h5>
                                <p><strong>Clothing:</strong> {result.clothing}</p>
                                <p><strong>Essentials:</strong> {result.essentials}</p>
                                <p><strong>Accessories:</strong> {result.accessories}</p>
                                <p><strong>Miscellaneous:</strong> {result.miscellaneous}</p>
                                <p><strong>Travel Place:</strong> {result.travelPlace}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </Container>
    );
}

export default PackingListView;
