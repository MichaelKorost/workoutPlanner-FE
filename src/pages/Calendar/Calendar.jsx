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
import SaveIcon from "@mui/icons-material/Save";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

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

    if (Array.isArray(userCalendarEvents)) {
      const userCalendarEventsWithUid = userCalendarEvents?.map((event) => {
        return { ...event, id: `external-${Math.random() * 10}` };
      });
      setCalendarEvents(userCalendarEventsWithUid);
    }
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

  // custom buttons
  const clearMonthButton = {
    text: "Clear🧹",
    click: handleClearMonth,
  };

  const saveCalendarButton = {
    text: "Save✔️",
    click: saveCalendarChanges,
  };

  const theme = useTheme();
  const matchesSmallPhone = useMediaQuery(theme.breakpoints.down("smallPhone")); //370
  const matchesPhone = useMediaQuery(theme.breakpoints.down("phone")); //420
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm")); //550
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet")); //768
  const matchesMd = useMediaQuery(theme.breakpoints.down("md")); //960
  const matchesmidLarge = useMediaQuery(theme.breakpoints.down("midLarge")); //1170
  const matchesLg = useMediaQuery(theme.breakpoints.down("lg")); //1280

  if (isLoading || isCalendarLoading) {
    return <Spinner />;
  }

  return (
    <section className="calendar-page">
      <div className="calendar">
        <div className="calendar-items-container">
          <h1 className="calendar-workouts-title">My Workouts</h1>
          <div className="calendar__items">
            <div id="external-events" className="external-events">
              {externalEvents?.map((event) => (
                <ExternalEvent key={event._id} event={event} />
              ))}
            </div>
          </div>
        </div>
        <div className="calendar-box">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              headerToolbar={{
                start: "prev,next", // will normally be on the left. if RTL, will be on the right
                center: "title",
                end: "clearMonthBtn saveChangesBtn", // will normally be on the right. if RTL, will be on the left
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
              height={matchesSm ? 500 : matchesMd ? 600 :  800}
              eventDrop={handleEventDrop}
              eventDurationEditable={false}
              dragRevertDuration={500}
              ref={calendarRef}
              eventDisplay="block"
              
            
              customButtons={{
                clearMonthBtn: clearMonthButton,
                saveChangesBtn: saveCalendarButton,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calendar;

/*
  <button onClick={saveCalendarChanges} type={"button"}>
      Save Changes
  </button>
*/
