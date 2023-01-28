'use client'

import React from 'react'
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

export default async function AuthComponent(props: Props) {

    let EmailRef = React.useRef<FormInput>(null);
    let PasswordRef = React.useRef<FormInput>(null);

    const FormHandler = (e: React.MouseEvent) => {
        e.preventDefault();

        let email = EmailRef.current?.getValue();
        let password = PasswordRef.current?.getValue();

        if (EmailRef.current?.isValueCorrect() && PasswordRef.current?.isValueCorrect()) {

            if (props.type === "LOGIN") {
                console.log("Login")
            } else {
                console.log("Register")
            }
        }

    }
   

    return (
        <div className="w-4/4 sm:w-3/4 lg:2/4 flex flex-col items-center max-w-">

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

            <button
                onClick={FormHandler}
                className="w-2/4 md:w-1/4 my-2 p-2 
                  text-md bg-skin-button-accent hover:bg-skin-button-accent-hover 
                  text-skin-white font-bold 
                  sm:text-2xl sm:my-5 sm:p-4 
                  rounded-lg">
                {props.buttonText}
            </button>

            <p className="w-2/4 sm:w-full mt-4 text-skin-muted text-center" >
                <Link href={props.link}>
                    {props.linkText}
                </Link>
            </p>
        </div>
    )
}
