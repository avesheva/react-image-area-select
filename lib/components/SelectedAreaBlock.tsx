import React, { FC, FormEvent, useState } from 'react'
import { DirectionType, OperationType, IAreaData } from '../types'

export interface Iprops {
  mouseDownHandler: (e: React.MouseEvent, i: number, operation: OperationType, direction?: DirectionType) => void,
  deleteHandler: (i: number) => void,
  saveData: (data: IAreaData) => void,
  areaData: IAreaData,
  isActive: boolean,
}

const SelectedAreaBlock: FC<Iprops> = (props: Iprops) => {
  const [cursor, setCursor] = useState<'grab' | 'grabbing'>('grab')
  const lineWidth = props.areaData.lineWidth > 0 ? props.areaData.lineWidth : 1
  let commentText = ''

  const inputHandler = (e: FormEvent<HTMLDivElement>) => {
    commentText = e.currentTarget.textContent || ''
  }
  const commentFieldBlurHandler = () => {
    const data = {
      ...props.areaData,
      comment: commentText,
    }

    props.saveData(data)
  }

  return (
    <div
      style={{
        position: 'absolute',
        width: `${ props.areaData.coordinates.width }px`,
        height: `${ props.areaData.coordinates.height }px`,
        top: `${ props.areaData.coordinates.y }px`,
        left: `${ props.areaData.coordinates.x }px`,
        userSelect: 'none',
      }}
      className={ `selected-area ${ props.isActive ? 'active-area' : '' }` }
    >
      {/* Top border */}
      <div
        style={{
          height: `${ lineWidth }px`,
          background: props.areaData.color,
          top: 0,
          cursor: 'ns-resize',
        }}
        onMouseDown={ (e) => {
          e.stopPropagation()
          props.mouseDownHandler(e, props.areaData.index, 'resize', 'top')
        }}
        onMouseMove={ (e) => { e.stopPropagation() } }
      />
      {/* Left border */}
      <div
        style={{
          width: `${ lineWidth }px`,
          height: '100%',
          background: props.areaData.color,
          position: 'absolute',
          left: 0,
          bottom: 0,
          cursor: 'ew-resize',
        }}
        onMouseDown={ (e) => {
          e.stopPropagation()
          props.mouseDownHandler(e, props.areaData.index, 'resize', 'left')
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

          props.mouseDownHandler(e, props.areaData.index, 'dragging')
        }}
        onMouseUp={ () => {
          setCursor('grab')
        }}
        onContextMenu={ (e) => { e.stopPropagation() }}
      >
        <button
          style={{
            position: 'absolute',
            right: `${ lineWidth }px`,
            top: `${ lineWidth }px`,
            userSelect: 'none',
          }}
          className="delete-button"
          onClick={ () => { props.deleteHandler(props.areaData.index) } }
        >
          &times;
        </button>

        <div
          contentEditable
          suppressContentEditableWarning
          className="area-comment"
          style={{
            position: 'absolute',
            top: 'calc(100% + 5px)',
            maxWidth: '200px',
            minWidth: '120px',
            padding: '0.5rem',
            background: 'white',
          }}
          onInput={ inputHandler }
          onBlur={ commentFieldBlurHandler }
        >
          { props.areaData.comment }
        </div>
      </div>

      {/* Right border */}
      <div
        style={{
          width: `${ lineWidth }px`,
          height: '100%',
          background: props.areaData.color,
          position: 'absolute',
          right: 0,
          bottom: 0,
          cursor: 'ew-resize',
        }}
        onMouseDown={ (e) => {
          e.stopPropagation()
          props.mouseDownHandler(e, props.areaData.index, 'resize', 'right')
        }}
        onMouseMove={ (e) => { e.stopPropagation() } }
      />

      {/* Bottom border */}
      <div
        style={{
          height: `${ lineWidth }px`,
          width: '100%',
          background: props.areaData.color,
          position: 'absolute',
          bottom: 0,
          cursor: 'ns-resize',
        }}
        onMouseDown={ (e) => {
          e.stopPropagation()
          props.mouseDownHandler(e, props.areaData.index, 'resize', 'down')
        }}
        onMouseMove={ (e) => { e.stopPropagation() } }
      />
    </div>
  )
}

export default SelectedAreaBlock
