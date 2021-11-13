import type { NextApiRequest, NextApiResponse } from "next";
const faunadb = require("faunadb"),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: 'db.us.fauna.com',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let helper = client.paginate(
            q.Match(q.Index('index_url_id'), req.body.urlId))

        helper.each(function(page :string) {
            console.log(page);
            return res.send(page[0]);
        })
    } catch (error) {
        console.log("geturl ===", error)
        res.status(400).send(error.message);
    }
};
