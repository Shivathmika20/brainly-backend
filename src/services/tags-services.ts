
import { Tags } from "../db";
import { Types } from "mongoose";

/**
 * Ensures that each tag in the list exists in DB.
 * If not, creates it and returns array of tag ObjectIds.
 */
export const ensureTagsExist = async (tagTitles: string[]): Promise<Types.ObjectId[]> => {
  const tagIds: Types.ObjectId[] = [];
  
  if (!tagTitles || tagTitles.length === 0) {
    return tagIds;
  }
  
  for (const title of tagTitles) {
    let tag = await Tags.findOne({ title });
    
    if (!tag) {
      tag = await Tags.create({ title });
    }
    tagIds.push(tag._id); // Return ObjectId directly, not string
  }
  
  return tagIds;
};
