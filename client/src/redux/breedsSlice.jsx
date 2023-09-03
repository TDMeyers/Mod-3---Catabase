import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    breeds: [],
    pics: [],

}

const breedSlice = createSlice({
    name: 'breeds',
    initialState,
    reducers: {
        fetchBreeds: async (state, action) => {
            try {
                const breedsUrl = 'https://api.thecatapi.com/v1/breeds';
                const response = await axios.get(breedsUrl, {
                    headers: { 'x-api-key': import.meta.env.VITE_APP_THE_CAT_API },
                });
                state.breeds = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        fetchPics: async (state, action) => {
            try {
                const picUrl = `https://api.thecatapi.com/v1/images/${action.payload.reference_image_id}?size=thumb`;
                const response = await axios.get(picUrl, {
                    headers: { 'x-api-key': import.meta.env.VITE_APP_THE_CAT_API },
                });
                state.pics.push(response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
});

export const { fetchBreeds, fetchPics } = breedSlice.actions;
export default breedSlice.reducer;