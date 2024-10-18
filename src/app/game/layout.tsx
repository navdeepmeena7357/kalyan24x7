'use client';
import TitleBar from '@/components/TitleBar';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <section>
      <div>
        <TitleBar title={name} />
      </div>
      {children}
    </section>
  );
}
