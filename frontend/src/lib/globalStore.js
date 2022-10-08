import create from "zustand";

const useGlobalStore = create((set) => ({
  campaign: null,
  setCampaign: (camp) => set((state) => ({ campaign: camp })),
}));

export default useGlobalStore;
