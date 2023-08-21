export interface IReaction {
  chance: number
  becomes: string
  singleNeighbor: {
    element: string
    becomes: string
    minimum: number
    maximum: number
    affects: number
  }
}
