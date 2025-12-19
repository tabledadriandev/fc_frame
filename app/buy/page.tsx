/**
 * Buy $TABLEDADRIAN Landing Page
 * Shown when frame is opened in a regular browser
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy $TABLEDADRIAN | Table d\'Adrian',
  description: 'Trade $TABLEDADRIAN token on Base chain via Clanker',
};

const TOKEN_CONTRACT = '0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07';
const CLANKER_URL = 'https://www.clanker.world/clanker/0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07';
const BASESCAN_URL = `https://basescan.org/token/${TOKEN_CONTRACT}`;

export default function BuyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6B8E23] via-[#4682B4] to-[#E07A5F] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🧬 $TABLEDADRIAN
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Table d'Adrian Token
          </p>
          <p className="text-lg text-gray-600">
            Base Chain
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Token Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Name:</span>
              <span className="font-mono font-semibold text-gray-900">$TABLEDADRIAN</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Chain:</span>
              <span className="font-semibold text-gray-900">Base</span>
            </div>
            <div className="flex justify-between items-center break-all">
              <span className="text-gray-600">Contract:</span>
              <span className="font-mono text-sm text-gray-900">{TOKEN_CONTRACT}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href={CLANKER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-[#6B8E23] to-[#4682B4] hover:from-[#5a7a1d] hover:to-[#3a6a9a] text-white font-bold text-xl py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-center"
          >
            Trade on Clanker
          </a>
          
          <p className="text-sm text-gray-600 text-center">
            You'll be redirected to Clanker, a trading interface for Base tokens.
          </p>

          <a
            href={BASESCAN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-[#4682B4] hover:text-[#3a6a9a] font-semibold py-3 px-6 rounded-lg border-2 border-[#4682B4] hover:border-[#3a6a9a] transition-colors duration-200"
          >
            View contract on BaseScan
          </a>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col gap-2">
          <p className="text-center text-gray-600 text-sm">
            <a 
              href="/api/frame" 
              className="text-[#4682B4] hover:underline"
            >
              ← Back to Longevity Score Calculator
            </a>
          </p>
          <p className="text-center text-gray-600 text-sm">
            <a 
              href="/dashboard" 
              className="text-[#4682B4] hover:underline"
            >
              View Dashboard
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
