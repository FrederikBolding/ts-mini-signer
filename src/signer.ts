import { keccak256 } from 'ethereum-cryptography/keccak';
import { sign, Signature } from 'ethereum-cryptography/secp256k1';
import { bytesToHex } from 'ethereum-cryptography/utils';
import RLP from 'rlp';

import type { LegacyTransaction, Sig, Transaction, Type2Transaction } from './types';
import { addHexPrefix, stripHexPrefix } from './utils';

export class Signer {
  constructor(private readonly privateKey: string) {}

  async signTransaction(tx: Transaction): Promise<string> {
    const encoded = this.serializeTx(tx);

    const sig = await this.sign(encoded);
    const encodedAndSigned = this.serializeTx(tx, sig);
    return addHexPrefix(bytesToHex(encodedAndSigned));
  }

  private serializeTx(tx: Transaction, sig?: Sig): Uint8Array {
    if (tx.type === 2) {
      return this.serializeType2Tx(tx, sig);
    }
    return this.serializeLegacyTx(tx, sig);
  }

  private serializeLegacyTx(tx: LegacyTransaction, sig?: Sig): Uint8Array {
    const txValues = [tx.nonce, tx.gasPrice, tx.gasLimit, tx.to, tx.value, tx.data];
    const v = sig && sig.recovery + (tx.chainId * 2 + 35);
    const sigValues = sig && [v, sig.r, sig.s];

    const values = sigValues ? [...txValues, ...sigValues] : [...txValues, tx.chainId, 0, 0];

    return RLP.encode(values);
  }

  private serializeType2Tx(tx: Type2Transaction, sig?: Sig): Uint8Array {
    const txValues = [
      tx.chainId,
      tx.nonce,
      tx.maxPriorityFeePerGas,
      tx.maxFeePerGas,
      tx.gasLimit,
      tx.to,
      tx.value,
      tx.data,
      tx.accessList ?? []
    ];
    const sigValues = sig && [sig.recovery, sig.r, sig.s];

    const values = sigValues ? [...txValues, ...sigValues] : txValues;

    return new Uint8Array([2, ...RLP.encode(values)]);
  }

  private async sign(msg: Uint8Array): Promise<Sig> {
    const hashed = bytesToHex(keccak256(msg));
    const [sig, recovery] = await sign(hashed, stripHexPrefix(this.privateKey), {
      recovered: true
    });
    const signature = Signature.fromHex(sig);
    return { recovery, r: signature.r, s: signature.s };
  }
}
