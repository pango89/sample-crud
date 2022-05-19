import * as crypto from 'crypto';

const getHash = (plainString: string): string => {
  return crypto.createHash('sha256').update(plainString).digest('base64');
};

export { getHash };
