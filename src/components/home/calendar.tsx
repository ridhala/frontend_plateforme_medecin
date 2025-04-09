import { useState, useEffect } from 'react';
import { format, addDays, isToday, isSameDay, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

type Appointment = {
  id: string;
  title: string;
  client: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  status: 'confirmed' | 'pending' | 'cancelled';
};

const AppointmentAgenda = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    title: '',
    client: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    endTime: '',
    description: '',
    status: 'pending',
  });

  // Generate sample data
  useEffect(() => {
    const sampleAppointments: Appointment[] = [
      {
        id: '1',
        title: 'Consultation médicale',
        client: 'Jean Dupont',
        date: format(new Date(), 'yyyy-MM-dd'),
        startTime: '',
        endTime: '',
        description: 'Première consultation',
        status: 'confirmed',
      }
    
    ];
    setAppointments(sampleAppointments);
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    if (viewMode === 'day') {
      setCurrentDate(date);
    }
  };

  const handlePrevPeriod = () => {
    setCurrentDate(addDays(currentDate, viewMode === 'day' ? -1 : -7));
  };

  const handleNextPeriod = () => {
    setCurrentDate(addDays(currentDate, viewMode === 'day' ? 1 : 7));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleAddAppointment = () => {
    const appointment: Appointment = {
      ...newAppointment,
      id: Math.random().toString(36).substring(2, 9),
    };
    setAppointments([...appointments, appointment]);
    setShowForm(false);
    setNewAppointment({
      title: '',
      client: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '10:00',
      description: '',
      status: 'pending',
    });
  };

  const generateWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(currentDate, i - currentDate.getDay()));
    }
    return days;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 8; i < 19; i++) {
      slots.push(`${i < 10 ? '0' + i : i}:00`);
      slots.push(`${i < 10 ? '0' + i : i}:30`);
    }
    return slots;
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appt) =>
      isSameDay(parseISO(appt.date), date)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Agenda de Rendez-vous</h1>
            <div className="text-gray-600">
              {format(currentDate, 'MMMM yyyy', { locale: fr })}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-md ${viewMode === 'day' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              Jour
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-md ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              Semaine
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={handlePrevPeriod}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={handleToday}
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Aujourd'hui
            </button>
            <button
              onClick={handleNextPeriod}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            + Nouveau Rendez-vous
          </button>
        </div>

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* Days Header */}
              <div className="grid grid-cols-8 border-b">
                <div className="p-2 border-r"></div>
                {generateWeekDays().map((day, index) => (
                  <div
                    key={index}
                    className={`p-2 text-center ${isToday(day) ? 'bg-blue-50' : ''}`}
                  >
                    <div className="font-medium">{format(day, 'EEE', { locale: fr })}</div>
                    <div
                      className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white' : ''}`}
                    >
                      {format(day, 'd')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-8">
                <div className="border-r">
                  {generateTimeSlots().map((time, index) => (
                    <div key={index} className="h-16 p-1 text-xs text-gray-500 text-right pr-2 border-b">
                      {time}
                    </div>
                  ))}
                </div>
                {generateWeekDays().map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`border-r ${isToday(day) ? 'bg-blue-50' : ''}`}
                    onClick={() => handleDateChange(day)}
                  >
                    {generateTimeSlots().map((time, timeIndex) => (
                      <div
                        key={timeIndex}
                        className="h-16 p-1 border-b relative"
                      >
                        {getAppointmentsForDate(day).map((appt) => {
                          const startHour = parseInt(appt.startTime.split(':')[0]);
                          const startMinute = parseInt(appt.startTime.split(':')[1]);
                          const endHour = parseInt(appt.endTime.split(':')[0]);
                          const endMinute = parseInt(appt.endTime.split(':')[1]);
                          const slotHour = parseInt(time.split(':')[0]);
                          const slotMinute = parseInt(time.split(':')[1]);
                          
                          if (
                            (slotHour > startHour || (slotHour === startHour && slotMinute >= startMinute)) &&
                            (slotHour < endHour || (slotHour === endHour && slotMinute < endMinute))
                          ) {
                            return (
                              <div
                                key={appt.id}
                                className={`absolute left-1 right-1 p-2 rounded-md shadow-sm border-l-4 ${getStatusColor(appt.status)} ${appt.status === 'confirmed' ? 'border-green-500' : appt.status === 'pending' ? 'border-yellow-500' : 'border-red-500'}`}
                                style={{
                                  top: `${((startHour - 8) * 2 + (startMinute / 30)) * 16}px`,
                                  height: `${((endHour - startHour) * 2 + (endMinute - startMinute) / 30) * 16}px`,
                                }}
                              >
                                <div className="font-medium text-sm truncate">{appt.title}</div>
                                <div className="text-xs truncate">{appt.client}</div>
                                <div className="text-xs">
                                  {appt.startTime} - {appt.endTime}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Day View */}
        {viewMode === 'day' && (
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="col-span-1 border-r">
              {generateTimeSlots().map((time, index) => (
                <div key={index} className="h-16 p-2 text-sm text-gray-500 border-b">
                  {time}
                </div>
              ))}
            </div>
            <div className="col-span-4">
              {generateTimeSlots().map((time, index) => (
                <div key={index} className="h-16 p-2 border-b relative">
                  {getAppointmentsForDate(currentDate).map((appt) => {
                    const startHour = parseInt(appt.startTime.split(':')[0]);
                    const startMinute = parseInt(appt.startTime.split(':')[1]);
                    const endHour = parseInt(appt.endTime.split(':')[0]);
                    const endMinute = parseInt(appt.endTime.split(':')[1]);
                    const slotHour = parseInt(time.split(':')[0]);
                    const slotMinute = parseInt(time.split(':')[1]);
                    
                    if (
                      (slotHour > startHour || (slotHour === startHour && slotMinute >= startMinute)) &&
                      (slotHour < endHour || (slotHour === endHour && slotMinute < endMinute))
                    ) {
                      return (
                        <div
                          key={appt.id}
                          className={`absolute left-2 right-2 p-2 rounded-md shadow-sm border-l-4 ${getStatusColor(appt.status)} ${appt.status === 'confirmed' ? 'border-green-500' : appt.status === 'pending' ? 'border-yellow-500' : 'border-red-500'}`}
                          style={{
                            top: `${((startHour - 8) * 2 + (startMinute / 30)) * 16}px`,
                            height: `${((endHour - startHour) * 2 + (endMinute - startMinute) / 30) * 16}px`,
                          }}
                        >
                          <div className="font-medium">{appt.title}</div>
                          <div className="text-sm">{appt.client}</div>
                          <div className="text-xs">
                            {appt.startTime} - {appt.endTime}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointment Form Modal */}
        {showForm && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-300 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Nouveau Rendez-vous</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titre</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newAppointment.title}
                    onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newAppointment.client}
                    onChange={(e) => setNewAppointment({ ...newAppointment, client: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Statut</label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={newAppointment.status}
                      onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value as any })}
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmé</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Heure de début</label>
                    <input
                      type="time"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={newAppointment.startTime}
                      onChange={(e) => setNewAppointment({ ...newAppointment, startTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Heure de fin</label>
                    <input
                      type="time"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={newAppointment.endTime}
                      onChange={(e) => setNewAppointment({ ...newAppointment, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows={3}
                    value={newAppointment.description}
                    onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddAppointment}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentAgenda;