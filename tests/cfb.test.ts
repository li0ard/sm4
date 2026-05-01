import { describe, test, expect } from "bun:test"
import { encryptCFB, decryptCFB } from "../src"

const key = Uint8Array.fromHex("0123456789ABCDEFFEDCBA9876543210");
const iv = Uint8Array.fromHex("000102030405060708090A0B0C0D0E0F");
const plaintext = Uint8Array.fromHex("AAAAAAAABBBBBBBBCCCCCCCCDDDDDDDDEEEEEEEEFFFFFFFFAAAAAAAABBBBBBBB");
const encrypted = Uint8Array.fromHex("AC3236CB861DD316E6413B4E3C7524B769D4C54ED433B9A0346009BEB37B2B3F");

const key2 = Uint8Array.fromHex("FEDCBA98765432100123456789ABCDEF");
const encrypted2 = Uint8Array.fromHex("5DCCCD25A84BA16560D7F265887068490D9B86FF20C3BFE115FFA02CA6192CC5");

describe("CFB", () => {
    test("Encryption", () => expect(encryptCFB(key, plaintext, iv)).toStrictEqual(encrypted));
    test("Decryption", () => expect(decryptCFB(key, encrypted, iv)).toStrictEqual(plaintext));

    test("Encryption #2", () => expect(encryptCFB(key2, plaintext, iv)).toStrictEqual(encrypted2));
    test("Decryption #2", () => expect(decryptCFB(key2, encrypted2, iv)).toStrictEqual(plaintext));

});