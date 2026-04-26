import { describe, test, expect } from "bun:test"
import { ofb } from "../src"

const key = Uint8Array.fromHex("0123456789ABCDEFFEDCBA9876543210");
const iv = Uint8Array.fromHex("000102030405060708090A0B0C0D0E0F");
const plaintext = Uint8Array.fromHex("AAAAAAAABBBBBBBBCCCCCCCCDDDDDDDDEEEEEEEEFFFFFFFFAAAAAAAABBBBBBBB");
const encrypted = Uint8Array.fromHex("AC3236CB861DD316E6413B4E3C7524B71D01ACA2487CA582CBF5463E6698539B");

const key2 = Uint8Array.fromHex("FEDCBA98765432100123456789ABCDEF");
const encrypted2 = Uint8Array.fromHex("5DCCCD25A84BA16560D7F2658870684933FA16BD5CD9C856CACAA1E101897A97");

describe("OFB", () => {
    test("Encryption", () => expect(ofb(key, plaintext, iv)).toStrictEqual(encrypted));
    test("Decryption", () => expect(ofb(key, encrypted, iv)).toStrictEqual(plaintext));

    test("Encryption #2", () => expect(ofb(key2, plaintext, iv)).toStrictEqual(encrypted2));
    test("Decryption #2", () => expect(ofb(key2, encrypted2, iv)).toStrictEqual(plaintext));
});