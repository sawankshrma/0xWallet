# Web-Based Wallet (Prototype)

## Overview
This is a prototype for a web-based cryptocurrency wallet built with Django.  
The main goal was to allow users to select a blockchain, generate a seed phrase, and automatically create a corresponding wallet — with wallet data stored locally in the browser.

The project began as an exploration into blockchain wallet development for my CS50 final project.  
The development was paused after realizing that more advanced features (like signing messages and securely executing transactions) are usually handled via dedicated wallet adapters.
<br>
In most production wallets, these features are handled via wallet adapters.

## Features Implemented
- **Blockchain Selection** – Choose from supported blockchains before creating a wallet.
- **Seed Phrase Generation** – Generates a secure 12-word mnemonic.
- **Wallet Creation** – Creates a wallet address based on the generated seed phrase, for both ethereun and solana.
- **Local Storage** – Stores wallet data in the browser for persistence.

## Installation & Running
### express server (on 3001)
```bash
git clone https://github.com/sawankshrma/0xWallet.git
cd web-wallet/node-backend
npm install
npm run dev
```
### django server (on 8000)
```
cd web-wallet
pip install -r requirements.txt
python manage.py runserver
```
