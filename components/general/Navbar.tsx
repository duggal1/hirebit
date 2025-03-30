import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth } from "@/src/utils/auth";
import { ThemeToggle } from "./ThemeToggle";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
  const session = await auth();

     return (
      <>
    <nav className="flex justify-between items-center py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="hirebit" width={100} height={80} />
        <h1 className="text-3xl font-extrabold text-black  dark:text-white">
                HIRE<span className="text-blue-500">BIT</span>
              </h1>
            </Link>
    

            {/* Desktop Navigation */}
            <div className="hidden md:flex  pr-20 items-center space-x-3">
              <ThemeToggle />
              <Link
                href="/main"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-black dark:text-white transition"
              >
           Dashboard
              </Link>
              <Link
                href="/post-job"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-black dark:text-white transition"
              >
          Post Job
              </Link>
              {session?.user ? (
                <UserDropdown
                  email={session.user.email as string}
                  name={session.user.name as string}
                  image={session.user.image as string}
                />
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 border border-gray-300 hover:border-gray-600 rounded-md text-gray-900 dark:text-white hover:text-gray-500 transition"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2 border-gray-700 hover:border-gray-600"
                  >
                    <Menu className="h-6 w-6 text-gray-300" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-black text-white">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">
                      HIREBIT
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col space-y-4">
                    <Link
                      href="/"
                      className="px-4 py-2 hover:bg-gray-800 rounded transition"
                    >
                      Find New Job
                    </Link>
                    <Link
                      href="/main"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
                    >
                      Post a Job
                    </Link>
                    <Link
                      href="/login"
                      className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded transition"
                    >
                      Login
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        
           </nav>
           </>
     )}
 
export default Navbar;
