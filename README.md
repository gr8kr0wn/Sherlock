# SolSherlock

A Solana wallet relationship detective. Paste a public address or connect Phantom to inspect recent public activity. Wallet connection only reads the public address; this app never requests signatures or transaction approvals.

## Run locally

1. Copy `.env.example` to `.env.local`.
2. Optional: add a Helius API key for a more reliable RPC endpoint. Without it, the app uses Solana's public mainnet RPC.
3. Run `npm install`, then `npm run dev` and open http://localhost:3000.

The current first slice fetches at most 100 recent signatures. The report labels those as scanned history; wallet twins, indexed common connections, early project timing, and durable share pages need a history indexer and storage before their findings can be presented as verified.
