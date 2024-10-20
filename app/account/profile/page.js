import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: 'Update Profile',
}

const Page = async () => {

  const session = await auth();
  const guest = await getGuest(session.user.email)
  // const nationality = "portugal";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateProfileForm guest={guest}>
        {/* NOTE: this component in being imported inside server components and everything will happen here before it is passed to client component(data fetching and everything will happen here) */}
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          // defaultCountry={nationality}
          defaultCountry={guest.nationality}
        />

      </UpdateProfileForm>
    </div>
  );
}

export default Page