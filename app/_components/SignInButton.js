import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    // Note: we want this component to be a server component so that signin flow happens on server, and hence we can not use onClick or other events, but for submitting events we can use server action in server components.
    <form action={signInAction}>

      <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
        <img
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
