// NOTE: 'use server' directive is used to define server action and not for server components, every component is a server component in nextjs by default.
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";

export async function signInAction() {
  await signIn('google', { redirectTo: "/account" })
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" })
}


//TODO: not working fix this
export async function updateProfileAction(formData) {
  // NOTE: this is same as what you do in a backend api, so put all the necessary checks before putting data in db. Authorization, correct data and other validations 
  const session = await auth();
  // NOTE: we don't use try catch and simply throw errors like this, this will be catched by closes error boundary.You can do try catch also if you like.
  if (!session) {
    throw new Error("You must be logged in to update your profile.")
  }
  const nationalID = formData.get('nationalID')
  const [nationality, countryFlag] = formData.get("nationality").split("%")

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid national ID.")

  const updateData = { nationality, countryFlag, nationalID }
  const { data, error } = await supabase.from("guests").update(updateData).eq("id", session.user.guestId)


  if (error) {
    console.error(error)
    throw new Error('Guest could not be updated.')
  }

  // NOTE: nextjs stores router cache for 30s, so your updates will not reflect immediately. you have to manually revalidate the cache.
  // if you pass '/account' --> it will revalidate data for all the routes below account, like /accout/*
  // revalidatePath('/account')
  revalidatePath('/account/profile')
}
