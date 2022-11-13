/* eslint-disable no-undef */

nftConvert = require('../src/utils/nft');

describe('Test NFT Utils', () => {
  test('Convert to NFT Amount', () => {
    expect(nftConvert.convertToNFTAmount(10)).toBe(10000);
    expect(nftConvert.convertToNFTAmount(-1)).toBe(-1000);
    expect(nftConvert.convertToNFTAmount(0)).toBe(0);
    expect(nftConvert.convertToNFTAmount(0.1)).toBe(100);
  });

  test('Convert from NFT Amount', () => {
    expect(nftConvert.convertFromNFTAmount(10000)).toBe(10);
    expect(nftConvert.convertFromNFTAmount(1000)).toBe(1);
    expect(nftConvert.convertFromNFTAmount(0)).toBe(0);
    expect(nftConvert.convertFromNFTAmount(100)).toBe(0.1);
  });

  // Conver to ETH 18 serializes the number so its not possible to test (Web3 js lib)

  test('Convert to ETH 18. Takes number and converts to gas', () => {
    expect(nftConvert.convertFromETH18(1000000000000000000n)).toBe('1');
    expect(nftConvert.convertFromETH18(1)).toBe('0.000000000000000001');
    expect(nftConvert.convertFromETH18(0)).toBe('0');
  });
});

/// ///////////////////////////////////////////////////////////////////////////////////////
numbersUtils = require('../src/utils/numbers');

describe('Test Numbers Utils', () => {
  test('Abbreviate Number', () => {
    expect(numbersUtils.abbreviateNumber(1, false)).toBe(1);
    expect(numbersUtils.abbreviateNumber(1, true)).toBe('1.00');
    expect(numbersUtils.abbreviateNumber(0, true)).toBe('0.00');
    expect(numbersUtils.abbreviateNumber(0, false)).toBe(0);
    expect(numbersUtils.abbreviateNumber(0.1, false)).toBe(0.1);
    expect(numbersUtils.abbreviateNumber(0.1, true)).toBe('0.10');
    expect(numbersUtils.abbreviateNumber(1000, false)).toBe('1k');
    expect(numbersUtils.abbreviateNumber(10000, false)).toBe('10k');
    expect(numbersUtils.abbreviateNumber(1000000, false)).toBe('1M');
    expect(numbersUtils.abbreviateNumber(1000000000, false)).toBe('1B');
    expect(numbersUtils.abbreviateNumber(10000, true)).toBe('10.0k');
    expect(numbersUtils.abbreviateNumber(1000000, true)).toBe('1.0M');
    expect(numbersUtils.abbreviateNumber(1000000000, true)).toBe('1.0B');
  });
});

wordsUtils = require('../src/utils/words');

describe('Test Words Utils', () => {
  test('Pluralize Follower/s', () => {
    expect(wordsUtils.pluralizeFollowers(1)).toBe('Follower');
    expect(wordsUtils.pluralizeFollowers(2)).toBe('Followers');
    expect(wordsUtils.pluralizeFollowers(0)).toBe('Followers');
  });

  test('Truncate Word', () => {
    expect(wordsUtils.truncateWord('test', 2)).toBe('te...');
    expect(wordsUtils.truncateWord('big sentence', 2)).toBe('bi...');
    expect(wordsUtils.truncateWord('big sentence', 1)).toBe('b...');
    expect(wordsUtils.truncateWord('big sentence', 0)).toBe('...');
    expect(wordsUtils.truncateWord('big sentence', -1)).toBe('...');
    expect(wordsUtils.truncateWord('big sentence', 0.1)).toBe('...');
    expect(wordsUtils.truncateWord('small', 20)).toBe('small...');
  });

  test('Check if String is equal', () => {
    expect(wordsUtils.strIsEqual('a', 'b')).toBe(false);
    expect(wordsUtils.strIsEqual('a', 'a')).toBe(true);
    expect(wordsUtils.strIsEqual('Aa', 'aA')).toBe(true);
    expect(wordsUtils.strIsEqual('PalAVRa', 'palavra')).toBe(true);
  });
});
