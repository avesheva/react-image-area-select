import React, { ChangeEvent, useState } from 'react'
import ImageSelectArea from 'react-image-area-select'

function App() {
  const [color, setColor] = useState<string>('#FFFFFF')
  const [lineWidth, setLineWidth] = useState<number>(2)
  const saveData = (data: any) => {
    console.log('Save data handler :: ', data)
  }

  return (
    <div className="w-full h-screen bg-stone-400 flex justify-center items-center">
      <div className="bg-white max-w-screen-lg shadow-xl p-4">
        <ImageSelectArea
          width={ 900 }
          height={ 700 }
          borderWidth={ lineWidth }
          imageUrl="https://kruti.com.ua/ckeditor/kcfinder/upload/images/Pride_rocx81_1.jpg"
          borderColor={ color }
          saveData={ saveData }
        />

        <div className="shadow-inner p-4">
          <div className="flex justify-between">
            <label
              htmlFor="line_color"
              className="block mb-2 text-xl font-bolder text-gray-900 dark:text-white"
            >
              Select color:
            </label>
            <input
              type="color"
              id="line_color"
              value={ color }
              className=" w-24 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500
                focus:border-blue-500 block p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={ (e: ChangeEvent) => { setColor((e.target as HTMLInputElement).value) } }
            />
          </div>

          <div className="flex justify-between mt-1">
            <label
              htmlFor="line_width"
              className="block mt-1 text-xl font-bolder text-gray-900 dark:text-white"
            >
              Select line width:
            </label>
            <input
              type="number"
              id="line_width"
              value={ lineWidth }
              className=" w-24 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500
                focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={ (e: ChangeEvent) => { setLineWidth(+(e.target as HTMLInputElement).value) } }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
