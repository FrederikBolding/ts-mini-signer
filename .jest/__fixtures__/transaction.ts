export const fTransactionRequest = {
  nonce: 6,
  gasPrice: '0x012a05f200',
  gasLimit: '0x5208',
  to: '0xb2bb2b958AFa2e96dab3f3Ce7162b87daEa39017',
  value: '0x2386f26fc10000',
  data: '0x',
  chainId: 3
};

export const fTransactionRequestEIP1559 = {
  nonce: 6,
  maxFeePerGas: '0x4a817c800',
  maxPriorityFeePerGas: '0x3b9aca00',
  gasLimit: '0x5208',
  to: '0xB2BB2b958aFA2e96dAb3F3Ce7162B87dAea39017',
  value: '0x2386f26fc10000',
  data: '0x',
  chainId: 3,
  type: 2 as 2
};

export const fSignedTx =
  '0xf86b0685012a05f20082520894b2bb2b958afa2e96dab3f3ce7162b87daea39017872386f26fc100008029a075b96c4423ea79037099e0f8a0fa7d8538f00c6aaddea26e151320aac65ae3bda05266d81476adedc28c5e769f8bf016de33bdaa49f341435df429e01fe5f9b16e';

export const fSignedTxEIP1559 =
  '0x02f8720306843b9aca008504a817c80082520894b2bb2b958afa2e96dab3f3ce7162b87daea39017872386f26fc1000080c001a0884850dc596eac6b74175d2c62deedd9295570808882b0cd9adf47e5ac8b3b3da068881b0ef002d48ef78374d6842ee4987a222a4726af47b5a0a4bcb8f38e2cf3';
