insert into user
    (username, password)
values
    ($1, $2);
RETURNING *;