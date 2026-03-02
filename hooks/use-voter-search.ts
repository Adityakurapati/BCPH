import { useState, useCallback } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/lib/firebase';

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

  const searchVoter = useCallback(async (searchQuery: string): Promise<Voter[] | null> => {
    setLoading(true);
    setError(null);

    try {
      const query = searchQuery.trim();
      if (!query) {
        setError('Please enter a search term');
        setLoading(false);
        return null;
      }

      // Try to parse as sr_no (number)
      const srNoMatch = parseInt(query, 10);
      let srNos: number[] = [];

      if (!isNaN(srNoMatch)) {
        // Direct sr_no search
        srNos = [srNoMatch];
      } else {
        // Name search - use indexes
        const indexesRef = ref(database, 'indexes');
        const indexSnapshot = await get(indexesRef);

        if (!indexSnapshot.exists()) {
          setError('No voters database found');
          setLoading(false);
          return null;
        }

        const indexes = indexSnapshot.val();
        const upperQuery = query.toUpperCase();

        // Search for exact match in indexes
        const matchedEntry = Object.entries(indexes).find(
          ([name, _]) => (name as string).toUpperCase() === upperQuery
        );

        if (matchedEntry) {
          const srNoMap = matchedEntry[1] as Record<string, boolean>;
          // Extract all sr_no keys from the matched entry
          srNos = Object.keys(srNoMap).map(key => parseInt(key, 10));
        } else {
          setError('Voter not found');
          setLoading(false);
          return null;
        }
      }

      // Now fetch all voters by sr_nos
      if (srNos.length > 0) {
        const voters: Voter[] = [];
        const votersRef = ref(database, 'voters');
        const votersSnapshot = await get(votersRef);

        if (!votersSnapshot.exists()) {
          setError('Voters database not found');
          setLoading(false);
          return null;
        }

        const allVoters = votersSnapshot.val();

        // Fetch each voter by sr_no
        for (const srNo of srNos) {
          if (allVoters[srNo]) {
            voters.push(allVoters[srNo] as Voter);
          }
        }

        if (voters.length === 0) {
          setError('Voter record not found');
          setLoading(false);
          return null;
        }

        setLoading(false);
        return voters;
      }

      setError('Invalid search query');
      setLoading(false);
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(`Search failed: ${errorMessage}`);
      console.error('[v0] Voter search error:', err);
      setLoading(false);
      return null;
    }
  }, []);

  return { searchVoter, loading, error };
};
