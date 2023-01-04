import React, { FC } from 'react'

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
}

const SelectedAreaBlock: FC<Iprops> = (props: Iprops) => {
  return (
    <div style={{
      position: 'absolute',
      width: props.coordinates.width,
      height: props.coordinates.height,
      top: props.coordinates.y,
      left: props.coordinates.x,
      borderStyle: 'solid',
      borderWidth: props.borderWidth,
      borderColor: props.borderColor,
    }} />
  )
}

export default SelectedAreaBlock