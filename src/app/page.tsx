import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import  Link  from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";

export default async function Home() {
  const authResult = await auth();
  console.log("Auth result:", authResult); // Check what auth() returns
  
  const { userId } = authResult;
  console.log("User ID:", userId); // Check if userId exists
  
  const isAuth = !!userId;
  console.log("Is authenticated:", isAuth); // Check final auth state
  
  return (
    <div className="w-screen min-h-screen bg-gradient-to-tr from-violet-500 to-orange-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2">
            {isAuth && <Button className="cursor-pointer mt-2">Go to Chat</Button>}
          </div>

          <p className=" max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professionals to instantly answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuth ?(
              <FileUpload/>
            ):(
              <Link href="/sign-in">
                <Button className="cursor-pointer">Login to get Started!
                  <LogIn className="w-4 h-4 ml-2"/>
                </Button>
              </Link>
            )}
          </div>
          {/* add images */}
        </div>
      </div>
    </div>
  );
}