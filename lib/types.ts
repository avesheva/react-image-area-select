export type OperationType = 'dragging' | 'resize'

export type DirectionType = 'top' | 'down' | 'left' | 'right'

export interface IAreaData {
  index: number,
  lineWidth: number,
  color: string,
  comment: string,
  coordinates: {
    width: number,
    height: number,
    x: number,
    y: number,
  },
}
