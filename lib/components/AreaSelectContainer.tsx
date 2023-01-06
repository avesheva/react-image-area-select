import React, { FC, useEffect, useState } from 'react'
import CanvasApiClass from '../utils/CanvasApiClass'
import SelectedAreaBlock from './SelectedAreaBlock'
import { DirectionType, OperationType } from '../types'

export interface IProps {
  id?: string,
  width?: number,
  height?: number,
  borderWidth?: number,
  borderColor?: string,
  imageUrl: string,
}

export interface ISelectedAreaCoordinates {
  x: number,
  y: number,
  width: number,
  height: number,
}

let movingAreaIndex: number | null = null
let resizingAreaIndex: number | null = null

const AreaSelectContainer: FC<IProps> = ({
  id = 'imageSelectArea',
  width = 400,
  height = 300,
  borderWidth = 2,
  borderColor = 'black',
  imageUrl = '',
}) => {
  const [areasList, setAreasList] = useState<ISelectedAreaCoordinates[]>([])
  let canvasApiObj: CanvasApiClass | null = null

  const draggingItemStartPos = {
    offsetX: 0,
    offsetY: 0,
  }

  const resizingItemStartPos = {
    direction: '',
  }

  const mouseUpHandler = () => {
    draggingItemStartPos.offsetY = 0
    draggingItemStartPos.offsetX = 0

    movingAreaIndex = null
    resizingAreaIndex = null
  }

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (movingAreaIndex !== null) {
      requestAnimationFrame(() => {
        setAreasList(areas => {
          if (movingAreaIndex !== null) {
            const area = { ...areas[movingAreaIndex] }
            area.x += e.movementX
            area.y += e.movementY

            areas[movingAreaIndex] = area
          }

          return [...areas]
        })
      })
    } else if (resizingAreaIndex !== null) {
      console.log('RESIZING ... ', e)
    }
  }

  const mouseDownHandler = (
    e: React.MouseEvent,
    index: number,
    operation: OperationType,
    direction?: DirectionType,
  ) => {
    if (operation === 'dragging') {
      movingAreaIndex = index
    } else if (direction && operation === 'resize') {
      resizingItemStartPos.direction = direction
      resizingAreaIndex = index
    }
  }

  const areaDeleteHandler = (index: number) => {
    setAreasList(areas => {
      const areasClone = [ ...areas ]
      areasClone.splice(index, 1)

      return [ ...areasClone ]
    })
  }

  useEffect(() => {
    if (canvasApiObj) return

    const canvasElement = document.getElementById(id) as HTMLCanvasElement

    if (canvasElement) {
      canvasApiObj = new CanvasApiClass(canvasElement, borderWidth, borderColor)

      canvasElement.addEventListener('area-selected', ((e: CustomEvent) => {
        setAreasList(oldList => {
          return [...oldList, { ...e.detail }]
        })
      }) as EventListener)
    }
  }, [])

  return (
    <div
      style={{
        width,
        height,
        background: `url('${ imageUrl }') no-repeat center`,
        backgroundSize: 'contain',
        position: 'relative',
        borderStyle: 'solid',
      }}
      onMouseMove={ mouseMoveHandler }
      onMouseUp={ mouseUpHandler }
    >
      <canvas id={ id } width={ width } height={ height } />

      { areasList.map((areaItem, i) => (
        <SelectedAreaBlock
          key={ i }
          index={ i }
          borderWidth={ borderWidth }
          borderColor={ borderColor }
          coordinates={ areaItem }
          mouseDownHandler={ mouseDownHandler }
          deleteHandler={ areaDeleteHandler }
        />
      )) }
    </div>
  )
}

export default AreaSelectContainer
