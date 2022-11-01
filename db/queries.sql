-- SQLite

DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY,
    author TEXT NOT NULL,
    field TEXT
);

CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author_id INTEGER REFERENCES authors (id) --ON DELETE SET NULL
    -- FOREIGN KEY (author_id) REFERENCES authors (id)
);

INSERT INTO authors (author, field)
VALUES
("Peter Harrison", "History"),
("Hans-Georg Gadamer", "Philosophy"),
("Michael Polanyi", "Philosophy"),
("Rita Felsky", "Literary Criticism"),
("Leo Tolstoi", "Literature"),
("Mary Midgley", "Philosophy");

INSERT INTO books (title, author_id)
VALUES
("Truth and Method", 2),
("The Relevance of the Beautiful", 2),
("Personal Knowledge", 3),
("The Tacit Dimension", 3),
("The Fall of Man and the Foundations of Science", 1),
("The Limits of Critique", 4),
("Resurrection", 5);

-- illegal move, violates foreign key stuff
-- INSERT INTO books (title, author_id) VALUES ("Something Else", 10);

SELECT * FROM authors;

SELECT * FROM books;

-- illegal move
-- DELETE FROM authors
-- WHERE id = 1;

-- SELECT * FROM authors;

-- SELECT * FROM books;

-- JOINS DO A COUPLE AND BE DONE:
SELECT authors.author, books.title
FROM authors
INNER JOIN books
    ON authors.id = books.author_id;

-- SELECT authors.author, books.title
-- FROM authors
-- RIGHT JOIN books
--     on authors.id = books.author_id;

-- WITH some_authors AS (
--     SELECT authors.author, books.title
--     FROM authors
--     INNER JOIN books
--         ON authors.id = books.author_id
-- )
-- SELECT *
-- FROM some_authors
-- WHERE some_authors.author = 'Hans-Georg Gadamer';

SELECT authors.author, books.title
FROM authors
INNER JOIN books
    ON authors.id = books.author_id
WHERE authors.author LIKE '%Polanyi%';