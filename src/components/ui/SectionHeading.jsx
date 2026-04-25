import React from "react";

const SectionHeading = ({ eyebrow, title, description, actions }) => {
  return (
    <div className="platform-stack" style={{ marginBottom: 20 }}>
      {eyebrow ? <span className="platform-eyebrow">{eyebrow}</span> : null}
      <div className="platform-toolbar">
        <div>
          <h1 className="platform-heading">{title}</h1>
          {description ? <p className="platform-copy">{description}</p> : null}
        </div>
        {actions ? <div className="platform-toolbar__actions">{actions}</div> : null}
      </div>
    </div>
  );
};

export default SectionHeading;