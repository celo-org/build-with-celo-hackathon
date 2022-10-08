import { ImageProps } from "react-native";

export const BACKGROUND_COLOR = "#FFFFFF"

export interface PageInterface extends Pick<ImageProps, "source">{
    title: string;
    description: string;
    buttonTitle: string;
}

export const PAGES: PageInterface[] = [
     {
        title: " Welcome to Quatre Finance", 
     description: "The application brings you the full power of decentralization and allowsyou to earn in multiple ways",
     source: require("./assets/images/slide1.png"),
     buttonTitle:"Next"
    },
    {
        title: "Peer-Funding, Lending & Borrowing", 
     description: "Enjoy the super benefits of lending and borrowing asset, via a decentralized peer to peer structure, and staking",
     source: require("./assets/images/slide2.png"),
     buttonTitle:"Next"
    },
    {
        title: "Exchange Easy", 
     description: "Buy and Sell directly without a third party involvement.",
     source: require("./assets/images/slide3.png"),
     buttonTitle:"Get Started"
    },
     
]