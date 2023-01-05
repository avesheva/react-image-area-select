import React, { FC } from 'react'
import { DirectionType, OperationType } from '../types'

export interface Iprops {
  index: number,
  borderWidth: number,
  borderColor: string,
  coordinates: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  mouseDownHandler: (e: MouseEvent, i: number, operation: OperationType, direction?: DirectionType) => void,
  mouseMoveHandler: (e: MouseEvent) => void,
  mouseUpHandler: (e: MouseEvent) => void,
}

const SelectedAreaBlock: FC<Iprops> = (props: Iprops) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: props.coordinates.width,
        height: props.coordinates.height,
        top: props.coordinates.y,
        left: props.coordinates.x,
        borderStyle: 'solid',
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
      }}
      onMouseDown={ (e) => {
        props.mouseDownHandler(e.nativeEvent, props.index, 'dragging')
      }}
      onMouseMove={ (e) => {
        props.mouseMoveHandler(e.nativeEvent)
      }}
      onMouseUp={ (e) => { props.mouseUpHandler(e.nativeEvent) } }
    />
  )
}

export default SelectedAreaBlock
