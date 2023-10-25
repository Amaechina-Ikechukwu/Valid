import { createWithEqualityFn } from "zustand/traditional";



const ValidStore = createWithEqualityFn(
  (set) => ({
    mediaData:{},
    setMediaData: (media: any) => set({ mediaData: media }),
      }),
  Object.is
);

export { ValidStore };
