import { getPlan } from "./plan";

export const isBinary = () => getPlan() === "BINARY";
export const isNotBinary = () => !isBinary();
