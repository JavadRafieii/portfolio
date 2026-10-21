import { signIn, auth, signOut } from "@/auth";
import {Suspense} from "react";


export default function SignIn() {
  return (
    <Suspense fallback={<p>Checking sign-in status...</p>}>
      <SignInStatus />
    </Suspense>
  );
}

async function SignInStatus() {
  const session = await auth();

  console.log("Session:", session);

  if (session?.user?.email) {
    return (
      <div>
        <p>{session.user.email}</p>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
