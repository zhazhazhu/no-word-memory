import process from 'node:process';
import { NuxtAuthHandler } from '#auth';
import PostgresAdapter from '@auth/pg-adapter';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { Pool } from 'pg';

const adapter = PostgresAdapter(new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
})) as any;

export default NuxtAuthHandler({
  secret: process.env.NUXT_AUTH_SECRET,
  adapter,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    EmailProvider.default({
      server: {
        host: process.env.NUXT_EMAIL_SERVER_HOST,
        port: process.env.NUXT_EMAIL_SERVER_PORT,
        auth: {
          user: process.env.NUXT_EMAIL_SERVER_USER,
          pass: process.env.NUXT_EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.NUXT_EMAIL_SERVER_USER,
      maxAge: 30 * 60,
    }),
  ],
  pages: {
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        id: user.id,
      };
    },
  },
});
