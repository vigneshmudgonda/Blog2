import React from "react";
import { Helmet } from "react-helmet";

export default function PrivacyPolicy() {
  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      <Helmet>
        <title>Privacy Policy | Unique Tech</title>
        <meta
          name="description"
          content="Read the Privacy Policy of Unique Tech. Learn how we collect, use, and protect your personal information while ensuring transparency and security."
        />
      </Helmet>

      <h1 className="mb-4">Privacy Policy</h1>
      <p>
        Your privacy is very important to us. This Privacy Policy explains how
        we collect, use, and safeguard your information when you visit our
        website or interact with our YouTube channel.
      </p>

      <h4>Information We Collect</h4>
      <p>
        We may collect personal information such as your name, email address,
        and contact details when you subscribe, comment, or fill out forms. We
        also use cookies to analyze traffic and improve user experience.
      </p>

      <h4>How We Use Your Information</h4>
      <ul>
        <li>To improve our website and video content</li>
        <li>To communicate with you regarding updates or responses</li>
        <li>To personalize your browsing experience</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h4>Cookies and Third-Party Ads</h4>
      <p>
        We may use third-party advertising companies such as Google AdSense to
        serve ads. These companies may use cookies to provide relevant ads based
        on your browsing activity.
      </p>

      <h4>Data Security</h4>
      <p>
        We implement proper security measures to protect your data. However, no
        method of transmission over the internet is 100% secure.
      </p>

      <h4>Changes to This Policy</h4>
      <p>
        We may update this policy from time to time. Any changes will be posted
        on this page with the updated date.
      </p>

      <p>
        If you have any questions, feel free to{" "}
        <a href="/contact">contact us</a>.
      </p>
    </div>
  );
}
