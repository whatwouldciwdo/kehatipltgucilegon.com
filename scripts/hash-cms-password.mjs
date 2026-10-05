import { randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error('Gunakan: npm run cms:hash-password -- "kata-sandi-minimal-12-karakter"');
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = await promisify(scrypt)(password, salt, 64);
console.log(`${salt}:${hash.toString('hex')}`);