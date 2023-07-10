import { useState } from "react";
import { Magic } from "magic-sdk";

const magic = new Magic("pk_live_7645A843999E2369");

export default function Home() {
  const [account, setAccount] = useState(null);
  const [idToken, setIdToken] = useState();

  const connectWallet = async () => {
    const accounts = await magic.wallet
      .connectWithUI()
      .on("id-token-created", (params) => {
        setIdToken(params.idToken);
      });

    setAccount(accounts[0]);
  };

  const showUI = () => {
    magic.wallet.showUI();
  };

  const logout = async () => {
    await magic.user.logout();
    setAccount(null);
  };

  return (
    <div className="container">
      {!account && <button onClick={connectWallet}>Log in</button>}

      {account && (
        <div>
          <h1>ID Token:</h1>
          <p className="token">{idToken}</p>
          <div className="button-container">
            <button onClick={showUI}>Show UI</button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}
