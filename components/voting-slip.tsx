'use client';

import { Voter } from '@/hooks/use-voter-search';
import { shareSlip, downloadSlip } from '@/utils/slipActions';

interface VotingSlipProps {
  voter: Voter;
}

const FIXED_CANDIDATE_NAME = "PRIYA LEGHA";
const FIXED_BALLOT_NUMBER = "137";
const ORGANIZATION = "BCPH";

export function VotingSlip({ voter }: VotingSlipProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg border overflow-hidden">

      {/* ================= TOP STRIP ================= */}
      <div className="flex justify-between items-start px-6 py-4 border-b">

        {/* LEFT SIDE – Voter Info */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-700">
            SR. NO: {voter.sr_no}
          </p>

          <h2 className="text-xl font-bold tracking-wide">
            {voter.name.toUpperCase()}
          </h2>

          <p className="text-sm">
            <span className="font-semibold">Place Of Voting:</span>{" "}
            {voter.place_of_voting}
          </p>

          <p className="text-sm">
            <span className="font-semibold">Address:</span>{" "}
            {voter.address}
          </p>
        </div>

        {/* RIGHT SIDE – Candidate + Ballot */}
        <div className="text-center flex flex-col items-center gap-3">

          <div>
            <p className="text-blue-700 font-bold text-lg">
              {FIXED_CANDIDATE_NAME}
            </p>
            <p className="text-red-600 font-semibold text-sm">
              First / Best Preference
            </p>
          </div>

          <div className="w-24 h-24 rounded-full border-4 border-blue-700 flex items-center justify-center">
            <span className="text-3xl font-bold text-red-600">
              {FIXED_BALLOT_NUMBER}
            </span>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM YELLOW STRIP ================= */}
      <div className="bg-yellow-100 px-6 py-4 text-center">
        <p className="text-base text-gray-800">
          Please vote for{" "}
          <span className="font-bold text-blue-700">
            {FIXED_CANDIDATE_NAME}
          </span>{" "}
          (Ballot No.{" "}
          <span className="font-bold text-red-600">
            {FIXED_BALLOT_NUMBER}
          </span>
          ) as{" "}
          <span className="font-bold text-red-600">
            First / Best Preference
          </span>{" "}
          in {ORGANIZATION}
        </p>
      </div>
    </div>
  );
}