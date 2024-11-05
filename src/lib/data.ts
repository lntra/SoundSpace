import { sql } from "@vercel/postgres";

import {
  type News,
  type Posts,
  type Comments,
  type Communities,
  type User,
  type Followers,
  type Following,
  type Following_commmunity,
} from "./definitions";
const bcrypt = require("bcrypt");

export async function fetchAllNewsDefault() {
  const limit = 3;

  try {
    const data = await sql<News>`SELECT 
            * 
        FROM news 
        ORDER BY clicks DESC
        LIMIT ${limit}`;
    return data.rows;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch news data");
  }
}

export async function fetchAllNewsTrending(cursor: any | null, limit: number) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<News>`
                SELECT 
                    news.*,
                    users.name AS user_name 
                FROM news 
                JOIN users ON news.user_id = users.id
                WHERE (news.clicks, news.id) < (${cursor.clicks}, ${cursor.id})
                ORDER BY clicks DESC 
                LIMIT ${limits}
            `;
    } else {
      query = sql<News>`
                SELECT 
                    news.*,
                    users.name AS user_name 
                FROM news 
                JOIN users ON news.user_id = users.id
                ORDER BY clicks DESC 
                LIMIT ${limits}
            `;
    }

    const data = await query;

    const news = data.rows;

    const hasNextPage = news.length === limits;

    const nextCursor = hasNextPage
      ? { clicks: news[news.length - 1].clicks, id: news[news.length - 1].id }
      : null;

        const finalResults = hasNextPage ? news.slice(0, limits) : news;

    return {
      allNews: finalResults || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch news data");
  }
}

export async function fetchAllNewsRecent(cursor: any | null, limit: number) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<News>`
            SELECT 
                news.*,
                users.name AS user_name 
            FROM news 
            JOIN users ON news.user_id = users.id
            WHERE (news.created_at, news.id) > (${cursor.createdAt} , ${cursor.id})
            ORDER BY created_at ASC 
            LIMIT ${limits}
            `;
    } else {
      query = sql<News>`
            SELECT 
                news.*,
                users.name AS user_name 
            FROM news 
            JOIN users ON news.user_id = users.id
            ORDER BY created_at ASC 
            LIMIT ${limits}
            `;
    }

    const data = await query;

    const news = data.rows;

    const hasNextPage = news.length === limits;

    const nextCursor = hasNextPage
      ? {
          createdAt: news[news.length - 1].created_at,
          id: news[news.length - 1].id,
        }
      : null;

        const finalResults = hasNextPage ? news.slice(0, limit) : news;

    return {
      allNews: finalResults || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch news data");
  }
}

export async function fetchAllNewsArticles(cursor: any | null, limit: number) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<News>`
            SELECT 
                news.*,
                users.name AS user_name 
            FROM news 
            JOIN users ON news.user_id = users.id
            WHERE tag = 'Article'  
                AND (news.created_at, news.id) > (${cursor.createdAt} , ${cursor.id})
            ORDER BY created_at ASC
            LIMIT ${limits}
            `;
    } else {
      query = sql<News>`
            SELECT 
                news.*,
                users.name AS user_name 
            FROM news 
            JOIN users ON news.user_id = users.id
            WHERE tag = 'Article' 
            ORDER BY created_at ASC
            LIMIT ${limits}
            `;
    }

    const data = await query;

    const news = data.rows;

    const hasNextPage = news.length === limits;

    const nextCursor = hasNextPage
      ? {
          createdAt: news[news.length - 1].created_at,
          id: news[news.length - 1].id,
        }
      : null;

        const finalResults = hasNextPage ? news.slice(0, limit) : news;

    return {
      allNews: finalResults || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch news data");
  }
}

export async function fetchAllNewsNews(cursor: any | null, limit: number) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<News>`
            SELECT 
                news.*,
                users.name AS user_name 
            FROM news 
            JOIN users ON news.user_id = users.id
            WHERE tag = 'News'  
                AND (news.created_at, news.id) > (${cursor.createdAt} , ${cursor.id})
            ORDER BY created_at ASC 
            LIMIT ${limits}
            `;
    } else {
      query = sql<News>`
            SELECT 
                news.*,
                users.name AS user_name 
            FROM news 
            JOIN users ON news.user_id = users.id
            WHERE tag = 'News' 
            ORDER BY created_at ASC
            LIMIT ${limits}
            `;
    }

    const data = await query;

    const news = data.rows;

    const hasNextPage = news.length === limits;

    const nextCursor = hasNextPage
      ? {
          createdAt: news[news.length - 1].created_at,
          id: news[news.length - 1].id,
        }
      : null;

        const finalResults = hasNextPage ? news.slice(0, limit) : news;

    return {
      allNews: finalResults || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch news data");
  }
}

