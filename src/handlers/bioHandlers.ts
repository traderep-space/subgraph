import { Transfer, URISet } from "../../generated/Bio/Bio";
import { Bio } from "../../generated/schema";
import { getTrader } from "../utils";

/**
 * Handle a tranfer event to create or update a bio.
 */
export function handleTransfer(event: Transfer): void {
  // Get trader
  let trader = getTrader(event.params.to.toHexString());
  // Find or create bio
  let bio = Bio.load(event.params.tokenId.toString());
  if (!bio) {
    bio = new Bio(event.params.tokenId.toString());
  }
  // Update bio params
  bio.owner = trader.id;
  bio.save();
}

/**
 * Handle a uri set event to update a bio.
 */
export function handleURISet(event: URISet): void {
  // Find forecast or return
  let bio = Bio.load(event.params.tokenId.toString());
  if (!bio) {
    return;
  }
  // Update uri params
  bio.uri = event.params.tokenURI;
  bio.save();
}
