import type { Metadata } from 'next';
import Link from 'next/link';
import ContentPage from '@/components/lootix/ContentPage';

export const metadata: Metadata = {
  title: 'DMCA / Copyright Policy — Lootix',
  description:
    'How to report copyright infringement on Lootix, submit a counter-notification, and contact our DMCA Designated Agent.',
};

const DMCA_EMAIL = 'bmccoy67@gmail.com';
const SUPPORT_EMAIL = 'hello@getlootix.com';

export default function DmcaPolicyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="DMCA / Copyright Policy"
      subtitle="How to report copyright infringement, respond to a takedown, and reach our Designated Agent."
    >
      <p>
        <strong>Effective date:</strong> October 8, 2026
      </p>

      <p>
        Lootix LLC (&ldquo;Lootix,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), which operates the
        website at <a href="https://getlootix.com">https://getlootix.com</a> (the &ldquo;Site&rdquo;), respects the
        intellectual property rights of others and expects users of the Site to do the same. We respond to notices of
        alleged copyright infringement that comply with the Digital Millennium Copyright Act of 1998
        (&ldquo;DMCA&rdquo;), 17 U.S.C. &sect; 512.
      </p>
      <p>
        This policy explains how to report content on the Site that you believe infringes your copyright, how to respond
        if your content was removed, and how we handle repeat infringers. It is part of, and is incorporated into, our{' '}
        <Link href="/terms">Terms of Service</Link>.
      </p>

      <h2>1. Reporting Copyright Infringement (Takedown Notice)</h2>
      <p>
        If you believe that material on the Site (for example, a user upload, review photo, profile image, sweepstakes
        or contest entry, product listing, or other content) infringes a copyright you own or are authorized to enforce,
        you may send a written notice to our Designated Agent (listed in Section 6).
      </p>
      <p>
        Under 17 U.S.C. &sect; 512(c)(3), your notice must include <strong>all</strong> of the following:
      </p>
      <ol>
        <li>
          <strong>A physical or electronic signature</strong> of a person authorized to act on behalf of the owner of
          the exclusive right that is allegedly infringed.
        </li>
        <li>
          <strong>Identification of the copyrighted work</strong> claimed to have been infringed, or, if multiple works
          on the Site are covered by a single notice, a representative list of those works.
        </li>
        <li>
          <strong>Identification of the material that is claimed to be infringing</strong> and that is to be removed or
          disabled, and information reasonably sufficient to let us locate it (the specific URL(s) on the Site are the
          best way to do this).
        </li>
        <li>
          <strong>Your contact information</strong>, such as your name, mailing address, telephone number, and email
          address.
        </li>
        <li>
          <strong>A statement that you have a good faith belief</strong> that use of the material in the manner
          complained of is not authorized by the copyright owner, its agent, or the law.
        </li>
        <li>
          <strong>
            A statement that the information in the notice is accurate, and, under penalty of perjury, that you are
            authorized to act
          </strong>{' '}
          on behalf of the owner of an exclusive right that is allegedly infringed.
        </li>
      </ol>
      <p>
        Notices that do not substantially comply with these requirements may not be acted on. Please note that we may
        forward your notice (including your name and contact information) to the person who provided the material.
      </p>
      <p>
        <strong>Before you send a notice,</strong> please consider whether the use may be authorized, licensed, or a
        fair use. If you are unsure whether material infringes your copyright, you may wish to speak with an attorney
        first.
      </p>
      <p>
        <strong>This process is for copyright only.</strong> For trademark concerns (for example, misuse of a brand name
        or logo), contact us at <a href={`mailto:${DMCA_EMAIL}`}>{DMCA_EMAIL}</a> with &ldquo;Trademark&rdquo; in the
        subject line.
      </p>

      <h2>2. What Happens After We Receive a Valid Notice</h2>
      <p>When we receive a notice that substantially complies with the DMCA, we will:</p>
      <ol>
        <li>Act expeditiously to remove or disable access to the material identified in the notice;</li>
        <li>
          Take reasonable steps to promptly notify the user who posted the material that it has been removed or
          disabled; and
        </li>
        <li>Where applicable, record the notice for purposes of our Repeat Infringer Policy (Section 5).</li>
      </ol>

      <h2 id="counter">3. Counter-Notification (If Your Content Was Removed)</h2>
      <p>
        If material you posted was removed or disabled because of a DMCA notice and you believe it was removed by
        mistake or misidentification, you may send a written counter-notification to our Designated Agent (Section 6).
      </p>
      <p>
        Under 17 U.S.C. &sect; 512(g)(3), your counter-notification must include <strong>all</strong> of the following:
      </p>
      <ol>
        <li>
          <strong>Your physical or electronic signature.</strong>
        </li>
        <li>
          <strong>Identification of the material that was removed</strong> or to which access was disabled, and the
          location (URL) where it appeared before it was removed or disabled.
        </li>
        <li>
          <strong>A statement under penalty of perjury that you have a good faith belief</strong> that the material was
          removed or disabled as a result of mistake or misidentification of the material.
        </li>
        <li>
          <strong>Your name, address, and telephone number</strong>, and a statement that you consent to the
          jurisdiction of the Federal District Court for the judicial district in which your address is located (or, if
          your address is outside the United States, any judicial district in which Lootix LLC may be found), and that
          you will accept service of process from the person who provided the original notice or an agent of that
          person.
        </li>
      </ol>
      <p>
        <strong>What happens next:</strong> When we receive a valid counter-notification, we will promptly send a copy
        to the person who filed the original notice and tell them that we will restore the removed material in 10
        business days. We will restore the material{' '}
        <strong>not less than 10 and not more than 14 business days</strong> after we receive the counter-notification,
        unless our Designated Agent first receives notice that the original complainant has filed a court action seeking
        to restrain you from engaging in infringing activity relating to that material.
      </p>

      <h2>4. Misrepresentations (17 U.S.C. &sect; 512(f))</h2>
      <p>
        Under 17 U.S.C. &sect; 512(f), any person who knowingly and materially misrepresents that material is
        infringing, or that material was removed or disabled by mistake or misidentification, may be liable for damages,
        including costs and attorneys&rsquo; fees, incurred by the alleged infringer, the copyright owner or its
        licensee, or by us. Please do not submit false or bad-faith notices or counter-notifications.
      </p>

      <h2>5. Repeat Infringer Policy</h2>
      <p>
        In accordance with 17 U.S.C. &sect; 512(i), it is our policy to terminate, in appropriate circumstances, the
        accounts of users who are repeat infringers. We may consider a user a repeat infringer if we receive multiple
        valid notices about that user&rsquo;s content, and we may also limit access to the Site, remove content, or
        suspend or terminate accounts, at our discretion, with or without notice, for any user who infringes the
        intellectual property rights of others, whether or not they are a repeat infringer. Termination may include loss
        of eligibility for promotions, sweepstakes, or other account features, to the extent permitted by the applicable
        official rules and law.
      </p>

      <h2>6. Designated Agent</h2>
      <p>Our Designated Agent to receive notifications of claimed infringement is:</p>
      <address
        className="not-italic rounded-[7px] p-5 my-5"
        style={{ background: 'rgba(255,255,255,.035)', border: '1px solid rgba(212,175,55,.28)' }}
      >
        <strong>Bennie McCoy</strong>
        <br />
        Attn: DMCA / Copyright Agent
        <br />
        Lootix LLC
        <br />
        212 Whirlaway Ln, Havre De Grace, MD 21078
        <br />
        Phone: <a href="tel:+13016055308">301-605-5308</a>
        <br />
        Email: <a href={`mailto:${DMCA_EMAIL}`}>{DMCA_EMAIL}</a>
      </address>
      <p>
        Please include &ldquo;DMCA Notice&rdquo; or &ldquo;DMCA Counter-Notice&rdquo; in the subject line. Our
        Designated Agent is also listed in the U.S. Copyright Office&rsquo;s DMCA Designated Agent Directory.
      </p>
      <p>
        <strong>Only DMCA notices and counter-notices should go to the Designated Agent.</strong> Other questions
        (orders, shipping, returns, sweepstakes, account issues) sent to this address will not receive a response;
        please contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> instead.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. The updated version will be posted on this page with a new
        effective date.
      </p>
    </ContentPage>
  );
}
