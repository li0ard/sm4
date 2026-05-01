import { describe, test, expect } from "bun:test";
import { decryptGCM, encryptGCM } from "../src";

const key = Uint8Array.fromHex("0123456789ABCDEFFEDCBA9876543210");
const iv = Uint8Array.fromHex("00001234567800000000ABCD");
const plaintext = Uint8Array.fromHex("AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDDEEEEEEEEEEEEEEEEFFFFFFFFFFFFFFFFEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAA");
const aad = Uint8Array.fromHex("FEEDFACEDEADBEEFFEEDFACEDEADBEEFABADDAD2");
const encrypted = Uint8Array.fromHex("17F399F08C67D5EE19D0DC9969C4BB7D5FD46FD3756489069157B282BB200735D82710CA5C22F0CCFA7CBF93D496AC15A56834CBCF98C397B4024A2691233B8D83DE3541E4C2B58177E065A9BF7B62EC");

const iv2 = Uint8Array.fromHex("000102030405060708090A0B0C0D0E0F");
const encrypted2 = Uint8Array.fromHex("00AE6251FDC1897CBB8D10D2D000AB89E5C9F4BBF8825DBC766894481154C362E451DA79EEFADDABD9D2AF1105B1C0AD70A7DC55AA1B8FE8E534FD5B116497326E6189DC4CB40FDEFBF57B771788C23F");


describe("GCM", () => {
    test("Encryption (iv = 12 bytes)", () => expect(encryptGCM(key, plaintext, iv, aad)).toStrictEqual(encrypted));
    test("Decryption (iv = 12 bytes)", () => expect(decryptGCM(key, encrypted, iv, aad)).toStrictEqual(plaintext));

    test("Encryption (iv = 16 bytes)", () => expect(encryptGCM(key, plaintext, iv2, aad)).toStrictEqual(encrypted2));
    test("Decryption (iv = 16 bytes)", () => expect(decryptGCM(key, encrypted2, iv2, aad)).toStrictEqual(plaintext));
});