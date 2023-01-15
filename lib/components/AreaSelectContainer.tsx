import React, { FC, useEffect, useState } from 'react'
import CanvasApiClass from '../utils/CanvasApiClass'
import SelectedAreaBlock from './SelectedAreaBlock'
import { DirectionType, OperationType, IAreaData } from '../types'

export interface IProps {
  id?: string,
  width?: number,
  height?: number,
  borderWidth?: number,
  borderColor?: string,
  imageUrl: string,
  saveData: (data: IAreaData) => void,
  initAreas?: IAreaData[]
}

export interface ISelectedAreaCoordinates {
  x: number,
  y: number,
  width: number,
  height: number,
}

const resizingItemStartPos = {
  direction: '',
}

/*
* Add 'mounted' to prevent double calling useEffect
* Issue: https://stackoverflow.com/questions/72489140/react-18-strict-mode-causing-component-to-render-twice
 */
let mounted = false
let movingAreaIndex: number | null = null
let resizingAreaIndex: number | null = null

const AreaSelectContainer: FC<IProps> = ({
  id = 'imageSelectArea',
  width = 400,
  height = 300,
  borderWidth = 2,
  borderColor = 'black',
  imageUrl = '',
  saveData,
  initAreas = [],
}) => {
  const [areasList, setAreasList] = useState<IAreaData[]>([ ...initAreas ])
  const [canvasApiObj, setCanvasApiObj] = useState<CanvasApiClass | null>(null)

  const mouseUpHandler = () => {
    movingAreaIndex = null
    resizingAreaIndex = null
  }

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (movingAreaIndex !== null) {
      setAreasList(areas => {
        return areas.map((area, index) => {
          if (index === movingAreaIndex) {
            area.coordinates.x += e.movementX / 2
            area.coordinates.y += e.movementY / 2
          }

          return area
        })
      })

    } else if (resizingAreaIndex !== null) {
      setAreasList((areas) => {
        if (resizingAreaIndex !== null) {
          const area = { ...areasList[resizingAreaIndex] }

          switch (resizingItemStartPos.direction) {
            case 'left':
              area.coordinates.x += e.movementX / 2
              area.coordinates.width -= e.movementX / 2
              break
            case 'right':
              area.coordinates.width += e.movementX / 2
              break
            case 'top':
              area.coordinates.y += e.movementY / 2
              area.coordinates.height -= e.movementY / 2
              break
            case 'down':
              area.coordinates.height += e.movementY / 2
          }

          areas[resizingAreaIndex] = area
        }

        return [ ...areas ]
      })
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
    if (canvasApiObj || mounted) return

    const canvasElement = document.getElementById(id) as HTMLCanvasElement

    if (canvasElement) {
      setCanvasApiObj(new CanvasApiClass(canvasElement, borderWidth, borderColor))

      canvasElement.addEventListener('area-selected', ((e: CustomEvent) => {
        setAreasList(oldList => {
          const areaItem = {
            index: oldList.length,
            lineWidth: borderWidth,
            color: borderColor,
            comment: '',
            coordinates: { ...e.detail },
          }

          return [ ...oldList, areaItem ]
        })
      }) as EventListener)
    }

    mounted = true
  }, [])

  useEffect(() => {
    canvasApiObj?.setLineColor(borderColor)
  }, [borderColor])

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
          areaData={ areaItem }
          mouseDownHandler={ mouseDownHandler }
          deleteHandler={ areaDeleteHandler }
          saveData={ saveData }
        />
      )) }
    </div>
  )
}

export default AreaSelectContainer
