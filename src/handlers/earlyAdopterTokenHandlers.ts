import { Transfer } from "../../generated/EarlyAdopterToken/EarlyAdopterToken";
import { EarlyAdopterToken } from "../../generated/schema";
import { getTrader } from "../utils";

/**
 * Handle a tranfer event to create or update a early adopter token
 */
export function handleTransfer(event: Transfer): void {
  // Get trader
  let trader = getTrader(event.params.to.toHexString());
  // Find or create early adopter token
  let token = EarlyAdopterToken.load(event.params.tokenId.toString());
  if (!token) {
    token = new EarlyAdopterToken(event.params.tokenId.toString());
  }
  // Update forecat params
  token.owner = trader.id;
  token.save();
}
