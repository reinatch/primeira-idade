import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import Client from '@/libs/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // Example Axios GET request to retrieve movies count
    const moviesResponse  = await axios.get(`${Client}/api/filmes/`);
    const movies = moviesResponse.data;

    // Count the number of movies
    const moviesCount = movies.length;

    // Generate a random index based on movies count
    const randomIndex = Math.floor(Math.random() * moviesCount);

    // Example Axios GET request to retrieve a random movie
    const randomMovie = movies[randomIndex];

    return res.status(200).json(randomMovie);

  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}