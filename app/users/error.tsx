'use client';

import { useEffect } from 'react';

// The error function takes two props called error and reset. Error is the error object of whatever went wrong and reset is a special next js function that will attempt to re-render the page component.
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // If you want to console the error you can do that with the useEffect hook and have it run whenever the error object changes.
  // Then the JSX below will be shown to the end user where we can provide a button to trigger the reset function that will attempt to refetch the data and re-render the page.
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
