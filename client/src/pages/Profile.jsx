import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import axios from "axios";
import axios from "../../src/api";
import { SavedCard } from '../components/Savedcard';
import Grid from '@mui/material/Grid'; // Grid version 1
import { Typography } from "@mui/material";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

export default function Profile() {
    const user = useSelector((state) => state.user);
    const { username, image, email } = user;

    const [favs, setFavs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
    const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);

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
                const favInfo = favInfoResponse.data[0];
                return { fav, favInfo }; // Combine fav and favInfo into an object
            });

            const favInfoData = await Promise.all(favInfoPromises);

            setFavs(favInfoData); // Set favs as the combined array of fav and favInfo objects

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
    
            // Fetch updated favs data after deletion
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
                const favInfo = favInfoResponse.data[0];
                return { fav, favInfo }; // Combine fav and favInfo into an object
            });
    
            const favInfoData = await Promise.all(favInfoPromises);
    
            // Update the state with the updated data
            setFavs(favInfoData);
    
            // Update state to call upon the snackbar
            setDeleteSuccessOpen(true);
        } catch (err) {
            console.log(err);
            setDeleteErrorOpen(true);
        }
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    useEffect(() => {
        if (favs.length === 0) {
            // Only fetch favs if favs array is empty
            getFavsAndInfo();
        }
    }, [favs]); // Add an empty dependency array to ensure this effect runs only once

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xl" margin="1rem">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Welcome, {username}, are you enjoying herding cats?
                    </Typography>
                    <Typography variant="h5" spacing={2}>
                        Saved Kitties
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            favs.map(({ fav, favInfo }) => (
                                <Grid item xs={4} key={fav._id}>
                                    <SavedCard
                                        breed={fav}
                                        pic={favInfo}
                                        onDelete={() => handleDeleteFav(fav._id)}
                                        onUpdate={(name, age) => handleUpdateFav(fav._id, name, age)}
                                        deleteSuccessOpen={deleteSuccessOpen}
                                        setDeleteSuccessOpen={setDeleteSuccessOpen}
                                        deleteErrorOpen={deleteErrorOpen}
                                        setDeleteErrorOpen={setDeleteErrorOpen}
                                    />
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
