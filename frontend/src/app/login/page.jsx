"use client";
import React from "react";
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/LoginPage';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <AuthForm />
    </div>
  );
}
