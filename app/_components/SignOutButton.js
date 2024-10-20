import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOutAction } from "../_lib/actions";

// THIS button is used inside navgiatio, which is a client component so this will also be a client component
// you can use here javascript event listeners and react hooks
async function SignOutButton() {
  return (
    // server actions can be called from both client and server components but they will execute on server only.
    <form action={signOutAction}>
      <button className='py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full'>
        <ArrowRightOnRectangleIcon className='h-5 w-5 text-primary-600' />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
