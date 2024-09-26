import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import './calendar.css';
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/authConstants";
import Sidebar from '../../components/sidebar';


const Calendar = () => {
  const auth = useAuth();
  const user = auth.getUser();
  const getUserType = (id: number) => {
    switch (id) {
      case 1: return "Sisben";
      case 2: return "Afiliado";
      case 3: return "Particular";
      default: return "Desconocido";
    }
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [disabledTimes, setDisabledTimes] = useState<Date[]>([]);

  const generateAvailableTimes = (date: Date): Date[] => {
    const times: Date[] = [];
    const start = new Date(date);
    start.setHours(7, 0, 0, 0);

    const end = new Date(date);
    end.setHours(17, 0, 0, 0);

    while (start < end) {
      const hours = start.getHours();
      if (hours < 12 || hours >= 14) {
        times.push(new Date(start));
      }
      start.setMinutes(start.getMinutes() + 30);
    }

    return times;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: Date | null) => {
    if (time) {
      setSelectedTime(time);
      setDisabledTimes([...disabledTimes, time]);
    }
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      alert(`Cita agendada para ${format(selectedDate, 'yyyy/MM/dd')} a las ${format(selectedTime, 'h:mm aa')}`);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="calendar-container">
        <header>
          <h4>
            Bienvenido {auth.getUser()?.name ?? ""}, usted es {getUserType(auth.getUser()?.roleId ?? 0)} con número de identificación {auth.getUser()?.username ?? ""}
          </h4>
        </header>
        <h1>Seleccione una fecha para su cita</h1>
        <div className="date-picker-wrapper">
          <div className="large-calendar">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              minDate={new Date()}
            />
          </div>
          {selectedDate && (
            <div className="time-picker-wrapper">
              <h2>Seleccione una hora</h2>
              <DatePicker
                selected={selectedTime}
                onChange={handleTimeSelect}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                includeTimes={selectedDate ? generateAvailableTimes(selectedDate).filter(
                  (time) => !disabledTimes.some((disabledTime) => disabledTime.getTime() === time.getTime())
                ) : []}
                timeCaption="Hora"
                dateFormat="h:mm aa"
                placeholderText="Seleccione una hora"
              />
            </div>
          )}
        </div>
        <button className="schedule-button" onClick={handleSubmit} disabled={!selectedDate || !selectedTime}>
          Agendar cita
        </button>
      </div>
    </>
  );
};

export default Calendar;