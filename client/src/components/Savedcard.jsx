import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import { Container, TextField } from '@mui/material';

export function SavedCard({ breed, pic, onDelete, onUpdate, deleteSuccessOpen, setDeleteSuccessOpen, deleteErrorOpen, setDeleteErrorOpen }) {

    const user = useSelector((state) => state.user);
    const { username, image, email } = user;
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [name, setName] = useState(breed.name);
    const [age, setAge] = useState('');

    async function handleUpdateBreed(_id, name, age) {
        try {
            const response = await axios.post(`/api/cats/${_id}`, { _id, name, age }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },

            });
            setSuccessOpen(true);
        } catch (error) {
            console.error('Error updating breed:', error);
            setErrorOpen(true);
        }
    }

    return (
        <Container>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={pic.url || "/placeholder-image.jpg"}
                    title={breed.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {breed.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => handleUpdateBreed(breed._id, name, age)}>
                        Update
                    </Button>
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Age"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <Button size="small" onClick={onDelete}>
                        Re-meow-ve
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
                    Action successful!
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
                    Error occurred. Please try again later.
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={deleteSuccessOpen}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={() => setDeleteSuccessOpen(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity="success"
                    onClose={() => setDeleteSuccessOpen(false)}
                >
                    Favorite deleted successfully!
                </MuiAlert>
            </Snackbar>

            <Snackbar
                open={deleteErrorOpen}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={() => setDeleteErrorOpen(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity="error"
                    onClose={() => setDeleteErrorOpen(false)}
                >
                    Error occurred while deleting. Please try again later.
                </MuiAlert>
            </Snackbar>
        </Container>
    );
}


