'use client';
import { Modal } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  return (
    <Modal>
      <div className="container">
        <h1>Signup</h1>
        <p>Already have an account?</p> <Link href={'/login'}>Login</Link>
      </div>
    </Modal>
  );
}
