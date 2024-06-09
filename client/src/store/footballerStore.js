import {create} from 'zustand';

const useFootballerStore = create((set) => ({
  footballers: [],
  unsavedFootballers: [],
  addFootballers: (footballer) => set((state) => ({ unsavedFootballers: [...state.unsavedFootballers, footballer] })),
  setFootballers: (footballers) => set({ footballers }),
}));

export default useFootballerStore;
