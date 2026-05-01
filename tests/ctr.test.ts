import { describe, test, expect } from "bun:test"
import { ctr } from "../src"

const key = Uint8Array.fromHex("0123456789ABCDEFFEDCBA9876543210");
const iv = Uint8Array.fromHex("000102030405060708090A0B0C0D0E0F");
const plaintext = Uint8Array.fromHex("AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDDEEEEEEEEEEEEEEEEFFFFFFFFFFFFFFFFAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBB");
const encrypted = Uint8Array.fromHex("AC3236CB970CC20791364C395A1342D1A3CBC1878C6F30CD074CCE385CDD70C7F234BC0E24C11980FD1286310CE37B926E02FCD0FAA0BAF38B2933851D824514");

const key2 = Uint8Array.fromHex("FEDCBA98765432100123456789ABCDEF");
const encrypted2 = Uint8Array.fromHex("5DCCCD25B95AB07417A08512EE160E2F8F661521CBBAB44CC87138445BC29E5C0AE0297205D62704173B21239B887F6C8CB5B800917A2488284BDE9E16EA2906");

describe("CTR", () => {
    test("Encryption", () => expect(ctr(key, plaintext, iv)).toStrictEqual(encrypted));
    test("Decryption", () => expect(ctr(key, encrypted, iv)).toStrictEqual(plaintext));

    test("Encryption #2", () => expect(ctr(key2, plaintext, iv)).toStrictEqual(encrypted2));
    test("Decryption #2", () => expect(ctr(key2, encrypted2, iv)).toStrictEqual(plaintext));
});