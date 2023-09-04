import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Profile() {
    const user = useSelector((state) => state.user);
    const { username, image, email } = user;

    const [favs, setFavs] = useState([]);
    const [favsInfo, setFavsInfo] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    async function getFavs() {
        try {
            const response = await axios.get("/api/cats", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setFavs(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function getFavsInfo(breedId) {
        const favInfoUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
        try {
            const response = await axios.get(favInfoUrl, {
                headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API },
            });
            const newFavInfo = response.data;
            console.log(response.data)
            setFavsInfo(newFavInfo); // Set the new data, replacing the old data
        } catch (err) {
            console.log(err);
        }
    }
    

    async function handleDeleteFav(favId) {
        try {
            await axios.delete(`/api/cats/${favId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setFavs((prevFavs) => prevFavs.filter((fav) => fav._id !== favId));
            setFavsInfo((prevFavInfo) => prevFavInfo.filter((fav) => fav._id !== favId));
        } catch (err) {
            console.log(err);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    const hiddenEmail = email.split("");
    for (let i = 3; i < hiddenEmail.length; i++) {
        hiddenEmail[i] = "*";
    }
    const maskedEmail = hiddenEmail.join("");

    useEffect(() => {
        setFavs([]);
        setFavsInfo([]);
        getFavs();
    }, []);

    useEffect(() => {
        if (favs.length > 0) {
            favs.forEach((fav) => {
                getFavsInfo(fav.breed);
            });
        }
    }, [favs]);

    return (
        <>
            <div className="user-profile">
                <img src={image} alt="Profile image" />
                <h1>{username}</h1>
                <p>{maskedEmail}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="about">A little about you and your interests or expertise</label>
                    <textarea id="about" name="about" rows="5" col="30"></textarea>
                    <button>Submit</button>
                </form>
            </div>
            <div className="saved-breeds">
                <h3>Saved Breeds</h3>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    favsInfo.map((fav, index) => (
                        <div className="a-cat" key={index}>
                            {/* {console.log(fav)} */}
                            <h3>{fav.breed}</h3>
                            <h3>{fav.id}</h3>
                            <div className="breed-image">
                                <img src={fav.url} alt={fav.id} />
                            </div>
                            <button onClick={() => handleDeleteFav(fav._id)}>Re-meow-ve Favorite</button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
