import { ApiError, fetchWithTimeout, readJson } from './http';

export interface UniProtProteinInfo {
  primaryAccession?: string;
  uniProtkbId?: string;
  proteinDescription?: {
    recommendedName?: {
      fullName?: { value?: string };
    };
  };
  organism?: {
    scientificName?: string;
    commonName?: string;
  };
  sequence?: {
    value?: string;
    length?: number;
  };
  genes?: Array<{ geneName?: { value?: string } }>;
}

/**
 * Fetches UniProt protein metadata for an accession.
 *
 * @param accession - UniProt accession ID.
 * @returns Parsed UniProt protein metadata.
 */
export async function getProteinInfo(accession: string): Promise<UniProtProteinInfo> {
  const normalizedAccession = accession.trim().toUpperCase();
  if (!normalizedAccession) {
    throw new ApiError('accession is required');
  }

  const url = `https://rest.uniprot.org/uniprotkb/${encodeURIComponent(normalizedAccession)}?format=json`;
  const response = await fetchWithTimeout(url);
  return readJson<UniProtProteinInfo>(response, url);
}
