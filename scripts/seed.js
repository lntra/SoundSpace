const { db } = require('@vercel/postgres');
const {
  users,
  followings,
  followers,
  communities,
  posts,
  comments,
  news,
  liked,
  likedComments,
  savedMedia
} = require('./placeholderData.js');
const bcrypt = require('bcrypt');

  async function dropTables(client) {
    try {
      await client.sql`DROP TABLE IF EXISTS savedMedia CASCADE;`;
      console.log('Dropped table: savedMedia');
      
      await client.sql`DROP TABLE IF EXISTS liked_comments CASCADE;`;
      console.log('Dropped table: liked_comments');
      
      await client.sql`DROP TABLE IF EXISTS liked CASCADE;`;
      console.log('Dropped table: liked');
      
      await client.sql`DROP TABLE IF EXISTS news CASCADE;`;
      console.log('Dropped table: news');
      
      await client.sql`DROP TABLE IF EXISTS comments CASCADE;`;
      console.log('Dropped table: comments');
      
      await client.sql`DROP TABLE IF EXISTS posts CASCADE;`;
      console.log('Dropped table: posts');
      
      await client.sql`DROP TABLE IF EXISTS communities CASCADE;`;
      console.log('Dropped table: communities');
      
      await client.sql`DROP TABLE IF EXISTS followers CASCADE;`;
      console.log('Dropped table: followers');
      
      await client.sql`DROP TABLE IF EXISTS following CASCADE;`;
      console.log('Dropped table: following');
      
      await client.sql`DROP TABLE IF EXISTS users CASCADE;`;
      console.log('Dropped table: users');
    } catch (error) {
      console.error('Error dropping tables:', error);
      throw error;
    }
  }

  async function seedUsers(client, users) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;

      console.log(`Created "users" table`);

      // Insert data into the "users" table
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return client.sql`
            INSERT INTO users (id, name, email, password)
            VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
          `;
        }),
      );

      console.log(`Seeded ${insertedUsers.length} users`);

      return {
        createTable,
        users: insertedUsers,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  }

  async function seedFollowing(client, followings) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS following (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL,
          following_id UUID NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (following_id) REFERENCES users(id)
        );
      `;

      console.log(`Created "following" table`);

      const insertedFollowings = await Promise.all(
        followings.map((following) => client.sql`
          INSERT INTO following (user_id, following_id)
          VALUES (${following.user_id}, ${following.following_id})
          ON CONFLICT (id) DO NOTHING;
        `)
      );

      console.log(`Seeded ${insertedFollowings.length} followings`);

      return {
        createTable,
        followings: insertedFollowings,
      };
    } catch (error) {
      console.error('Error seeding followings:', error);
      throw error;
    }
  }

  async function seedFollowers(client, followers) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS followers (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL,
          follower_id UUID NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (follower_id) REFERENCES users(id)
        );
      `;

      console.log(`Created "followers" table`);

      const insertedFollowers = await Promise.all(
        followers.map((follower) => client.sql`
          INSERT INTO followers (user_id, follower_id)
          VALUES (${follower.user_id}, ${follower.follower_id})
          ON CONFLICT (id) DO NOTHING;
        `)
      );

      console.log(`Seeded ${insertedFollowers.length} followers`);

      return {
        createTable,
        followers: insertedFollowers,
      };
    } catch (error) {
      console.error('Error seeding followers:', error);
      throw error;
    }
  }

  async function seedCommunities(client, communities) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS communities (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT
        );
      `;

      console.log(`Created "communities" table`);

      const insertedCommunities = await Promise.all(
        communities.map((community) => client.sql`
          INSERT INTO communities (id, name, description)
          VALUES (${community.id}, ${community.name}, ${community.description})
          ON CONFLICT (id) DO NOTHING;
        `)
      );

      console.log(`Seeded ${insertedCommunities.length} communities`);

      return {
        createTable,
        communities: insertedCommunities,
      };
    } catch (error) {
      console.error('Error seeding communities:', error);
      throw error;
    }
  }

  async function seedPosts(client, posts) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS posts (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL,
          community_id UUID,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (community_id) REFERENCES communities(id)
        );
      `;

      console.log(`Created "posts" table`);

      const insertedPosts = await Promise.all(
        posts.map((post) => client.sql`
          INSERT INTO posts (id, user_id, community_id, content)
          VALUES (${post.id}, ${post.user_id}, ${post.community_id}, ${post.content})
          ON CONFLICT (id) DO NOTHING;
        `)
      );

      console.log(`Seeded ${insertedPosts.length} posts`);

      return {
        createTable,
        posts: insertedPosts,
      };
    } catch (error) {
      console.error('Error seeding posts:', error);
      throw error;
    }
  }

  async function seedComments(client, comments) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS comments (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          post_id UUID NOT NULL,
          user_id UUID NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          parent_comment_id UUID,
          FOREIGN KEY (post_id) REFERENCES posts(id),
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (parent_comment_id) REFERENCES comments(id)
        );
      `;

      console.log(`Created "comments" table`);

      const insertedComments = await Promise.all(
        comments.map((comment) => client.sql`
          INSERT INTO comments (id, post_id, user_id, content, parent_comment_id)
          VALUES (${comment.id}, ${comment.post_id}, ${comment.user_id}, ${comment.content}, ${comment.parent_comment_id})
          ON CONFLICT (id) DO NOTHING;
        `)
      );

      console.log(`Seeded ${insertedComments.length} comments`);

      return {
        createTable,
        comments: insertedComments,
      };
    } catch (error) {
      console.error('Error seeding comments:', error);
      throw error;
    }
  }

  async function seedNews(client, news) {
    try {  
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS news (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL,
          title VARCHAR(255) NOT NULL,
          tag TEXT NOT NULL,
          content TEXT NOT NULL,
          pagecontent TEXT NOT NULL,
          url TEXT NOT NULL,
          description TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );
      `;
  
      console.log(`Created "news" table`);
  
      const insertedNews = await Promise.all(
        news.map((newsItem) => client.sql`
          INSERT INTO news (user_id, title, tag, content, pagecontent, url, description)
          VALUES (${newsItem.user_id}, ${newsItem.title}, ${newsItem.tag}, ${newsItem.content}, ${newsItem.pagecontent}, ${newsItem.url}, ${newsItem.description})
          ON CONFLICT (id) DO NOTHING;
        `)
      );
  
      console.log(`Seeded ${insertedNews.length} news items`);
  
      return {
        createTable,
        news: insertedNews,
      };
    } catch (error) {
      console.error('Error seeding news:', error);
      throw error;
    }
  }
  

  async function seedLiked(client, liked) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS liked (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL,
          post_id UUID NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (post_id) REFERENCES posts(id)
        );
      `;

      console.log(`Created "liked" table`);

      const insertedLiked = await Promise.all(
        liked.map((like) => client.sql`
          INSERT INTO liked (user_id, post_id)
          VALUES (${like.user_id}, ${like.post_id})
          ON CONFLICT (id) DO NOTHING;
        `)
      );

      console.log(`Seeded ${insertedLiked.length} liked entries`);

      return {
        createTable,
        liked: insertedLiked,
      };
    } catch (error) {
      console.error('Error seeding liked:', error);
      throw error;
    }
  }

  async function seedLikedComments(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS liked_comments (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL,
          comment_id UUID NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (comment_id) REFERENCES comments(id)
        );
      `;
  
      console.log(`Created "liked_comments" table`);
  
      const insertedLikedComments = await Promise.all(
        likedComments.map((like) => client.sql`
          INSERT INTO liked_comments (user_id, comment_id)
          VALUES (${like.user_id}, ${like.comment_id})
          ON CONFLICT (id) DO NOTHING;
        `)
      );
  
      console.log(`Seeded ${insertedLikedComments.length} liked comments`);
  
      return {
        createTable,
        likedComments: insertedLikedComments,
      };
    } catch (error) {
      console.error('Error seeding liked comments:', error);
      throw error;
    }
  }

  async function seedsavedMedia(client, savedMedia) {
      try {
          await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

          const createTable = await client.sql`
              CREATE TABLE IF NOT EXISTS savedMedia (
                  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                  user_id UUID NOT NULL,
                  post_id UUID NOT NULL,
                  FOREIGN KEY (user_id) REFERENCES users(id),
                  FOREIGN KEY (post_id) REFERENCES posts(id)
              );
          `;

          console.log(`Created "savedMedia" table`);

          const insertedsavedMedia = await Promise.all(
              savedMedia.map((media) => client.sql`
                  INSERT INTO savedMedia (user_id, post_id)
                  VALUES (${media.user_id}, ${media.post_id})
                  ON CONFLICT (id) DO NOTHING;
              `)
          );

          console.log(`Seeded ${insertedsavedMedia.length} saved media entries`);

          return {
              createTable,
              savedMedia: insertedsavedMedia,
          };
      } catch (error) {
          console.error('Error seeding savedMedia:', error);
          throw error;
      }
  }
  

async function main() {
    const client = await db.connect();

    await dropTables(client);

    await seedUsers(client, users);
    await seedFollowing(client, followings);
    await seedFollowers(client, followers);
    await seedCommunities(client, communities);
    await seedPosts(client, posts);
    await seedComments(client, comments);
    await seedNews(client, news);
    await seedLiked(client, liked);
    await seedLikedComments(client, likedComments);
    await seedsavedMedia(client, savedMedia);

    await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
