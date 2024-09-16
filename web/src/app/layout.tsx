import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Tokens, getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { User } from "@/auth/AuthContext";
import { AuthProvider } from "@/auth/AuthProvider";
import { authConfig } from "@/middleware";

const toUser = ({ decodedToken }: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider,
  } = decodedToken;
 
  const customClaims = filterStandardClaims(decodedToken);
 
  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims,
  };
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sync",
  description: "Synchronize your collaboration.",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const tokens = await getTokens(cookies(), authConfig);
  const user = tokens ? toUser(tokens) : null;
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider user={user}>{children}</AuthProvider>
      </body>
    </html>
  );
}
