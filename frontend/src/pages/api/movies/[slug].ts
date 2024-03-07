import { NextApiRequest, NextApiResponse } from "next";
import Client from '@/libs/client';
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();
        }

        const { slug } = req.query;

        if (!slug || typeof slug !== 'string') {
            throw new Error('Invalid slug');
        }

        const response = await axios.get(`${Client}/api/filmes/${slug}`);
        const data = response.data; // Extract data from Axios response

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}
