import { StateCreator } from "zustand";
import { MovieInterface } from "@/types";
import Client from '@/libs/client';

import axios from "axios";

const createMovieSlice: StateCreator<any> = (set) =>({
    movies:[],
    loadMovies(){
        axios.get(`${Client}/api/filmes/`)
        .then(res => {
            console.log(res.data)
            set((state: any) => ({...state, movies: res.data}))
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
})

export default createMovieSlice;