
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import StarRating from './StarRating';


const Cronometro = () => {
  
  const durationInMinutes = 2;
  const timeAlertInMinutes = 1;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeLeft, setTimeLeft] = useState({});
  const [running, setRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertClosed, setAlertClosed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    if (running) {
      const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
          timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
        return timeLeft;
      };

      const updateTimer = () => {
        setTimeLeft(calculateTimeLeft());
      };

      const startTimer = () => {
        updateTimer();
        setTimeout(startTimer, 1000);
      };

      const endDate = moment()
        .add(durationInMinutes, 'minutes')
        .format('YYYY-MM-DD HH:mm:ss');
      setEndDate(endDate);
      startTimer();
    } 
  }, [running, durationInMinutes]);

  useEffect(() => {
    if (timeLeft.minutes === 0 && !alertClosed) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setAlertClosed(true);
      }, 3000); 
    }
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0 && !showModal) {
      setShowModal(true)
    }
  }, [timeLeft, alertClosed, showAlert, showModal]);
  
  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div>
      {/* Contenedor con el cronómetro */}
      <div className="flex flex-col items-center justify-center bg-white w-auto h-full rounded space-y-3">
        <h2 className="text-codecolor font-semibold text-lg text-center">
          Tiempo de Sesión
        </h2>
        {/* Tiempo */}
        <div className="relative">
          {showAlert && (
            <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
              <div className="bg-purple-600 rounded p-4">
                <p className="text-white">
                  Falta {timeAlertInMinutes} minutos para Finalizar!
                </p>
              </div>
            </div>
          )}
        </div>
        <div
          className="flex items-center justify-between space-x-14"
          id="tiempo"
        >
          <h3 className="text-gray-800 font-semibold text-2xl text-center">
            {timeLeft.minutes
              ? timeLeft.minutes.toString().padStart(2, '0')
              : '00'}{' '}
            {/* Minutos */}
          </h3>
          <div className="h-full border"></div>
          <h3 className="text-gray-800 font-semibold text-2xl text-center">
            {timeLeft.seconds
              ? timeLeft.seconds.toString().padStart(2, '0')
              : '00'}{' '}
            {/* Segundos */}
          </h3>
        </div>
        {/* Botones */}
        <div className="flex items-center justify-between space-x-11 px-4">
          <button
            className="text-white bg-green-600 font-semibold text-center rounded px-4 py-2 active:scale-90 transition duration-150"
            onClick={() => {
              setRunning(true);
            }}
          >
            Empezar
          </button>
        </div>
      </div>
      M
    </div>
  );
};

export default Cronometro;