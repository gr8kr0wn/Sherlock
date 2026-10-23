import { NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
export const runtime = 'nodejs';
export async function POST(req: Request) {
 try {
  const body = await req.json(); const address = typeof body.address === 'string' ? body.address.trim() : '';
  if (!address || address.length > 64) return NextResponse.json({error:'Enter a valid Solana wallet address.'},{status:400});
  let key: PublicKey; try { key = new PublicKey(address); } catch { return NextResponse.json({error:'That does not look like a valid Solana address.'},{status:400}); }
  const endpoint = process.env.HELIUS_API_KEY ? `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}` : (process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');
  const connection = new Connection(endpoint,'confirmed'); const signatures = await connection.getSignaturesForAddress(key,{limit:100});
  const dates = signatures.map(x=>x.blockTime).filter((x):x is number=>typeof x==='number');
  const firstSeen = dates.length ? new Date(Math.min(...dates)*1000).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : 'No history';
  return NextResponse.json({address:key.toBase58(),signatures:signatures.length,firstSeen,counterparties:0});
 } catch (error) { console.error('SolSherlock analyze error',error); return NextResponse.json({error:'The public RPC could not complete this scan. Please try again shortly.'},{status:502}); }
}
