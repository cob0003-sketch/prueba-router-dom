import {create} from 'zustand'
import type { useFormCreatorType } from './useFormStoreCreator'
import { useFormStoreCreator } from './useFormStoreCreator'
import { devtools } from 'zustand/middleware'

// create para estados agrupados
export const useFormStore = create<useFormCreatorType>()(devtools((...a) => (
  useFormStoreCreator(...a)
)));





