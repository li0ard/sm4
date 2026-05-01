<p align="center">
    <b>@li0ard/sm4</b><br>
    <b>SM4 (GB/T 32907-2016) cipher implementation in pure TypeScript</b>
    <br>
    <a href="https://li0ard.is-cool.dev/sm4">docs</a>
    <br><br>
    <a href="https://github.com/li0ard/sm4/actions/workflows/test.yml"><img src="https://github.com/li0ard/sm4/actions/workflows/test.yml/badge.svg" /></a>
    <a href="https://github.com/li0ard/sm4/blob/main/LICENSE"><img src="https://img.shields.io/github/license/li0ard/sm4" /></a>
    <br>
    <a href="https://npmjs.com/package/@li0ard/sm4"><img src="https://img.shields.io/npm/v/@li0ard/sm4" /></a>
    <a href="https://jsr.io/@li0ard/sm4"><img src="https://jsr.io/badges/@li0ard/sm4" /></a>
    <br>
    <hr>
</p>

## Installation

```bash
# from NPM
npm i @li0ard/sm4

# from JSR
bunx jsr i @li0ard/sm4
```

## Supported modes
- [x] Electronic Codebook (ECB)
- [x] Cipher Block Chaining (CBC)
- [x] Output Feedback (OFB)
- [x] Counter (CTR)
- [x] Cipher Feedback (CFB)
- [x] Galois/Counter Mode (GCM)

## Features
- Provides simple and modern API
- Most of the APIs are strictly typed
- Fully complies with [GB/T 32907-2016](https://github.com/alipay/tls13-sm-spec/blob/master/sm-en-pdfs/sm4/GBT.32907-2016.SM4-en.pdf) standard
- Supports Bun, Node.js, Deno, Browsers


## Examples
### ECB mode
```ts
import { encryptECB, decryptECB } from "@li0ard/sm4";

const key = hexToBytes("0123456789ABCDEFFEDCBA9876543210");
const plaintext = hexToBytes("AAAA....AA");
const ciphertext = encryptECB(key, plaintext);

console.log(ciphertext);
console.log(decryptECB(key, ciphertext));
```

### CBC mode
```ts
import { encryptCBC, decryptCBC } from "@li0ard/sm4";

const key = hexToBytes("0123456789ABCDEFFEDCBA9876543210");
const key = hexToBytes("000102030405060708090A0B0C0D0E0F");
const plaintext = hexToBytes("AAAA....AA");
const ciphertext = encryptCBC(key, plaintext, iv);

console.log(ciphertext);
console.log(decryptCBC(key, ciphertext, iv));
```