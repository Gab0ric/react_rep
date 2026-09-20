 export interface Note {
  id: string;
  title: string;
  color?: string;
  content: string;
  createdAt: number;
  status: 'completed' | 'in progress'
}