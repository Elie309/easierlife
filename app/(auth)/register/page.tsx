
import React from 'react'
import AuthComponent from '@/app/(auth)/authComponent'

export default async function RegisterPage() {



  return (
    <>
      <AuthComponent
        type="register"
        title="Get Started, It's Free!"
        link="/login"
        linkText="Already have an account? Login!"
        buttonText="Register"
      />
    </>
  )
}
