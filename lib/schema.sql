DROP DATABASE soundspace;
CREATE DATABASE soundspace;
USE soundspace;

CREATE TABLE users {
    userID SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    profilePhotoUrl VARCHAR(255),
    bio VARCHAR(500),
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
}

CREATE TABLE news {
    newsID SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    subTitle VARCHAR(255),
    newsText TEXT NOT NULL,
    publishedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    authorID INT,
    FOREIGN KEY (userID) REFERENCES users(userID)
}

CREATE TABLE post {
    postID SERIAL PRIMARY KEY,
    photoID INTEGER,
    userID INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    subTitle VARCHAR(255),
    publishedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users(userID)
}