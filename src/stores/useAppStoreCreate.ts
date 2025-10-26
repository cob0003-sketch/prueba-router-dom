import { create } from 'zustand'
import type { useFormCreatorType } from './useFormSlice'
import { useFormSliceCreator } from './useFormSlice'
import { useModalSliceCreator } from './useModalNavSlice'
import type { ModalStoreTypes } from './useModalNavSlice'
import { devtools } from 'zustand/middleware'
import {useBannerSliceCreator} from './useBannerSlice' 
import type { ModalBannerCreatorType } from './useBannerSlice'

// create para estados agrupados
export const useAppStore = create<useFormCreatorType & ModalStoreTypes & ModalBannerCreatorType>()(devtools((...a) => ({
  ...useFormSliceCreator(...a),
  ...useModalSliceCreator(...a),
  ...useBannerSliceCreator(...a)
}))
)





