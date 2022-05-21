import { IElement } from './IElement'

export interface IBiome {
  elements: {
    element: IElement
    pow: number
    height: number
  }[]
}
