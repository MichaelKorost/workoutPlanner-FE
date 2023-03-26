import './ExternalEvent.scss'

import { useRef, useEffect, useState, memo } from "react";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick


const ExternalEvent = memo(({ event }) => {

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

  return (
    <div
      ref={elementRef}
      className="calendar-event"
      title={event.title}
      style={{ cursor: "pointer" }}
    >
      <div className="fc-event-main ">
        <div>
          <strong> {event.title} </strong>
        </div>
      </div>
    </div>
  );
});



export default ExternalEvent

// fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2