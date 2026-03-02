'use client';

import { X } from 'lucide-react';
import { VotingSlip } from './voting-slip';
import { Voter } from '@/hooks/use-voter-search';

interface VotingSlipModalProps {
  voter: Voter | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VotingSlipModal({ voter, isOpen, onClose }: VotingSlipModalProps) {
  if (!isOpen || !voter) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-4">
          <VotingSlip voter={voter} />
        </div>
      </div>
    </div>
  );
}
