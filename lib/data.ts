import { sql } from '@vercel/postgres'

import {
    News,
    Posts,
    Comments,
    Communities
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

export async function fetchCommunitybyID(communityId: string){
    
    try {
        const data = await sql<Communities>
        `SELECT * FROM communities WHERE id = ${communityId}`

        if (data.rowCount === 0) {
            return null;
        }

        return data.rows;
    } catch (error) {
        console.log('Database Error:',error);
        throw new Error('Failed to fetch single news data');
    }

}

export async function fetchAllPosts(cursor: any | null, limit: number) {
    try {
        let query : any;
        const limits = limit + 1;

        if(cursor){
            query = sql<Posts>`
                SELECT * 
                FROM posts 
                WHERE (created_at, id) > (${cursor.createdAt}, ${cursor.id})
                ORDER BY created_at ASC
                LIMIT ${limits}
            `;
        } else {
            query = sql<Posts>`
                SELECT * 
                FROM posts
                ORDER BY created_at ASC
                LIMIT ${limit}
            `;
        }

        const data = await query;

        const posts = data.rows;

        const hasNextPage = cursor ? posts.length === limits  : posts.length === limit;

        const nextCursor = hasNextPage ? { createdAt: posts[posts.length - 1].created_at, id: posts[posts.length - 1].id } : null;

        const finalPosts = cursor ? posts.slice(1) : posts;

        return {
            allPosts: finalPosts || [],
            nextCursor,
            hasNextPage,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch posts data');
    }
}

export async function fetchPostsByIDInfinite(cursor : any | null , limit : number, communityId : string ) {
    try {
        let query : any;
        const limits = limit + 1;

        if(cursor){
            query = sql<Posts>`
                SELECT * 
                FROM posts 
                WHERE (created_at, id) > (${cursor.createdAt}, ${cursor.id})
                    AND community_id = ${communityId}
                ORDER BY created_at ASC
                LIMIT ${limits}
            `;
        } else {
            query = sql<Posts>`
                SELECT * 
                FROM posts
                WHERE community_id = ${communityId}
                ORDER BY created_at ASC
                LIMIT ${limit}
            `;
        }

        const data = await query;

        const posts = data.rows;

        const hasNextPage = cursor ? posts.length === limits  : posts.length === limit;

        const nextCursor = hasNextPage ? { createdAt: posts[posts.length - 1].created_at, id: posts[posts.length - 1].id } : null;

        const finalPosts = cursor ? posts.slice(1) : posts;

        return {
            allPosts: finalPosts || [],
            nextCursor,
            hasNextPage,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch posts data');
    }
}

export async function fetchPostsbyID(postId: string){
    
    try {
        const data = await sql<Posts>
        `SELECT * FROM posts WHERE id = ${postId}`

        if (data.rowCount === 0) {
            return null;
        }

        return data.rows;
    } catch (error) {
        console.log('Database Error:',error);
        throw new Error('Failed to fetch single news data');
    }

}

export async function fetchCommentsbyID(postId: string){
    
    try {
        const data = await sql<Comments>
        `SELECT * FROM comments WHERE post_id = ${postId}`

        if (data.rowCount === 0) {
            return null;
        }

        return data.rows;
    } catch (error) {
        console.log('Database Error:',error);
        throw new Error('Failed to fetch single news data');
    }

}