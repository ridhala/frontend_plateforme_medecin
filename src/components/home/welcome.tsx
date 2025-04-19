import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

const InteractiveCalendar = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Example Event',
      start: new Date(2023, 10, 15, 10, 0),
      end: new Date(2023, 10, 15, 12, 0),
    },
  ]);

  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedSlot(slotInfo);
    
    // Example: Create a new event when a slot is clicked
    const newEvent: Event = {
      id: events.length + 1,
      title: `New Event ${events.length + 1}`,
      start: slotInfo.start,
      end: slotInfo.end,
    };
    
    setEvents([...events, newEvent]);
  };
const [url, seturl]=useState('')
  const handleSelectEvent = (event: Event) => {
    // Handle event click (e.g., show details)
    alert(`Event clicked: ${event.title}\nFrom: ${event.start.toLocaleString()}\nTo: ${event.end.toLocaleString()}`);
  };
const [file, setfile]= useState<File>()
const uploadimage=async ()=>{
  const form = new FormData();
if(file)
 ( form.append("file", file),
    form.append('upload_preset', "medplat"),
 await axios.post("https://api.cloudinary.com/v1_1/daerk3xrm/upload", form).then((res)=>seturl(res.data.secure_url)))
}
  return (
    <div style={{ height: '800px' }}>
     
<div>
  <input className='bg-indigo-200' type='file'
 onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setfile(e.target.files?.[0]);}}/>

 <h1 className='bg-teal-700 text-center'>mettre votre photo  </h1>
 

  <button className='bg-blue-200 ' onClick={uploadimage}
  >upload now</button></div>
<div><img src={url}></img></div>


<br></br>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views.MONTH}
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        selectable={true}  // Enable slot selection
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onDoubleClickEvent={(event) => console.log('Double clicked event', event)}
        onView={(view) => console.log('View changed to', view)}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};

export default InteractiveCalendar;