import React, { FC, useState } from 'react'
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
  mouseDownHandler: (e: React.MouseEvent, i: number, operation: OperationType, direction?: DirectionType) => void,
  deleteHandler: (i: number) => void,
}

const SelectedAreaBlock: FC<Iprops> = (props: Iprops) => {
  const [cursor, setCursor] = useState<'grab' | 'grabbing'>('grab')

  return (
    <div style={{
      position: 'absolute',
      width: props.coordinates.width,
      height: props.coordinates.height,
      top: props.coordinates.y,
      left: props.coordinates.x,
    }}>
      {/* Top border */}
      <div style={{
        height: `${ props.borderWidth }px`,
        background: props.borderColor,
        top: 0,
        cursor: 'ns-resize',
      }}/>
      {/* Left border */}
      <div style={{
        width: `${ props.borderWidth }px`,
        height: '100%',
        background: props.borderColor,
        position: 'absolute',
        left: 0,
        bottom: 0,
        cursor: 'ew-resize',
      }}/>

      <div
        style={{
          width: '100%',
          height: '100%',
          cursor: cursor,
        }}
        onMouseDown={ (e) => {
          e.stopPropagation()
          if (e.button === 2) return // If mouse right button clicked

          setCursor('grabbing')

          props.mouseDownHandler(e, props.index, 'dragging')
        }}
        onContextMenu={ (e) => { e.stopPropagation() }}
      >
        <button
          style={{ position: 'absolute', top: 0, right: 0 }}
          onClick={ () => { props.deleteHandler(props.index) } }
        >
          &times;
        </button>
      </div>

      {/* Right border */}
      <div style={{
        width: `${ props.borderWidth }px`,
        height: '100%',
        background: props.borderColor,
        position: 'absolute',
        right: 0,
        bottom: 0,
        cursor: 'ew-resize',
      }}/>

      {/* Bottom border */}
      <div style={{
        height: `${ props.borderWidth }px`,
        width: '100%',
        background: props.borderColor,
        position: 'absolute',
        bottom: 0,
        cursor: 'ns-resize',
      }}/>
    </div>
  )
}

export default SelectedAreaBlock
