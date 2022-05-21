import { IReaction } from './IReaction'

export interface IElement {
  colors: string[]
  opacity: number
  gravity: number
  slip: number
  slide: number
  scatter: number
  reaction: IReaction[]
  selfReaction: IReaction[]
}
