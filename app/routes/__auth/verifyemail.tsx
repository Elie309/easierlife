import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { UserRecord } from "firebase-admin/auth";
import React from "react";

import { getUserRecord } from "~/utils/cookies"

interface loaderReturnType {
    message: string,
    info: "not-logged-in" | "verified" | "not-verified" | "error",
    dataUser: UserRecord,
}

export let action: ActionFunction = async ({ request }) => {

    if (request.method === "POST") {

        const form = await request.formData();

        const email = form.get("email")?.toString();


        try {
            //TODO: SENT EMAIL
            return {
                info: "success",
                message: "Email sent",
                dataUser: email
            }

        } catch (e: any) {
            return {
                info: "error",
                message: e.message,
                dataUser: null
            }
        }

    }

}

export let loader: LoaderFunction = async ({ request }) => {

    try {

        const user = await getUserRecord(request);


        if (!user) {
            return {
                message: "You are not logged in",
                info: "not-logged-in",
                dataUser: null,
            }
        }

        if (user.emailVerified) {
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

    


    return (

        <div className="w-full h-full flex justify-center justify-items-center">
            <div className="w-full md:max-w-md mt-6">
                <div className="md:shadow-xl rounded-md p-2">
                    {dataLoader.info === "not-logged-in" && <NotLoggedInComponent />}
                    {dataLoader.info === "error" && <ErrorComponent />}
                    {dataLoader.info === "not-verified" && <NotVerifiedComponent dataUser={dataLoader.dataUser as UserRecord} />}
                    {dataLoader.info === "verified" && <EmailVerifiedComponent dataUser={dataLoader.dataUser as UserRecord} />}
                </div>
            </div>
        </div>
    )
}

function EmailVerifiedComponent(props: { dataUser: UserRecord }) {

    return (
        <div className="w-full flex justify-center text-center flex-col py-3">

            <h1 className="text-lg md:text-2xl text-skin-muted font-bold text-center">Hello! {props.dataUser.displayName}</h1>
            <p className="text-skin-muted text-center text-xl py-2 ">{props.dataUser.email} is already verified</p>

            <div className="text-center w-full my-2">

                <a href="/dashboard"
                    className="text-skin-white w-2/4  p-2  bg-skin-button-accent 
                hover:bg-skin-button-accent-hover rounded-md"

                >
                    Go to the Dashboard
                </a>
            </div>

        </div>
    )
}


function ErrorComponent() {

    return (
        <div className="text-red-600 text-center">
            No user found
        </div>
    )
}

function NotLoggedInComponent(){
    return (
        <div className="text-red-600 text-center">
            You are not logged in
        </div>
    )
}


function NotVerifiedComponent(props: { dataUser: UserRecord }) {

    // const fetcher = useFetcher();
    const [message, setMessage] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {

            if (!loading) {
                setLoading(true);
            }

            // fetcher.submit({email: props.dataUser.email!}, {method: "post"})

            // if(fetcher.type === "done"){
            //     setMessage(fetcher.data.message);
            //     setLoading(false);
            // }

            //TODO: Send email verification


        } catch (e: any) {
            setMessage(e.message);
            setLoading(false);
        }




    }

    return (
        <div className="w-full flex justify-center text-center flex-col py-3">

            <h1 className="text-lg md:text-2xl text-skin-muted font-bold text-center">Hello! {props.dataUser.displayName}</h1>
            <p className="text-skin-muted text-center text-xl py-2 ">{props.dataUser.email} is not verified</p>

            <form onSubmit={handleSubmit} className="w-full text-center">
                <input type="submit" value={loading ? "Sending email..." : "Send email"}
                    className="text-skin-white m-2 p-2 w-2/4 bg-skin-button-accent 
                    hover:bg-skin-button-accent-hover rounded-md"

                />
            </form>

            <p className="text-red-600 text-center text-sm py-2 ">{message}</p>
        </div>
    )
} 