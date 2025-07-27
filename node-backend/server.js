// node-backend/server.js
import express from "express";
import cors from "cors";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

const app = express();
app.use(cors());
app.use(express.json()); // for POST body parsing

let currentIndex = 0;

app.get("/generate", async (req, res) => {
  const mnemonic = await generateMnemonic();
  res.json({ mnemonic });
});

app.post("/wallet", async (req, res) => {
  try {
    const { mnemonic } = req.body;
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(
      path,
      mnemonicToSeed(mnemonic).toString("hex")
    ).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    currentIndex += 1;

    res.json({
      secretKey: Buffer.from(keypair.secretKey).toString("hex"),
    });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Express API running on http://localhost:${PORT}`)
);
