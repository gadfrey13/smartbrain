import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({imageUrl,box}) => {
    let styles;
    if(Object.keys(box).length === 0 && box.constructor === Object){
        styles = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            height: 0,
            width: 0
        }
    }else{
        styles =  {
        top:box.topRow, 
        right: box.rightCol, 
        bottom: box.botRow, 
        left: box.leftCol,
        }
    }

    return(
        <div className="flex justify-center ma">
            <div className='absolute mt2'>
            <img id='inputimage' src={imageUrl} alt="ImageRecognition" width="500px" height="auto" />
            <div className='bounding-box' style={styles}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;