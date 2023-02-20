import { LoaderFunction, redirect } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react";
import { DecodedIdToken } from "firebase-admin/auth";
import { sendSignInLinkToEmail } from "firebase/auth";
import { clientAuth } from "~/firebase/firebase.client";

import { getUser } from "~/utils/cookies"

interface loaderReturnType {
    message: string,
    info: "not-logged-in" | "verified" | "not-verified" | "error",
    dataUser: null | DecodedIdToken,
}

export let loader: LoaderFunction = async ({ request }) => {

    try {

        const user = await getUser(request);

        if (!user) {
            return {
                message: "You are not logged in",
                info: "not-logged-in",
                dataUser: null,
            }
        }

        if (user.email_verified) {
            return {
                message: "You are already verified",
                info: "verified",
                dataUser: user,
            }

        }


        return {
            message: "email not verified",
            info: "not-verified",
            dataUser: user
        }


    } catch (e: any) {
        return {
            info: "error",
            message: e.message,
            dataUser: null
        }

    }


}


export default function verifyemail() {

    const dataLoader = useLoaderData<loaderReturnType>();

    if (dataLoader.info === "not-logged-in") {
        return redirect("/login", {
            status: 302,
            statusText: "Not logged in"
        })
    }
    if (dataLoader.info === "error") {
        //TODO: HANDLE ERROR
        return <div>ERROR</div>
    }


    return (

        <div className="w-full h-full flex justify-center">
            <div className="w-full max-w-md pt-6">
                <div className="shadow-xl rounded-md p-2">
                    <h1 className="text-lg md:text-2xl text-skin-muted font-bold text-center">Hello! Username</h1>
                    {dataLoader.info === "not-verified" && <NotVerifiedComponent dataUser={dataLoader.dataUser} />}
                    {dataLoader.info === "verified" && <EmailVerifiedComponent />}
                </div>
            </div>
        </div>
    )
}

function EmailVerifiedComponent() {

    return (
        <div>
            <button className="text-skin-white p-4 bg-skin-button-accent 
                    hover:bg-skin-button-accent-hover rounded-md">
                You are already verfied
            </button>

            <Link to="/" >Go Home</Link>
        </div>
    )
}


function NotVerifiedComponent(props: { dataUser: DecodedIdToken }) {

    return (
        <div className="w-full flex justify-center py-3">

            <p className="text-skin-muted text-center py-2 text-sm">{props.dataUser.email} is not verified</p>

            <button className="text-skin-white p-4 bg-skin-button-accent 
                    hover:bg-skin-button-accent-hover rounded-md">
                Verify Now
            </button>
        </div>
    )
} 