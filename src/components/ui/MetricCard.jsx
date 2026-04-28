import React from "react";
import GlassCard from "./GlassCard";

const MetricCard = ({ value, label, helper, delay = 0 }) => {
  return (
    <GlassCard delay={delay}>
      <div className="platform-card__body">
        <p className="platform-stat__value">{value}</p>
        <p className="platform-stat__label">{label}</p>
        {helper ? <p className="platform-card__meta">{helper}</p> : null}
      </div>
    </GlassCard>
  );
};

export default MetricCard;