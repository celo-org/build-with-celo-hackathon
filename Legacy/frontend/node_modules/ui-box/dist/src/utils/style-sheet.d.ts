interface Options {
    speedy?: boolean;
    maxLength?: number;
}
export default class CustomStyleSheet {
    private isSpeedy;
    private sheet?;
    private tags;
    private maxLength;
    private ctr;
    private injected;
    constructor(options?: Options);
    getSheet(): CSSStyleSheet | undefined;
    inject(): void;
    speedy(bool: boolean): void;
    _insert(sheet: CSSStyleSheet, rule: string): void;
    insert(rule: string): number;
    flush(): void;
    rules(): CSSRule[];
}
export {};
