import React from "react";
import { Link, useFetcher } from "@remix-run/react";
import { serverAuth } from "app/firebase/firebase.server"
import { regEmail, regPasswordForRegistration, regUsername } from "config";
import EasierLifeLogo from "~/components/EasierLifeLogo";
import FormInput from "~/components/FormInput";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { getSessionState } from "~/utils/cookies";


// #region ACTION

export let action: ActionFunction = async ({ request }) => {

    if (request.method === "POST") {

        try {

            const form = await request.formData();

            const email = form.get("email")?.toString();
            const password = form.get("password")?.toString();
            const username = form.get("username")?.toString();


            if (!email || !regEmail.test(email) 
            || !password || !regPasswordForRegistration.test(password)
            || !username || !regUsername.test(username)) {
                return redirect("/register", {
                    headers: {
                        "Set-Cookie": "",
                    },
                    status: 401,
                    statusText: "Please enter an username, email or password that follows the required format",
                });
            }

            await serverAuth.createUser({
                displayName: username,
                email,
                password,
                emailVerified: false,
            });
                

            return redirect("/verify-email", {
                status: 201,
                statusText: "Registered Successfully",
            });


        } catch (e: any) {
            return redirect("/register", {
                headers: {
                    "Set-Cookie": "",
                },
                status: 400,
                statusText: e.message,
            });

        }


    }
}

// #endregion

//#region LOADER
export const loader: LoaderFunction = async ({ request }) => {

    try {
        
        const sessionState = await getSessionState(request, "/");
        
        return sessionState;
    } catch (e: any) {

        return redirect("/register", {
            status: 401,
            statusText: e.message,
        });

    }


}
// #endregion



export default function register() {

    const fetcher = useFetcher();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const form = event.currentTarget as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;
        const username = form.username.value;


        if (!email || !regEmail.test(email as string)
            || !password || !regPasswordForRegistration.test(password as string)
            || !username || !regUsername.test(username as string)) {
            setError("Please enter an email and password that follows the required format");
            return;
        }

        try {
            fetcher.submit({username, email, password}, {
                method: "post",
            })
            
            if(fetcher.type === "done"){
                setLoading(false);
           }



        } catch (e: any) {
            setLoading(false);
            setError(e.message);
        }



    }

    return (
        <div className="w-full flex flex-col items-center p-4">

            <Link to="/">
                <EasierLifeLogo
                    height="75px"
                    className="mb-3"
                    fillPrimary='fill-skin-primary'
                    fillSecondary='fill-skin-secondary'
                />

            </Link>

            <p className="font-bold text-2xl md:text-3xl text-skin-muted">Get Started, it's free!!</p>

            <fetcher.Form
                onSubmit={handleSubmit}
                method="post"
                className="w-full md:w-2/4 px-4 sm:px-6 lg:px-8 py-8"
            >

                <FormInput
                    generalDivClassName="mb-4"
                    type="text"
                    name="username"
                    placeHolder="Username"
                    errorMessage="Please enter a valid username, dot, dash and underscore are allowed but not consecutively, between 3 and 20 characters"
                    regExp={regUsername}
                />
                <FormInput
                    generalDivClassName="mb-4"
                    type="email"
                    name="email"
                    placeHolder="Email"
                    errorMessage="Please enter a valid email address"
                    regExp={regEmail}
                />

                <FormInput
                    generalDivClassName="mb-4"
                    type="password"
                    name="password"
                    placeHolder="Password"
                    regExp={regPasswordForRegistration}
                    errorMessage="Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
                />

                <input
                    type="submit"
                    className={`w-full bg-skin-button-accent 
                        hover:bg-skin-button-accent-hover 
                        text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline
                        hover:cursor-pointer 
                        ${loading ? "opacity-50 cursor-wait" : ""}`}
                    value={loading ? "Loading..." : "Login"}
                />


            </fetcher.Form>

            <div className="w-full md:w-2/4 px-4 sm:px-6 lg:px-8 py-2">
                <p id="error-message-form" className="w-full text-sm text-center text-red-600">{error}</p>
            </div>

            <div className="w-full md:w-2/4 px-4 sm:px-6 lg:px-8 py-2">
                <p className="w-full text-sm text-center text-skin-muted hover:text-skin-inverted"><Link to="/login">Already have an account ? Login!</Link></p>
            </div>

        </div>
    )

}