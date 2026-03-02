'use client';

import { Voter } from '@/hooks/use-voter-search';
import { shareSlip, downloadSlip } from '@/utils/slipActions';
import { Share2, Download, MessageCircle } from 'lucide-react';

interface VotingSlipProps {
  voter: Voter;
}

const FIXED_CANDIDATE_NAME = "PRIYA LEGHA";
const FIXED_BALLOT_NUMBER = "137";
const ORGANIZATION = "BCPH";

export function VotingSlip({ voter }: VotingSlipProps) {

  const handleWhatsAppShare = () => {
    shareSlip(
      voter,
      FIXED_CANDIDATE_NAME,
      FIXED_BALLOT_NUMBER,
      ORGANIZATION
    );
  };

  const handleShare = () => {
    shareSlip(
      voter,
      FIXED_CANDIDATE_NAME,
      FIXED_BALLOT_NUMBER,
      ORGANIZATION
    );
  };

  const handleDownload = () => {
    downloadSlip(
      voter,
      FIXED_CANDIDATE_NAME,
      FIXED_BALLOT_NUMBER
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">

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

            <div className="w-28 h-28">
  <svg viewBox="0 0 200 200" className="w-full h-full">

    {/* Outer Circle */}
    <circle
      cx="100"
      cy="100"
      r="90"
      stroke="#1e3a8a"
      strokeWidth="6"
      fill="none"
    />

    {/* Inner Circle */}
    <circle
      cx="100"
      cy="100"
      r="70"
      stroke="#1e3a8a"
      strokeWidth="2"
      fill="none"
    />

    {/* Top Arc */}
    <path
      id="topArc"
      d="M 30 100 A 80 80 0 0 1 170 100"
      fill="none"
    />

    <text
      fontSize="16"
      fontWeight="bold"
      fill="#1e3a8a"
      letterSpacing="3"
    >
      <textPath href="#topArc" startOffset="50%" textAnchor="middle">
        BALLOT
      </textPath>
    </text>

    {/* Bottom Arc (FIXED direction) */}
    <path
      id="bottomArc"
      d="M 30 100 A 80 80 0 0 0 170 100"
      fill="none"
    />

    <text
      fontSize="16"
      fontWeight="bold"
      fill="#1e3a8a"
      letterSpacing="3"
    >
      <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
        NUMBER
      </textPath>
    </text>

    {/* Center Number */}
    <text
      x="100"
      y="115"
      textAnchor="middle"
      fontSize="50"
      fontWeight="bold"
      fill="#dc2626"
    >
      {FIXED_BALLOT_NUMBER}
    </text>

  </svg>
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
     
      <div className="flex justify-center gap-10 mt-6">

  {/* WhatsApp */}
  <div className="flex flex-col items-center gap-1">
    <button
      onClick={handleWhatsAppShare}
      className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-md transition transform hover:scale-105"
    >
      <MessageCircle size={22} />
    </button>
    <span className="text-xs font-medium text-white">
      WhatsApp
    </span>
  </div>

  {/* Share */}
  <div className="flex flex-col items-center gap-1">
    <button
      onClick={handleShare}
      className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition transform hover:scale-105"
    >
      <Share2 size={22} />
    </button>
    <span className="text-xs font-medium text-white">
      Share
    </span>
  </div>

  {/* Download */}
  <div className="flex flex-col items-center gap-1">
    <button
      onClick={handleDownload}
      className="w-14 h-14 rounded-full bg-gray-800 hover:bg-black text-white flex items-center justify-center shadow-md transition transform hover:scale-105"
    >
      <Download size={22} />
    </button>
    <span className="text-xs font-medium text-white">
      Download
    </span>
  </div>

</div>


    </div>
  );
}
