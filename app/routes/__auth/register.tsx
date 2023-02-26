import React from "react";
import { Link } from "@remix-run/react";
import { regEmail, regPasswordForRegistration, regUsername } from "config";
import EasierLifeLogo from "~/components/EasierLifeLogo";
import FormInput from "~/components/FormInput";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { LoaderFunction, redirect } from "@remix-run/node";
import { getSessionState } from "~/utils/cookies";
import { clientAuth } from "~/firebase/firebase.client";



//#region LOADER
export const loader: LoaderFunction = async ({ request }) => {

    try {

        const sessionState = await getSessionState(request, true, false, "/dashboard", null);

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

    const [state, setState] = React.useState<"idle" | "loading" | "error" | "done">("idle");
    const [message, setMessage] = React.useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setState("loading");

        const form = event.currentTarget as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;
        const username = form.username.value;


        if (!email || !regEmail.test(email as string)
            || !password || !regPasswordForRegistration.test(password as string)
            || !username || !regUsername.test(username as string)) {
            setMessage("Please enter an email and password that follows the required format");
            return;
        }

        try {

            const credentials = await createUserWithEmailAndPassword(clientAuth, email, password);
            //TODO: Username unique check
            await updateProfile(credentials.user, { displayName: username });

            sendEmailVerification(credentials.user);

            setState("done");
            setMessage("Please verify your email address before logging in");

        } catch (e: any) {
            setState("error");
            setMessage(e.message);
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

            <form
                onSubmit={handleSubmit}
                method="POST"
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

                {state === "done" &&
                    <div className="w-full px-4 sm:px-6 lg:px-8 py-2">
                        <p id="error-message-form" className="w-full text-sm text-center text-green-600">
                            {message}
                        </p>
                    </div>
                }

                <input
                    type="submit"
                    className={`w-full bg-skin-button-accent 
                        hover:bg-skin-button-accent-hover 
                        text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline
                        hover:cursor-pointer 
                        ${(state === "loading" || state === "done") ? "opacity-50 cursor-wait" : ""}`}
                    disabled={state === "loading" || state === "done"}
                    value={state === "loading" ? "Loading..." : state === "done" ? "Done" : "Register"}
                />


            </form>

            {state === "error" && <div className="w-full md:w-2/4 px-4 sm:px-6 lg:px-8 py-2">
                <p id="error-message-form" className="w-full text-sm text-center text-red-600">{message}</p>
            </div>}

            <div className="w-full md:w-2/4 px-4 sm:px-6 lg:px-8 py-2">
                <p className="w-full text-sm text-center text-skin-muted hover:text-skin-inverted"><Link to="/login">Already have an account ? Login!</Link></p>
            </div>

        </div>
    )

}