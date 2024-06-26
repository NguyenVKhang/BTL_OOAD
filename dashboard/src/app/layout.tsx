"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import AdminProvider from "@/context/AdminProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    // <>
    //   <div suppressHydrationWarning={true}>
    //     <div className="dark:bg-boxdark-2 dark:text-bodydark">
    //       {/* {loading ? <Loader /> : children} */}
    //       {children}
    //     </div>
    //   </div>
    // </>
    <html lang="en" suppressHydrationWarning>
      <AdminProvider>
        <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {/* {loading ? <Loader /> : children} */}
              {children}
          </div>
        </body>
      </AdminProvider>
    </html>
  );
}
