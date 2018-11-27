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
