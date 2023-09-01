import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from '../../api'

function Index({ user }) {

    const [breeds, setBreeds] = useState([])

    const [pics, setPics] = useState([])

    const navigate = useNavigate()

    async function getBreeds() {

        const breedsUrl = `https://api.thecatapi.com/v1/breeds`;
        try {
            console.log('v1.00')
            const response = await axios.get(breedsUrl,
                {
                    headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API }
                }
            );
            console.log(response.data)
            setBreeds(response.data)

        } catch (err) {
            console.log(err)
        }
    }

    async function getPics(obj) {

        const picUrl = `https://api.thecatapi.com/v1/images/${obj.reference_image_id}?size=medium`;

        try {
            console.log('v1.00')
            const response = await axios.get(picUrl,
                {
                    headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API }
                }
            );

            const newPic = response.data
            setPics((prevPics) => [...prevPics, newPic])
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBreeds();
    }, []);

    useEffect(() => {
        // Loop through the breeds and fetch pics for each breed
        breeds.forEach((breed) => {
            getPics(breed);
        });
    }, [breeds]);

    return (
        <>
            <h1>Cats! Cats! Cats!</h1>
            <div id="cats">
                {pics === null ? (
                    <p>Loading...</p>
                ) : (
                    pics.map((pic) => (
                        <div className="each-breed" key={pic.id}>
                            <h3>{pic.name}</h3>
                            <div className="image">
                                <img src={pic.url} alt={pic.name} />
                            </div>
                        </div>
                    ))
                )}

                {/* {user &&
                <button onClick={() => navigate('/cats/new')}>NEW cat</button>
            } */}
            </div>
        </>
    );
}

export default Index
