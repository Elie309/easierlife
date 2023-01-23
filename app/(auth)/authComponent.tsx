'use client'

import React from 'react'
import FormInput from '@/components/FormInput'
import Link from 'next/link';


type Props = {
    type: "login" | "register",
    title: string,
    link: string,
    linkText: string,
    buttonText: string,
}

export default function AuthComponent(props: Props) {

    let EmailRef = React.useRef<FormInput>(null);
    let PasswordRef = React.useRef<FormInput>(null);


   

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
                ref={EmailRef}
            />

            <FormInput
                generalDivClassName="w-3/4 sm:w-full m-5 max-w-lg mx-2"
                textClassName="text-skin-muted"
                name="password"
                type="password"
                placeHolder="Password"
                ref={PasswordRef}
            />

            <button

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
