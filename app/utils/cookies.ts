import { serverAuth } from 'app/firebase/firebase.server';
import { createCookie, redirect } from "@remix-run/node";


export const session = createCookie("session", {
  secrets: ["some secret"],
  // !Ensure this is the same as the expiry date on the JWT!!
  expires: new Date(Date.now() + 60 * 60 * 24 * 5 * 1000),
  path: "/",
});


/**
 * 
 * @param request Request object - From Remix
 * @param redirectUrlVerified - URL to redirect to if session cookie is valid
 * @param redirectUrlNotVerified - URL to redirect to if session cookie is invalid
 * @returns redirect | null
 */
export async function getSessionState(request: Request, redirectUrlVerified?: string, redirectUrlNotVerified?: string) {
  let jwt = await session.parse(request.headers.get("Cookie"));

  if (!jwt) {

    console.log("No JWT");
    return redirectUrlNotVerified? redirect(redirectUrlNotVerified, {
      headers: {
        "Set-Cookie": await session.serialize(""),
      },
    }) : null;

  }

  try {

    const userVerifed = await serverAuth.verifySessionCookie(jwt);


    if (!userVerifed) {

    console.log("userVerifed is null");

      return redirectUrlNotVerified? redirect(redirectUrlNotVerified, {
        headers: {
          "Set-Cookie": await session.serialize(""),
        },
      }) : null;

    }

    if (!userVerifed.email_verified) {

      return redirect("/verifyemail");

    }

    return redirectUrlVerified? redirect(redirectUrlVerified) : userVerifed;

  } catch (e: any) {
    return redirect("/logout")
  }


}


/**
 * Return user object if session cookie is valid or null if session cookie is invalid
 * @param request 
 * @returns null | User
 */
export async function getUser(request: Request) {
  let jwt = await session.parse(request.headers.get("Cookie"));

  if (!jwt) {
    return null;
  }

  try {
    const userVerifed = await serverAuth.verifySessionCookie(jwt);

    if (!userVerifed) {
      return null;
    }

    return userVerifed;

  } catch (e: any) {
    throw e;
  }
}

