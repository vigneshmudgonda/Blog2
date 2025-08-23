import React from "react";

export default function Disclaimer() {
  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      <h1 className="mb-4">Disclaimer</h1>
      <p>
        All the information on this website and YouTube channel is published in
        good faith and for general information purposes only. We make no
        warranties about the completeness, reliability, and accuracy of this
        information.
      </p>

      <p>
        Any action you take upon the information provided here is strictly at
        your own risk. We will not be liable for any losses or damages in
        connection with the use of our content.
      </p>

      <p>
        Our tutorials and guides are based on personal experience and research.
        Results may vary for each individual depending on knowledge, skills, and
        circumstances.
      </p>

      <p>
        This site may contain affiliate links, which means we may earn a small
        commission if you purchase through our links at no extra cost to you.
        This helps us keep the site running and continue providing free
        resources.
      </p>

      <p>
        For further questions, feel free to <a href="/contact">contact us</a>.
      </p>
    </div>
  );
}
