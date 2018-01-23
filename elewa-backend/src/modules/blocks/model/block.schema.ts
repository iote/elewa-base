import { Schema } from 'mongoose';

/**
 * Basis of a dynamic page. Dynamic pages can consist of multiple blocks.
 * Each of these blocks can be of the base type or a subtype, adding more rendering options
 */
export const Block = new Schema
({
   /** Id of the resource the block points to. Very important when it comes to page load. */
  _resourceId: String,

  /** Possible block sizes. 
   * 
   * The enum-name represents how much space (of its container) this block will take.  
   * The enum-value reflects the technical s-value this block will have assigned. 
   * s-values reflect a value of the material-grid */
  size: {
    type: String,
    enum: ['Fourth', 'Third', 'Half', 'Full']
  },

  /** Block render order, relative to the parent block. Used for orderby when loading resource pages. */
  order: Number,

  type: {
    type: String,
    enum: ['StructuralBlock', 'ContentCard', 'TabbedBlock', 'RegularBlock']
  }
}) 

export const blockSizes = { // Rank from small to big
  Fourth: 3,
  Third: 4,
  Half: 6,
  Full: 12
}
