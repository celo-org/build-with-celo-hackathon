export interface URLInfo {
    url: string | undefined;
    sameOrigin: boolean;
}
export interface SafeHrefConfigObj {
    enabled?: boolean;
    origin?: string;
}
export declare function configureSafeHref(configObject: SafeHrefConfigObj): void;
export declare function getUseSafeHref(): boolean;
export declare function getURLInfo(url: string): URLInfo;
export declare function extractAnchorProps(href: string, rel: string): {
    safeHref: string | undefined;
    safeRel: string;
};
