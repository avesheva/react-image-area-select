import React, { FC, FormEvent, useState } from 'react'
import { DirectionType, OperationType, IAreaData } from '../types'

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
  saveData: (data: IAreaData) => void,
  comment?: string,
}

const SelectedAreaBlock: FC<Iprops> = (props: Iprops) => {
  const [cursor, setCursor] = useState<'grab' | 'grabbing'>('grab')
  let commentText = ''

  const inputHandler = (e: FormEvent<HTMLDivElement>) => {
    commentText = e.currentTarget.textContent || ''
  }
  const commentFieldBlurHandler = () => {
    const data: IAreaData = {
      index: props.index,
      coordinates: props.coordinates,
      comment: commentText,
      lineWidth: props.borderWidth,
      color: props.borderColor,
    }

    props.saveData(data)
  }

  return (
    <div style={{
      position: 'absolute',
      width: `${ props.coordinates.width }px`,
      height: `${ props.coordinates.height }px`,
      top: `${ props.coordinates.y }px`,
      left: `${ props.coordinates.x }px`,
    }}>
      {/* Top border */}
      <div
        style={{
          height: `${ props.borderWidth }px`,
          background: props.borderColor,
          top: 0,
          cursor: 'ns-resize',
        }}
        onMouseDown={ (e) => {
          e.stopPropagation()
          props.mouseDownHandler(e, props.index, 'resize', 'top')
        }}
        onMouseMove={ (e) => { e.stopPropagation() } }
      />
      {/* Left border */}
      <div
        style={{
          width: `${ props.borderWidth }px`,
          height: '100%',
          background: props.borderColor,
          position: 'absolute',
          left: 0,
          bottom: 0,
          cursor: 'ew-resize',
        }}
        onMouseDown={ (e) => {
          e.stopPropagation()
          props.mouseDownHandler(e, props.index, 'resize', 'left')
        }}
        onMouseMove={ (e) => { e.stopPropagation() } }
      />

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
        onMouseUp={ () => {
          setCursor('grab')
        }}
        onContextMenu={ (e) => { e.stopPropagation() }}
      >
        <button
          style={{ position: 'absolute', top: 0, right: 0 }}
          onClick={ () => { props.deleteHandler(props.index) } }
        >
          &times;
        </button>

        <div
          contentEditable
          suppressContentEditableWarning
          style={{
            position: 'absolute',
            top: 'calc(100% + 5px)',
            maxWidth: '200px',
            minWidth: '80px',
            padding: '0.5rem',
            background: 'white',
          }}
          onInput={ inputHandler }
          onBlur={ commentFieldBlurHandler }
        >
          { props.comment }
        </div>
      </div>

      {/* Right border */}
      <div
        style={{
          width: `${ props.borderWidth }px`,
          height: '100%',
          background: props.borderColor,
          position: 'absolute',
          right: 0,
          bottom: 0,
          cursor: 'ew-resize',
        }}
        onMouseDown={ (e) => {
          e.stopPropagation()
          props.mouseDownHandler(e, props.index, 'resize', 'right')
        }}
        onMouseMove={ (e) => { e.stopPropagation() } }
      />

      {/* Bottom border */}
      <div
        style={{
          height: `${ props.borderWidth }px`,
          width: '100%',
          background: props.borderColor,
          position: 'absolute',
          bottom: 0,
          cursor: 'ns-resize',
        }}
        onMouseDown={ (e) => {
          e.stopPropagation()
          props.mouseDownHandler(e, props.index, 'resize', 'down')
        }}
        onMouseMove={ (e) => { e.stopPropagation() } }
      />
    </div>
  )
}

export default SelectedAreaBlock
