import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
    getTerminalID(): string {
        return "1740258963";
    }

    getCampaignUUID(): string {
        return "F9B4D575-5ADA-4FDC-888D-530BEB3F1E73";
    }

    getTransactionID(): string {
        return "d89d6df6-4e14-45a5-a32c-217c7175dfdb";
    }

    getChecksum() {
        return "qnR8UCqJggD55PohusaBNviGoOJ67HC6Btry4qXLVZc=";
    }
}