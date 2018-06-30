/**
 * Configuration Object for Database Projection.
 */
export interface ProjectionField {

  /** Origin Table */
  origin: string;
  field: string;

  projectOntoField: string;

}