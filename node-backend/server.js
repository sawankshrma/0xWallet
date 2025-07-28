// node-backend/server.js
import express from "express";
import cors from "cors";
import { generateMnemonic, mnemonicToSeed, validateMnemonic } from "bip39";
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
    const { mnemonic, index } = req.body;
    if (typeof index !== "number" || index < 0) {
      return res.status(400).json({ error: "Invalid index value" });
    }
    currentIndex = index;

    if (!validateMnemonic(mnemonic)) {
      return res.status(400).json({ error: "Invalid seed phrase" });
    }
    const path = `m/44'/501'/${currentIndex}'/0'`;

    // call the function (and make it async!)
    async function process_two() {
      const seedHex = (await mnemonicToSeed(mnemonic)).toString("hex");

      const derivedSeed = derivePath(path, seedHex).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);

      currentIndex += 1;

      res.json({
        secretKey: Buffer.from(keypair.secretKey).toString("hex"),
      });
    }

    await process_two();
  } catch (e) {
    console.error("Wallet generation error:", e); // for debugging
    res.status(500).json({ error: e.toString() });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Express API running on http://localhost:${PORT}`)
);
