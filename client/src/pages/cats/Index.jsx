import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

function Index({ user }) {
    const [breeds, setBreeds] = useState([]);
    const [pics, setPics] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    async function getBreedsAndPics() {
        try {
            const breedsUrl = `https://api.thecatapi.com/v1/breeds`;
            const response = await axios.get(breedsUrl, {
                headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API },
            });
            console.log(response.data)
            const breedsData = response.data;

            // fetch the picture information for each breed

            const breedPicPromises = breedsData.map(async (obj) => {
                console.log(obj.id)
                const breedPicResponse = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${obj.id}&size=small`, {
                    headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API },
                });
                console.log(breedPicResponse.data)
                const breedPic = breedPicResponse.data;
                return breedPic;
            });

            const breedPicData = await Promise.all(breedPicPromises);

            setBreeds(breedsData)
            setPics(breedPicData)

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }


    async function handleSaveBreed(breedID) {
        try {
            const response = await axios.post('/api/cats', { breedID }, {
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
        setBreeds([]);
        setPics([]);
        if (breeds.length === 0) {
            getBreedsAndPics();
        }
    }, []);

    return (
        <>
            <h1>Cats! Cats! Cats!</h1>
            <div id="cats">
                {breeds.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    breeds.map((breed) => (
                        <div className="breed-card" key={breed.id}>
                            <h3>{breed.name}</h3>
                            <div className="breed-image">
                                {console.log(breed)}
                                {pics[breed.id] ? (
                                    <img src={pics[breed.id].url} alt={breed.name} />
                                ) : (
                                    <p>No image available</p>
                                )}
                            </div>
                            <div className="breed-body">
                                <p>{breed.description}</p>
                                <p>{breed.life_span} years</p>
                                <p>{breed.weight.imperial} lbs</p>
                            </div>
                            <button onClick={() => handleSaveBreed(breed.id)}>Save to Profile</button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Index;