export async function fetchNewsByQueryInfinite(
  cursor: any | null,
  limit: number,
  search: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    const searchDecoded = decodeURIComponent(search);

    if (cursor) {
      query = sql<News>`
                SELECT 
                news.*, 
                users.name AS user_name,
                ts_rank_cd(
                    to_tsvector('english', title || ' ' || description || ' ' || pagecontent || ' ' || tag),
                    phraseto_tsquery('english', ${searchDecoded})
                ) AS rank
                FROM news, phraseto_tsquery('english', ${searchDecoded}) AS query 
                JOIN users ON news.user_id = users.id
                WHERE query @@ to_tsvector('english', title || ' ' || description || ' ' || pagecontent || ' ' || tag)
                AND (news.created_at, news.id) > (${cursor.createdAt}, ${cursor.id})
                ORDER BY rank DESC
                LIMIT ${limits};
            `;
    } else {
      query = sql<News>`
                SELECT 
                news.*, 
                ts_rank_cd(
                    to_tsvector('english', title || ' ' || description || ' ' || pagecontent || ' ' || tag),
                    phraseto_tsquery('english', ${searchDecoded})
                ) AS rank
                FROM news, phraseto_tsquery('english', ${searchDecoded}) AS query 
                WHERE query @@ to_tsvector('english', title || ' ' || description || ' ' || pagecontent || ' ' || tag)
                ORDER BY rank DESC
                LIMIT ${limit};
            `;
    }

    const data = await query;

    const news = data.rows;

    const hasNextPage = news.length === limits;

    const nextCursor = hasNextPage
      ? {
          createdAt: news[news.length - 1].created_at,
          id: news[news.length - 1].id,
        }
      : null;

        const finalResults = hasNextPage ? news.slice(0, limit) : news;

    return {
      allNews: finalResults || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch communities data");
  }
}

export async function fetchNewsbyID(newsId: string) {
  try {
    const data = await sql<News>`SELECT 
            news.*,
            users.name AS user_name 
        FROM news 
        JOIN users ON news.user_id = users.id
        WHERE news.id = ${newsId}
        `;

    if (data.rowCount === 0) {
      return null;
    }

    return data.rows;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch single news data");
  }
}

export async function fetchAllCommunities(
  current: number,
  tag: string | undefined,
) {
  let limit = 6;

  if (current > 0) {
    limit = limit * current;
  }

  if (tag !== "undefined") {
    try {
      const data = await sql<Communities>`SELECT * FROM communities 
            WHERE ${tag} = ANY(communities.tags)
            ORDER BY created_at ASC 
            LIMIT ${limit}`;
      return data.rows;
    } catch (error) {
      console.log("Database Error:", error);
      throw new Error("Failed to fetch news communities");
    }
  } else {
    try {
      const data = await sql<Communities>`SELECT * FROM communities 
            ORDER BY created_at ASC 
            LIMIT ${limit}`;
      return data.rows;
    } catch (error) {
      console.log("Database Error:", error);
      throw new Error("Failed to fetch news communities");
    }
  }
}

export async function fetchCommunitybyID(communityId: string) {
  try {
    const data = await sql<Communities>`
        SELECT 
            communities.*,
            COUNT(following_commmunity.id) AS followings
        FROM communities 
        LEFT JOIN following_commmunity ON communities.id = following_commmunity.community_id
        WHERE communities.id = ${communityId}
        GROUP BY communities.id
        `;

    if (data.rowCount === 0) {
      return null;
    }

    return data.rows;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch single news data");
  }
}

