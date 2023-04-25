const crypto = require('crypto');

const { TOKEN_KEY } = process.env;
const algorithm = 'aes256'; //'E522T3DC4D'
const key = crypto.scryptSync(TOKEN_KEY, 'salt', 32);

const encrypt = clearText => {
  const iv = crypto.randomBytes(16);
  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(clearText, 'utf8', 'hex');
    return [encrypted + cipher.final('hex'), Buffer.from(iv).toString('hex')].join('|');
  } catch (error) {
    return error;
  }
};
const decrypt = encryptedText => {
  try {
    const [encrypted, iv] = encryptedText.split('|');
    if (!iv) throw new Error('IV not found');
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  } catch (error) {
    return error;
  }
};

module.exports = { encrypt, decrypt };
