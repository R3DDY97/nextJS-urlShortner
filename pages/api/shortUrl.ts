import type { NextApiRequest, NextApiResponse } from "next";
const crypto = require("crypto");
const faunadb = require("faunadb"),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: 'db.us.fauna.com',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { url } = req.body;

    const urlId = crypto.randomBytes(3).toString("hex");

    try {
        console.log("Quering db")
        let response = await client.query(
            q.Create(q.Collection("shortUrls"), {
                data: { longUrl: url, urlId: urlId, },
            })
        );
        res.status(200).send(urlId);
    } catch (error) {
        console.log("createurl ===", error)
        res.status(400).send(error.message);
    }
};
