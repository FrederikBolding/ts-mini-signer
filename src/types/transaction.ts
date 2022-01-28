export interface BaseTransaction {
  readonly to?: string;
  readonly value: bigint | string;
  readonly gasLimit: bigint | string;
  readonly data: string;
  readonly nonce: bigint | number | string;
  readonly chainId: number;
  readonly from?: string;
}

export interface LegacyTransaction extends BaseTransaction {
  readonly gasPrice: bigint | string;
  readonly type?: 0;
}

export interface Type2Transaction extends BaseTransaction {
  readonly maxFeePerGas: bigint | string;
  readonly maxPriorityFeePerGas: bigint | string;
  readonly accessList?: []; // @todo
  readonly type: 2;
}

export type Transaction = LegacyTransaction | Type2Transaction;
