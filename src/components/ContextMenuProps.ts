export interface ContextMenuProps {
  x: number,
  y: number,
  onClose: () => void;
  onColorChange: () => void;
  onDelete: () => void;
}