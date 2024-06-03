"use client"

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import NewEventModal from './NewEventModal';
import NewScheduleModal from './NewScheduleModal';
import './SchedulerPage.css';
import { Button, Typography } from "@mui/material"
import { team_members } from '@/common_mockups/team_members';

interface Event {
  title: string;
  date: string;
  type: string;
  participants: number[];
}

interface Schedule {
  title: string;
  participants: number[];
  date: string;
  time: string;
  place: string;
}

const SchedulerPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);
  const [selectedDateSchedules, setSelectedDateSchedules] = useState<Schedule[]>([]);

  const addEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  const addSchedule = (schedule: Schedule) => {
    setSchedules([...schedules, schedule]);
  };

  const handleDateClick = (arg: any) => {
    const dateStr = arg.dateStr;
    const dayEvents = events.filter(event => event.date === dateStr);
    const daySchedules = schedules.filter(schedule => schedule.date === dateStr);

    setSelectedDate(dateStr);
    setSelectedDateEvents(dayEvents);
    setSelectedDateSchedules(daySchedules);
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD" 형식의 오늘 날짜
    setSelectedDate(today);
  }, []);

  return (
    <div className="scheduler-container">
      <div className="button-grid">
        <Button className="transparent-button" variant="outlined" onClick={() => setIsEventModalOpen(true)}>New Event</Button>
        <Button className="transparent-button" variant="outlined" onClick={() => setIsScheduleModalOpen(true)}>New Meeting</Button>
      </div>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={[...events, ...schedules.map(schedule => ({ title: schedule.title, date: schedule.date }))]}
          dateClick={handleDateClick}
          height={500}
        />
      </div>
      {selectedDate && (
        <div className="details-container">
          <h3>Details for {selectedDate}</h3>
          {selectedDateEvents.length > 0 && (
            <div className="details-box">
              <h2>Event</h2>
              <ul>
                {selectedDateEvents.map((event, index) => (
                  <li key={index}>
                    <strong>Name:</strong> {event.title} <br />
                    <strong>Type:</strong> {event.type} <br />
                    <strong>Responsible:</strong> 
                        <Typography>
                            {event.participants.map((memberId, index) => {
                                const member = team_members.find(m => m.id === memberId.toString());
                                return member ? member.name : `Unknown (ID: ${memberId})`;
                            }).join(', ')}
                        </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedDateSchedules.length > 0 && (
            <div className="details-box">
              <h2>Schedule</h2>
              <ul>
                {selectedDateSchedules.map((schedule, index) => (
                  <li key={index}>
                    <strong>Topic:</strong> {schedule.title} <br />
                    <strong>Participants:</strong> {schedule.participants} <br />
                    <strong>Time:</strong> {schedule.time} <br />
                    <strong>Place:</strong> {schedule.place}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedDateEvents.length === 0 && selectedDateSchedules.length === 0 && (
            <p>No events or schedules for this date.</p>
          )}
        </div>
      )}
      <NewEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        addEvent={addEvent}
      />
      <NewScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        addSchedule={addSchedule}
      />
    </div>
  );
};

export default SchedulerPage;
