import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  isConfigured,
  verifyPassword,
  sessionToken,
  verifySessionToken,
} from './admin-credentials.ts';

const PW = 'a-strong-test-password-9f3b';

describe('admin credentials: no default password', () => {
  test('is not configured when the secret is missing or blank', () => {
    assert.equal(isConfigured(undefined), false);
    assert.equal(isConfigured(''), false);
    assert.equal(isConfigured(PW), true);
  });

  // The regression this is really here for: the old code read
  // `process.env.ADMIN_PASSWORD || 'lootix-admin'`, so an unconfigured
  // deployment accepted a password that is published in the git history.
  test('rejects the old hardcoded fallback when nothing is configured', () => {
    assert.equal(verifyPassword(undefined, 'lootix-admin'), false);
    assert.equal(verifyPassword('', 'lootix-admin'), false);
  });

  test('rejects the old hardcoded fallback even when a real password is set', () => {
    assert.equal(verifyPassword(PW, 'lootix-admin'), false);
  });

  test('accepts nothing at all when unconfigured', () => {
    for (const attempt of ['', 'admin', 'lootix-admin', PW, 'undefined', 'null']) {
      assert.equal(verifyPassword(undefined, attempt), false, `accepted "${attempt}"`);
    }
  });
});

describe('admin credentials: password check', () => {
  test('accepts the configured password', () => {
    assert.equal(verifyPassword(PW, PW), true);
  });

  test('rejects a wrong password, including prefixes and empty input', () => {
    assert.equal(verifyPassword(PW, 'wrong'), false);
    assert.equal(verifyPassword(PW, PW.slice(0, -1)), false);
    assert.equal(verifyPassword(PW, PW + 'x'), false);
    assert.equal(verifyPassword(PW, ''), false);
  });

  test('is case sensitive', () => {
    assert.equal(verifyPassword(PW, PW.toUpperCase()), false);
  });
});

describe('admin credentials: session cookie is not the password', () => {
  test('the cookie value never equals or contains the password', () => {
    const token = sessionToken(PW);
    assert.notEqual(token, PW);
    assert.equal(token.includes(PW), false);
    assert.match(token, /^[0-9a-f]{64}$/);
  });

  test('is empty and unverifiable when unconfigured', () => {
    assert.equal(sessionToken(undefined), '');
    assert.equal(verifySessionToken(undefined, ''), false);
    assert.equal(verifySessionToken(undefined, sessionToken(PW)), false);
  });

  test('accepts its own token and rejects others', () => {
    assert.equal(verifySessionToken(PW, sessionToken(PW)), true);
    assert.equal(verifySessionToken(PW, sessionToken('a-different-password')), false);
    assert.equal(verifySessionToken(PW, PW), false, 'the raw password must not pass as a token');
    assert.equal(verifySessionToken(PW, undefined), false);
  });

  test('rotating the password invalidates the old session token', () => {
    const before = sessionToken(PW);
    const after = sessionToken(PW + '-rotated');
    assert.notEqual(before, after);
    assert.equal(verifySessionToken(PW + '-rotated', before), false);
  });

  test('is deterministic for the same password', () => {
    assert.equal(sessionToken(PW), sessionToken(PW));
  });
});
