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

    async function getPics({obj}) {

        const picsUrl = 'https://api.thecatapi.com/v1/images/search';

        const filteredPics = [{obj}]

        try {
            console.log('v1.00')
            const filteredPics = await axios.get(picsUrl,
                {
                    headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API }
                }
            );

            console.log(filteredPics)
        } catch (err) {
            console.log(err)
        }

        console.log(filteredPics)
        setPics(filteredPics)
    }

    useEffect(() => {
        getBreeds()
    }, [])

    return (
        <>
            <h1>Cats! Cats! Cats!</h1>
            <div id="cats">
                {breeds.map((breed) =>
                    <div className="each-breed" key={breed.id}>
                        <h3>{breed.name}</h3>
                        <img src={} />
                    </div>
                )}

                {/* {user &&
                    <button onClick={() => navigate('/cats/new')}>NEW cat</button>
                } */}

            </div>
        </>
    )
}

export default Index