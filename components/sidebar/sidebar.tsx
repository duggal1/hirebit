"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Video,
  CreditCard,
  Settings,
  ChevronRight,
  Menu,
  Search,
} from "lucide-react";
import LoadingState from "../loading/Loadingstate/loading";

interface Company {
  id: string;
  companyID: string;
  name: string;
}

interface SessionUser {
  id: string;
  email?: string | null;
}

const getMenuItems = (userId?: string, companyID?: string) => [
  {
    id: 1,
    label: "Dashboard",
    icon: LayoutDashboard,
    link: `/dashboard/${userId || "no-user"}/${companyID || "no-company"}`,
  },
  { id: 2, label: "Job Listings", icon: Briefcase, link: "/jobs" },
  { id: 3, label: "Applications", icon: FileText, link: "/applications" },
  { id: 4, label: "Interviews", icon: Video, link: "/interviews" },
  { id: 5, label: "Billing", icon: CreditCard, link: "/billing" },
  { id: 6, label: "Settings", icon: Settings, link: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { data: session, status } = useSession();

  const user = session?.user as SessionUser | undefined;
  const userId = user?.id;
  const { data: company, isLoading: isCompanyLoading } = useQuery<Company>({
    queryKey: ["company", userId],
    queryFn: async () => {
      const response = await fetch("/api/companys");
      if (!response.ok) throw new Error("Failed to fetch company");
      return response.json();
    },
    enabled: !!userId,
  });

  if (status === "loading" || isCompanyLoading) {
    return <LoadingState />;
  }

  if (!company) {
    return null;
  }

  const menuItems = getMenuItems(userId, company.companyID);

  return (
    <motion.div
      initial={false}
      animate={{
        width: isExpanded ? 320 : 80,
        transition: { duration: 0.8, type: "spring", stiffness: 100 },
      }}
      className="fixed left-0 top-0 h-screen z-50 overflow-hidden bg-gray-900 dark:bg-black text-gray-100 dark:text-gray-100"
    >
      {/* Main container */}
      <div className="relative h-full">
        {/* Toggle button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-6 right-5 p-2 rounded-full bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 border border-gray-700 dark:border-gray-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Menu className="  w-4 h-4" />
          </motion.div>
        </motion.button>

       
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col"
                >
                 
                </motion.div>
              )}
            

        

        {/* Navigation */}
        <nav className="px-4 py-2 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.link;
            const isHovered = hoveredItem === item.id;
            const Icon = item.icon;

            return (
              <Link href={item.link} key={item.id}>
                <motion.div
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-lg
                    ${isActive 
                      ? "bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100" 
                      : "text-gray-400 dark:text-gray-400 hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-gray-100 dark:hover:text-gray-100"}
                  `}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-5 h-5" />
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        className="text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isHovered && isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-auto"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
}