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
    const [idToBreedInfo, setIdToBreedInfo] = useState({}); // Declare the mapping object

    async function getFavsAndInfo() {
        try {
            const response = await axios.get("/api/cats", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const favsData = response.data;

            // Fetch breed info for each fav
            const favInfoPromises = favsData.map(async (fav) => {
                const favInfoResponse = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${fav.breed}`, {
                    headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API },
                });
                const favInfo = favInfoResponse.data[0]; // Assuming each fav has only one info entry
                return favInfo;
            });

            const favInfoData = await Promise.all(favInfoPromises);

            // Create a mapping object to associate _id values with breed info
            const idToBreedInfo = {};
            favsData.forEach((fav, index) => {
                idToBreedInfo[fav._id] = favInfoData[index];
            });

            setFavs(favsData);
            setFavsInfo(favInfoData);
            setIdToBreedInfo(idToBreedInfo); // Store the mapping object in state
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
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
        if (favs.length === 0) {
            // Only fetch favs if favs array is empty
            getFavsAndInfo();
        }
    }, []);

    return (
        <div>
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
                    <div className="fav-card">
                        {favsInfo.map((fav, index) => (
                            <div className="a-cat" key={index}>
                                <div className="fav-image">
                                    <img src={fav.url} alt={fav.id} />
                                </div>
                                <div className="fav-info">
                                    <h3>{fav.breed}</h3>
                                    <h3>{fav.id}</h3>
                                </div>
                                <button onClick={() => handleDeleteFav(fav._id)}>Re-meow-ve Favorite</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
