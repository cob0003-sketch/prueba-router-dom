import type { StateCreator } from "zustand"

export type ModalStoreTypes = {
    modalNav: boolean
    changeModalNav: () => void
    closeModalNav: ()=> void
}

export const useModalSliceCreator: StateCreator<ModalStoreTypes> = (set) => ({
    //state
    modalNav: false,
    //funciones
    changeModalNav: () => {
        set((state) => ({
            ...state,
            modalNav: !state.modalNav
        }))
    },
    closeModalNav:()=> {
        set({modalNav: false})
    }

})