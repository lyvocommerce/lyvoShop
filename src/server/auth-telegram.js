// server/auth-telegram.js
import crypto from 'node:crypto';

export function verifyTelegramInitData(initData, botToken) {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) return false;

    const data = [];
    for (const [key, value] of params.entries()) {
      if (key !== 'hash') data.push(`${key}=${value}`);
    }
    data.sort();
    const dataCheckString = data.join('\n');

    // secret = HMAC_SHA256("WebAppData", botToken)
    const secret = crypto.createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const computed = crypto.createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex');

    return computed === hash;
  } catch {
    return false;
  }
}