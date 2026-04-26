import { describe, test, expect } from "bun:test";
import { decryptECB, encryptECB } from "../src";

const key = Uint8Array.fromHex("0123456789ABCDEFFEDCBA9876543210");
const plaintext = Uint8Array.fromHex("AAAAAAAABBBBBBBBCCCCCCCCDDDDDDDDEEEEEEEEFFFFFFFFAAAAAAAABBBBBBBB");
const encrypted = Uint8Array.fromHex("5EC8143DE509CFF7B5179F8F474B86192F1D305A7FB17DF985F81C8482192304");

const key2 = Uint8Array.fromHex("FEDCBA98765432100123456789ABCDEF");
const encrypted2 = Uint8Array.fromHex("C5876897E4A59BBBA72A10C83872245B12DD90BC2D200692B529A4155AC9E600");

describe("ECB", () => {
    test("Encryption", () => expect(encryptECB(key, plaintext)).toStrictEqual(encrypted));
    test("Decryption", () => expect(decryptECB(key, encrypted)).toStrictEqual(plaintext));

    test("Encryption #2", () => expect(encryptECB(key2, plaintext)).toStrictEqual(encrypted2));
    test("Decryption #2", () => expect(decryptECB(key2, encrypted2)).toStrictEqual(plaintext));
});