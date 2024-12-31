"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { CopyIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Toaster, toast } from "sonner";

export default function Home() {
  const command = "npx quad-app@latest";

  const copyToClipboard = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(command);

    // Alert the copied text
    toast("Copied the command to clipboard");
  };
  return (
    <main className="flex sm:min-h-[91vh] min-h-[88vh] flex-col items-center justify-center text-center px-2 py-8">
      <Toaster />
      <h1 className="text-4xl font-bold mb-6 sm:text-7xl">
        The best way to start a RESTful, typesafe Express app
      </h1>

      <div className="flex items-center gap-4">
        <Link
          href={`/docs${page_routes[0].href}`}
          className={buttonVariants({
            className: "px-6 !font-medium",
            size: "lg",
          })}
        >
          Get Stared
        </Link>
        <Link
          href={`https://github.com/yxcinebendjebbar/quad-app`}
          className={buttonVariants({
            className: "px-6 !font-medium",
            size: "lg",
            variant: "outline",
          })}
        >
          Github
        </Link>
      </div>
      <div className="bg-gray-600/20 border border-gray-500/30 rounded px-2 md:px-6 gap-4 py-4 my-6 flex items-center justify-between">
        <span className="font-code text-sm">{command}</span>
        <Button variant="ghost" size="sm" onClick={copyToClipboard}>
          <CopyIcon />
        </Button>
      </div>
      <div className="mt-32">
        <p className="text-lg">
          Run the command above to create a new Express app with TypeScript,
          Sequelize, and more.
        </p>
      </div>
    </main>
  );
}
