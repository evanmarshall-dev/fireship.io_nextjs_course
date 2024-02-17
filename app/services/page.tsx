import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services: Evan Marshall',
  description:
    'I design, build and maintain businesses online. Whether it is branding, updates, or full website rebuilds; I am your web developer. Contact me to discuss how you want to get your business working for you online.',
};

export default function Services() {
  return (
    <main>
      <h1>SERVICES PAGE</h1>
      <p>
        This page will explain the services offered by Evan Marshall, Web
        Developer.
      </p>
    </main>
  );
}
