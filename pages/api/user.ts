import { NextApiRequest, NextApiResponse } from "next";

import getFirebaseApp from "./firebase";


export default async function User(req: NextApiRequest, res: NextApiResponse){

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

   // "FirebaseApp"

  res.end(JSON.stringify({ name: getFirebaseApp().name }));

}
