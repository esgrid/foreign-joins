const db = require('../db/db')

async function main() {

    const sql = `
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS authors;
    
    CREATE TABLE IF NOT EXISTS authors (
        id INTEGER PRIMARY KEY,
        author TEXT NOT NULL,
        field TEXT
    );
    
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        author_id INTEGER REFERENCES authors (id) ON DELETE SET NULL
        -- FOREIGN KEY (author_id) REFERENCES authors (id)
    );
    
    INSERT INTO authors (author, field)
    VALUES
    ("Peter Harrison", "History"),
    ("Hans-Georg Gadamer", "Philosophy"),
    ("Michael Polanyi", "Philosophy"),
    ("Rita Felsky", "Literary Criticism"),
    ("Leo Tolstoi", "Literature");
    
    INSERT INTO books (title, author_id)
    VALUES
    ("Truth and Method", 2),
    ("The Relevance of the Beautiful", 2),
    ("Personal Knowledge", 3),
    ("The Tacit Dimension", 3),
    ("THe Fall of Man and the Foundations of Science", 1),
    ("The Limits of Critique", 4),
    ("Resurrection", 5);
    
    INSERT INTO books (title) VALUES ("Something Else");
    
    SELECT * FROM authors;
    
    SELECT * FROM books;
    
    DELETE FROM authors
    WHERE id = 1;
    
    SELECT * FROM authors;
    
    SELECT * FROM books;    
    `

    await db.query(`
    DROP TABLE IF EXISTS books;
    -- DROP TABLE IF EXISTS authors;
    `)

    await db.query(`
    DROP TABLE IF EXISTS authors;
    `)

    await db.query(`
    PRAGMA foreign_keys = ON;
    `)

    // const r = await db.query(`
    // PRAGMA foreign_keys;
    // `)
    // console.log(r)

    await db.query(`
    CREATE TABLE IF NOT EXISTS authors (
        id INTEGER PRIMARY KEY,
        author TEXT NOT NULL,
        field TEXT
    );
    `)

    // note that if I set --ON DELETE SET DEFAULT the problematic delete does work and the foreign key corresponding
    // to the primary key that was deleted becomes null instead
    await db.query(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        author_id INTEGER DEFAULT NULL REFERENCES authors(id) --ON DELETE SET DEFAULT
    );    
    `)

    await db.query(`
    INSERT INTO authors (author, field)
    VALUES
    ("Peter Harrison", "History"),
    ("Hans-Georg Gadamer", "Philosophy"),
    ("Michael Polanyi", "Philosophy"),
    ("Rita Felsky", "Literary Criticism"),
    ("Leo Tolstoi", "Literature"),
    ("Mary Midgley", "Philosophy");
    `)

    await db.query(`
    INSERT INTO books (title, author_id)
    VALUES
    ("Truth and Method", 2),
    ("The Relevance of the Beautiful", 2),
    ("Personal Knowledge", 3),
    ("The Tacit Dimension", 3),
    ("THe Fall of Man and the Foundations of Science", 1),
    ("The Limits of Critique", 4),
    ("Resurrection", 5);
    `)

    // const [result, meta] = await db.query(`
    // SELECT * FROM books;
    // `)

    // console.table(result)
    
    // problematic insert
    // await db.query(`
    // INSERT INTO books (title, author_id)
    // VALUES ("The Pilgrims Tale", 10)
    // `)

    // problematic delete?
    // await db.query(`
    // DELETE FROM authors
    // WHERE id = 1;
    // `)

    await db.query(`
    INSERT INTO books (title)
    VALUES ("Focusing");
    `)

    let [result, meta] = await db.query(`
        SELECT authors.author, books.title
        FROM authors
        INNER JOIN books
            ON authors.id = books.author_id;
    `)

    // const [result, meta] = await db.query(`
    //     SELECT authors.author, books.title
    //     FROM authors
    //     LEFT JOIN books
    //         ON authors.id = books.author_id;
    // `)

    // const [result, meta] = await db.query(`
    //     SELECT authors.author, books.title
    //     FROM authors
    //     RIGHT JOIN books
    //         ON authors.id = books.author_id;
    // `)

    // const [result, meta] = await db.query(`
    //     SELECT authors.author, books.title
    //     FROM authors
    //     FULL OUTER JOIN books
    //         ON authors.id = books.author_id;
    // `)

    console.table(result)

    [result, meta] =  await db.query(`
    WITH previous_table AS (
            SELECT *
            FROM authors
            WHERE field = 'Philosophy'
    )
    SELECT *
    FROM previous_table;
    `)

    console.table(result)
}

main()