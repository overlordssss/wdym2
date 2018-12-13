SELECT url
FROM images
ORDER BY random()
LIMIT $1