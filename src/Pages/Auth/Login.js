import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { Spin } from 'antd'



const initialstate = { email: "", password: "" }
export default function Login() {
  const [state, setstate] = useState(initialstate)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setstate(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = state
    if (!email && !password) return window.toastify("Please Enter Your Detail", "error")

    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.toastify("Login Successfully", "success")
      })
      .catch((error) => {
        console.log(error)
      });

    setLoading(false)

  }

  const handleforgot = (e) => {
    const email = state.email
    e.preventDefault()
    sendPasswordResetEmail(auth, email)
      .then(() => {
        window.toastify("Password reset email sent!", "success")
        // ..
      })
      .catch((error) => {
        console.error("error", error);

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      })

  }
  return (
    <main >
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 " style={{ minHeight: "100vh" }}>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" value={state.email} onChange={handleChange} autocomplete="email" required className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <Link onClick={handleforgot} className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" value={state.password} onChange={handleChange} type="password" autocomplete="current-password" required className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <Spin /> : 'Login'}
              </button>
              <p className='flex justify-center '>Didn't have an account?<Link className='text-indigo-600 hover:text-black' to='/auth/register'>Sign Up</Link> </p>

            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">


          </p>
        </div>
      </div>
    </main>
  )
}
