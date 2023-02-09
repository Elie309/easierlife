'use client'
import React from 'react'

import BlocksSuffle from '@/components/svg/blocksShuffle'

import { fbAuth } from '@/firebase/firebaseApp'

export default function logout() {



    React.useEffect(() => {

        fbAuth.signOut().then(() => {
            console.log('Signed Out');
            window.location.href = '/'
        }).catch((error) => {
            console.error('Sign Out Error', error);
            window.location.href = '/'
        });
    }, [])


    return (
        <div>
            <BlocksSuffle />
        </div>
    )

}
