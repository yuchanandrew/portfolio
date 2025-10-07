import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql";
import * as crypto from "node:crypto";

dotenv.config();

const app = express();

const redirect_uri = "https://andrewrho.dev/callback";

app.use(cors({
    origin: 'https://andrewrho.dev', // Change for production
    credentials: true,
}));

// const pool = mysql;

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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));