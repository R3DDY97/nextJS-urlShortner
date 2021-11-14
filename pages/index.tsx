import Axios from "axios";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const index = () => {
  const [url, setUrl] = useState<string>("");
  const [urlId, setsUrl] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const home =
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://venkata.vercel.app";

  const getShortUrl = async () => {
    setLoad(true);
    await Axios.post("/api/shortUrl", {
      url: url,
    })
      .then((res) => {
        setsUrl(`${home}/${res.data}`);
        setLoad(false);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="container">
    <Head>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
    href="https://fonts.googleapis.com/css2?family=Acme&display=swap"
    rel="stylesheet"
    />
    <title>URL Shortener</title>
    </Head>
    <h1 className="title"> Simple URL Shortener <span></span>
    </h1>
    <input
    className="inp"
    placeholder="enter URL"
    onChange={(e) => setUrl(e.target.value)}
    />
    <style jsx>{`
        .container {
          display: flex;
          padding: 10px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .title {
          font-family: "Acme", sans-serif;
          font-size: 20px;
        }
        .inp {
          padding: 20px;
          margin: 10px;
          width: 50%;
          border-radius: 5px;
          border: 1px solid #000;
          border-radius: 5px;
          text-align: center;
          font-family: "Acme", sans-serif;
          font-size: 20px;
        }
        .btn {
          padding: 10px 20px;
          margin: 10px;
          border: none;
          background: #90ee90;
          color: white;
          border-radius: 10px;
          font-family: "Acme", sans-serif;
          font-size: 20px;
          cursor: pointer;
        }
        .longUrl {
          font-family: "Acme", sans-serif;
          padding: 10px;
          margin: 10px;
          background-color: #ff4500;
          border-radius: 10px 20px;
          color: yellow;
         }
        .openUrl {
          font-family: "Acme", sans-serif;
          padding: 10px;
          margin: 10px;
          border-radius: 10px 20px;
          color: red;
          background-color: #ffff00;
         }
        }
    `}</style>
    <button onClick={getShortUrl} className="btn">
    {load ? "loading" : "Shorten"}
    </button>

    {urlId.length > 0 ? <p className="longUrl">{urlId}</p> : null}
    {urlId.length > 0 ? <Link href={urlId}><a className="openUrl" target="_blank">Click to open</a></Link> : null}
    </div>
  );
    };

export default index;
