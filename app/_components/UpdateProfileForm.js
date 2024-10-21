'use client'


import { updateProfileAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

const UpdateProfileForm = ({ children, guest }) => {
  const { fullName, email, nationality, nationalID, countryFlag } = guest
  

  return (
    // NOTE: we don't have to maintain any state for sending form data, this form component will automatically send all the formData to serverAction using formData api which is available in native javascript.
    // For this to work each input elements must have a name attribute.
    <form action={updateProfileAction} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag || ''}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {/* NOTE: this is a server component being used inside client component */}
        {/* This will throw errors as server components can not be imported inside client component. work around pass server components to child component from server components as children of client component. --> see profile page for implementation */}
        {/* <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        /> */}

        {/* NOTE: rendering server component as child component */}
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel={'Updating...'}>Update Profile</SubmitButton>
      </div>
    </form>
  )
}

const Button = () => {
  // NOTE: this is not a react hook but a react-dom hook.
  // must be used inside a  component which is inside a form, and not in a componet which has a form. i.e you won't be able to use it in above (UpdateProfileForm component)
  // component needs to be a client component as this is a react-dom hook.
  // this hook will give access to pending, formData, method and action 
  const { pending } = useFormStatus()

  return <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    disabled={pending}
  >
    {pending ? "Updating..." : "Update profile"}
  </button>

}

export default UpdateProfileForm