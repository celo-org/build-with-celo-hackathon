import * as accountManager from "../frontend/src/hardhat/deployments/alfajores/AccountManager.json";
import * as digesu from "../frontend/src/hardhat/deployments/alfajores/Digesu.json";
import * as token from "../frontend/src/hardhat/deployments/alfajores/QuatreToken.json";


export const contractsData = {
  alcManager: { ...accountManager },
  token: { ...token },
  digesu: { ...digesu },
} 
