import React, { FC, useEffect, useState } from 'react'
import CanvasApiClass from '../utils/CanvasApiClass'
import SelectAreaApiClass from '../utils/SelectAreaApiClass'
import SelectedAreaBlock from './SelectedAreaBlock'

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
  let selectAreaApiObj: SelectAreaApiClass | null = null

  useEffect(() => {
    if (canvasApiObj) return

    const canvasElement = document.getElementById(id) as HTMLCanvasElement

    if (canvasElement) {
      canvasApiObj = new CanvasApiClass(canvasElement, borderWidth, borderColor)
      selectAreaApiObj = new SelectAreaApiClass()

      console.log('API :: ', selectAreaApiObj)

      canvasElement.addEventListener('area-selected', ((e: CustomEvent) => {
        setAreasList(oldList => {
          return [...oldList, { ...e.detail }]
        })
      }) as EventListener)
    }
  }, [])

  return (
    <div style={{
      width,
      height,
      background: `url('${ imageUrl }') no-repeat center`,
      backgroundSize: 'contain',
      position: 'relative',
      borderStyle: 'solid',
    }}>
      <canvas id={ id } width={ width } height={ height } />

      { areasList.map((areaItem, i) => (
        <SelectedAreaBlock
          key={ i }
          index={ i }
          borderWidth={ borderWidth }
          borderColor={ borderColor }
          coordinates={ areaItem }
        />
      )) }
    </div>
  )
}

export default AreaSelectContainer
