import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthCallback = async () => {
  const auth = await onAuthenticateUser();

  if (auth.status === 200) {
    console.log("User authenticated successfully");
    redirect("/dashboard");
  } else if (
    auth.status === 401 ||
    auth.status === 500 ||
    auth.status === 400
  ) {
    console.log("Authentication failed");
    redirect("/sign-in");
  }
};

export default AuthCallback;
