"use client";
import React from "react";
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/LoginPage';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0d]">
      <Navbar />
      <div className="pt-24">
        <AuthForm />
      </div>
    </div>
  );
}
