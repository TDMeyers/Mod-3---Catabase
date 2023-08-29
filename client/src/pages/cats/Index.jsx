import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import axios from '../../api'

function Index({ user }) {

    const [cats, setcats] = useState([])

    const navigate = useNavigate()

    async function getcats() {
        try {
            console.log('v1.00')
            const response = await axios.get('/api/cats')
            setcats(response.data)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getcats()
    }, [])

    return (
            <>
                <h1>Index View</h1>
                <div id="cats">

                        {cats.map((cat, index) => 
                            <div className="a-cat" key={index}>
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