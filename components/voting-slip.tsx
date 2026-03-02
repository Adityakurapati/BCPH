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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

      {/* ================= TOP SECTION ================= */}
      <div className="bg-white p-8 border-b-4 border-yellow-100">

        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {voter.name.toUpperCase()}
          </h1>
          <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent mt-2"></div>
        </div>

        <div className="space-y-3 text-sm text-gray-800">
          <p>
            <span className="font-bold">Place Of Voting:</span> {voter.place_of_voting}
          </p>

          <p>
            <span className="font-bold">Address:</span> {voter.address}
          </p>
        </div>

        {/* Candidate + Ballot */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">

          <div className="text-center">
            <p className="text-blue-600 text-lg font-bold">
              {FIXED_CANDIDATE_NAME}
            </p>
            <p className="text-red-600 font-bold text-lg">
              First / Best Preference
            </p>
          </div>

          <div className="w-32 h-32 rounded-full border-4 border-blue-600 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-red-600">
              {FIXED_BALLOT_NUMBER}
            </span>
            <span className="text-xs font-bold text-blue-600 mt-1">
              BALLOT NUMBER
            </span>
          </div>
        </div>

        {/* SR NO */}
        <div className="mt-6 text-center">
          <p className="text-lg font-bold text-blue-600">
            SR. NO : {voter.sr_no}
          </p>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <button
            onClick={() =>
              shareSlip(voter, FIXED_CANDIDATE_NAME, FIXED_BALLOT_NUMBER, ORGANIZATION)
            }
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
          >
            Share on WhatsApp
          </button>

          <button
            onClick={() =>
              shareSlip(voter, FIXED_CANDIDATE_NAME, FIXED_BALLOT_NUMBER, ORGANIZATION)
            }
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Share
          </button>

          <button
            onClick={() =>
              downloadSlip(voter, FIXED_CANDIDATE_NAME, FIXED_BALLOT_NUMBER)
            }
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-black transition"
          >
            Download Slip
          </button>

        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="bg-yellow-100 px-8 py-6 text-center">
        <p className="text-lg text-gray-700">
          Please vote for{" "}
          <span className="font-bold text-blue-600">
            {FIXED_CANDIDATE_NAME}
          </span>{" "}
          (Ballot No.{" "}
          <span className="font-bold text-red-600">
            {FIXED_BALLOT_NUMBER}
          </span>
          )
          <br />
          as <span className="font-bold text-red-600">
            First / Best Preference
          </span>{" "}
          in {ORGANIZATION}
        </p>
      </div>
    </div>
  );
}
