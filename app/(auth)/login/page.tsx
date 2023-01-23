import React from 'react'
import AuthComponent from '../authComponent'

export default function LoginPage() {
  return (
    <>
      <AuthComponent
        type="login" 
        title="Welcome Back!"
        link="/register"
        linkText="Don't have an account? Register!"
        buttonText="Login"
      />
    </>
  )
}