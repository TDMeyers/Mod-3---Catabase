import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";

export default function Profile({ user }) {

    user = useSelector((state) => state.user)

    console.log(user)

    const { username, image, email } = user
    const [ breeds, setBreeds ] = useState([])
    // const { input, setInput } = useState('')

    async function getBreeds(){
        try {
            const response = await axios.get('/api/cats')
            setCats(response.data)
        } catch (err) {
            console.log(err)
        }
    } 

    function handleSubmit(e) {
        e.preventDefault()
        setInput(e.target.value)
    }
    const hiddenEmail = email.split('')
    for (let i = 3; i < hiddenEmail.length; i++) {
        hiddenEmail[i] = "*"
    }
    hiddenEmail.join('')
    return (
        <>
            <div className="user-profile">
//       <img src={image} alt='Profile image' />
//       <h1>{username}</h1>
//       <p>{hiddenEmail}</p>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor='about'>A little about you and your intrests or expertise</label>
//         <textarea id='about' name='about' rows='5' col='30'></textarea>
//         <button>Submit</button>
//       </form>
//     </div>
<div className="saved-breeds">
<h3>Saved Breeds</h3>
{breeds.map((cat, index) => 
    <div className="a-cat" key={index}>
        
    </div>
)}
</div>
        </>
    );
}