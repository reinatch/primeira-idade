import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import Client from '@/libs/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }


    const moviesResponse  = await axios.get(`${Client}/api/filmes/`);
    const movies = moviesResponse.data;

    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}