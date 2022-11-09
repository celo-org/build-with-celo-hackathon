export interface Rule {
    property: string;
    value: string;
}
export default function prefixer(property: string, value: string): Rule[];
