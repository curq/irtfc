import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found — Instagram';
  }, []);
  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">404 NOT FOUND</p>
      </div>
    </div>
  );
}
