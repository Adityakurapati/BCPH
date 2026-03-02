'use client';

import { useState, FormEvent } from 'react';
import {
  Search,
  Loader2,
  AlertCircle,
  X,
  CheckCircle2,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';

import { useVoterSearch, Voter } from '@/hooks/use-voter-search';
import { VotingSlip } from '@/components/voting-slip';
import { VoterResults } from '@/components/voter-results';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);
  const [searchResults, setSearchResults] = useState<Voter[] | null>(null);
  const [showResults, setShowResults] = useState(false);

  const { searchVoter, loading, error } = useVoterSearch();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const results = await searchVoter(searchTerm);
    if (!results) return;

    setSearchResults(results);

    if (results.length === 1) {
      setSelectedVoter(results[0]);
      setShowResults(false);
    } else if (results.length > 1) {
      setShowResults(true);
      setSelectedVoter(null);
    }
  };

  const handleSelectVoter = (voter: Voter) => {
    setSelectedVoter(voter);
    setShowResults(false);
  };

  const handleCloseSlip = () => {
    setSelectedVoter(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-4 space-y-6">

{/* 🔹 SEARCH SECTION */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">

        <h2 className="text-lg font-semibold text-center mb-4">
          Voting Slip Finder
        </h2>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Enter name or serial number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
            className="w-full pl-12 pr-24 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary text-white rounded-lg"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-3 flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}
      </div>

      {/* 🔹 VOTING SLIP */}
      {selectedVoter && (
        <div className="w-full max-w-4xl relative">
          <button
            onClick={handleCloseSlip}
            className="absolute -top-4 right-0 bg-white shadow rounded-full p-2 hover:bg-gray-100 z-10"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <VotingSlip voter={selectedVoter} />
        </div>
      )}

      {/* 🔹 MULTIPLE RESULTS MODAL */}
      {showResults && searchResults && (
        <VoterResults
          voters={searchResults}
          onSelectVoter={handleSelectVoter}
          onClose={() => {
            setShowResults(false);
            setSearchResults(null);
            setSearchTerm('');
          }}
        />
      )}
      {/* 🔹 CAMPAIGN HERO (Now inside page.tsx) */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 space-y-5">

        <div className="text-center">
          <h1 className="text-2xl font-bold">PRIYA LEGHA</h1>
          <p className="text-sm text-gray-600">Advocate</p>
          <p className="text-sm font-semibold">
            Member – Bar Council Punjab & Haryana
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          {['Vote', 'Support', 'Elect'].map((item) => (
            <div key={item} className="border rounded-lg py-3">
              <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-green-600" />
              <span className="text-sm font-semibold">{item}</span>
            </div>
          ))}
        </div>

        <div className="text-center bg-primary text-white rounded-lg py-3">
          <p className="text-sm">1st / Best Preference</p>
          <p className="text-xl font-bold">Ballot No. 137</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div className="flex gap-3 border rounded-lg p-3">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-semibold">Chamber 306</p>
              <p>District & Session Courts, Bhiwani</p>
            </div>
          </div>

          <div className="flex gap-3 border rounded-lg p-3">
            <Phone className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-semibold">Contact</p>
              <p>90344-44612</p>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex gap-2 border rounded-lg p-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold">17 March</p>
              <p>High Court</p>
            </div>
          </div>

          <div className="flex gap-2 border rounded-lg p-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold">18 March</p>
              <p>District Courts</p>
            </div>
          </div>
        </div>
      </div>

      

    </main>
  );
}
