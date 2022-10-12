export interface ButtonProps {
  title: string;
  height?: number | null;
  foreground?: string | null;
  background?: string | null;
  disabled?: boolean;
  onPressed: () => void;
}
