import { NextApiRequest, NextApiResponse } from "next";


function user(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
};


export default user;