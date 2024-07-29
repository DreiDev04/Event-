"use client";
import {
  Week,
  Month,
  Agenda,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  EventSettingsModel,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import React, { useState, useEffect } from "react";
import { registerLicense } from "@syncfusion/ej2-base";
import moment from "moment-timezone";

if (!process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY) {
  throw new Error("NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY is not set");
}
const licenseKey = process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY;

interface CalendarUIProps {
  groupId?: string;
}

const CalendarUI: React.FC<CalendarUIProps> = ({ groupId }) => {
  const [timelineResourceData, setTimelineResourceData] = useState<Object[]>(
    []
  );

  useEffect(() => {
    registerLicense(licenseKey);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events/${groupId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        console.log("Fetched Events Data:", data.event);

        const transformedData = data.event.map((event: any) => {
          return {
            Id: event.id,
            Subject: event.subject,
            StartTime: event.startTime,
            EndTime: event.endTime,
            IsAllDay: event.isAllDay,
          };
        });

        setTimelineResourceData(transformedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (groupId) {
      fetchEvents();
    }
  }, [groupId]);

  const eventSettings: EventSettingsModel = {
    dataSource: timelineResourceData,
  };

  const handleEvent = async (args: any) => {
    if (args.requestType === "eventCreate") {
      console.log("Event Created");
      // Handle event creation
    } else if (args.requestType === "eventChange") {
      console.log("Event Change");
    } else if (args.requestType === "eventRemove") {
      console.log("Event Remove");
    }
  };

  if (!groupId) {
    return <div>No Group ID</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <ScheduleComponent
        width="100%"
        height="700px"
        currentView="Week"
        selectedDate={new Date()}
        eventSettings={eventSettings}
        actionBegin={handleEvent}
        timezone="UTC"
      >
        <ViewsDirective>
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Week, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  );
};

export default CalendarUI;
