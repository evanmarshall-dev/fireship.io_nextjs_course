import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About: Evan Marshall',
  description:
    'I design, build and maintain businesses online. Whether it is branding, updates, or full website rebuilds; I am your web developer. Contact me to discuss how you want to get your business working for you online.',
};

export default function About() {
  return (
    <main>
      <h1>ABOUT PAGE</h1>
      <p>This page will be about Evan Marshall, Web Developer.</p>
    </main>
  );
}
