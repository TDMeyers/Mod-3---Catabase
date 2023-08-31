import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import axios from '../../api'

function Index({ user }) {

    const [cats, setCats] = useState([])

    const navigate = useNavigate()

    const url = `https://api.thecatapi.com/v1/breeds`;

    let storedBreeds = []

    async function getBreeds() {
        try {
            console.log('v1.00')
            const response = await axios.get(url,
                {
                    headers: { "X-Api-Key": import.meta.env.VITE_APP_THE_CAT_API }
                }
            );
            storedBreeds = response.data.filter(img => img.image?.url = null)

            setCats(storedBreeds)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBreeds()
    }, [])

    return (
        <>
            <h1>Cats! Cats! Cats!</h1>
            <div id="cats">

                {cats.map((cat) =>
                    <div className="a-cat" key={cat.id}>
                        <Link to={`/cats/${cat._id}`}>{cat.subject}</Link>
                    </div>
                )}


                {user &&
                    <button onClick={() => navigate('/cats/new')}>NEW cat</button>
                }

            </div>
        </>
    )
}

export default Index