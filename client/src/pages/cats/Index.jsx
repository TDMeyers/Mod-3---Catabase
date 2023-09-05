import React, { useEffect, useState } from "react";
import axios from "axios";
import Mediacard from "../../components/Mediacard"
import Grid from '@mui/material/Grid'; // Grid version 1
import { Typography } from "@mui/material";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

function Index({ user }) {
    const [breeds, setBreeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getBreedsAndPics() {
        try {
            const breedsUrl = `https://api.thecatapi.com/v1/breeds`;
            const response = await axios.get(breedsUrl, {
                headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API },
            });
            const breedsData = response.data;

            // Fetch the picture information for each breed and add the 'url' property
            const breedPromises = breedsData.map(async (breed) => {
                const breedPicResponse = await axios.get(
                    `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&size=small`,
                    {
                        headers: {
                            "x-api-key": import.meta.env.VITE_APP_THE_CAT_API,
                        },
                    }
                );
                const breedPicData = breedPicResponse.data[0];
                if (breedPicData) {
                    breed.url = breedPicData.url;
                }
                return breed;
            });

            const breedsWithUrls = await Promise.all(breedPromises);
            setBreeds(breedsWithUrls);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    async function handleSaveBreed(id, name) {
        try {
            const response = await axios.post('/api/cats', { id, name }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Breed saved:', response.data);
        } catch (error) {
            console.error('Error saving breed:', error);
        }
    }


    useEffect(() => {
        if (breeds.length === 0) {
            getBreedsAndPics();
        }
    }, []);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xl">
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
                Cats! Cats! Cats! 
            </Typography>
            <Grid container spacing={2} justifyContent="center" >
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    breeds.map((breed, index) => (
                        <Grid item xs={4} key={index}>
                        <Mediacard breed={breed} key={breed.id} />
                        </Grid>
                    ))
                )}
            </Grid>
            </Box>
        </Container>
        </ThemeProvider>
    );
}

export default Index;
