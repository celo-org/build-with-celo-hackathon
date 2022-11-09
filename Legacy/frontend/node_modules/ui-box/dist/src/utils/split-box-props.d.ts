import { EnhancerProps } from '../types/enhancers';
interface SplitBoxProps<P extends EnhancerProps> {
    matchedProps: Pick<P, keyof EnhancerProps>;
    remainingProps: Pick<P, Exclude<keyof P, keyof EnhancerProps>>;
}
export default function splitBoxProps<P extends EnhancerProps>(props: P): SplitBoxProps<P>;
export {};
