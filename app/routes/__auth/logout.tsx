
import { LoaderFunction, redirect } from "@remix-run/node";
import { session } from "app/utils/cookies";

export const loader: LoaderFunction = async () => {
  return redirect("/login", {
    headers: {
      "Set-Cookie": await session.serialize("", {
        expires: new Date(0),
      }),
    },
  });
};