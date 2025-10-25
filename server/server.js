import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2";
import * as crypto from "node:crypto";

dotenv.config();

const app = express();

const redirect_uri = "https://api2.andrewrho.dev/callback";

app.use(cors({
    origin: 'https://www.andrewrho.dev',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
}).promise();

/************************************************* SECTION 1: FUNCTIONS FOR SPOTIFY API *************************************************/

app.get('/login', async(req, res) => {
    const state = crypto.randomBytes(16).toString('hex');
    const scope = 'user-read-recently-played user-read-private user-read-email user-read-currently-playing user-read-playback-state';

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    })

    res.redirect("https://accounts.spotify.com/authorize?" + params.toString());
});

app.get('/callback', async(req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    const params = new URLSearchParams({
        error: 'state_mismatch'
    })

    if (state === null) {
        res.redirect('/#' + params.toString());
    } else {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT + ':' + process.env.SPOTIFY_SECRET).toString('base64')
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            }),
        });

        const data = await response.json();
        console.log("Token data:", data);
    }
});

const refresh_token = async() => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT + ':' + process.env.SPOTIFY_SECRET).toString('base64')
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: process.env.REFRESH_TOKEN
        }),
    });

    const data = await response.json();

    return data;
};

app.get("/get-currently-playing", async(req, res) => {
    const data = await refresh_token();

    const current = await fetch("https://api.spotify.com/v1/me/player/queue", {
        headers: {
            Authorization: `Bearer ${data.access_token}`
        }
    });

    const current_data = await current.json();

    console.log("Current data:", current_data);
    if (current_data.currently_playing === null) {
        const recent = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
            headers: {
                Authorization: `Bearer ${data.access_token}`
            }
        });

        const recent_data = await recent.json();

        const recent_url = recent_data.items[0].track.external_urls;

        console.log("Recent:", recent_url);

        res.send(recent_url)
    } else {
        const current_url = current_data.currently_playing.external_urls; /* TODO: Make sure when current isn't available, it switches to recently played */

        console.log("Current:", current_url);

        res.send(current_url)
    }
});

/************************************************* SECTION 2: DATABASE INTEGRATION *************************************************/

// Get ALL posts
app.get("/get-posts", async(req, res) => {
    const search_query = `SELECT * FROM posts`;

    const [response] = await pool.query(search_query);

    try {
        // For testing
        // console.log("Data: ", response);

        res.status(200).json({message: "Worked!", posts: response});
    } catch (error) {
        res.status(500).json({message: "Internal error"});
    }
});

// Get a specific post with param (id)
app.get("/get-posts/:id", async(req, res) => {
    const {id} = req.params;

    const search_query = `SELECT * FROM posts WHERE id = ?`;
    const [response] = await pool.query(search_query, [id]);
    try {
        // Testing
        // console.log("Data: ", response);

        res.status(200).json({message: "Worked!", post: response});
    } catch (error) {
        res.status(500).json({message: "Internal error"});
    }
})

/************************************************* SECTION 3: ADMINISTRATION *************************************************/

app.use(express.json());

// Create a post
app.post("/make-post", async (req, res) => {
    const {title, image, description, content} = req.body;

    const insert_query = `INSERT INTO posts (title, image, description, content) VALUES(?, ?, ?, ?)`;
    await pool.query(insert_query, [title, image, description, content]);

    // For testing:
    const search_query = `SELECT * FROM posts where title = ?`;
    const [response] = await pool.query(search_query, [title]);

    console.log("Response: ", response);

    res.status(200).json({ message: "Worked!", post: response[0] });
});

const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running`));