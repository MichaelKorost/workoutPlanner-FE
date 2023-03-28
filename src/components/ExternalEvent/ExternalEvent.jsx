import './ExternalEvent.scss'

import { useRef, useEffect, useState, memo, forwardRef } from "react";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, useMediaQuery } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from '@emotion/react';



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction={"right"} ref={ref} {...props} />;
});
const TransitionMobile = forwardRef(function Transition(props, ref) {
  return <Slide direction={"down"} ref={ref} {...props} />;
});

const ExternalEvent = memo(({ event }) => {
  const [open, setOpen] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(null);

    let elementRef = useRef(null);

  useEffect(() => {
    let draggable = new Draggable(elementRef.current, {
      eventData: function () {
        return { ...event, create: true };
      },
      revert: true, //enable rever
    });
    return () => draggable.destroy();
  });

  const handleEventClick = () => {
    console.log("handleEventClick")
    console.log(event);
    setClickedEvent({title: event.title, plan: event.plan })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md")); //960

  return (
    <>
    <div
      ref={elementRef}
      className="calendar-event"
      title={event.title}
      style={{ cursor: "pointer" }}
    >
      <div className="fc-event-main " onClick={handleEventClick}>
        <div>
          <strong> {event.title} </strong>
        </div>
      </div>
    </div>

    <Dialog
        open={open}
        TransitionComponent={matchesMd ? TransitionMobile : Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"md"}

      >
         <DialogActions sx={{justifyContent:"flex-end"}}>
        <Button
            sx={{ width: "54px", height: "54", backgroundColor: "#e74c3c" }}
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
            textAlign:"center",
            fontSize:"40px",
            padding:"10 20px",
          }}
          className="calendar-dialog__title"
        >
          {clickedEvent?.title}
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "20px",
          }}
        >
          <div className="calendar-dialog-container">
          {clickedEvent?.plan?.map(({ exercises, muscleGroup }, index) => (
            <section key={index} className="workout-details-images">
              <h2 className="workout-details-muscle-group">{muscleGroup}</h2>
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
                      <div className="workout-details-swiper__terms" >
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
      </Dialog>

    </>
  );
});



export default ExternalEvent

// fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2