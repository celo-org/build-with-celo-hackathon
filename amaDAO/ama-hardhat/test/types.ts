import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { AMA_SponsorEscrow } from "../types/AMA_SponsorEscrow";
import type { AMA_TimeTreeToken } from "../types/AMA_TimeTreeToken";
import type { Greeter } from "../types/Greeter";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  export interface Context {
    greeter: Greeter;
    AMA_SponsorEscrow: AMA_SponsorEscrow;
    AMA_TimeTreeToken: AMA_TimeTreeToken;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
}
