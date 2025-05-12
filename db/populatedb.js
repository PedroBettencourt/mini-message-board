require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text VARCHAR( 200 ),
    username VARCHAR( 50 ),
    added TIMESTAMP
);

INSERT INTO messages (text, username, added)
VALUES
    ('Hi there!', 'Amando', NOW()),
    ('Hello World!', 'Charles', NOW());
`;

async function main() {
    console.log("seeding...");

    const client = new Client({
        connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
        ssl: {rejectUnauthorized: false},
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();