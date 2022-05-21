import { IReaction } from './IReaction'

export interface IElement {
  colors: Array<string>
  opacity: number
  gravity: number
  slip: number
  slide: number
  scatter: number
  reaction: Array<IReaction>
  selfReaction: Array<IReaction>
}