export async function fetchCommunitiesByQueryInfinite(
  cursor: any | null,
  limit: number,
  search: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    const searchDecoded = decodeURIComponent(search);

    if (cursor) {
      query = sql<Communities>`
                SELECT 
                communities.*, 
                array_to_tsvector(tags) AS array,
                ts_rank_cd(
                    to_tsvector('english', name || ' ' || description || ' ' || array_to_string(tags, ' ')),
                    phraseto_tsquery('english', ${searchDecoded})
                ) AS rank
                FROM communities, phraseto_tsquery('english', ${searchDecoded}) AS query 
                WHERE query @@ (to_tsvector('english', name || ' ' || description || ' ' || array_to_string(tags, ' ')) || array_to_tsvector(tags))
                AND (communities.created_at, communities.id) > (${cursor.createdAt}, ${cursor.id})
                ORDER BY rank DESC
                LIMIT ${limits};
            `;
    } else {
      query = sql<Communities>`
                SELECT 
                communities.*, 
                array_to_tsvector(tags) AS array,
                ts_rank_cd(
                    to_tsvector('english', name || ' ' || description || ' ' || array_to_string(tags, ' ')),
                    phraseto_tsquery('english', ${searchDecoded})
                ) AS rank
                FROM communities, phraseto_tsquery('english', ${searchDecoded}) AS query 
                WHERE query @@ (to_tsvector('english', name || ' ' || description || ' ' || array_to_string(tags, ' ')) || array_to_tsvector(tags))
                ORDER BY rank DESC
                LIMIT ${limit};
            `;
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = cursor
      ? posts.length === limits
      : posts.length === limit;

    const nextCursor = hasNextPage
      ? {
          createdAt: posts[posts.length - 1].created_at,
          id: posts[posts.length - 1].id,
        }
      : null;

    const finalResults = cursor ? posts.slice(1) : posts;

    return {
      allCommunities: finalResults || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch communities data");
  }
}

export async function fetchAllPosts(
  cursor: any | null,
  limit: number,
  tags: string | undefined,
  route: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (tags === undefined) {
      if (cursor) {
        switch (route) {
          //NO TAG + CURSOR
          case "Trending":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE posts.created_at >= NOW() - INTERVAL '14 days'
                                AND (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                            GROUP BY posts.id, users.name, communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                    `;
            break;
          case "Hot Topics":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts 
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                        GROUP BY  posts.id ,users.name , communities.name, communities.url_icon
                        ORDER BY comments DESC
                        LIMIT ${limits}
                    `;
            break;
          case "Recent":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts 
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE (posts.created_at, posts.id) < (${cursor.createdAt}, ${cursor.id}) 
                        GROUP BY posts.id, users.name, communities.name, communities.url_icon
                        ORDER BY posts.created_at DESC, posts.id DESC 
                        LIMIT ${limits}
                        `;
            break;
          case "Top Rated":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts 
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                        GROUP BY posts.id ,users.name , communities.name, communities.url_icon
                        ORDER BY likes DESC
                        LIMIT ${limits}
                    `;
            break;
        }
      } else {
        switch (route) {
          //NO TAG + NO CURSOR
          case "Trending":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE posts.created_at >= NOW() - INTERVAL '14 days'
                            GROUP BY posts.id, users.name, communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                    `;
            break;
          case "Hot Topics":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            GROUP BY  posts.id ,users.name , communities.name, communities.url_icon
                            ORDER BY comments DESC
                            LIMIT ${limits}
                        `;
            break;
          case "Recent":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts 
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            GROUP BY posts.id, users.name, communities.name, communities.url_icon
                            ORDER BY posts.created_at DESC, posts.id DESC 
                            LIMIT ${limits}
                        `;
            break;
          case "Top Rated":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            GROUP BY  posts.id ,users.name , communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                        `;
            break;
        }
      }
    } else {
      if (cursor) {
        switch (route) {
          //TAG + CURSOR
          case "Trending":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE posts.created_at >= NOW() - INTERVAL '14 days'
                                AND (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                                AND ${tags} = ANY(posts.tags)
                            GROUP BY posts.id, users.name, communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                        `;
            break;
          case "Hot Topics":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts 
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE (comments, posts.created_at, posts.id) > (${cursor.comments}, ${cursor.createdAt}, ${cursor.id})
                                AND ${tags} = ANY(posts.tags)
                            GROUP BY  posts.id ,users.name , communities.name, communities.url_icon
                            ORDER BY comments DESC
                            LIMIT ${limits}
                        `;
            break;
          case "Recent":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts 
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                                AND ${tags} = ANY(posts.tags)
                            GROUP BY  posts.id ,users.name , communities.name, communities.url_icon
                            ORDER BY posts.created_at ASC
                            LIMIT ${limits}
                        `;
            break;
          case "Top Rated":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts 
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                                AND ${tags} = ANY(posts.tags)
                            GROUP BY  posts.id ,users.name , communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                        `;
            break;
        }
      } else {
        switch (route) {
          //TAG + NO CURSOR
          case "Trending":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        (
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE posts.created_at >= NOW() - INTERVAL '14 days'
                            AND ${tags} = ANY(posts.tags)
                            GROUP BY posts.id, users.name, communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                        )
                        `;
            break;
          case "Hot Topics":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE ${tags} = ANY(posts.tags)
                            GROUP BY  posts.id, users.name , communities.name, communities.url_icon
                            ORDER BY comments DESC
                            LIMIT ${limits}
                        `;
            break;
          case "Recent":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE ${tags} = ANY(posts.tags)
                            GROUP BY  posts.id, users.name , communities.name, communities.url_icon
                            ORDER BY posts.created_at ASC
                            LIMIT ${limits}
                        `;
            break;
          case "Top Rated":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE ${tags} = ANY(posts.tags)
                            GROUP BY  posts.id, users.name , communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                        `;
            break;
        }
      }
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = posts.length === limits;

    const nextCursor =
      hasNextPage && posts.length > 0
        ? {
            createdAt: posts[posts.length - 1].created_at,
            id: posts[posts.length - 1].id,
          }
        : null;

    const finalPosts = hasNextPage ? posts.slice(0, limit) : posts;

    return {
      allPosts: finalPosts || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data");
  }
}

export async function fetchPostsByIDInfinite(
  cursor: any | null,
  limit: number,
  communityId: string,
  tags: string | undefined,
  route: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (tags === undefined) {
      if (cursor) {
        switch (route) {
          //NO TAG + CURSOR
          case "Trending":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        (
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                                AND community_id = ${communityId}
                                AND posts.created_at >= NOW() - INTERVAL '14 days'                            
                            GROUP BY posts.id, users.name, communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                        )
                        `;
            break;
          case "Hot Topics":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts 
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                                AND community_id = ${communityId}
                            GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                            ORDER BY comments DESC
                            LIMIT ${limits}
                        `;
            break;
          case "Recent":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts 
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                                AND community_id = ${communityId}
                            GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                            ORDER BY posts.created_at ASC
                            LIMIT ${limits}
                        `;
            break;
          case "Top Rated":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts 
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                                AND community_id = ${communityId}
                            GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                        `;
            break;
        }
      } else {
        switch (route) {
          //NO TAG + NO CURSOR
          case "Trending":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        (
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE community_id = ${communityId}
                                AND posts.created_at >= NOW() - INTERVAL '14 days'                            
                            GROUP BY posts.id, users.name, communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                        )
                    `;
            break;
          case "Hot Topics":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE community_id = ${communityId}
                        GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                        ORDER BY comments DESC
                        LIMIT ${limits}
                    `;
            break;
          case "Recent":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE community_id = ${communityId}
                            GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                            ORDER BY posts.created_at DESC
                            LIMIT ${limits}
                        `;
            break;
          case "Top Rated":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE community_id = ${communityId}
                        GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                        ORDER BY Likes DESC
                        LIMIT ${limits}
                    `;
            break;
        }
      }
    } else {
      if (cursor) {
        switch (route) {
          //TAG + CURSOR
          case "Trending":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        (
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                                AND community_id = ${communityId}
                                AND ${tags} = ANY(posts.tags)
                                AND posts.created_at >= NOW() - INTERVAL '14 days'
                            GROUP BY posts.id, users.name, communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                        )
                        `;
            break;
          case "Hot Topics":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts 
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                            AND community_id = ${communityId}
                            AND ${tags} = ANY(posts.tags)
                        GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                        ORDER BY posts.created_at ASC
                        LIMIT ${limits}`;
            break;
          case "Recent":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts 
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                            AND community_id = ${communityId}
                            AND ${tags} = ANY(posts.tags)
                        GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                        ORDER BY posts.created_at ASC
                        LIMIT ${limits}`;
            break;
          case "Top Rated":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts 
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                            AND community_id = ${communityId}
                            AND ${tags} = ANY(posts.tags)
                        GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                        ORDER BY posts.created_at ASC
                        LIMIT ${limits}`;
            break;
        }
      } else {
        switch (route) {
          case "Trending":
            //TAG + NO CURSOR
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        (
                            SELECT 
                                posts.*, 
                                users.name AS user_name, 
                                communities.name AS community_name,
                                communities.url_icon AS community_icon,
                                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                                COUNT(DISTINCT comments.id) AS comments
                            FROM posts
                            JOIN users ON posts.user_id = users.id
                            JOIN communities ON posts.community_id = communities.id
                            LEFT JOIN liked ON posts.id = liked.post_id
                            LEFT JOIN comments ON posts.id = comments.post_id
                            WHERE community_id = ${communityId}
                                AND ${tags} = ANY(posts.tags)
                                AND posts.created_at >= NOW() - INTERVAL '14 days'
                            GROUP BY posts.id, users.name, communities.name, communities.url_icon
                            ORDER BY likes DESC
                            LIMIT ${limits}
                        )
                    `;
            break;
          case "Hot Topics":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE community_id = ${communityId}
                            AND ${tags} = ANY(posts.tags)
                        GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                        ORDER BY comments DESC
                        LIMIT ${limits}
                    `;
            break;
          case "Recent":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE community_id = ${communityId}
                            AND ${tags} = ANY(posts.tags)
                        GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                        ORDER BY posts.created_at ASC
                        LIMIT ${limits}
                    `;
            break;
          case "Top Rated":
            query = sql<
              Posts & {
                user_name: string;
                community_name: string;
                community_icon: string;
                likes: number;
              }
            >`
                        SELECT 
                            posts.*, 
                            users.name AS user_name, 
                            communities.name AS community_name,
                            communities.url_icon AS community_icon,
                            COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                            COUNT(DISTINCT comments.id) AS comments
                        FROM posts
                        JOIN users ON posts.user_id = users.id
                        JOIN communities ON posts.community_id = communities.id
                        LEFT JOIN liked ON posts.id = liked.post_id
                        LEFT JOIN comments ON posts.id = comments.post_id
                        WHERE community_id = ${communityId}
                            AND ${tags} = ANY(posts.tags)
                        GROUP BY  posts.id , users.name , communities.name, communities.url_icon
                        ORDER BY Likes DESC
                        LIMIT ${limits}
                    `;
            break;
        }
      }
    }

    const data = await query;
    const posts = data.rows;

    const hasNextPage = posts.length === limits;

    const nextCursor =
      hasNextPage && posts.length > 0
        ? {
            createdAt: posts[posts.length - 1].created_at,
            id: posts[posts.length - 1].id,
          }
        : null;

    const finalPosts = hasNextPage ? posts.slice(0, limit) : posts;

    return {
      allPosts: finalPosts || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data");
  }
}

export async function fetchPostsByQueryInfinite(
  cursor: any | null,
  limit: number,
  search: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<
        Posts & {
          user_name: string;
          community_name: string;
          community_icon: string;
        }
      >`
                SELECT 
                    posts.*, 
                    users.name AS user_name, 
                    communities.name AS community_name,
                    communities.url_icon AS community_icon,
                    COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                    COUNT(DISTINCT comments.id) AS comments,
                    ts_rank_cd(to_tsvector('english', posts.content || '' || posts.content_post), query) AS rank
                FROM posts
                JOIN users ON posts.user_id = users.id
                LEFT JOIN liked ON posts.id = liked.post_id
                LEFT JOIN comments ON posts.id = comments.post_id 
                JOIN communities ON posts.community_id = communities.id,
                phraseto_tsquery('english', '${search}') query 
                WHERE query @@ to_tsvector('english', posts.content || '' || posts.content_post) 
                    AND (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                GROUP BY posts.id, users.name, communities.name, communities.url_icon, query.query
                ORDER BY rank DESC;
                LIMIT ${limits}
            `;
    } else {
      query = sql<
        Posts & {
          user_name: string;
          community_name: string;
          community_icon: string;
        }
      >`
                SELECT 
                    posts.*, 
                    users.name AS user_name, 
                    communities.name AS community_name,
                    communities.url_icon AS community_icon,
                    COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                    COUNT(DISTINCT comments.id) AS comments,
                    ts_rank_cd(to_tsvector('english', posts.content || '' || posts.content_post), query) AS rank
                FROM posts
                JOIN users ON posts.user_id = users.id
                LEFT JOIN liked ON posts.id = liked.post_id
                LEFT JOIN comments ON posts.id = comments.post_id 
                JOIN communities ON posts.community_id = communities.id,
                phraseto_tsquery('english', 'Rock') query 
                WHERE query @@ to_tsvector('english', posts.content || '' || posts.content_post) 
                GROUP BY posts.id, users.name, communities.name, communities.url_icon, query.query
                ORDER BY rank DESC
                LIMIT ${limits}
            `;
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = cursor
      ? posts.length === limits
      : posts.length === limit;

    const nextCursor = hasNextPage
      ? {
          createdAt: posts[posts.length - 1].created_at,
          id: posts[posts.length - 1].id,
        }
      : null;

    const finalPosts = cursor ? posts.slice(1) : posts;

    return {
      allPosts: finalPosts || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data");
  }
}

export async function fetchPostsbyID(postId: string) {
  try {
    const data = await sql<
      Posts & { user_name: string; community_name: string }
    >`SELECT 
                posts.*,
                users.name AS user_name,
                communities.url_icon AS community_icon,
                communities.name AS community_name,
                COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                COUNT(DISTINCT comments.id) AS comments
            FROM posts
            JOIN users ON posts.user_id = users.id
            JOIN communities ON posts.community_id = communities.id
            LEFT JOIN liked ON posts.id = liked.post_id
            LEFT JOIN comments ON posts.id = comments.post_id 
            WHERE posts.id = ${postId}
            GROUP BY  posts.id,  users.name , communities.name, communities.url_icon
        `;

    if (data.rowCount === 0) {
      return null;
    }

    return data.rows;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch single news data");
  }
}

export async function fetchCommentsbyID(postId: string, type: string) {
  try {
    let query: any;

    switch (type) {
      case "recent": {
        query = await sql<
          Comments & { user_name: string; user_icon: string; likes: number }
        >`SELECT 
                        comments.*,
                        users.name AS user_name,
                        users.url_icon AS user_icon,
                        COUNT (liked_comments.id) AS likes
                    FROM comments 
                    JOIN users ON comments.user_id = users.id
                    LEFT JOIN liked_comments ON comments.id = liked_comments.comment_id
                    WHERE comments.post_id = ${postId}
                    GROUP BY comments.id, users.name, users.url_icon
                    ORDER BY comments.created_at DESC
                `;
        break;
      }
      case "trending": {
        query = await sql<
          Comments & { user_name: string; user_icon: string; likes: number }
        >`SELECT 
                        comments.*,
                        users.name AS user_name,
                        users.url_icon AS user_icon,
                        COUNT (liked_comments.id) AS likes
                    FROM comments 
                    JOIN users ON comments.user_id = users.id
                    LEFT JOIN liked_comments ON comments.id = liked_comments.comment_id
                    WHERE comments.post_id = ${postId}
                    GROUP BY comments.id, users.name, users.url_icon
                    ORDER BY likes DESC
                `;
        break;
      }
      case "old": {
        query = await sql<
          Comments & { user_name: string; user_icon: string; likes: number }
        >`SELECT 
                        comments.*,
                        users.name AS user_name,
                        users.url_icon AS user_icon,
                        COUNT (liked_comments.id) AS likes
                    FROM comments 
                    JOIN users ON comments.user_id = users.id
                    LEFT JOIN liked_comments ON comments.id = liked_comments.comment_id
                    WHERE comments.post_id = ${postId}
                    GROUP BY comments.id, users.name, users.url_icon
                    ORDER BY comments.created_at ASC
                `;
        break;
      }
      case "discussed": {
        query = await sql<
          Comments & {
            user_name: string;
            user_icon: string;
            likes: number;
            replies: number;
          }
        >`SELECT 
                        comments.*,
                        users.name AS user_name,
                        users.url_icon AS user_icon,
                        COUNT (liked_comments.id) AS likes
                        COUNT(DISTINCT replies.id) AS replies
                    FROM comments 
                    JOIN users ON comments.user_id = users.id
                    LEFT JOIN liked_comments ON comments.id = liked_comments.comment_id
                    LEFT JOIN comments AS replies ON comments.id = replies.parent_comment_id
                    WHERE comments.post_id = ${postId}
                    GROUP BY comments.id, users.name, users.url_icon
                    ORDER BY replies DESC, comments.created_at DESC
                `;
        break;
      }
    }

    const data = await query;

    if (data.rowCount === 0) {
      return null;
    }

    return data.rows;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch single news data");
  }
}

export async function fetchUserAccount(emailUser: string, username?: string) {
  if (username === undefined) {
    try {
      const data =
        await sql<User>`SELECT * FROM users WHERE email = ${emailUser} LIMIT 1`;
      if (data.rowCount === 0) {
        return null;
      }

      return data.rows;
    } catch (error) {
      console.log("Database Error:", error);
      throw new Error("Failed to fetch user data");
    }
  } else {
    try {
      const data =
        await sql<User>`SELECT * FROM users WHERE name = ${username} LIMIT 1`;
      if (data.rowCount === 0) {
        return null;
      }

      return data.rows;
    } catch (error) {
      console.log("Database Error:", error);
      throw new Error("Failed to fetch user data");
    }
  }
}

export async function fetchUserAccountById(id: string) {
  try {
    const data = await sql<User>`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
    if (data.rowCount === 0) {
      return null;
    }

    return data.rows;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch user data");
  }
}

export async function createUserAccount(
  emailUser: string,
  password: string,
  name: string,
) {
  const urlIcon = null;
  const urlBanner = null;

  try {
    const data = await sql<User>`
            INSERT INTO users (name, email, password, url_icon, url_banner)
            VALUES (${name}, ${emailUser}, ${password}, ${urlIcon}, ${urlBanner})
            RETURNING id, email, name, url_icon, url_banner;
        `;

    if (data.rowCount === 0) {
      return null;
    }

    return data.rows[0];
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to create user data");
  }
}

export async function fetchAllUserFollowed(
  cursor: any | null,
  limit: number,
  userId: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<Followers>`
                SELECT 
                    followers.*,
                    users.name AS user_name,
                    users.url_icon AS user_icon,
                    users.description AS user_description
                FROM followers
                JOIN users ON followers.follower_id = users.id
                WHERE followers.user_id = ${userId}
                    AND (posts.id) > (${cursor.id})
                ORDER BY followers.id DESC
                LIMIT ${limits}
            `;
    } else {
      query = sql<Followers>`
                SELECT 
                    followers.*,
                    users.name AS user_name,
                    users.url_icon AS user_icon,
                    users.description AS user_description
                FROM followers
                JOIN users ON followers.follower_id = users.id
                WHERE followers.user_id = ${userId}
                ORDER BY followers.id DESC
                LIMIT ${limits}
            `;
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = cursor
      ? posts.length === limits
      : posts.length === limit;

    const nextCursor = hasNextPage ? { id: posts[posts.length - 1].id } : null;

    const finalPosts = cursor ? posts.slice(1) : posts;

    return {
      allPosts: finalPosts || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Error to get followers number");
  }
}

export async function fetchAllUserFollowedCount(userId: string) {
  try {
    const data = await sql<Followers>`
            SELECT COUNT(*) AS follower_count
            FROM followers
            WHERE followers.user_id = ${userId}
        `;

    if (data.rows[0] === undefined) {
      return null;
    }

    return data.rows[0].follower_count;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Error to get followers number");
  }
}

export async function fetchAllUserCommunities(
  cursor: any | null,
  limit: number,
  userId: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<Following_commmunity>`
                SELECT 
                    following_commmunity.*,
                    communities.name AS community_name,
                    communities.url_icon AS community_icon
                FROM following_commmunity
                JOIN communities ON following_commmunity.community_id = communities.id
                WHERE following_commmunity.user_id = ${userId}
                    AND (following_commmunity.id) > (${cursor.id})
                ORDER BY communities.name 
            `;
    } else {
      query = sql<Following_commmunity>`
                SELECT 
                    following_commmunity.*,
                    communities.name AS community_name,
                    communities.url_icon AS community_icon
                FROM following_commmunity
                JOIN communities ON following_commmunity.community_id = communities.id
                WHERE following_commmunity.user_id = ${userId}
                ORDER BY communities.name 
            `;
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = cursor
      ? posts.length === limits
      : posts.length === limit;

    const nextCursor = hasNextPage ? { id: posts[posts.length - 1].id } : null;

    const finalResults = cursor ? posts.slice(1) : posts;

    return {
      allCommunities: finalResults || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Error to get followers number");
  }
}

export async function fetchAllUserFollowing(
  cursor: any | null,
  limit: number,
  userId: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<Following>`
                SELECT 
                    following.*,
                    users.name AS user_name,
                    users.url_icon AS user_icon,
                    users.description AS user_description
                FROM following
                JOIN users ON following.following_id = users.id
                WHERE following.user_id = ${userId}
                    AND (posts.id) > (${cursor.id})
                ORDER BY following.id DESC
                LIMIT ${limits}
            `;
    } else {
      query = sql<Following>`
                SELECT 
                    following.*,
                    users.name AS user_name,
                    users.url_icon AS user_icon,
                    users.description AS user_description
                FROM following
                JOIN users ON following.following_id = users.id
                WHERE following.user_id = ${userId}
                ORDER BY following.id DESC
                LIMIT ${limits}
            `;
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = cursor
      ? posts.length === limits
      : posts.length === limit;

    const nextCursor = hasNextPage ? { id: posts[posts.length - 1].id } : null;

    const finalPosts = cursor ? posts.slice(1) : posts;

    return {
      allPosts: finalPosts || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Error to get followers number");
  }
}

export async function fetchAllUserFollowingCount(userId: string) {
  try {
    const data = await sql<Following>`
            SELECT COUNT(*) AS following_count
            FROM following
            WHERE following.user_id = ${userId}
        `;

    if (data.rows[0] === undefined) {
      return null;
    }

    return data.rows[0].following_count;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Error to get followers number");
  }
}

export async function fetchAllUserSaved(
  cursor: any | null,
  limit: number,
  userId: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<
        Posts & {
          user_name: string;
          community_name: string;
          community_icon: string;
        }
      >`
                SELECT 
                    posts.*, 
                    users.name AS user_name, 
                    communities.name AS community_name,
                    communities.url_icon AS community_icon,
                    savedmedia.created_at AS saved_created_at,
                    COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                    COUNT(DISTINCT comments.id) AS comments
                FROM posts 
                JOIN users ON posts.user_id = users.id
                JOIN communities ON posts.community_id = communities.id
                JOIN savedmedia ON posts.id = savedmedia.post_id
                LEFT JOIN liked ON posts.id = liked.post_id
                LEFT JOIN comments ON posts.id = comments.post_id
                WHERE saved.user_id = ${userId} 
                    AND (savedmedia.created_at, savedmedia.id) > (${cursor.createdAt}, ${cursor.id})
                GROUP BY  posts.id ,users.name , communities.name, communities.url_icon, savedmedia.created_at, savedmedia.id               
                ORDER BY savedmedia.created_at ASC, savedmedia.id ASC
            `;
    } else {
      query = sql<
        Posts & {
          user_name: string;
          community_name: string;
          community_icon: string;
        }
      >`
                SELECT 
                    posts.*, 
                    users.name AS user_name, 
                    communities.name AS community_name,
                    communities.url_icon AS community_icon,
                    savedmedia.created_at AS saved_created_at,
                    COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                    COUNT(DISTINCT comments.id) AS comments
                FROM posts
                JOIN users ON posts.user_id = users.id
                JOIN communities ON posts.community_id = communities.id
                JOIN savedmedia ON posts.id = savedmedia.post_id
                LEFT JOIN liked ON posts.id = liked.post_id
                LEFT JOIN comments ON posts.id = comments.post_id
                WHERE savedmedia.user_id = ${userId}
                GROUP BY  posts.id ,users.name , communities.name, communities.url_icon, savedmedia.created_at, savedmedia.id                
                ORDER BY savedmedia.created_at ASC, savedmedia.id ASC
            `;
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = cursor
      ? posts.length === limits
      : posts.length === limit;

    const nextCursor = hasNextPage
      ? {
          createdAt: posts[posts.length - 1].saved_created_at,
          id: posts[posts.length - 1].id,
        }
      : null;

    const finalPosts = cursor ? posts.slice(1) : posts;

    return {
      allPosts: finalPosts || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data");
  }
}

export async function fetchAllUserPosts(
  cursor: any | null,
  limit: number,
  userId: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<
        Posts & {
          user_name: string;
          community_name: string;
          community_icon: string;
        }
      >`
                SELECT 
                    posts.*, 
                    users.name AS user_name, 
                    communities.name AS community_name,
                    communities.url_icon AS community_icon,
                    COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                    COUNT(DISTINCT comments.id) AS comments
                FROM posts 
                JOIN users ON posts.user_id = users.id
                JOIN communities ON posts.community_id = communities.id
                LEFT JOIN liked ON posts.id = liked.post_id
                LEFT JOIN comments ON posts.id = comments.post_id
                WHERE posts.user_id = ${userId} 
                    AND (posts.created_at, posts.id) > (${cursor.createdAt}, ${cursor.id})
                GROUP BY  posts.id ,users.name , communities.name, communities.url_icon      
                ORDER BY posts.created_at ASC
            `;
    } else {
      query = sql<
        Posts & {
          user_name: string;
          community_name: string;
          community_icon: string;
        }
      >`
                SELECT 
                    posts.*, 
                    users.name AS user_name, 
                    communities.name AS community_name,
                    communities.url_icon AS community_icon,
                    COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                    COUNT(DISTINCT comments.id) AS comments
                FROM posts 
                JOIN users ON posts.user_id = users.id
                JOIN communities ON posts.community_id = communities.id
                LEFT JOIN liked ON posts.id = liked.post_id
                LEFT JOIN comments ON posts.id = comments.post_id
                WHERE posts.user_id = ${userId} 
                GROUP BY  posts.id ,users.name , communities.name, communities.url_icon
                ORDER BY posts.created_at ASC
            `;
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = cursor
      ? posts.length === limits
      : posts.length === limit;

    const nextCursor = hasNextPage
      ? {
          createdAt: posts[posts.length - 1].liked_created_at,
          id: posts[posts.length - 1].id,
        }
      : null;

    const finalPosts = cursor ? posts.slice(1) : posts;

    return {
      allPosts: finalPosts || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data");
  }
}

export async function fetchAllUserComments(
  cursor: any | null,
  limit: number,
  userId: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<Comments>`
                SELECT 
                    comments.*, 
                    users.name AS user_name, 
                    users.url_icon AS user_icon,
                    COUNT(liked_comments.id) AS likes
                FROM comments
                JOIN users ON comments.user_id = users.id
                LEFT JOIN liked_comments ON comments.id = liked_comments.comment_id
                WHERE comments.user_id = ${userId} 
                    AND (comments.created_at, comments.id) > (${cursor.createdAt}, ${cursor.id})
                GROUP BY comments.id, users.name, users.url_icon
                ORDER BY comments.created_at ASC, comments.id ASC
            `;
    } else {
      query = sql<Comments>`
                SELECT 
                    comments.*, 
                    users.name AS user_name, 
                    users.url_icon AS user_icon,
                    COUNT(liked_comments.id) AS likes
                FROM comments
                JOIN users ON comments.user_id = users.id
                LEFT JOIN liked_comments ON comments.id = liked_comments.comment_id
                WHERE comments.user_id = ${userId} 
                GROUP BY comments.id, users.name, users.url_icon
                ORDER BY comments.created_at ASC, comments.id ASC
            `;
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = cursor
      ? posts.length === limits
      : posts.length === limit;

    const nextCursor = hasNextPage
      ? {
          createdAt: posts[posts.length - 1].liked_created_at,
          id: posts[posts.length - 1].id,
        }
      : null;

    const finalPosts = cursor ? posts.slice(1) : posts;

    return {
      allPosts: finalPosts || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data");
  }
}

export async function fetchAllUserLikedPosts(
  cursor: any | null,
  limit: number,
  userId: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<
        Posts & {
          user_name: string;
          community_name: string;
          community_icon: string;
        }
      >`
                SELECT 
                    posts.*, 
                    users.name AS user_name, 
                    communities.name AS community_name,
                    communities.url_icon AS community_icon,
                    liked.created_at AS liked_created_at,
                    COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,
                    COUNT(DISTINCT comments.id) AS comments
                FROM posts 
                JOIN users ON posts.user_id = users.id
                JOIN communities ON posts.community_id = communities.id
                JOIN liked ON posts.id = liked.post_id
                LEFT JOIN comments ON posts.id = comments.post_id
                WHERE liked.user_id = ${userId} 
                    AND (liked.created_at, liked.id) > (${cursor.createdAt}, ${cursor.id})
                GROUP BY  posts.id ,users.name , communities.name, communities.url_icon, liked.created_at, liked.id                ORDER BY liked.created_at ASC, liked.id ASC
            `;
    } else {
      query = sql<
        Posts & {
          user_name: string;
          community_name: string;
          community_icon: string;
        }
      >`
                SELECT 
                    posts.*, 
                    users.name AS user_name, 
                    communities.name AS community_name,
                    communities.url_icon AS community_icon,
                    liked_user.created_at AS liked_created_at, 
                    COUNT(DISTINCT liked.id) * (FLOOR(1 * 100.5) + 1) AS likes,        
                    COUNT(DISTINCT comments.id) AS comments    
                FROM posts
                JOIN users ON posts.user_id = users.id
                JOIN communities ON posts.community_id = communities.id
                LEFT JOIN liked AS liked_user ON posts.id = liked_user.post_id AND liked_user.user_id = ${userId}  
                LEFT JOIN liked ON posts.id = liked.post_id   
                LEFT JOIN comments ON posts.id = comments.post_id
                WHERE liked_user.user_id = ${userId}  
                GROUP BY posts.id, users.name, communities.name, communities.url_icon, liked_user.created_at
                ORDER BY liked_user.created_at ASC
            `;
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = cursor
      ? posts.length === limits
      : posts.length === limit;

    const nextCursor = hasNextPage
      ? {
          createdAt: posts[posts.length - 1].liked_created_at,
          id: posts[posts.length - 1].id,
        }
      : null;

    const finalPosts = cursor ? posts.slice(1) : posts;

    return {
      allPosts: finalPosts || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data");
  }
}

export async function fetchAllUserLikedComments(
  cursor: any | null,
  limit: number,
  userId: string,
) {
  try {
    let query: any;
    const limits = limit + 1;

    if (cursor) {
      query = sql<Comments & { user_name: string; user_icon: string }>`
                SELECT 
                    comments.*, 
                    users.name AS user_name, 
                    users.url_icon AS user_icon,
                    liked_comments.created_at AS liked_comments_created_at
                FROM comments
                JOIN liked_comments ON comments.id = liked_comments.comment_id
                JOIN users ON comments.user_id = users.id
                WHERE likes.user_id = ${userId} 
                    AND (likes.created_at, likes.id) > (${cursor.createdAt}, ${cursor.id})
                ORDER BY likes.created_at ASC, likes.id ASC
                LIMIT ${limits}
            `;
    } else {
      query = sql<Comments & { user_name: string; user_icon: string }>`
                SELECT 
                    comments.*, 
                    users.name AS user_name, 
                    users.url_icon AS user_icon,
                    liked_comments.created_at AS liked_comments_created_at
                FROM comments
                JOIN liked_comments ON comments.id = liked_comments.comment_id
                JOIN users ON comments.user_id = users.id
                WHERE liked_comments.user_id = ${userId} 
                ORDER BY liked_comments.created_at ASC, liked_comments.id ASC
                LIMIT ${limits}
            `;
    }

    const data = await query;

    const posts = data.rows;

    const hasNextPage = cursor
      ? posts.length === limits
      : posts.length === limit;

    const nextCursor = hasNextPage
      ? {
          createdAt: posts[posts.length - 1].liked_comments_created_at,
          id: posts[posts.length - 1].id,
        }
      : null;

    const finalPosts = cursor ? posts.slice(1) : posts;

    return {
      allPosts: finalPosts || [],
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data");
  }
}
