export interface Column<T> {
  id: string;
  label: string;
  minWidth?: number;
  width?: number;
  align?: "right";
  format: (value: T) => string | React.ReactNode;
}