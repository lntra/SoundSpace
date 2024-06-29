import { sql } from '@vercel/postgres'

import {
    News
} from './definitions';

export async function fetchAllNews(current: number = 0) {
    const limit = 20;
    const offset = current * limit;
    
    try {
        const data = await sql<News>
        `SELECT * FROM news ORDER BY created_at ASC 
        LIMIT ${limit} OFFSET ${offset}`
        return data.rows;
    } catch (error) {
        console.log('Database Error:',error);
        throw new Error('Failed to fetch news data');
    }

}
