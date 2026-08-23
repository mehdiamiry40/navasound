import type { Metadata } from "next";
import LegalPage from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Notice | NavaSound",
  description: "How NavaSound handles personal and release information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Notice" eyebrow="Your information">
      <section>
        <h2>1. Who operates NavaSound</h2>
        <p>
          NavaSound is operated by Mehdi Emir, ABN 62 351 619 456, in Queensland,
          Australia. Privacy questions can be sent to hello@navasound.com.
        </p>
      </section>
      <section>
        <h2>2. What the website collects</h2>
        <p>
          The application and release-brief tools run in your browser. They do not
          send form answers to NavaSound servers. The application tool opens your
          email app, and the release tool creates a text file on your device.
        </p>
        <p>
          If you choose to email NavaSound, we receive the information in that
          message. This may include your name, email address, artist or label name,
          release metadata, links, rights confirmations and other information you
          decide to provide.
        </p>
      </section>
      <section>
        <h2>3. Why information is used</h2>
        <ul>
          <li>To respond to enquiries and assess beta applications.</li>
          <li>To check release readiness, ownership and metadata.</li>
          <li>To prevent fraud, infringement and artificial streaming.</li>
          <li>To prepare or perform an agreed distribution service.</li>
          <li>To meet legal, tax, accounting and dispute obligations.</li>
        </ul>
      </section>
      <section>
        <h2>4. Sharing and overseas processing</h2>
        <p>
          Information is not sold. It may be shared with professional advisers,
          technology providers, a selected distribution backend, digital music
          services, payment providers or authorities where reasonably necessary.
          Email, hosting and future distribution providers may process data outside
          Australia. The specific provider disclosures will be updated before the
          paid service launches.
        </p>
      </section>
      <section>
        <h2>5. Retention and security</h2>
        <p>
          Unsuccessful or inactive beta enquiries are normally retained for no more
          than 12 months. Records connected with a continuing relationship, dispute,
          payment or legal obligation may be kept longer. Reasonable access controls
          and account security are used, but no internet service can promise absolute
          security.
        </p>
      </section>
      <section>
        <h2>6. Access, correction and complaints</h2>
        <p>
          Email hello@navasound.com to ask what personal information we hold, request
          a correction or deletion, or raise a privacy concern. We may need to verify
          your identity before acting and will respond within a reasonable period.
        </p>
      </section>
      <section>
        <h2>7. Changes</h2>
        <p>
          This notice will be updated when the release portal, payment system or
          distribution provider changes. The effective date and version appear above.
        </p>
      </section>
    </LegalPage>
  );
}
