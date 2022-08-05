import { Address } from "@graphprotocol/graph-ts";
import { ReputationUpdate, Transfer } from "../../generated/Forecast/Forecast";
import { Forecast, Reputation } from "../../generated/schema";

/**
 * Handle a tranfer event to create or update a forecast.
 */
export function handleTransfer(event: Transfer): void {
  // Find or create
  let forecast = Forecast.load(event.params.tokenId.toString());
  if (!forecast) {
    forecast = new Forecast(event.params.tokenId.toString());
  }
  // Update params
  forecast.owner = event.params.to.toHexString();
  if (event.params.from.equals(Address.zero())) {
    forecast.author = event.params.to.toHexString();
  }
  forecast.save();
}

/**
 * Handle a reputation update event to create or update a reputation.
 */
export function handleReputationUpdate(event: ReputationUpdate): void {
  // Find or create
  let reputation = Reputation.load(event.params.account.toHexString());
  if (!reputation) {
    reputation = new Reputation(event.params.account.toHexString());
    reputation.owner = event.params.account.toHexString();
  }
  // Update reputation
  reputation.positive = event.params.positiveReputation;
  reputation.negative = event.params.negativeReputation;
  reputation.save();
}
