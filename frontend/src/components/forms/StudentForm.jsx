"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function StudentForm({ user = null, onSaved = null }) {
  const router = useRouter();

  // Prefill from user.profile if available, otherwise fallback to top-level fields
  // Prefill from user.profile if available, otherwise fallback to top-level fields
  const branch = (user && (user.profile?.branch || user.branch)) || "";
  const degree = (user && (user.profile?.degree || user.degree)) || "";
  const graduationYear = (user && (user.profile?.graduationYear || user.graduationYear)) || "";

  const _skills = (user && (user.profile?.skills ?? user.skills ?? null)) ?? null;
  const skills = Array.isArray(_skills)
    ? _skills.join(", ")
    : typeof _skills === "string"
    ? _skills
    : "";

  const _interests = (user && (user.profile?.interests ?? user.interests ?? null)) ?? null;
  const interests = Array.isArray(_interests)
    ? _interests.join(", ")
    : typeof _interests === "string"
    ? _interests
    : "";

  const initial = { branch, degree, graduationYear, skills, interests };

  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`,
        {
          branch: form.branch,
          degree: form.degree,
          graduationYear: Number(form.graduationYear),
          skills: form.skills.split(",").map((s) => s.trim()),
          interests: form.interests.split(",").map((i) => i.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (typeof onSaved === "function") onSaved();
      else alert("Profile saved successfully");
    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        name="branch"
        placeholder="Branch (CSE, IT, etc.)"
        value={form.branch}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="degree"
        placeholder="Degree (B.Tech, B.Sc)"
        value={form.degree}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="graduationYear"
        type="number"
        placeholder="Graduation Year"
        value={form.graduationYear}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="skills"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="interests"
        placeholder="Interests (comma separated)"
        value={form.interests}
        onChange={handleChange}
        style={styles.input}
      />

      <button style={styles.button}>Submit</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", maxWidth: "400px" },
  input: { padding: 10, marginBottom: 15, fontSize: 16 },
  button: { padding: 12, fontSize: 18, cursor: "pointer" },
};
