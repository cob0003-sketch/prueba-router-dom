import type { StateCreator } from "zustand"

export type ModalStoreTypes = {
    modalNav: boolean
    changeModalNav: () => void
    closeModalNav: ()=> void
    showModalNav: ()=> void
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
    },
     showModalNav:()=> {
        set({modalNav: false})
    }

})