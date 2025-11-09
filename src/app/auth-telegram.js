// src/app/auth-telegram.js
import crypto from 'node:crypto';

// ✅ Telegram WebApp data validation (exactly per spec)
export function verifyTelegramInitData(initData, botToken) {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) return false;

    // Формируем data_check_string
    const pairs = [];
    for (const [key, value] of params.entries()) {
      if (key !== 'hash') pairs.push(`${key}=${value}`);
    }
    pairs.sort();
    const dataCheckString = pairs.join('\n');

    // ✅ secret = HMAC_SHA256("WebAppData", botToken)
    const secret = crypto.createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // ✅ computed = HMAC_SHA256(secret, data_check_string)
    const computed = crypto.createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex');

    return computed === hash;
  } catch {
    return false;
  }
}