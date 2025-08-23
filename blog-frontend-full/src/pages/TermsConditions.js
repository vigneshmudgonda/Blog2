import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      <h1 className="mb-4">Terms & Conditions</h1>
      <p>
        By using this website and our YouTube content, you agree to comply with
        the following terms and conditions. Please read them carefully before
        using our services.
      </p>

      <h4>Use of Content</h4>
      <p>
        All videos, articles, and resources provided on this website and our
        channel are for informational and educational purposes only. You may not
        reproduce, republish, or redistribute content without permission.
      </p>

      <h4>User Responsibilities</h4>
      <ul>
        <li>You must not misuse our website or attempt harmful activities.</li>
        <li>You agree to respect other users in the community.</li>
        <li>Comments or messages with offensive content will be removed.</li>
      </ul>

      <h4>Limitations of Liability</h4>
      <p>
        We are not responsible for any direct or indirect damages that may
        result from using our website or following tutorials.
      </p>

      <h4>Changes to Terms</h4>
      <p>
        We may revise these terms at any time. Continued use of our site
        indicates acceptance of updated terms.
      </p>
    </div>
  );
}
