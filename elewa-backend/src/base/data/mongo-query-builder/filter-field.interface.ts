/**
 * Configuration Object for Database Result Filtering - Match.
 */
export interface FilterField {
  /** Origin Table */
  origin?: string;
  field: string;

  value: any;
}
