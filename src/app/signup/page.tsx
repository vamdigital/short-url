import Link from 'next/link';

export default function Signup() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <div className="container">
        <h1>Signup</h1>
        <p>Already have an account?</p> <Link href={'/login'}>Login</Link>
      </div>
    </main>
  );
}
