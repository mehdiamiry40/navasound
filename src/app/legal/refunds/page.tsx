import type { Metadata } from "next";
import LegalPage from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Refunds and cancellations | NavaSound",
  description: "NavaSound's current payment, refund and cancellation position.",
};

export default function RefundsPage() {
  return (
    <LegalPage title="Refunds and cancellations" eyebrow="Payments">
      <section>
        <h2>1. No payments are currently accepted</h2>
        <p>
          NavaSound is not yet selling distribution through this website. Founding-
          artist applications and release briefs are free. Do not send card or bank
          details by email.
        </p>
      </section>
      <section>
        <h2>2. Before paid launch</h2>
        <p>
          Before taking payment, NavaSound will show the total price, included
          service, expected lead time and any extra costs. We will also state the
          cancellation window and when work starts. NavaSound will ask you to accept
          the final distribution agreement.
        </p>
      </section>
      <section>
        <h2>3. Australian Consumer Law</h2>
        <p>
          Future refund and cancellation terms will not exclude consumer guarantees
          or remedies that cannot lawfully be excluded. Depending on the issue, those
          remedies may include rectification, cancellation, a refund for an unused
          portion of a service, reduced-value compensation or compensation for
          reasonably foreseeable loss.
        </p>
      </section>
      <section>
        <h2>4. Pre-launch withdrawal</h2>
        <p>
          You can withdraw an application at any time by emailing
          hello@navasound.com. Because no payment is taken at this stage, there is no
          application fee to refund.
        </p>
      </section>
      <section>
        <h2>5. Contact</h2>
        <p>
          Questions or future refund requests should be sent to
          hello@navasound.com with the release name and relevant transaction details.
          Never email full card information.
        </p>
      </section>
    </LegalPage>
  );
}
