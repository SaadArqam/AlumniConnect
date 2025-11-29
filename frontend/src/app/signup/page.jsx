"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function ChooseRolePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSelect = async (role) => {
    try {
      setLoading(true);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/set-role`,
        { role },
        { withCredentials: true }
      );

      if (role === "STUDENT") router.push("/signup/student");
      else router.push("/signup/alumni");
    } catch (err) {
      console.log(err);
      alert("Error setting role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Select Your Role</h1>

      <button
        style={styles.button}
        disabled={loading}
        onClick={() => handleSelect("STUDENT")}
      >
        I am a Student
      </button>

      <button
        style={styles.button}
        disabled={loading}
        onClick={() => handleSelect("ALUMNI")}
      >
        I am an Alumni
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    textAlign: "center",
  },
  button: {
    width: "250px",
    padding: "12px",
    marginTop: "20px",
    fontSize: "18px",
    cursor: "pointer",
  },
};
