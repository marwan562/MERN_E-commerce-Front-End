import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler";
import { User } from "@/interface";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const getUser = async (token: string | null): Promise<User> => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/protected-endpoint/createUser`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
};

const authCallback = async () => {
  try {
    const { getToken } = auth();
    const token = await getToken();

    if (!token) {
      throw new Error("No token available");
    }

    const user = await getUser(token);
    console.log(token);

    if (user.role === "user") {
      return redirect("/");
    } else if (user.role === "admin") {
      return redirect("/dashboard");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return redirect("/error");
  }

  return <LottieHandler type="loadingCart" message="Checking User.." />;
};

export default authCallback;
