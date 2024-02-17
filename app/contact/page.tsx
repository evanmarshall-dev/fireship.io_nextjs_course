import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact: Evan Marshall',
  description:
    'I design, build and maintain businesses online. Whether it is branding, updates, or full website rebuilds; I am your web developer. Contact me to discuss how you want to get your business working for you online.',
};

export default function Contact() {
  return (
    <main>
      <h1>CONTACT PAGE</h1>
      <p>This page will be how to contact Evan Marshall, Web Developer.</p>
    </main>
  );
}
