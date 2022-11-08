import { atom } from "recoil";

export const textState = atom({
  key: "textState",
  default: "",
});

export const userState = atom({
  key: "userState",
  default: {
    name: "Blue",
    nft: 0,
    imageUrl: "https://avatars.dicebear.com/api/avataaars/teste.svg",
  },
});

export const walletOpenState = atom({
  key: "walletOpen",
  default: false,
});

export const mintState = atom({
  key: "mintState",
  default: false,
});

// example on how to use in component:
// const [text, setText] = useRecoilState(textState);
