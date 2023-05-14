import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { readFileSync } from "fs";
import connect from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type Data = {};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // only accept POST requests
  if (req.method !== "POST") {
    res.status(422).json({ message: "Route not valid" });
    return;
  }

  // protected route
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'ERROR: Forbidden' });
    return;
  }

  // parse form data hopefully
  const data: any = await new Promise((resolve, reject) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });
  if (data.err) {
    res.status(400).json({ message: "form error" });
    return;
  }

  // re-create the form data
  const buffer = readFileSync(data.files.image.filepath);
  const blob = new Blob([buffer]);
  const imgur = new FormData();
  imgur.append("image", blob);

  // post image onto imgur
  const imgurRes = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT}`,
    },
    body: imgur,
  });
  const imgurData = await imgurRes.json();
  if (!imgurData.success || imgurData.status !== 200) {
    // too lazy to look up the right code
    res.status(400).json({ message: "imgur error" });
    return;
  }

  // save URL to DB
  // TODO: count documents within DB to establish gallery order that can be rearranged
  const conn = await connect();
  const db = conn.db();
  const count = await db.collection('posts').countDocuments()
  const status = await db.collection("posts").insertOne({
    url: imgurData.data.link,
    description: data.fields.description || '',
    alt: data.fields.alt || '',
    position: count
  });
  conn.close();

  res.status(200).json({ message: status });
}
