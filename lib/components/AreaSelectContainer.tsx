import React, { FC, useEffect, useState, useRef } from 'react'
import CanvasApiClass from '../utils/CanvasApiClass'
import SelectedAreaBlock from './SelectedAreaBlock'
import { DirectionType, OperationType, IAreaData } from '../types'

export interface IProps {
  id?: string,
  width?: number,
  height?: number,
  borderWidth?: number,
  borderColor?: string,
  imageUrl?: string,
  saveData?: (data: IAreaData) => void,
  initAreas?: IAreaData[]
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
let workingAreaCoordinates: DOMRect

const AreaSelectContainer: FC<IProps> = ({
  id = 'imageSelectArea',
  width = 400,
  height = 300,
  borderWidth = 2,
  borderColor = '#000000',
  imageUrl = '',
  saveData = () => {},
  initAreas = [],
}) => {
  const [areasList, setAreasList] = useState<IAreaData[]>([ ...initAreas ])
  const [canvasApiObj, setCanvasApiObj] = useState<CanvasApiClass | null>(null)
  const [activeAreaIndex, setActiveAreaIndex] = useState<number | null>(null)
  const areaColor = useRef(borderColor)
  const areaLineWidth = useRef(borderWidth)

  const updateAreasList = (area: IAreaData, index: number) => {
    setAreasList(oldList => oldList.map(a => {
      if (index === a.index) {
        return area
      }
      return a
    }))
  }

  const mouseUpHandler = () => {
    if (movingAreaIndex !== null) {
      saveData(areasList[movingAreaIndex])
    } else if (resizingAreaIndex !== null) {
      saveData(areasList[resizingAreaIndex])
    }

    movingAreaIndex = null
    resizingAreaIndex = null
  }

  const checkIsInWorkingArea = ({ coordinates }: IAreaData, { movementX, movementY }: React.MouseEvent) => {
    if (!workingAreaCoordinates) return

    return  coordinates.x + movementX > 0
      && coordinates.y + movementY > 0
      && (coordinates.y + movementY + coordinates.height < workingAreaCoordinates.height)
      && (coordinates.x + movementX + coordinates.width < workingAreaCoordinates.width)
  }

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (movingAreaIndex !== null) {
      const inArea = checkIsInWorkingArea({ ...areasList[movingAreaIndex] }, e)

      if (inArea) {
        setAreasList(areas => {
          return areas.map((area, index) => {
            if (index === movingAreaIndex) {
              area.coordinates.x += e.movementX / 2
              area.coordinates.y += e.movementY / 2
            }

            return area
          })
        })
      } else {
        mouseUpHandler()
      }
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
    setActiveAreaIndex(index)

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
      workingAreaCoordinates = canvasElement.getBoundingClientRect()
      setCanvasApiObj(new CanvasApiClass(canvasElement, borderWidth, borderColor))

      canvasElement.addEventListener('area-selected', ((e: CustomEvent) => {
        setAreasList(oldList => {
          const areaItem = {
            index: oldList.length,
            lineWidth: areaLineWidth.current,
            color: areaColor.current,
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
    areaColor.current = borderColor

    if (activeAreaIndex !== null) {
      const a = { ...areasList[activeAreaIndex] }
      a.color = borderColor

      updateAreasList(a, activeAreaIndex)
    }
  }, [borderColor])

  useEffect(() => {
    canvasApiObj?.setLineWidth(borderWidth)
    areaLineWidth.current = borderWidth

    if (activeAreaIndex !== null) {
      const a = areasList[activeAreaIndex]
      a.lineWidth = borderWidth

      updateAreasList(a, activeAreaIndex)
    }
  }, [borderWidth])

  return (
    <div
      style={{
        width,
        height,
        background: `url('${ imageUrl }') no-repeat center`,
        backgroundSize: 'contain',
        position: 'relative',
      }}
      onMouseDown={() => { setActiveAreaIndex(null) }}
      onMouseMove={ mouseMoveHandler }
      onMouseUp={ mouseUpHandler }
      onMouseLeave={ mouseUpHandler }
    >
      <canvas id={ id } width={ width } height={ height } />

      { areasList.map((areaItem, i) => (
        <SelectedAreaBlock
          key={ i }
          isActive={ areaItem.index === activeAreaIndex }
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
