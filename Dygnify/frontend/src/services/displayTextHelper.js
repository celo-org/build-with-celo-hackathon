function getTrimmedWalletAddress(walletAddress, trimLength) {
  if (walletAddress) {
    return (
      walletAddress.toString().slice(0, trimLength ? trimLength : 10) + "..."
    );
  }
  return null;
}

function getExtendableTextBreakup(text, sliceAt) {
  let isSliced = false;
  let firstText, secondText;
  if (text && sliceAt) {
    let textStr = text.toString();
    if (textStr.length > sliceAt) {
      isSliced = true;
      firstText = textStr.slice(0, sliceAt) + "...";
      secondText = textStr.slice(++sliceAt);
    } else {
      firstText = textStr;
    }

    return { isSliced, firstText, secondText };
  }
}

function getDisplayAmount(amount) {
  let displayAmt;
  if (amount) {
    amount = parseFloat(amount).toFixed(2);
    if (amount > 999) {
      displayAmt = (amount / 1000).toFixed(2).toString() + "K";
    } else {
      displayAmt = amount;
    }
  }

  return displayAmt;
}

module.exports = {
  getTrimmedWalletAddress,
  getExtendableTextBreakup,
  getDisplayAmount,
};
