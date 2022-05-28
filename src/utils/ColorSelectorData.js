import { v4 as uuid } from "uuid";

const colorSelector = [
  { _id: uuid(), color: "#AECBFA", colorClass: "notecard-bg-blue" },
  { _id: uuid(), color: "#E6C9A8", colorClass: "notecard-bg-brown" },
  { _id: uuid(), color: "#FDCFE8", colorClass: "notecard-bg-pink" },
  { _id: uuid(), color: "#CCFF90", colorClass: "notecard-bg-green" },
  { _id: uuid(), color: "#FFF475", colorClass: "notecard-bg-yellow" },
];

export default colorSelector;
