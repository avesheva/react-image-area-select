export type OperationType = 'dragging' | 'resize'
export type DirectionType = 'top' | 'down' | 'left' | 'right'

export default class SelectAreaApiClass {
  private movingAreaIndex: number | null = null

  private resizingAreaIndex: number | null = null

  public mouseUpHandler() {
    console.log('Mouse UP handler ... ')
  }

  public MouseMoveHandler() {
    console.log('Area SELECTED handler ... ')
  }

  public MouseDownHandler() {
    console.log('Mouse DOWN handler ... ')
  }
}
