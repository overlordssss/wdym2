CREATE TABLE images (
    image_id serial primary key,
    url text, 
    category varchar(100)
);
CREATE TABLE user (
    user_id serial primary key,
    username varchar(30),
    hashed_password text,
    profile_picture text,
    played int, 
    won int
);
-- Need to have a table for sockets 
-- Need to have a game room table; will delete entry when socket is closed