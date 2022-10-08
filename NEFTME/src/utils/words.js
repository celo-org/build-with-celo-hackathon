export const pluralizeFollowers = (amount) => (amount === 1 ? 'Follower' : 'Followers');

export const truncateWord = (word, size) => (word ? `${word.substring(0, size)}...` : '');

export const strIsEqual = (a, b) => a?.localeCompare(b, undefined, { sensitivity: 'base' }) === 0;
