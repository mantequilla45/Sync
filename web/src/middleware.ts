import {NextResponse} from 'next/server';
import type { NextRequest } from 'next/server';
import {
  authMiddleware,
  redirectToLogin,
} from 'next-firebase-auth-edge';
  const PATH = ['/about', '/login', '/about', '/'];
  const PUBLIC_PATHS = ['/register', '/login', '/', '/about',];

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
      handleValidToken: async ({token, decodedToken, customToken}, headers) => {

        return NextResponse.next({
          request: {
            headers
          }
        });
      },
      
      handleInvalidToken: async (_reason) => {
        console.log("1 " + _reason);

        return redirectToLogin(request, {
          path: '/',
          publicPaths: PUBLIC_PATHS
        });
      },
      handleError: async (error) => {
        console.error('Unhandled authentication error', {error});
        console.log("2 " + error);
        return redirectToLogin(request, {
          path: '/',
          publicPaths: PUBLIC_PATHS
        });
      }
    });
  }

  export const config = {
    matcher: [
      '/',
      '/((?!_next|favicon.ico|__/auth|__/firebase|api|.*\\.).*)',
      '/api/login',
      '/api/logout',
      '/api/refresh-token'
    ]
  };

  export const serverConfig = {
    useSecureCookies: false,
    firebaseApiKey: "AIzaSyDFmW2UPN4Ml3183LvVCDewPsNCroQvhoQ",
    serviceAccount: 
      {
          projectId: "hostingtest-aadc2",
          clientEmail: "firebase-adminsdk-s9rmc@hostingtest-aadc2.iam.gserviceaccount.com",
          privateKey: (`-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHm5axNBg7BN9B\njm8Km7GvfaNnsMtBPQWveRNyXxizZ00rLP0bJtbU8wNWrQ3mCdxKmRJNNYaTj2kI\nSpXPRuRWw9Itl0a3DVhanGAS5o7Z5raYs8IPCGzGnCxzx7FXM5aGymVjvnx7dcmN\nLAKc41Oii16V0zQwDhaZuQw/ZVFw34nHqszbO9il7/6Cf9DexA5RDXNMSHNmB2Iq\nYO4/NTkcq8GhSt0C8YOT1+hU6Ga8y9/bXU9GkTzjblnvgSmuc9PvAy8Vgop1eSy3\nsOlNbVHQasz0o1ql3In4GWUSxTgVYlRfwDk99DoD/ehhyV6S+FedTrRdHaHPCjSi\n83IajeSFAgMBAAECggEABvmkwUiW5l/g3FkMzNC/6HT28MpQo/ts3ck/MnjO85zG\nKWs75TomrJzZKESv9TKxg1xus3Eaiyc3B9gXyZbXQMGJifHQG3JbyZjO0g8P/V6h\n6vUKVwoK+qeQ9X/MLoYQbWF+7waES5bELKR8N+OV89qabmWWj7pVgSXI0lTpGZnw\nrCveyvNmzyeg9NSyYlSM0qn0BZUNb5J4pPWr6l+sprJkxRZaqjO02wbsL9odW33g\n7+CNelAf250yVpcZ6q8F7EW/MaHstm+vMxRUFWo2j2nVppX3dCM1MiIVpm5B/PhV\nW08E6EKdZX2zbHBhYsfH0DD51gq/l9Bh/flMVRFU2QKBgQD5kbUMMESWTGxQgj5B\nEv0riH7hPm0593rInlJQ/zqWRnq+tVY8SaNzw962QcYUg5PQxQs+Z6za7H2oxVrR\naJRxB/Hsyw+kbjkskoz1Aj7HfXCktqIT1fx36HeYHvxpENpFF6kAAV21URzEZgqs\niP8r8WH+8U4aixYs3nt+3ub5bQKBgQDMwE8gjv+Uj0+zBkrCgNyVJgV7OspZQmIH\n7IByG5bVV+7cpjj9D8Lbgs0DBFQGRCW3u9EKLFGDn6/7Btr/JPb9FHRooQ5n9re1\n7NfmtQptDm1CNnUrPBMNE5jQqthWvGr1po+wvwq7nftea0rz1r80yPkB4PYHNJMY\n0ycAcaoAeQKBgFxMxTbCyzsC/LQx1zBeA4AMNVC8s8zSeHimBS+rlVFqs47ApioZ\n2ffAoyeo38dKemql1Wi5EzbMbBT1GIeGNBAxrgmzeA+KLF8NvFAJCorhG73vRbYs\nV/lI4qJCI3wAHZmcDIbR+oRKgWcpjh0NdcIcve958zbh5cumZOohKi9pAoGAZ4YU\ne/HRZ9vOAEZ+JjnhTcgbnWLsTJUz263Ig+lPKi97pjSlO85sR3CrF4tosIJkT7G2\nz934mQR0hgfBUp/uAagF86D7F7W2zVUjFJMU4m8Y7xF5zJJjT4lJCrhXCgPaULoW\njNcLJjGKlwLIsuExbA7xV/HWc24xsauRXLgbrIECgYEAnW/kFqT3PzX3z6WcPFrt\nz7rSxGw6siCiTuWt7sogMZAH/IbPo0yScPGy8TymfGEanzlGolcz0aJtip7lMUiG\nONOC+s8OipX1oiuN/4LZPFS+KRaTIGcZbzkBaaAw5/Qji5dWfYvbFBzV0zIv037L\nThF108oC8p0dibPfQEYseqA=\n-----END PRIVATE KEY-----\n`)
          .replace(
            /\\n/g,
            '\n'
          )!
        }
  };

  export const authConfig = {
    apiKey: serverConfig.firebaseApiKey,
    cookieName: 'AuthToken',
    cookieSignatureKeys: [
      "iEZuYnvAImLh0AjUlvnvFop1bJ3Ae7beiD/oCzjkO1TfeOhJal6ysftdstHloYR1",
      "2QQRPztqiD9mN3MHC8B+pliz5eYBgOglba8MYUEYSKkDIfvqZNySEy4UKyM7V5Z3"
    ],
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
      sameSite: 'lax' as const,
      maxAge: 12 * 60 * 60 * 24 // twelve days
    },
    serviceAccount: serverConfig.serviceAccount,
    // Set to false in Firebase Hosting environment due to https://stackoverflow.com/questions/44929653/firebase-cloud-function-wont-store-cookie-named-other-than-session
    enableMultipleCookies: true
  };
