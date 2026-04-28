import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Bell, CheckCircle2, Info, X } from "lucide-react";

const MotionDiv = motion.div;

export function DropdownMenu({ open, items, align = "right", onClose }) {
  if (!open) {
    return null;
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className={`platform-dropdown platform-dropdown-${align}`}
      role="menu"
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          className="platform-dropdown-item"
          onClick={() => {
            item.onClick?.();
            onClose?.();
          }}
        >
          {item.icon ? <item.icon size={15} /> : null}
          <span>{item.label}</span>
        </button>
      ))}
    </MotionDiv>
  );
}

export function ModalDialog({ open, title, description, onClose, actions }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <MotionDiv
            className="platform-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          <MotionDiv
            className="platform-modal"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="platform-modal-head">
              <div>
                <h3>{title}</h3>
                {description ? <p>{description}</p> : null}
              </div>
              <button type="button" className="platform-icon-btn" onClick={onClose} aria-label="Close dialog">
                <X size={16} />
              </button>
            </div>

            <div className="platform-modal-body">
              <div className="platform-form-grid">
                <input className="platform-input" placeholder="Title" />
                <input className="platform-input" placeholder="Assignee / Owner" />
                <textarea className="platform-textarea" placeholder="Add notes or description" />
              </div>
            </div>

            <div className="platform-modal-actions">
              {actions}
            </div>
          </MotionDiv>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="platform-toast-stack" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <MotionDiv
            key={toast.id}
            className={`platform-toast ${toast.type || "info"}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.2 }}
          >
            <div className="platform-toast-icon">
              {toast.type === "success" ? <CheckCircle2 size={16} /> : null}
              {toast.type === "warning" ? <AlertCircle size={16} /> : null}
              {toast.type === "info" ? <Info size={16} /> : null}
            </div>
            <div className="platform-toast-copy">
              <strong>{toast.title}</strong>
              <p>{toast.message}</p>
            </div>
            <button type="button" className="platform-icon-btn" onClick={() => onDismiss(toast.id)} aria-label="Dismiss toast">
              <X size={14} />
            </button>
          </MotionDiv>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function SkeletonBlocks({ count = 4, height = 160 }) {
  return (
    <div className="platform-section-grid platform-grid-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="platform-skeleton" style={{ minHeight: height }} />
      ))}
    </div>
  );
}

export function EmptyState({ title, summary, actionLabel, onAction }) {
  return (
    <div className="platform-empty-state platform-card">
      <div className="platform-card-inner">
        <div className="platform-feature-icon">
          <Bell size={18} />
        </div>
        <h3>{title}</h3>
        <p>{summary}</p>
        {actionLabel ? (
          <button type="button" className="platform-btn" onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}