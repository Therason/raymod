import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

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

  // const form = formidable({ multiples: true });
  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     res.status(400).json({ message: "form error" });
  //     return;
  //   }

  //   console.log(files);
  //   res.status(200).json({ message: "hi" });
  // });
  res.status(200).json({ message: "hi" });
}
