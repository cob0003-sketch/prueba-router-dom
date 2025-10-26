import type { StateCreator } from "zustand"

export type ModalBannerCreatorType = {
    modalBanner: boolean
    showBanner: ()=> void
    closeBanner: ()=> void
}

export const useBannerSliceCreator:StateCreator<ModalBannerCreatorType> = (set)=> ({
    //state
    modalBanner: false,
    //functions
    showBanner: ()=> {
        set({modalBanner:true,
        })
    },
     closeBanner: ()=> {
        set({modalBanner:false})
    }
})