import React, { useState } from 'react';
import Star from './assets/Star.svg';
import StarVacia from './assets/StarVacia.svg';

const StarRating = ({onCloseModal}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (index) => {
    setRating(index);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Aquí puedes realizar el envío de los datos a la base de datos
    console.log('Valoración:', rating);
    console.log('Comentario:', comment);
    onCloseModal();
  };

  return (
    <div>
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          const starIndex = index + 1;
          return (
            <button
              type="button"
              key={starIndex}
              className={starIndex <= rating ? 'on' : 'off'}
              onClick={() => handleRatingChange(starIndex)}
            >
              <img
                src={starIndex <= rating ? Star : StarVacia}
                alt="star"
                className="star-image"
              />
            </button>
          );
        })}
      </div>
      <div className="flex-col bg-gray-50 px-4 pb-12 pt-10 sm:flex sm:flex-row justify-center sm:px-6">
        <div>
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Déjanos tu opinión del tutor"
            className="w-64 h-30 p-2 border border-gray-300 rounded p-4 text-lg "
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-3 inline-flex w-full justify-center rounded-lg bg-codecolor px-12 py-5 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-codecolordark transition-all ease-in-out duration-200 sm:mt-0 sm:w-auto"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarRating;
