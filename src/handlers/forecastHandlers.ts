import { Address } from "@graphprotocol/graph-ts";
import {
  ReputationUpdate,
  Transfer,
  URISet,
} from "../../generated/Forecast/Forecast";
import { Forecast } from "../../generated/schema";
import { getTrader } from "../utils";

/**
 * Handle a tranfer event to create or update a forecast.
 */
export function handleTransfer(event: Transfer): void {
  // Get trader
  let trader = getTrader(event.params.to.toHexString());
  // Find or create forecast
  let forecast = Forecast.load(event.params.tokenId.toString());
  if (!forecast) {
    forecast = new Forecast(event.params.tokenId.toString());
  }
  // Update forecat params
  forecast.owner = trader.id;
  if (event.params.from.equals(Address.zero())) {
    forecast.author = trader.id;
  }
  forecast.save();
}

/**
 * Handle a uri set event to update a forecast.
 */
export function handleURISet(event: URISet): void {
  // Find forecast or return
  let forecast = Forecast.load(event.params.tokenId.toString());
  if (!forecast) {
    return;
  }
  // Update forecast params
  forecast.uri = event.params.tokenURI;
  forecast.save();
}

/**
 * Handle a reputation update event to create or update a trader.
 */
export function handleReputationUpdate(event: ReputationUpdate): void {
  // Get trader
  let trader = getTrader(event.params.account.toHexString());
  // Update params
  trader.positiveReputation = event.params.positiveReputation;
  trader.negativeReputation = event.params.negativeReputation;
  trader.save();
}
