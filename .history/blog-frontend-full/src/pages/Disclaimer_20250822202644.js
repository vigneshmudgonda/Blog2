import React from "react";
import { Container } from "react-bootstrap";

export default function Disclaimer() {
  return (
    <Container className="py-5">
      <h1>Disclaimer</h1>
      <p>
        The content on this  is for educational and
        informational purposes only.  
      </p>
      <p>
        While we try to keep information accurate and updated, we are not
        responsible for errors, omissions, or results obtained from the use of
        this content.  
      </p>
      <p>
        Google AdSense ads displayed here are controlled by Google and may not
        reflect our views.
      </p>
    </Container>
  );
}
