// NOTE: 'use server' directive is used to define server action and not for server components, every component is a server component in nextjs by default.
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
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



export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to delete your reservation.")

  // check if the current booking to be deleted belongs to actual user.
  const guestBookings = await getBookings(session.user.guestId)
  const userBooking = guestBookings.filter(booking => booking.id === bookingId)

  if (userBooking.length === 0) {
    throw new Error("You are not allowed to delete this booking.")
  }


  const { data, error } = await supabase.from('bookings').delete().eq('id', bookingId);


  if (error) {
    throw new Error("Reservation could not be deleted.")
  }

  // NOTE; this will revalidate all the data that is being fetched on a particular route. If you need to specifically revalidate a particular piece of data use revalidateTag
  revalidatePath('/account/reservations')
}

export async function updateReservationAction(formData) {
  const session = await auth()

  if (!session) {
    throw new Error("Please login to update the reservation.")
  }

  const bookingId = formData.get('bookingId')

  // check if the current booking to be deleted belongs to actual user.
  const guestBookings = await getBookings(session.user.guestId)
  const userBooking = guestBookings.filter(booking => booking.id === +bookingId)
  if (userBooking.length === 0) {
    throw new Error("You are not allowed to update this booking.")
  }

  const updatedFields = { observations: formData.get("observations").slice(0, 1000), numGuests: formData.get('numGuests') }

  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  // NOTE: revalidation should always happen before redirect
  revalidatePath(`/account/reservations/edit/${bookingId}`)
  revalidatePath('/account/reservations')
  redirect('/account/reservations')

}


export async function createReservationAction(bookingData, formData) {

  const session = await auth()

  if (!session) {
    throw new Error("Please login to update the reservation.")
  }

  // when you have many fields inside formData, you can do something like below.
  // Object.entries(formData.entries)

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: +formData.get("numGuests"),
    observations: formData.get('observations').slice(0, 1000),
    totalPrice: bookingData.cabinPrice,
    extrasPrice: 0,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed"
  }


  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`)

  redirect('/cabins/thankyou')

}