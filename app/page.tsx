// "use server"
import ImageUpload from "@/components/ImageUpload";
import Timer from "@/components/Timer";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import { useCallback } from "react";



export default async function Home() {
  const handleAttachEvidence = useCallback(
    (files: any) => {
      console.log(files)
    },
    []
  );
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <Timer initialSeconds={60} />
        <h2>Image Upload</h2>
        <ImageUpload />
        <div className="flex-col items-center fixed bottom-0 left-0 mt-0 pt-0 flex h-30 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <p>For{" "} Kanna</p>

          <Image
            src="/icon-192x192.png"
            alt="Vercel Logo"
            className="dark"
            width={100}
            height={24}
            priority
          />
        </div>
      </div>


      <div className="grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {/* <h1>Welcome sd</h1> */}


      </div>
    </main>
  );
}
