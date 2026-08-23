import type { Metadata } from "next";
import LegalPage from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Website Terms | NavaSound",
  description: "Terms for using the NavaSound website and pre-launch tools.",
};

export default function WebsiteTermsPage() {
  return (
    <LegalPage title="Website Terms" eyebrow="Using this site">
      <section>
        <h2>1. About these terms</h2>
        <p>
          These terms apply to navasound.com and its pre-launch tools. NavaSound is
          operated by Mehdi Emir, ABN 62 351 619 456, in Queensland, Australia.
          By using the site, you agree to use it lawfully and consistently with these
          terms.
        </p>
      </section>
      <section>
        <h2>2. Pre-launch information only</h2>
        <p>
          The site describes a planned music-distribution service. An application,
          downloaded release brief or email does not create a distribution contract,
          guarantee acceptance, reserve a release date or oblige NavaSound to deliver
          music to any platform. Final pricing, stores, lead times and service terms
          will be confirmed in writing before payment or delivery.
        </p>
      </section>
      <section>
        <h2>3. Acceptable use</h2>
        <p>You must not use the site to:</p>
        <ul>
          <li>Provide false, misleading or unlawful information.</li>
          <li>Infringe intellectual-property, privacy or publicity rights.</li>
          <li>Interfere with the site, its security or another user.</li>
          <li>Promote artificial streaming, guaranteed streams or playlist manipulation.</li>
        </ul>
      </section>
      <section>
        <h2>4. Intellectual property</h2>
        <p>
          NavaSound owns or licenses the site design, copy and branding. You retain
          ownership of information and music you provide. No rights in your masters
          are transferred merely by applying or preparing a release brief.
        </p>
      </section>
      <section>
        <h2>5. Third-party services</h2>
        <p>
          Links to email clients, streaming services and other websites are provided
          for convenience. Those services have their own terms, availability and
          privacy practices. NavaSound is not responsible for an external service it
          does not control.
        </p>
      </section>
      <section>
        <h2>6. Consumer rights and liability</h2>
        <p>
          Nothing in these terms excludes rights or remedies that cannot lawfully be
          excluded, including applicable Australian Consumer Law rights. To the extent
          permitted by law, NavaSound is not liable for indirect loss arising from
          reliance on pre-launch information or third-party availability.
        </p>
      </section>
      <section>
        <h2>7. Governing law</h2>
        <p>
          These website terms are governed by Queensland law. Contact
          hello@navasound.com first so concerns can be addressed directly.
        </p>
      </section>
    </LegalPage>
  );
}
