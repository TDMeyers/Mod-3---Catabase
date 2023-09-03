import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from '../../api'

function Index({ user }) {

    const [breeds, setBreeds] = useState([])

    const [pics, setPics] = useState([])

    const navigate = useNavigate()

    // async function getBreeds() {

    //     const breedsUrl = `https://api.thecatapi.com/v1/breeds`;
    //     try {
    //         // console.log('v1.00')
    //         const response = await axios.get(breedsUrl,
    //             {
    //                 headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API }
    //             }
    //         );
    //         console.log(response.data)
    //         setBreeds(response.data)

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    async function getPics(obj) {

        const picUrl = `https://api.thecatapi.com/v1/images/${obj.reference_image_id}?size=thumb`;

        try {
            // console.log('v1.00')
            const response = await axios.get(picUrl,
                {
                    headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API }
                }
            );

            const newPic = response.data
            // console.log(response.data)
            setPics((prevPics) => [...prevPics, newPic])
        } catch (err) {
            console.log(err)
        }
    }

    async function handleSaveBreed(breedID) {
        // Send a POST request to save the breed
        try {
            const response = await axios.post('/api/cats', { breedID }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Breed saved:', response.data);
        } catch (error) {
            console.error('Error saving breed:', error);
        }
    }

    useEffect(() => {
        getBreeds();
    }, []);

    useEffect(() => {
        // Loop through the breeds and fetch pics for each breed
        breeds.forEach((breed) => {
            getPics(breed);
            // console.log(breed)
        });
    }, [breeds]);

    return (
        <>
            <h1>Cats! Cats! Cats!</h1>
            <div id="cats">
                {pics === null ? (
                    <p>Loading...</p>
                ) : (
                    pics.map((pic, index) => (
                        <div className="breed-card" key={index}>
                            {console.log(pics)}
                            <h3>{pic.breeds[0].name}</h3>
                            <div className="breed-image">
                                <img src={pic.url} alt={pic.name} />
                            </div>
                            <div className="breed-body">
                                <p>{pic.breeds[0].description}</p>
                                <p>{pic.breeds[0].life_span} years</p>
                                <p>{pic.breeds[0].weight.imperial} lbs</p>
                            </div>
                            <button onClick={() => handleSaveBreed(`${pic.breeds[0].id}`)}>Save to Profile</button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Index
