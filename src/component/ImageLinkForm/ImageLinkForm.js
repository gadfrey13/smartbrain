import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className="center f3">{'This Magin Brain will detect faces in you pictures. Give it a try!!!'}</p>
            <div className="center">
                <div className="pa4 br3 shadow-5 form center">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib whit bg-light-purple" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;