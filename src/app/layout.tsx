'use client';

import useToastStore from "@/modules/toastInformation/store";
import useUserStore from "@/modules/userInformation/store";
import ToastMessage from "@/toast";
import s from "./Layout.module.scss";
import { Inter } from "next/font/google";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = useToastStore((state) => state.messages);
  const fetchReloadPage = useUserStore((state) => state.fetchReloadPage);

  useEffect(() => {
    fetchReloadPage();
  }, [fetchReloadPage]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={s.content}>
          {children}
          <div className={s.messages}>
            {messages &&
              messages.map((mess) => (
                <ToastMessage
                  key={mess.id} // Добавлено: ключ для каждого элемента списка
                  type={mess.type}
                  message={mess.message}
                  id={mess.id}
                />
              ))}
          </div>
        </div>
      </body>
    </html>
  );
}
