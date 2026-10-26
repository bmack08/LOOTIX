// Test-only: the real Stripe SDK, but every request goes through
// globalThis.fetch (which the test replaces with a mock). No network.
import Real from 'stripe';

export default function Stripe(key, config = {}) {
  return new Real(key, {
    ...config,
    maxNetworkRetries: 0,
    httpClient: Real.createFetchHttpClient((...args) => globalThis.fetch(...args)),
  });
}
Object.setPrototypeOf(Stripe, Real);