CREATE DATABASE IF NOT EXISTS blog;
USE blog;

CREATE TABLE IF NOT EXISTS posts (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO posts (title, image, description, content)
-- VALUES ("This is my first blog post", "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/64fae957204ee03fb06e3e02_92.png", "Smiley emoji with its thumbs up", "Very exciting things are coming this way! This is the first blog post, although it definitely is just a test blog post");