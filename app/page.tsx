'use client';

import { useState, FormEvent } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { useVoterSearch, Voter } from '@/hooks/use-voter-search';
import { VotingSlipModal } from '@/components/voting-slip-modal';
import { VoterResults } from '@/components/voter-results';
import { CampaignHero } from '@/components/campaign-hero';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Voter[] | null>(null);
  const [showResults, setShowResults] = useState(false);

  const { searchVoter, loading, error } = useVoterSearch();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const results = await searchVoter(searchTerm);

    if (results) {
      setSearchResults(results);

      if (results.length === 1) {
        setSelectedVoter(results[0]);
        setIsModalOpen(true);
      } else if (results.length > 1) {
        setShowResults(true);
      }
    }
  };

  const handleSelectVoter = (voter: Voter) => {
    setSelectedVoter(voter);
    setShowResults(false);
    setIsModalOpen(true);
  };

  return (
    <main className="h-screen flex flex-col bg-background">

      {/* 🔵 TOP HALF - Campaign Details */}
      <div className="flex-1 flex items-center justify-center border-b border-border px-6">
        <div className="max-w-3xl w-full text-center">
          <CampaignHero />
        </div>
      </div>

      {/* 🟢 BOTTOM HALF - Search Section */}
      <div className="flex-1 flex items-center justify-center bg-muted px-6">
        <div className="w-full max-w-xl">

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Voting Slip Finder
            </h2>
            <p className="text-sm text-muted-foreground">
              Search by name or serial number
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />

            <input
              type="text"
              placeholder="Enter voter name or serial number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
              className="w-full pl-12 pr-12 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading || !searchTerm.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-1" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

        </div>
      </div>

      {/* Multiple Results Modal */}
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

      {/* Voting Slip Modal */}
      <VotingSlipModal
        voter={selectedVoter}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSearchTerm('');
          setSelectedVoter(null);
          setSearchResults(null);
          setShowResults(false);
        }}
      />

    </main>
  );
}
