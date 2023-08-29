import { useState } from "react"

export default function Profile({ user }) {
    const { username, image, email } = user
    const { input, setInput } = useState('')
    console.log(user)
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
        <div>
            <h1>{username}</h1>
            <p>Email: {hiddenEmail}</p>
            <img src={image} alt='Profile Image'></img>
            {input.length > 0 ?
                <>
                    <h3>About:</h3>
                    <p>{input}</p>
                </>

                :
                <form onSubmit={handleSubmit}>
                    <label htmlFor='about'><h3>A little about you and your interests or expertise:</h3></label>
                    <textarea id='about' name='about' rows='5' col='30'></textarea>
                    <button>Submit</button>
                </form>
            }

        </div>
    );
}