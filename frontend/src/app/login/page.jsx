"use client";
import React, { Suspense } from "react";
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/LoginPage';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24">
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
          <AuthForm />
        </Suspense>
      </div>
    </div>
  );
}
