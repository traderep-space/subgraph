import { Forecast } from "../../generated/schema";
import { Transfer } from "../../generated/Forecast/Forecast";

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
  forecast.save();
}
