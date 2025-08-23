import React from "react";
import { Container } from "react-bootstrap";

export default function TermsConditions() {
  return (
    <Container className="py-5">
      <h1>Terms & Conditions</h1>
      <p>
        By using this website, you agree to follow the rules below:
      </p>
      <ul>
        <li>You may read, share, and comment on content for personal use.</li>
        <li>Do not copy or republish articles/videos without permission.</li>
        <li>We reserve the right to remove spam or inappropriate content.</li>
      </ul>
      <p>
        These terms may be updated anytime without prior notice.
      </p>
    </Container>
  );
}
