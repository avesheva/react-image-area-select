# react-image-area-select

React typescript lib, with ability to select area on the image and leave comments.

[screencast-localhost_5173-2023.01.17-22_55_14.webm](https://user-images.githubusercontent.com/12416010/213012943-e11ba50a-4bc7-4d84-8e22-8b637d48ebff.webm)

## Installation
```shell
# with npm
npm install react-image-area-select
```
```shell
# with yarn
yarn add react-image-area-select
```

## Basic usage
```jsx
import ImageSelectArea from 'react-image-area-select';

const saveDataHandler = (data: IAreaData) => {
  console.log('Area data : ', data)
}
```
```jsx
<ImageSelectArea
  imageUrl="https://yourimageurl.jpg"
  width={ 900 }
  height={ 600 }
  borderColor={ '#0FB839' }
  borderWidth={ 3 }
  saveData={ saveDataHandler }
/>
```

## Types
```typescript
interface IAreaData {
  index: number,
  lineWidth: number,
  color: string,
  comment: string,
  coordinates: {
    width: number,
    height: number,
    x: number,
    y: number,
  },
}
```

## Props
| NAME              | TYPE                      | DEFAULT                  | DESCRIPTION                |
|-------------------|---------------------------|--------------------------|----------------------------|
| imageUrl          | String                    |              -           | Image url. Required        |
| id?               | String                    | imageSelectArea          | Component id               |
| width? (px)       | Number                    | 400                      | Component width            |
| height? (px)      | Number                    | 300                      | Component height           |
| borderWidth? (px) | Number                    | 2                        | Selected area border width |
| borderColor?      | String                    | #000000                  | Selected area border color |
| initAreas?        | IAreaData[]               | imageSelectArea          | Preinited areas values     |
| saveData?         | (data: IAreaData) => void | () => {} -               | Fires on comment field blur event, or area position or size changing |

## Styling
Styling on you. Here classes you can use for that: 

| NAME          | DESCRIPTION                            |
|---------------|----------------------------------------|
| selected-area | Selected area wrapper class            | 
| active-area   | Added to selected area when it focused |
| area-comment  | Comment text block class               | 
| delete-button | Delete area button class               |    
