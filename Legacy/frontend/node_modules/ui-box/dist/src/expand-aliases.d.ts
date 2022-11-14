import { BoxPropValue } from './types/enhancers';
export default function expandAliases(props: {
    [key: string]: BoxPropValue;
}): Map<string, BoxPropValue>;
