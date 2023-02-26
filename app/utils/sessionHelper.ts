import { redirect } from "@remix-run/node";
import { serverAuth } from "../firebase/firebase.server";
import { session } from "./cookies";

export async function tokenHelper(idToken: string, messageSuccess: string, redirectURLIfSuccess: string, redirectURLIfError: string){
    try {

        await serverAuth.verifyIdToken(idToken!);

        return redirect(redirectURLIfSuccess, {
            headers: {
                "Set-Cookie": await createAndSerilizeJWT(idToken),
            },
            status: 201,
            statusText: messageSuccess,
        });

    } catch (e: any) {
        return redirect(redirectURLIfError, {
            headers: {
                "Set-Cookie": "",
            },
            status: 401,
            statusText: e.message,
        });

    }
}

export async function createAndSerilizeJWT(idToken: string): Promise<string>{

    const jwt = await serverAuth.createSessionCookie(idToken!, {
        // 5 days - can be up to 2 weeks
        expiresIn: 60 * 60 * 24 * 5 * 1000,
    });;

    return session.serialize(jwt);
}