import { useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "@/lib/firebase"; // adjust path if needed

export interface Voter {
  sr_no: number;
  enrolment_no: string;
  name: string;
  address: string;
  place_of_voting: string;
}

export const useVoterSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchVoter = async (searchTerm: string): Promise<Voter[] | null> => {
    const cleaned = searchTerm.trim();
    if (!cleaned) return null;

    setLoading(true);
    setError(null);

    try {
      // 🔎 Detect if search is numeric (Serial Number)
      const isNumberSearch = /^\d+$/.test(cleaned);

      // ============================
      // 🔥 SERIAL NUMBER SEARCH (FAST O(1))
      // ============================
      if (isNumberSearch) {
        const voterRef = ref(database, `voters/${cleaned}`);
        const snapshot = await get(voterRef);

        if (snapshot.exists()) {
          return [snapshot.val()];
        } else {
          return [];
        }
      }

      // ============================
      // 🔥 NAME SEARCH USING INDEX
      // ============================
      const upperName = cleaned.toUpperCase();

      const indexRef = ref(database, `indexes/${upperName}`);
      const indexSnap = await get(indexRef);

      if (!indexSnap.exists()) {
        return [];
      }

      const voterId = indexSnap.val();

      const voterRef = ref(database, `voters/${voterId}`);
      const voterSnap = await get(voterRef);

      if (voterSnap.exists()) {
        return [voterSnap.val()];
      }

      return [];
    } catch (err) {
      console.error("Search Error:", err);
      setError("Something went wrong while searching.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    searchVoter,
    loading,
    error,
  };
};
