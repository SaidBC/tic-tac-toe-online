import SlAlert from "@shoelace-style/shoelace/dist/react/alert/index.js";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js";
import { forwardRef } from "react";

const AlertPopup = forwardRef(function ({ variant, title, content }, ref) {
  return (
    <>
      <SlAlert ref={ref} variant={variant} duration="3000" closable>
        <SlIcon slot="icon" name="info-circle" />
        <strong>{title}</strong>
        <br />
        {content}
      </SlAlert>
    </>
  );
});

export default AlertPopup;
