import type { StateCreator } from "zustand";
import type { FormStateType } from "../layouts/Layout";


export type useFormCreatorType = {
    loginUsuarios: FormStateType[]
    addLoginUsuarios: (newUser: FormStateType) => void
}

//State y funciones para m,anejar formulario
export const useFormStoreCreator: StateCreator<useFormCreatorType> = (set) => ({
    //states
    loginUsuarios: [],
    //functions update state
    addLoginUsuarios: (newUser) => {
        set((state) => ({
            ...state,
            loginUsuarios: [...state.loginUsuarios, { ...newUser }]
        }))
    }

})