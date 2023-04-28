import React from "react";
import { RHFSelect } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";


const EventType = () =>{
  const { translate } = useLocales();
  return (
    <RHFSelect name="event_type" label={translate("adminStore.events.eventType")}>
      <option value="" />
      <option value="webinar">Webinar</option>
      <option value="offline">Offline</option>
      <option value="twitter">Twitter Space</option>
    </RHFSelect>
  );
}

export default EventType;
