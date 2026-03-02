'use client';

import { Voter } from '@/hooks/use-voter-search';

interface VotingSlipProps {
  voter: Voter;
}

const FIXED_CANDIDATE_NAME = "PRIYA LEGHA";
const FIXED_BALLOT_NUMBER = "137";
const ORGANIZATION = "BCPH";

export function VotingSlip({ voter }: VotingSlipProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Top Section - Candidate Details */}
      <div className="bg-white p-8 border-b-4 border-yellow-100">
        <div className="grid grid-cols-12 gap-6">
          {/* Center Section - Candidate Info (expanded width without QR/Photo) */}
          <div className="col-span-12">
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-center text-foreground tracking-tight">
                {FIXED_CANDIDATE_NAME}
              </h1>
              <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-2"></div>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-bold text-foreground">Contact:</span>
                <span className="ml-2 text-foreground">{voter.name}</span>
              </div>
              <div>
                <span className="font-bold text-foreground">Address:</span>
                <span className="ml-2 text-foreground block mt-1 leading-relaxed">
                  {voter.place_of_voting}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <div>
                <p className="text-primary text-lg font-bold">{FIXED_CANDIDATE_NAME}</p>
                <p className="text-red-600 font-bold text-lg">First / Best Preference</p>
              </div>

              {/* Ballot Number Circle */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-4 border-primary flex flex-col items-center justify-center bg-white">
                  <span className="text-4xl font-bold text-red-600">{FIXED_BALLOT_NUMBER}</span>
                  <span className="text-xs font-bold text-primary mt-1">BALLOT</span>
                  <span className="text-xs font-bold text-primary">NUMBER</span>
                </div>
              </div>
            </div>

            {/* SR. NO Display */}
            <div className="mt-6 text-center">
              <p className="text-lg font-bold text-primary">SR. NO : {voter.sr_no}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Call to Action */}
      <div className="bg-yellow-100 px-8 py-6 text-center">
        <p className="text-lg text-gray-700">
          Please vote for <span className="font-bold text-primary">{FIXED_CANDIDATE_NAME}</span> (Ballot No.{' '}
          <span className="font-bold text-red-600">{FIXED_BALLOT_NUMBER}</span>)
          <br />
          as <span className="font-bold text-red-600">First / Best Preference</span> in {ORGANIZATION}
        </p>
      </div>
    </div>
  );
}
