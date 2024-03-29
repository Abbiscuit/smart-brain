import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="ma4 mt0">
      <p className="f3">
        {`This Magic Brain will detect faces in your pictures...`}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            onChange={onInputChange}
            type="text"
            className="f4 pa2 w-70 center"
          />
          <button
            onClick={onButtonSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
