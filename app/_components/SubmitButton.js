"use client"

import { useFormStatus } from 'react-dom';


const SubmitButton = ({ children, pendingLabel }) => {
  // NOTE: this is not a react hook but a react-dom hook.
  // must be used inside a  component which is inside a form, and not in a componet which has a form. i.e you won't be able to use it in above (UpdateProfileForm component)
  // component needs to be a client component as this is a react-dom hook.
  // this hook will give access to pending, formData, method and action 
  const { pending } = useFormStatus()

  return <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    disabled={pending}
  >
    {pending ? pendingLabel : children}
  </button>

}


export default SubmitButton