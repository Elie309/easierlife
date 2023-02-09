import React from 'react'

import { fbAuth } from '@/firebase/firebaseApp'
import { onAuthStateChanged } from 'firebase/auth'

export default function dashboard() {

  onAuthStateChanged(fbAuth, (user) => {

    if (!user) {

      window.location.href = "/login"
    }
  });



  return (
    <div>


    </div>
  )
}
