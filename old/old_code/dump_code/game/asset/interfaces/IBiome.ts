import { IElement } from './IElement'

export interface IBiome {
  elements: Array<{
    element: IElement
    pow: number
    height: number
  }>
}
