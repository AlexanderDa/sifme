import {BcryptHasher} from '../../services';
import {expect} from '@loopback/testlab';

const DECRYPTED = 'my message';

describe('Bcrypt', () => {
  it('Encrypt and compare', async () => {
    const bcrypt: BcryptHasher = new BcryptHasher(Math.random());
    const encrypted = await bcrypt.encrypt(DECRYPTED);
    const compared = await bcrypt.compare(DECRYPTED, encrypted);
    expect(compared).true();
  });
});
