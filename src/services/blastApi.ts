import { ApiError, fetchWithTimeout } from './http';

export type BlastProgram = 'blastn' | 'blastp';
export type BlastDatabase = 'nr' | 'nt';
export type BlastStatus = 'WAITING' | 'FAILED' | 'READY' | 'UNKNOWN';

export interface BlastSubmitResponse {
  rid: string;
  raw: string;
}

export interface BlastResultSummary {
  rid: string;
  status: BlastStatus;
  raw: string;
}

export interface BlastResultsPayload {
  rid: string;
  raw: string;
}

const DEFAULT_PROGRAM: BlastProgram = 'blastn';
const DEFAULT_DATABASE: BlastDatabase = 'nr';

function parseRid(payload: string): string {
  const ridMatch = payload.match(/RID\s*=\s*([A-Z0-9_-]+)/i);
  if (!ridMatch?.[1]) {
    throw new ApiError(`Unable to parse RID from BLAST response: ${payload.slice(0, 200)}`);
  }
  return ridMatch[1];
}

function parseStatus(payload: string): BlastStatus {
  const normalized = payload.toUpperCase();
  if (normalized.includes('WAITING')) return 'WAITING';
  if (normalized.includes('READY')) return 'READY';
  if (normalized.includes('FAILED')) return 'FAILED';
  return 'UNKNOWN';
}

/**
 * Submits a BLAST job and returns the RID for polling.
 *
 * @param sequence - Query sequence.
 * @param program - BLAST program, defaults to blastn.
 * @param database - Target database, defaults to nr.
 * @returns RID and raw response.
 */
export async function submitBlast(
  sequence: string,
  program: BlastProgram = DEFAULT_PROGRAM,
  database: BlastDatabase = DEFAULT_DATABASE,
): Promise<BlastSubmitResponse> {
  const trimmedSequence = sequence.trim();
  if (!trimmedSequence) {
    throw new ApiError('sequence is required');
  }

  const url = new URL('https://blast.ncbi.nlm.nih.gov/Blast.cgi');
  url.search = new URLSearchParams({
    CMD: 'Put',
    PROGRAM: program,
    DATABASE: database,
    QUERY: trimmedSequence,
    FORMAT_TYPE: 'JSON2',
  }).toString();

  const response = await fetchWithTimeout(url.toString());
  const raw = await response.text();

  if (!response.ok) {
    throw new ApiError(`HTTP ${response.status} ${response.statusText}`, {
      status: response.status,
      url: url.toString(),
      cause: raw,
    });
  }

  return { rid: parseRid(raw), raw };
}

/**
 * Polls BLAST job status using a RID.
 *
 * @param rid - BLAST request identifier.
 * @returns Current BLAST job status.
 */
export async function checkStatus(rid: string): Promise<BlastResultSummary> {
  const normalizedRid = rid.trim();
  if (!normalizedRid) {
    throw new ApiError('rid is required');
  }

  const url = new URL('https://blast.ncbi.nlm.nih.gov/Blast.cgi');
  url.search = new URLSearchParams({
    CMD: 'Get',
    RID: normalizedRid,
    FORMAT_TYPE: 'JSON2',
  }).toString();

  const response = await fetchWithTimeout(url.toString());
  const raw = await response.text();

  if (!response.ok) {
    throw new ApiError(`HTTP ${response.status} ${response.statusText}`, {
      status: response.status,
      url: url.toString(),
      cause: raw,
    });
  }

  return { rid: normalizedRid, status: parseStatus(raw), raw };
}

/**
 * Retrieves BLAST results once the RID is ready.
 *
 * @param rid - BLAST request identifier.
 * @returns Raw BLAST results payload.
 */
export async function getResults(rid: string): Promise<BlastResultsPayload> {
  const normalizedRid = rid.trim();
  if (!normalizedRid) {
    throw new ApiError('rid is required');
  }

  const url = new URL('https://blast.ncbi.nlm.nih.gov/Blast.cgi');
  url.search = new URLSearchParams({
    CMD: 'Get',
    RID: normalizedRid,
    FORMAT_TYPE: 'JSON2',
  }).toString();

  const response = await fetchWithTimeout(url.toString());
  const raw = await response.text();

  if (!response.ok) {
    throw new ApiError(`HTTP ${response.status} ${response.statusText}`, {
      status: response.status,
      url: url.toString(),
      cause: raw,
    });
  }

  return { rid: normalizedRid, raw };
}
