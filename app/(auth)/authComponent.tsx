'use client'
import React from 'react'

import BlocksSuffle from '@/components/svg/blocksShuffle';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { fbAuth } from '@/firebase/firebaseApp';

import FormInput from '@/components/FormInput'
import Link from 'next/link';
import { regEmail, regPasswordForLogin, regPasswordForRegistration } from '@/config';


type Props = {
    type: "LOGIN" | "REGISTER",
    title: string,
    link: string,
    linkText: string,
    buttonText: string,
}

type states = "standBy" | "loading" | "error" | "success"

export default function AuthComponent(props: Props) {

    const [loading, setLoading] = React.useState(true);
    const [userLoggedIn, isUserLoggedIn] = React.useState(false);

    const [textError, setTextError] = React.useState<string>("");
    const [authState, setAuthState] = React.useState<states>("standBy");

    let EmailRef = React.useRef<FormInput>(null);
    let PasswordRef = React.useRef<FormInput>(null);


    onAuthStateChanged(fbAuth, (user) => {
        if (user) {
          isUserLoggedIn(true)
          setLoading(false)
    
        } else {
          isUserLoggedIn(false)
          setLoading(false)
        }
      });
    


    function FormHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setAuthState("loading");

        let email = EmailRef.current?.getValue();
        let password = PasswordRef.current?.getValue();

        if (EmailRef.current?.isValueCorrect() && PasswordRef.current?.isValueCorrect()) {

            if (props.type === "LOGIN") {

                signInWithEmailAndPassword(fbAuth, email!, password!)

                    .then((userCredential) => {

                        if (userCredential.user) {
                            setAuthState("success");

                            window.location.href = "/dashboard"

                        }
                    }).catch((error: any) => {

                        setAuthState("error");
                        setTextError(error.message);

                        console.log(error);
                    });




            } else if (props.type === "REGISTER") {

                createUserWithEmailAndPassword(fbAuth, email!, password!)

                    .then((userCredential) => {
                        if (userCredential.user) {
                            setAuthState("success");
                            window.location.href = "/dashboard"
                        }

                    }).catch((error: any) => {
                        setAuthState("error");
                        setTextError(error.message);
                        console.log(error)

                    });

            } else {
                throw new Error("Invalid type")
            }
        }

    }

    if(loading) return <BlocksSuffle />

    if(userLoggedIn){
        return <p className='font-bold textlg text-skin-muted'>User already logged in...</p>
    }else{
        
    }

    return (
        <>
            <form
                onSubmit={FormHandler}
                className="w-4/4 sm:w-3/4 lg:2/4 flex flex-col items-center max-w-">

                <h1 className="w-full text-skin-muted font-bold text-4xl my-5 text-center">
                    {props.title}
                </h1>


                <FormInput
                    generalDivClassName="w-3/4 sm:w-full m-5 max-w-lg mx-2"
                    textClassName="text-skin-muted"

                    name="email"
                    type="email"
                    placeHolder="Email"
                    regExp={regEmail}
                    ref={EmailRef}
                />

                <FormInput
                    generalDivClassName="w-3/4 sm:w-full m-5 max-w-lg mx-2"
                    textClassName="text-skin-muted"
                    name="password"
                    type="password"
                    placeHolder="Password"
                    regExp={props.type === "LOGIN" ? regPasswordForLogin : regPasswordForRegistration}

                    errorMessage={
                        props.type === "LOGIN" ?
                            "Password must be at least 8 characters long"
                            :
                            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"

                    }

                    ref={PasswordRef}
                />

                <input type="submit" value={props.buttonText}
                    className="w-2/4 md:w-1/4 my-2 p-2 
                  text-md bg-skin-button-accent hover:bg-skin-button-accent-hover 
                  text-skin-white font-bold
                  cursor-pointer
                  sm:text-2xl sm:my-5 sm:p-4 
                  rounded-lg"
                />

                {authState === "loading" && <BlocksSuffle />}

                {authState === "error" && <p className="font-semibold text-skin-error">{textError}</p>}


                <p className="w-2/4 sm:w-full mt-4 text-skin-muted text-center" >
                    <Link href={props.link}>
                        {props.linkText}
                    </Link>
                </p>
            </form>

        </>
    )
}
