import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import path from 'path';

import clientPromise from '../../../lib/mongodb';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

const emailsDir = path.resolve(process.cwd(), 'emails');

const sendVerificationRequest = async ({ identifier, url }) => {
  try {
    const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `🪄 Sacuda ${process.env.EMAIL_FROM}`,
      to: identifier,
      subject: 'Link para iniciar sesión',
      html: emailTemplate({
        signin_url: url,
        email: identifier,
        base_url: process.env.NEXTAUTH_URL.replace('/api/auth', ''),
      }),
    });
  } catch (err) {
    console.log(`❌ No se pudo enviar el link a (${identifier})`+err);
  }
};

const sendWelcomeEmail = async ({ user }) => {
  const { email } = user;

  try {
    const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `🪄 Sacuda ${process.env.EMAIL_FROM}`,
      to: email,
      subject: 'Bienvenidxs a Sacuda! 🎉',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL.replace('/api/auth', ''),
        support_email: 'hola@sacuda.net',
      }),
    });
  } catch (error) {
    console.log(`❌ No se pudo enviar el mail de bienvenida a (${email})`);
  }
};

export default NextAuth({
  pages: {
    signIn: '/auth/signin',
    walletConnectPage: '/auth/walletConnect',
  },
  providers: [
    EmailProvider({
      maxAge: 10 * 60, // Magic links are valid for 10 min only
      sendVerificationRequest,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  events: { createUser: sendWelcomeEmail },
  secret: process.env.NEXTAUTH_SECRET
});
