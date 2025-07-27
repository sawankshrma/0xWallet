import { mnemonicToSeed, generateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

const newWallet = async function (
  { mnemonic },
  { currentIndex },
  { publicKeys }
) {
  const seed = mnemonicToSeed(mnemonic);
  const path = `m/44'/501'/${currentIndex}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keypair = Keypair.fromSecretKey(secret);
  currentIndex = currentIndex + 1;
  const temp = [...publicKeys, keypair.publicKey];
  publicKeys = temp;
  return;
};

const generateMnemo = async function ({ mnemonic }) {
  const mn = await generateMnemonic();
  mnemonic = mn;
};
