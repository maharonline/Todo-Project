import React, { useState } from 'react'
import { auth, firestore } from 'config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Spin } from 'antd'
import CustomSpinner from 'components/CustomSpinner'
// import { Link } from 'react-router-dom'


const initialstate = { firstname: "", lastname: "", email: "", password: "" }
export default function Register() {
  const [state, setstate] = useState(initialstate)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setstate(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { firstname, lastname, email, password } = state
    if (!firstname && !lastname && !email && !password) return window.toastify("Please Enter Your Detail", "warning")

    setLoading(true)

    const formdata = {
      firstname, lastname, email, DateCreted: serverTimestamp(), fullname: firstname  + " " +  lastname 
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        createdocument({ ...formdata, userId: user.uid, email: user.email })
      })
      .catch((error) => {
        console.log(error);

        setLoading(false)
      });

    const createdocument = async (formdata) => {
      try {
        await setDoc(doc(firestore, "Users", formdata.userId), formdata);
        window.toastify("Register Successfully", "success")
      }

      catch (e) {
        console.error("Todo Database", e)
      }

    }

  }
  return (
    <main>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border-">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label for="firstname" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
              <div className="mt-2">
                <input id="firstname" name="firstname" type="text" value={state.firstname} onChange={handleChange} required className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label for="lastname" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
              <div className="mt-2">
                <input id="lastname" name="lastname" value={state.lastname} onChange={handleChange} type="text" className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" value={state.email} onChange={handleChange} autocomplete="email" required className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

              </div>
              <div className="mt-2">
                <input id="password" name="password" value={state.password} onChange={handleChange} type="password" autocomplete="current-password" required className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >{loading ? <Spin indicator={<CustomSpinner />} /> : 'Register'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">


          </p>
        </div>
      </div>
    </main>
  )
}
