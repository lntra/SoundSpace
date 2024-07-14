import { sql } from '@vercel/postgres'

import {
    News
} from './definitions';

export async function fetchAllNews(current : number) {
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

export async function fetchNewsbyID(newsId: string){
    
    try {
        const data = await sql<News>
        `SELECT * FROM news WHERE id = ${newsId}`

        if (data.rowCount === 0) {
            return null;
        }

        return data.rows;
    } catch (error) {
        console.log('Database Error:',error);
        throw new Error('Failed to fetch single news data');
    }

}
