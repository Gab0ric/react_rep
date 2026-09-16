export interface NoteState {
  title: string;
  content: string;
}

export type NoteAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'RESET_FORM' };

export const noteReducer = (state: NoteState, action: NoteAction): NoteState => {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        title: action.payload
      };

    case 'SET_CONTENT' :
      return { 
        ...state, 
        content: action.payload
       };

    case 'RESET_FORM':
      return { title: '', content: '' };

    default:
      return state;
  }
};