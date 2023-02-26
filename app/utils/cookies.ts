import { UserRecord } from 'firebase-admin/auth';
import { serverAuth } from 'app/firebase/firebase.server';
import { createCookie, redirect } from "@remix-run/node";


export const session = createCookie("session", {
  secrets: [process.env.SECRET_JWT || "secret"],
  // !Ensure this is the same as the expiry date on the JWT!!
  expires: new Date(Date.now() + 60 * 60 * 24 * 5 * 1000),
  path: "/",
});


/**
 * 
 * @param request Request object - From Remix
 * @param redirectUrlVerified - URL to redirect to if session cookie is valid
 * @param redirectUrlNotVerified - URL to redirect to if session cookie is invalid
 * @returns redirect | {message: string}
 */
export async function getSessionState(
  request: Request,
  redirectIfVerified: Boolean,
  redirectIfNotVerifed: Boolean,
  redirectUrlVerified: string | null,
  redirectUrlNotVerified: string | null
) {
  let jwt = await session.parse(request.headers.get("Cookie"));

  if (!jwt) {

    if (redirectIfNotVerifed) {

      return redirect(redirectUrlNotVerified ? redirectUrlNotVerified : "/login");
    }


    return {
      message: "No session cookie"
    }

  }

  try {

    const userVerified = await serverAuth.verifySessionCookie(jwt);


    if (!userVerified) {
      throw new Error("Invalid session cookie");
    }

    if (!userVerified.email_verified) {

      return getUserRecord(request).then((user) => {

        if (user?.emailVerified === true && userVerified.email_verified === false) {
        //TODO: TRY TO UPDATE THE SESSION COOKIE
        //IT CANNOT BE DONE, BECAUSE WE NEED TO TOKEN ID AND THE TOKEN ID IS NOT AVAILABLE
          return redirect("/logout");
        }

        return redirect("/verifyemail");

      }).catch((e) => {
          throw e;
      });



    }

    if (redirectIfVerified) {

      if (redirectUrlVerified !== null) {


        return redirect(redirectUrlVerified);
      }


      return {
        message: "Session cookie is valid"
      }
    }

    return {
      message: "Session cookie is valid"
    }

  } catch (e: any) {
    return redirect("/logout")
  }


}


/**
 * Return user object if session cookie is valid or null if session cookie is invalid
 * @param request 
 * @returns null | User
 */
export async function getUserRecord(request: Request): Promise<UserRecord | null> {
  let jwt = await session.parse(request.headers.get("Cookie"));

  if (!jwt) {
    return null;
  }

  try {
    const userVerified = await serverAuth.verifySessionCookie(jwt);


    if (!userVerified) {
      return null;
    }

    if (!userVerified.email) {
      return null;
    }

    const user = await serverAuth.getUserByEmail(userVerified.email);
    
    if (!user) {
      return null;
    }

    return user;

  } catch (e: any) {
    throw e;
  }
}

