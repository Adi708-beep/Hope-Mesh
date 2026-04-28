import React from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MotionArticle = motion.article;

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export function GlassCard({ children, className = "" }) {
  return (
    <MotionArticle className={`platform-card ${className}`} {...cardMotion}>
      <div className="platform-card-inner">{children}</div>
    </MotionArticle>
  );
}

export function MetricCard({ label, value, delta, icon: Icon }) {
  return (
    <GlassCard className="platform-metric">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div className="platform-metric-label">{label}</div>
          <div className="platform-metric-value">{value}</div>
        </div>
        {Icon ? (
          <div className="platform-feature-icon">
            <Icon size={18} />
          </div>
        ) : null}
      </div>
      {delta ? <div style={{ marginTop: 12, color: "#86efac", fontSize: 13 }}>{delta}</div> : null}
    </GlassCard>
  );
}

export function SectionHeader({ eyebrow, title, summary, action }) {
  return (
    <div className="platform-section-heading">
      <div>
        {eyebrow ? <div className="platform-eyebrow">{eyebrow}</div> : null}
        <h2>{title}</h2>
        {summary ? <p>{summary}</p> : null}
      </div>
      {action ? <div className="platform-actions">{action}</div> : null}
    </div>
  );
}

export function FeatureGrid({ items, columns = 3 }) {
  return (
    <div className={`platform-section-grid platform-grid-${columns}`}>
      {items.map((item) => (
        <GlassCard key={item.title} className="platform-feature-card">
          {item.icon ? (
            <div className="platform-feature-icon">
              <item.icon size={18} />
            </div>
          ) : null}
          <h3 style={{ margin: 0, fontSize: 22, letterSpacing: "-0.03em" }}>{item.title}</h3>
          <p style={{ margin: "12px 0 0", color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>{item.description}</p>
        </GlassCard>
      ))}
    </div>
  );
}

export function TimelineList({ items }) {
  return (
    <div className="platform-timeline">
      {items.map((item) => (
        <div className="platform-timeline-item" key={item.title}>
          <div className="platform-chip">{item.step}</div>
          <h4 style={{ marginTop: 12 }}>{item.title}</h4>
          <p style={{ marginTop: 8, color: "rgba(255,255,255,0.68)", lineHeight: 1.7 }}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function SimpleTable({ columns, rows }) {
  return (
    <GlassCard>
      <div style={{ overflowX: "auto" }}>
        <table className="platform-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id || row[columns[0]]}>
                {columns.map((column) => (
                  <td key={column}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

export function MiniChartCard({ title, summary, data, color = "#818cf8" }) {
  return (
    <GlassCard>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 22, letterSpacing: "-0.03em" }}>{title}</h3>
          {summary ? <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.68)", lineHeight: 1.7 }}>{summary}</p> : null}
        </div>
      </div>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="platformChartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.32} />
                <stop offset="95%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" />
            <YAxis stroke="rgba(255,255,255,0.4)" />
            <Tooltip
              contentStyle={{
                background: "rgba(7,11,20,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
              }}
            />
            <Area type="monotone" dataKey="value" stroke={color} fill="url(#platformChartFill)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
