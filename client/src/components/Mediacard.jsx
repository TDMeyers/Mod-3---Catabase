import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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

function MediaCard({ breed }) {
    return (
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
    );
}

export default MediaCard;
