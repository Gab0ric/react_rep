export interface ContextMenuProps {
  x: number,
  y: number,
  onClose: () => void;
  onDelete: () => void;
  onColorChange: () => void;
  onToggleStatus: () => void;
}