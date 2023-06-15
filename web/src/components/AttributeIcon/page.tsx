import React, { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

export default function AttributeIcon({name}: {name: string}) {
  return (
    <div className="flex flex-row items-center py-1 px-2 mb-1 border border-gray-300 rounded" key={name}>
      <div className="flex flex-row items-center">
        <span><Icon icon={'mdi:checkbox-outline'}/></span>
        <span>{name}</span>
      </div>
    </div>
  );
}
