import { sql } from '@vercel/postgres'

import {
    News
} from './definitions';

export async function fetchAllNews() {

    try {
        const data = await sql<News>`SELECT * FROM news`
        return data.rows;
    } catch (error) {
        console.log('Database Error:',error);
        throw new Error('Failed to fetch news data');
    }

}
