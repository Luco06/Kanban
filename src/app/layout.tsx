import type { Metadata } from "next";

import { Providers } from "./utils/Provider";

export const metadata: Metadata = {
  title: "Kanban",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
   
      <body>
        <Providers>
      {children}
        </Providers>
      </body>
 
    </html>
  );
}
