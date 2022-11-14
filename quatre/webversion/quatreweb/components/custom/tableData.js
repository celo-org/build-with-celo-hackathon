import React from "react";
import Address from "../Address";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Tooltip, Button } from "@mui/material";
import utilities from "./utils";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useCelo } from "@celo/react-celo";
import styles from "../../styles/local/components/write.module.css";

// Simulate table data
export function tableData(param) {
  const { address } = useCelo();
  const { formatValue } = utilities(() => {});
  const result = param?.result?.length > 0 ? param?.result : null;
  const zeroAddress = `0x${"0".repeat(40)}`;

  return {
    rowData: {
      id: param?.id,
      quorum: param?.item?.quorum,
      amount: 0,
      // amount: Moralis.Units.FromWei(param?.item?.amount),
      currentPoolSize: result ? formatValue(result[0].currentPoolSize) : 0,
      total: result ? formatValue(result[0].total) : 0,
      roundUp: result ? !result[3]?.roundUp : true,
      claim: result ? formatValue(result[0].total) : 0,
      owings: result ? formatValue(result[2].owings).toString() : "0.0",
      addressZero: zeroAddress,
      name: param?.name,
      liquidated: result ? result[0].liquidated : zeroAddress,
      admin: <Address avatar="" copyable={true} address={param?.item?.admin} size={4} display={true} styleAddress={styles.address} />,
      pool: <Address avatar="" copyable={true} address={param?.item?.pool} size={4} display={true} styleAddress={styles.address} />,
      include: param?.isIncluded,
      onclick: async () => {
        const res = await param?.fetchProxy({
          poolAddress: param?.item?.pool,
          address: address
        });
        param.setResult(res);
      },
      proxy: {
        ert: result ? formatValue(result[2]?.expectedRepaymentTime) : 0,
        position: result ? result[2]?.position : 0,
        shared: result ? formatValue(result[2]?.share) : 0,
        owings: result ? formatValue(result[2]?.owings) : 0,
        colBal: result ? formatValue(result[2]?.collateralBalance) : 0,
        totalExpected: result ? formatValue(result?._pool?.total) : 0,
        totalPooled: result ? formatValue(result?._pool?.currentPoolSize) : 0,
        duration: result ? (result?._pool?.duration * result?._pool?.quorum) / 3600 / 24 : 0,
        beneficiary: <Address avatar="" copyable={true} address={result?.pprofile?.currentBeneficiary || zeroAddress} size={4} display={true} styleAddress={styles.address} />,
        index: result?._pool?.colFactor / 100 || 0
      },
      joinBand: value =>
        value === 1 ? (
          <Button
            variant="text"
            className="text-orange-500 cursor-pointer"
            disabled={param?.isIncluded}
            onClick={() => {
              if ((param?.isIncluded && param?.item?.quorum === param?.item?.current) || (!param?.isIncluded && param?.item?.quorum === param?.item?.current) || (param?.isIncluded && param?.item?.quorum > param?.item?.current)) return null;
              const fee = new BigNumber(0.0022);
              // const amount = new BigNumber(Moralis.Units.FromWei(param?.item?.amount));
              const amount = new BigNumber(1000000000000000);
              param?.setStatusPrivate({
                abi: abis['1'],
                contractAddress: param?.item?.pool,
                functionName: "status",
                statusName: "completeSignUp",
                value: ethers.utils.parseEther(String(fee.plus(amount).toNumber()))
              });
            }}
          >
            {/* User in band and band is filled */}
            {param?.isIncluded && param?.item?.quorum === param?.item?.current && (
              <Tooltip title="Your band but not available">
                <LockIcon className="text-orange-700" />
              </Tooltip>
            )}
            {/* User not in band but band is open */}
            {!param?.isIncluded && param?.item?.quorum > param?.item?.current && (
              <Tooltip title="Click to join this community">
                <LockOpenIcon className="text-green-500" />
              </Tooltip>
            )}
            {/* User not in band but band is filled */}
            {!param?.isIncluded && param?.item?.quorum === param?.item?.current && (
              <Tooltip title="Band is filled">
                <LockIcon className="text-orange-700" />
              </Tooltip>
            )}
            {/* User in band but still open */}
            {param?.isIncluded && param?.item?.quorum > param?.item?.current && (
              <Tooltip title="You in this band already">
                <LockIcon className="text-orange-700" />
              </Tooltip>
            )}
          </Button>
        ) : (
          <Button
            variant="text"
            className="text-orange-500 cursor-pointer"
            
            onClick={() => {
              if ((param?.isIncluded && param?.item?.quorum === param?.item?.current) || (!param?.isIncluded && param?.item?.quorum === param?.item?.current) || (param?.isIncluded && param?.item?.quorum > param?.item?.current)) return null;
              const fee = new BigNumber(0.0022);
              // const amount = new BigNumber(Moralis.Units.FromWei(param?.item?.amount));
              const amount = new BigNumber(100000000000000);
              param?.setStatusPublic({
                abi: abis['0'],
                contractAddress: param?.getCAddress(chainId),
                functionName: "status",
                statusName: "joinABand",
                params: { poolid: [param?.id] },
                value: ethers.utils.parseEther(String(fee.plus(amount).toNumber()))
              });
            }}
          >
            {/* User in band and band is filled */}
            {param?.isIncluded && param?.item?.quorum === param?.item?.current && (
              <Tooltip title="Your band but not available">
                <LockIcon className="text-orange-700" />
              </Tooltip>
            )}
            {/* User not in band but band is open */}
            {!param?.isIncluded && param?.item?.quorum > param?.item?.current && (
              <Tooltip title="Click to join this community">
                <LockOpenIcon className="text-green-500" />
              </Tooltip>
            )}
            {/* User not in band but band is filled */}
            {!param?.isIncluded && param?.item?.quorum === param?.item?.current && (
              <Tooltip title="Band is filled">
                <LockIcon className="text-orange-700" />
              </Tooltip>
            )}
            {/* User in band but still open */}
            {param?.isIncluded && param?.item?.quorum > param?.item?.current && (
              <Tooltip title="You're in this band already">
                <LockIcon className="text-orange-700" />
              </Tooltip>
            )}
          </Button>
        ),
      runFunc: (funcName, condition) => (
        <React.Fragment>
          <Button
            variant="text"
            disabled={condition}
            onClick={() => {
              let hasValue;

              // console.log("condition", condition);
              switch (funcName.toLowerCase()) {
                case "payback":
                  hasValue = true;
                  break;

                case "absorb defaulter":
                  hasValue = true;
                  break;

                default:
                  hasValue = false;
                  break;
              }

              if (hasValue) {
                const fee = BigNumber(0.0022);
                param?.setOptions({
                  abi: abis['1'],
                  contractAddress: param?.item?.pool,
                  functionName: funcName.toLowerCase(),
                  hasValue: hasValue,
                  fee: fee
                });
              } else {
                param?.setOptions({
                  abi: abis['1'],
                  contractAddress: param?.item?.pool,
                  functionName: funcName.toLowerCase(),
                  hasValue: hasValue
                });
              }
              param?.setIsModalVisible(true);
            }}
          >
            {funcName}
          </Button>
        </React.Fragment>
      ),
      current: param?.item?.current,
      type: param?.item?.mode
    }
  };
}
