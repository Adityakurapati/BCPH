'use client';

import { useState, FormEvent } from 'react';
import {
  Search,
  Loader2,
  AlertCircle,
  X,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';

import { useVoterSearch, Voter } from '@/hooks/use-voter-search';
import { VotingSlip } from '@/components/voting-slip';
import { VoterResults } from '@/components/voter-results';
import Image from 'next/image';

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


          <input
            type="text"
            placeholder="Enter name or serial number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
            className="w-full pl-4 pr-24 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary text-white rounded-lg"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
             <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
             </div>
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

      {selectedVoter && (
  <div className="fixed top-0 min-h-screen min-w-screen z-50 flex items-center justify-center bg-blue-900/80 backdrop-blur-sm px-4">

    {/* Modal Container */}
    <div className="relative w-full max-w-4xl">

      {/* Close Button (keep existing style) */}
      <button
        onClick={handleCloseSlip}
        className="absolute -top-5 right-0 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 z-10"
      >
        <X className="w-5 h-5 text-gray-700" />
      </button>

      {/* Voting Slip */}
      <VotingSlip voter={selectedVoter} />

    </div>
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

      {/* 🔹 CAMPAIGN HERO SECTION */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* 🔹 Image + Name + Ballot */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            {/* Photo */}
            <div className="relative w-34 h-34 rounded-lg overflow-hidden border-2 border-yellow-400 shadow-lg">
              <Image
                src="/priya_lehga.jpeg"
                alt="Vaibhav Jain"
                fill
                className="object-auto"
              />

            </div>

            <div>
              <h1 className="text-2xl font-bold">PRIYA LEGHA</h1>
              <p className="text-sm text-gray-600">Advocate</p>
              <p className="text-sm font-semibold">
                Member – Bar Council Punjab & Haryana
              </p>
            </div>
          </div>

          {/* RIGHT SIDE BALLOT BOX */}
          <div className="bg-primary text-white rounded-lg px-6 py-4 text-center">
            <p className="text-sm">1st / Best Preference</p>
            <p className="text-xl font-bold">Ballot No. 137</p>
          </div>
        </div>

        {/* 🔹 Vote / Support / Elect TEXT ONLY */}
        <div className="flex justify-center gap-8 text-sm font-semibold text-gray-700">
          <span>Vote</span>
          <span>Support</span>
          <span>Elect</span>
        </div>

        {/* 🔹 Contact Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

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

        {/* 🔹 Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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
