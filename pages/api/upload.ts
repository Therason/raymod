import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { readFileSync } from "fs";

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

  const imgurRes = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT}`,
    },
    body: imgur,
  });
  const imgurData = await imgurRes.json();
  res.status(200).json({ message: imgurData });
}
