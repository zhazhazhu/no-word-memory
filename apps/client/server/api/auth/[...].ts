import path from 'node:path';
import process from 'node:process';
import { NuxtAuthHandler } from '#auth';
import PostgresAdapter from '@auth/pg-adapter';
import dotenv from 'dotenv';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { Pool } from 'pg';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

const adapter = PostgresAdapter(new Pool({
  host: process.env.NUXT_DATABASE_HOST,
  user: process.env.NUXT_DATABASE_USER,
  password: process.env.NUXT_DATABASE_PASSWORD,
  database: process.env.NUXT_DATABASE_NAME,
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
      server: process.env.NUXT_EMAIL_SERVER,
      from: process.env.NUXT_EMAIL_SERVER_FORM,
      maxAge: 30 * 60,
    }),
  ],
  pages: {
    verifyRequest: '/auth/verify-request',
    signIn: '/auth/signin',
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
