import { initContract, login, ft_balance_of } from './utils.js'

let saldo = "";

const config = {
  networkId: "testnet",
  keyStore:  new nearApi.keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};
// connect to NEAR
const near = new nearApi.Near({
  keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org'
});

// connect to the NEAR Wallet
const wallet = new nearApi.WalletConnection(near, 'Nuruk');

window.onload = async function () {
  CreateCanvas();
  initContract().then(()=>{
    if(wallet.isSignedIn()) {
      getBalance();
    }
  });
}
// Either sign in or call the addMessage change method on button click
function LoginNear() {
  login();
 /*  wallet.requestSignIn({
    contractId: wallet.getAccountId(),
    methodNames: ['getMessages', 'addMessage']
  }); */
}
// get balance in the wallet
export async function getBalance() {
  let balance
/*   await window.ftcontract.ft_balance_of({account_id: wallet.getAccountId() }).then((res) => {
    balance = nearApi.utils.format.parseNearAmount(res);
    saldo = nearApi.utils.format.formatNearAmount(res);
    
    console.log(res + " res");
    console.log(balance + " balance");
    console.log(saldo + " saldo");
  }) */

   ft_balance_of(wallet.getAccountId()).then((res)=>{
    balance = nearApi.utils.format.parseNearAmount(res);
    saldo = nearApi.utils.format.formatNearAmount(balance);

  });
/*   if(wallet.isSignedIn()) {
    const nearWallet =  await nearApi.connect(config);
    const account = await nearWallet.account(wallet.getAccountId());
    await account.getAccountBalance().then((balance)=>{
      saldo = nearApi.utils.format.formatNearAmount(balance.available, 5);
      console.log(saldo);
    });
  }else{
    console.log("wallet is not connected");
  } */
}

// sends NEAR tokens
async function SendToken(receiver_account, amount){
  let amountInYocto = nearApi.utils.format.parseNearAmount(amount);
  await account.sendMoney(
    receiver_account, amountInYocto
   // "receiver-account.testnet",  receiver account
   // "1000000000000000000000000" amount in yoctoNEAR
  );
}

function Balance (){
  return saldo;
}
function AccountId() {
  return wallet.getAccountId();
}
function signOut (){
  return wallet.signOut();
}
function CreateCanvas() {
  // Unity Canvas
  createUnityInstance(document.querySelector("#unity-canvas"), {
    dataUrl: "Build/login.data.unityweb",
    frameworkUrl: "Build/login.framework.js.unityweb",
    codeUrl: "Build/login.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Nuruk",
    productVersion: "0.1",
    // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
    // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
  });

}
