import { createContext } from 'react';
import { Note } from '../entities/note/model/types'; 

export interface SidebarContextType {
  notes: Note[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: {
    completed: boolean;
    inProgress: boolean;
  };
  setFilterStatus: (status: { completed: boolean; inProgress: boolean }) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);