import React, { useState } from 'react';
// import axios from 'axios';
import axios from "../../src/api";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Container } from '@mui/material';

function MediaCard({ breed }) {

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    async function handleSaveBreed(id, name) {
        try {
            const response = await axios.post('/api/cats', { id, name }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Breed saved:', response.data);
            setSuccessOpen(true);
        } catch (error) {
            console.error('Error saving breed:', error);
            setErrorOpen(true);
        }
    }

    return (
        <Container>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={breed.url || "/placeholder-image.jpg"} // You can use a placeholder image if breed.url is not available
                    title={breed.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {breed.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {breed.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => handleSaveBreed(breed.id, breed.name)}>
                        Save to Profile
                    </Button>
                </CardActions>
            </Card>
            <Snackbar
                open={successOpen}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={() => setSuccessOpen(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity="success"
                    onClose={() => setSuccessOpen(false)}
                >
                    Breed saved successfully!
                </MuiAlert>
            </Snackbar>

            <Snackbar
                open={errorOpen}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={() => setErrorOpen(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity="error"
                    onClose={() => setErrorOpen(false)}
                >
                    Error saving breed. Please try again later.
                </MuiAlert>
            </Snackbar>
        </Container>
    );
}

export default MediaCard;
