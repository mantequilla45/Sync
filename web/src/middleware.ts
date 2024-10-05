import { authConfig } from './lib/Firebase/NextFirebaseAuthEdge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  authMiddleware,
  redirectToLogin,
} from 'next-firebase-auth-edge';

const PUBLIC_PATHS = ['/register', '/login', '/', '/about-us', '/contact-us'];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    refreshTokenPath: '/api/refresh-token',
    enableMultipleCookies: authConfig.enableMultipleCookies,
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,

    // When the token is valid, we proceed with the request
    handleValidToken: async ({ token, decodedToken, customToken }, headers) => {
      const { nextUrl } = request;

      // Attach the user UID to the headers
      headers.set('x-user-id', decodedToken.uid);

      if (nextUrl.pathname === "/") {
        const absoluteUrl = `${nextUrl.protocol}//${nextUrl.host}/home`;
        return NextResponse.redirect(absoluteUrl);
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },

    handleInvalidToken: async (_reason) => {
      console.log("1 " + _reason);

      return redirectToLogin(request, {
        path: '/',
        publicPaths: PUBLIC_PATHS,
      });
    },

    handleError: async (error) => {
      console.error('Unhandled authentication error', { error });
      return redirectToLogin(request, {
        path: '/',
        publicPaths: PUBLIC_PATHS,
      });
    }
  });
};

export const config = {
  matcher: [
    '/',
    '/((?!_next|favicon.ico|__/auth|__/firebase|.*\\.).*)',
    '/api/login',
    '/api/logout',
    '/api/refresh-token'
  ]
};