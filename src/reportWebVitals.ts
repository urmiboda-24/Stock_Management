import {
  onCLS,
  onFID,
  onFCP,
  onLCP,
  onTTFB,
  CLSMetric,
  FIDMetric,
  FCPMetric,
  LCPMetric,
  TTFBMetric,
} from "web-vitals";

const reportWebVitals = (
  onPerfEntry?: (
    metric: CLSMetric | FIDMetric | FCPMetric | LCPMetric | TTFBMetric
  ) => void
) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
