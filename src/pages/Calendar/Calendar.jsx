import "./Calendar.scss";
import { useRef, useEffect, useState, memo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import ExternalEvent from "../../components/ExternalEvent/ExternalEvent";
import Spinner from "../../components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserWorkoutPlans } from "../../features/workoutPlan/workoutPlanSlice";
import {
  calendarSlice,
  getUserCalendarEvents,
  resetCalendar,
  updateCalendarEvents,
} from "../../features/calendar/calendarSlice";
import { reset } from "../../features/auth/authSlice";

function Calendar() {
  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}80`
  );
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [externalEvents, setExternalEvents] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { workoutPlans, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.workoutPlan
  );
  const {
    userCalendarEvents,
    isCalendarError,
    isCalendarSuccess,
    isCalendarLoading,
    calendarMessage,
  } = useSelector((state) => state.calendar);

  let calendarRef = useRef(null);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isCalendarError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else if (user.token) {
      dispatch(getUserWorkoutPlans());
      dispatch(getUserCalendarEvents());
    }

    return () => {
      dispatch(reset());
      dispatch(resetCalendar());
    };
  }, [
    user,
    navigate,
    isError,
    message,
    dispatch,
    isCalendarError,
    calendarMessage,
  ]);

  useEffect(() => {
    const eventsWithColor = workoutPlans?.map((workout) => {
      return { ...workout /*color: randomColor*/ };
    });

    const userCalendarEventsWithUid = userCalendarEvents?.map((event) => {
      return { ...event, id: `external-${Math.random() * 10}` };
    });
    setCalendarEvents(userCalendarEventsWithUid);


    // const calendarEventsWithId = []
    // for (let i = 0; i < userCalendarEvents.length; i++) {
    //   const event = userCalendarEvents[i];
    //   const newEvent = {
    //     ...event,
    //     id: `external-${Math.random() * 10}`,
    //   };
    //   calendarEventsWithId.push(newEvent)
    // }

    // setCalendarEvents(calendarEventsWithId)
    setExternalEvents(eventsWithColor || []);
    console.log({ userCalendarEvents });
  }, [workoutPlans, userCalendarEvents]);

  // add external events
  const addEvent = () => {
    alert("navigating to workout new");
  };

  const handleEventClick = (e) => {
    console.log(e.event.id);
    if (
      window.confirm(
        `are you sure you want to delete this event?  ${e.event.title}`
      )
    ) {
      const filteredEvents = () =>
        calendarEvents.filter((event) => event.id !== e.event.id);

      dispatch(updateCalendarEvents());
      setCalendarEvents(filteredEvents);
    }
  };

  const handleClearMonth = () => {
    // get current calendar month
    const currentCalendarMonth =
      calendarRef.current.calendar.currentData.currentDate.getMonth();
    const currentCalendarYear =
      calendarRef.current.calendar.currentData.currentDate.getFullYear();

    const filteredEvents = calendarEvents.filter((event) => {
      const eventMonth = new Date(event.date).getMonth();
      const eventYear = new Date(event.date).getFullYear();
      return !(
        eventMonth === currentCalendarMonth && eventYear === currentCalendarYear
      );
    });
    setCalendarEvents(filteredEvents);
  };

  useEffect(() => {
    console.log("calendarEvents changed... updating");
    console.log({ calendarEvents });
    console.log("userCalendarEvents", userCalendarEvents);
  }, [calendarEvents]);

  // handle event receive
  const handleEventReceive = (eventInfo) => {
    console.log(eventInfo);
    const newEvent = {
      id: `external-${Math.random() * 10}`,
      title: eventInfo.event.title,
      date: eventInfo.event.startStr,
    };

    setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleEventDrop = (eventDropInfo) => {
    const modifiedEvent = calendarEvents.find(
      (event) => event.id === eventDropInfo.event.id
    );

    const updatedEvent = {
      ...modifiedEvent,
      date: eventDropInfo.event.startStr,
    };

    setCalendarEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const saveCalendarChanges = () => {
    const updatedUserEvents = {
      events: [...calendarEvents],
    };
    console.log(updatedUserEvents);
    dispatch(updateCalendarEvents(updatedUserEvents));
  };

  if (isLoading || isCalendarLoading) {
    return <Spinner />;
  }

  return (
    <section className="calendar-page">
      <div className="calendar__items">
        <h1>My Workouts</h1>
        <button type="button" onClick={handleClearMonth}>
          Clear month
        </button>
        <div id="external-events">
          {externalEvents?.map((event) => (
            <ExternalEvent key={event._id} event={event} />
          ))}
        </div>
      </div>

      <button onClick={saveCalendarChanges} type={"button"}>
        Save Changes
      </button>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: "prev,next today", // will normally be on the left. if RTL, will be on the right
            center: "",
            end: "title", // will normally be on the right. if RTL, will be on the left
          }}
          initialView={"dayGridMonth"}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={calendarEvents}
          droppable={true}
          eventReceive={handleEventReceive}
          // drop={handleDrop}
          eventClick={handleEventClick}
          // eventsSet={handleEventsSet}
          height={800}
          eventDrop={handleEventDrop}
          eventDurationEditable={false}
          dragRevertDuration={500}
          ref={calendarRef}
          eventDisplay="block"
        />
      </div>
    </section>
  );
}

export default Calendar;

// const loadEvents = () => {
//   const randomEvents = {
//     events: [
//       {
//         id: "external-4.181749697537551",
//         title: "Head day",
//         date: "2023-03-21",
//       },
//       {
//         id: "external-7.637935943145504",
//         title: "big Toe day",
//         date: "2023-03-23",
//       },
//       {
//         id: "external-8.01872979635769",
//         title: "smite me",
//         date: "2023-03-07",
//       },
//       {
//         id: "external-8.01872979635769",
//         title: "Sit day",
//         date: "2023-03-11",
//       },
//     ],
//   };
//   dispatch(updateCalendarEvents(randomEvents));
// };
// when click on event display details
// const handleDateClick = (e) => {
//   console.log(e);
//   const title = prompt("please enter title for event");
//   const calendarApi = e.view.calendar;
//   calendarApi.unselect();

//   if (title) {
//     calendarApi.addEvent({
//       id: `${e.dateStr}-${title}`,
//       title,
//       start: e.startStr,
//       end: e.endStr,
//       allDay: e.allDay,
//     });
//   }
// };

// const handleEventClick = (e) => {
//   if (
//     window.confirm(
//       `are you sure you want to delete this event?  ${e.event.title}`
//     )
//   ) {
//     e.event.remove();
//   }
// };

/*
import React, { useEffect, useState, useRef, memo } from "react";
import "./Calendar.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

const ExternalEvent = memo(({ event }) => {
  let elRef = useRef(null);

  useEffect(() => {
    let draggable = new Draggable(elRef.current, {
      eventData: function () {
        return { ...event, create: true };
      },
    });

    // a cleanup function
    return () => draggable.destroy();
  });

  return (
    <div
      ref={elRef}
      className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
      title={event.title}
      style={{
        backgroundColor: event.color,
        borderColor: event.color,
        cursor: "pointer",
      }}
    >
      <div className="fc-event-main">
        <div>
          <strong>{event.title}</strong>
        </div>
      </div>
    </div>
  );
});

function Calendar() {
  // initial state
  const [state, setState] = useState({
    weekendsVisible: true,
    externalEvents: [
      { title: "Art 1", color: "#0097a7", id: 34432 },
      { title: "Art 2", color: "#f44336", id: 323232 },
      { title: "Art 3", color: "#f57f17", id: 1111 },
      { title: "Art 4", color: "#90a4ae", id: 432432 },
    ],
    calendarEvents: [
      {
        id: "1",
        title: "All-day event",
        color: "#388e3c",
        start: "2020-12-12",
        allDay: true,
      },
      {
        id: "2",
        title: "Timed event",
        color: "#0097a7",
        start: "2020-12-07T09:00:00",
        end: "2020-12-10T17:00:00",
      },
    ],
  });

  // add external events
  const addEvent = () => {
    let newEvent = {
      id: "3433",
      title: "Timed event",
      color: "#333333",
      start: "2020-12-31T09:00:00",
      end: "2020-12-31T17:00:00",
      custom: "custom stuff",
    };

    setState((state) => {
      return {
        ...state,
        externalEvents: state.externalEvents.concat(newEvent),
      };
    });
  };

  // handle event receive
  const handleEventReceive = (eventInfo) => {
    const newEvent = {
      id: eventInfo.draggedEl.getAttribute("data-id"),
      title: eventInfo.draggedEl.getAttribute("title"),
      color: eventInfo.draggedEl.getAttribute("data-color"),
      start: eventInfo.date,
      end: eventInfo.date,
      custom: eventInfo.draggedEl.getAttribute("data-custom"),
    };

    setState((state) => {
      return {
        ...state,
        calendarEvents: state.calendarEvents.concat(newEvent),
      };
    });
  };

  return (
    <div className="App">
      <div style={{ float: "left", width: "25%" }}>
        <div style={{ margin: "0 0 20px" }}>
          <button onClick={addEvent}>add external event</button>
        </div>
        <div id="external-events">
          {state.externalEvents.map((event) => (
            <ExternalEvent key={event.id} event={event} />
          ))}
        </div>
      </div>
      <div style={{ float: "left", width: "75%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          dayMaxEvents={true}
          weekends={state.weekendsVisible}
          events={state.calendarEvents}
          editable={true}
          selectable={true}
          selectMirror={true}
          droppable={true}
          eventReceive={handleEventReceive}
          rerenderDelay={10}
        />
      </div>
    </div>
  );
}

export default Calendar;

*/
