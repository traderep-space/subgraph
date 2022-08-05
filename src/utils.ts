import { BigInt } from "@graphprotocol/graph-ts";
import { Trader } from "../generated/schema";

/**
 * Load trader, create if not exist.
 */
export function getTrader(id: string): Trader {
  let trader = Trader.load(id);
  if (!trader) {
    trader = new Trader(id);
    trader.positiveReputation = BigInt.zero();
    trader.negativeReputation = BigInt.zero();
    trader.save();
  }
  return trader;
}
