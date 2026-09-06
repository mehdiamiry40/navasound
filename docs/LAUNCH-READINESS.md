# NavaSound launch readiness

Last reviewed: 6 September 2026.

## Current product scope

The implemented service is the Release Readiness beta: artist applications, local metadata briefs and manual human fit/readiness review. The website does not provide distribution, account-based uploads, checkout, royalty statements or payouts. Keep these boundaries visible until the corresponding services are implemented and verified.

## Website checks completed

- The homepage uses an original photographic music still life. Sample-release previews have been removed.
- About, Release Guide and Contact pages share the site's navigation and layout. The guide includes a temporary local checklist; email links require the visitor to compose and send their own message.
- Required text fields reject whitespace-only input, including before JavaScript starts, while accepting Unicode artist names.
- Editable release drafts can be saved before completion and reopened from a validated local JSON file, with confirmation before replacing current work. Declarations are never saved in draft files and must be reviewed again after opening.
- Removed tracks can be restored with their complete metadata and original ordering through a local undo stack or selected individually. The 100-track draft limit remains enforced.
- Local review/export, keyboard focus, responsive navigation, canonical/social metadata and security headers are covered by automated checks.
- The current suite covers 234 browser checks across Chromium, Firefox and WebKit, including public pages, navigation, the local checklist and editable release drafts.
- The production dependency audit reported no known vulnerabilities on 6 September 2026.
- CI installs and tests all three browser engines.
- No personal application or brief values are submitted by the website. Only a whitelisted, non-personal release-format preference can be passed to the workspace URL.

## Business and operational evidence

- Official ABN Lookup lists NAVASOUND from 25 August 2026 under ABN 62 351 619 456, entity EMIR, MEHDI. Checked 6 September 2026; the displayed record was extracted 31 August 2026: https://abr.business.gov.au/ABN/View?abn=62351619456.
- That record lists the ABN as active and not currently registered for GST. Paid-launch tax treatment still requires review.
- Public DNS routes navasound.com email through iCloud and publishes its SPF record. This verifies routing configuration, not receipt at hello@navasound.com.
- A real inbox-receipt check and confirmation of who will handle reviews remain operational checks. No test message has been sent as part of this work.
- The owner still needs to confirm whether launch means the current beta or a full distribution service.

## Full distribution is not launch-ready

The provider scorecard contains outreach records, not a selected or signed provider. No provider credentials or integration are implemented in this repository. Before a paid distribution launch:

1. Select a provider and establish a signed agreement, delivery authority, fee schedule and API/sandbox access.
2. Implement and test authentication, secure asset handling, delivery, corrections and takedowns.
3. Confirm final pricing, tax treatment, payment processing, royalty statements and payouts.
4. Complete provider-specific artist terms, refunds, privacy/vendor disclosures, retention and operational procedures; obtain the review required by the legal checklist.
5. Verify the complete artist-to-provider-to-store workflow and money/reporting reconciliation.

See legal/LAUNCH-LEGAL-CHECKLIST.md and providers/PROVIDER-SCORECARD.md for the detailed remaining work. Do not publish draft distribution agreements or change the public site to claim live distribution simply because the website checks pass.
