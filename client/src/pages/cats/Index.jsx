import React, { useEffect, useState } from "react";
import axios from "axios";

function Index({ user }) {
    const [breeds, setBreeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getBreedsAndPics() {
        try {
            const breedsUrl = `https://api.thecatapi.com/v1/breeds`;
            const response = await axios.get(breedsUrl, {
                headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API },
            });
            const breedsData = response.data;

            // Fetch the picture information for each breed and add the 'url' property
            const breedPromises = breedsData.map(async (breed) => {
                const breedPicResponse = await axios.get(
                    `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&size=small`,
                    {
                        headers: {
                            "x-api-key": import.meta.env.VITE_APP_THE_CAT_API,
                        },
                    }
                );
                const breedPicData = breedPicResponse.data[0];
                if (breedPicData) {
                    breed.url = breedPicData.url;
                }
                return breed;
            });

            const breedsWithUrls = await Promise.all(breedPromises);
            setBreeds(breedsWithUrls);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    async function handleSaveBreed(id, name) {
        try {
            const response = await axios.post('/api/cats', { id, name }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Breed saved:', response.data);
        } catch (error) {
            console.error('Error saving breed:', error);
        }
    }


    useEffect(() => {
        if (breeds.length === 0) {
            getBreedsAndPics();
        }
    }, []);

    return (
        <>
            <h1>Cats! Cats! Cats!</h1>
            <div id="cats">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    breeds.map((breed) => (
                        <div className="breed-card" key={breed.id}>
                            {console.log(breed)}
                            <h3>{breed.name}</h3>
                            <div className="breed-image">
                                {breed.url ? (
                                    <img src={breed.url} alt={breed.name} />
                                ) : (
                                    <p>No image available</p>
                                )}
                            </div>
                            <div className="breed-body">
                                <p>{breed.description}</p>
                                <p>{breed.life_span} years</p>
                                <p>{breed.weight.imperial} lbs</p>
                            </div>
                            <button onClick={() => handleSaveBreed(breed.id, breed.name)}>
                                Save to Profile
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Index;
