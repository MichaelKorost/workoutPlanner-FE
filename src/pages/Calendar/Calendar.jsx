import "./Calendar.scss";
import { useRef, useEffect, useState, memo, forwardRef } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Loader from "../../components/Loader/Loader";
import CalendarSkeleton from "../../components/CalendarSkeleton/CalendarSkeleton";
import { toast } from "react-toastify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Calendar() {
  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}80`
  );
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [externalEvents, setExternalEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(null);

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
    if (Array.isArray(workoutPlans)) {
      const eventsWithColor = workoutPlans?.map((workout) => {
        return { ...workout /*color: randomColor*/ };
      });
      setExternalEvents(eventsWithColor || []);
    }

    if (Array.isArray(userCalendarEvents)) {
      const userCalendarEventsWithUid = userCalendarEvents?.map(
        (event, index) => {
          return {
            ...event,
            id: `external-${Math.random() * 10}`,
          };
        }
      );
      setCalendarEvents(userCalendarEventsWithUid);
    }
  }, [workoutPlans, userCalendarEvents]);

  // add external events
  const addEvent = () => {
    alert("navigating to workout new");
  };

  const handleEventClick = (e) => {
    setClickedEvent({ event: e, exercises: e.event.extendedProps.workout });
    setOpen(true);
  };

  const handleDeleteEvent = () => {
    const filteredEvents = () =>
      calendarEvents.filter(
        (event) => event.id !== clickedEvent.event.event.id
      );

    dispatch(updateCalendarEvents());
    setCalendarEvents(filteredEvents);
    setOpen(false);
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
    // console.log("calendarEvents changed... updating");
    console.log({ calendarEvents });
    console.log("userCalendarEvents", userCalendarEvents);
  }, [calendarEvents]);

  // handle event receive
  const handleEventReceive = (eventInfo) => {
    console.log("event received");
    console.log(eventInfo.event);

    const newEvent = {
      id: `external-${Math.random() * 10}`,
      title: eventInfo.event.title,
      date: eventInfo.event.startStr,
      workout: eventInfo.event.extendedProps.plan,
    };
    setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
    // setClickedEvent({ event: eventInfo, exercises: newEvent.workout });
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
    // console.log(updatedUserEvents);
    dispatch(updateCalendarEvents(updatedUserEvents));
    if (isCalendarSuccess) {
      toast.success("Calendar updated successfully!")
    }
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(clickedEvent);
  }, [clickedEvent]);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm")); //550
  const matchesMd = useMediaQuery(theme.breakpoints.down("md")); //960

  console.log(clickedEvent);

  return (
    <>
      {isLoading || (isCalendarLoading && <Loader />)}
      <section className="calendar-page">
        <div className="calendar">
          <div className="calendar-items-container">
            <h1 className="calendar-workouts-title">My Workouts</h1>
            <div className="calendar__items">
              <div id="external-events" className="external-events">
                {isLoading ? (
                  <>
                    <CalendarSkeleton />
                  </>
                ) : (
                  <>
                    {externalEvents?.map((event) => (
                      <ExternalEvent key={event._id} event={event} />
                    ))}
                  </>
                )}
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
                height={matchesSm ? 500 : matchesMd ? 600 : 800}
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

        <Dialog
          open={open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogActions sx={{ justifyContent: "flex-end" }}>
            <Button
              sx={{ width: "54px", height: "54px", backgroundColor: "#e74c3c" }}
              onClick={handleClose}
              onMouseEnter={(e) => (e.target.style.backgroundColor = `#c0392b`)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = `#e74c3c`)}
            >
              <CloseIcon
                sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
              />
            </Button>
          </DialogActions>
          <DialogTitle
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflowX: "hidden",
              textAlign: "center",
              fontSize: "40px",
              padding: "10 20px",
            }}
            className="calendar-dialog__title"
          >
            {clickedEvent?.event.event.title}
          </DialogTitle>
          <DialogContent
            sx={{
              padding: "20px",
            }}
          >
            <div className="calendar-dialog-container">
              {clickedEvent?.exercises?.map(({ exercises, muscleGroup }, index) => (
                <section key={index} className="workout-details-images">
                  <h2 className="workout-details-muscle-group">
                    {muscleGroup}
                  </h2>
                  <Swiper
                    pagination={{ type: "fraction" }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className={"workout-details__swiper"}
                  >
                    {exercises?.map(({ exercise, reps, sets, weight }, index) => (
                      <SwiperSlide key={index} className="workout-details-swiper-container">
                        <img
                          className="workout-details-swiper__image"
                          src={exercise.image}
                        />
                        <div className="workout-details-swiper-information">
                          <h3 className="workout-details-swiper__exercise-name">
                            {exercise.name}
                          </h3>
                          <div className="workout-details-swiper__terms">
                            <div className="workout-details-swiper__term">
                              <p>Sets: </p> <span>{sets}</span>
                            </div>
                            <div className="workout-details-swiper__term">
                              <p>Reps: </p> <span>{reps}</span>
                            </div>
                            <div className="workout-details-swiper__term">
                              <p>Weight: </p> <span>{weight}</span>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </section>
              ))}
            </div>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              sx={{ width: "54px", height: "54px", backgroundColor: "#7f8c8d" }}
              onClick={handleDeleteEvent}
              onMouseEnter={(e) => (e.target.style.backgroundColor = `#535c68`)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = `#7f8c8d`)}
            >
              <DeleteIcon
                sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
              />
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    </>
  );
}

export default Calendar;
