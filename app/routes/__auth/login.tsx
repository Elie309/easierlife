import React from "react";
import { Link, useFetcher } from "@remix-run/react";
import { regEmail, regPasswordForLogin } from "config";
import { clientAuth } from "app/firebase/firebase.client";
import EasierLifeLogo from "~/components/EasierLifeLogo";
import FormInput from "~/components/FormInput";
import { getSessionState } from "~/utils/cookies";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { tokenHelper } from "~/utils/sessionHelper";

//TODO: REMEMBER ME WITH COOKIES


// #region ACTION
export let action: ActionFunction = async ({ request }) => {

    if (request.method === "POST") {


            const form = await request.formData();

            const idToken = form.get("idToken")?.toString();

            if(!idToken) {
                return redirect("/login", {
                    status: 500,
                    statusText: "No id Token",
                });
            }

            return await tokenHelper(idToken!, "Login Sueccessful", "/dashboard", "/login");

        }


}
// #endregion

//#region LOADER
export let loader: LoaderFunction  = async ({request})=> {

    try{
        
        const sessionState = await getSessionState(request,true, false, "/dashboard", null);
        return sessionState;

    }catch(e: any){

        return redirect("/login", {
            headers: {
                "Set-Cookie": "",
            },
            status: 401,
            statusText: e.message,
        });
       
    }

}
// #endregion

//#region REMIX RUN COMPONENT
export default function login() {

    const fetcher = useFetcher();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    //#region SUBMIT HANDLER
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);


        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;

        try {

            if (!email || !regEmail.test(email) || !password || !regPasswordForLogin.test(password)) {
                setLoading(false);
                setError("Please enter a valid email address and password");
                return;

            }
            const credential = await signInWithEmailAndPassword(clientAuth, email, password);
            const idToken = await credential.user.getIdToken();

            fetcher.submit({ idToken }, { method: "post", action: "/login" });

           
        } catch (e: any) {
            setLoading(false);
            setError(e.message);
        }

    }
    //#endregion


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

            <p className="font-bold text-2xl md:text-3xl text-skin-muted">Welcome Back!</p>

            <form
                method="POST"
                onSubmit={handleSubmit}
                className="w-full md:w-2/4 px-4 sm:px-6 lg:px-8 py-4"
            >

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
                    regExp={regPasswordForLogin}
                    errorMessage="Password must contain at least 8 characters"
                />

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <input type="checkbox" name="remember" id="remember" className="mr-2" />
                        <label htmlFor="remember" className="text-sm text-skin-muted">Remember me</label>
                    </div>
                    <Link to="/forgotpassword" className="text-sm text-skin-muted hover:text-skin-inverted">Forgot password?</Link>
                </div>

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


            </form>

            <div className="w-full md:w-2/4 px-4 sm:px-6 lg:px-8 py-2">
                <p id="error-message-form" className="w-full text-sm text-center text-red-600">{error}</p>
            </div>

            <div className="w-full md:w-2/4 px-4 sm:px-6 lg:px-8 py-2">
                <p className="w-full text-sm text-center text-skin-muted hover:text-skin-inverted"><Link to="/register"> Don't have an account? Register!</Link></p>
            </div>

        </div>
    )

}

//#endregion