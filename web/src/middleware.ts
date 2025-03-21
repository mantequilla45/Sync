import { authConfig } from './lib/Firebase/NextFirebaseAuthEdge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  authMiddleware,
  redirectToLogin,
} from 'next-firebase-auth-edge';

const PUBLIC_PATHS = ['/register', '/login', '/', '/about-us', '/contact-us'];

export async function middleware(request: NextRequest) {

  const projectRegex = /^\/project\/([a-zA-Z0-9]+)(?:\/|$)/;
  
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

    handleValidToken: async ({ token, decodedToken, customToken }, headers) => {
      const { nextUrl } = request;
      const absoluteUrl = `${nextUrl.protocol}//${nextUrl.host}/home`;

      headers.set('x-user-id', decodedToken.uid);

      if (nextUrl.pathname === "/") {
        
        return NextResponse.redirect(absoluteUrl);
      }

  
      if (projectRegex.test(nextUrl.pathname)) {
        console.log(nextUrl.pathname.split(projectRegex)[1]);
        console.log(decodedToken.uid);
      
        headers.set('project-id', nextUrl.pathname.split(projectRegex)[1]);
      
        const response = await fetch('http://localhost:3000/api/Project/verifyUserProjectAccess', {
          method: 'GET',
          headers: headers,
        });
      
        if (response.ok) {
          const data = await response.json();
          const hasAccess = data.hasMatch;
      
          if (typeof hasAccess !== 'boolean') {
            return NextResponse.redirect(absoluteUrl);
          }
        } else {
          return NextResponse.redirect(absoluteUrl);
        }
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