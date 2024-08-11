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
import "@/styles/calendarui.css";
import { GroupEvent } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/loaders/Loaders";

if (!process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY) {
  throw new Error("NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY is not set");
}
const licenseKey = process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY;

interface CalendarUIProps {
  groupId?: string;
  isRO: boolean;
}

const CalendarUI: React.FC<CalendarUIProps> = ({ groupId, isRO }) => {
  const [timelineResourceData, setTimelineResourceData] = useState<Object[]>(
    []
  );
  const { user } = useUser();

  if (!user){
    throw new Error("User not found");
  }
  useEffect(() => {
    registerLicense(licenseKey);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `/api/group/${user?.id}/t/${groupId}/events`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        const transformedData: GroupEvent[] = data.fetchedEvent.map(
          (event: GroupEvent) => {
            return {
              Id: event.Id,
              Subject: event.Subject,
              StartTime: new Date(event.StartTime),
              EndTime: new Date(event.EndTime),
              IsAllDay: event.IsAllDay,
              Location: event.Location,
            };
          }
        );

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
      const formatted: GroupEvent[] = args.data.map((event: GroupEvent) => {
        return {
          ...event,
          StartTime: new Date(event.StartTime),
          EndTime: new Date(event.EndTime),
        };
      });
      const response = await fetch(
        `/api/group/${user?.id}/t/${groupId}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formatted),
        }
      );
      if (!response.ok) {
        console.error("Failed to create event");
        //TODO: Handle error
      } else {
        const data = await response.json();
        console.log("Event Created", data);
      }
    } else if (args.requestType === "eventChange") {
      console.log("Event Change");
      console.log("Event Change Data:", args.data);
      const arrayArgs = Array.isArray(args.data) ? args.data : [args.data];

      const formatted: GroupEvent[] = arrayArgs.map((event: GroupEvent) => {
        return {
          ...event,
          StartTime: new Date(event.StartTime),
          EndTime: new Date(event.EndTime),
        };
      });
      const response = await fetch(
        `/api/group/${user?.id}/t/${groupId}/events`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formatted),
        }
      );
      const data = await response.json();
      console.log("Event Updated", data);
    } else if (args.requestType === "eventRemove") {
      const eventId = args.data[0].Id;

      console.log("Event Remove");
      const response = await fetch(
        `/api/group/${user?.id}/t/${groupId}/events`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventId),
        }
      );
      const data = await response.json();
      console.log("Event Deleted", data);
    }
  };

  if (!groupId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-md">
      <ScheduleComponent
        width="100%"
        height="900px"
        currentView="Month"
        selectedDate={new Date()}
        eventSettings={eventSettings}
        actionBegin={handleEvent}
        timezone="UTC"
        readonly={isRO}
        // className="bg-red-500"
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
