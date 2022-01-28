import {
  fPrivateKey,
  fSignedTx,
  fSignedTxEIP1559,
  fTransactionRequest,
  fTransactionRequestEIP1559
} from '@fixtures';

import { Signer } from './signer';

describe('Signer', () => {
  it('signs transaction correctly', () => {
    return expect(new Signer(fPrivateKey).signTransaction(fTransactionRequest)).resolves.toBe(
      fSignedTx
    );
  });

  it('signs EIP 1559 transaction correctly', () => {
    return expect(
      new Signer(fPrivateKey).signTransaction(fTransactionRequestEIP1559)
    ).resolves.toBe(fSignedTxEIP1559);
  });
});
