// components/shared/SectionWrapper.tsx
import React from "react";

const SectionWrapper = ({ children, className = "", ...props }) => (
  <section className={`w-full px-4 py-4 ${className}`} {...props}>
    {children}
  </section>
);

export default SectionWrapper;