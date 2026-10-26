// DRAFT FOR LEGAL REVIEW (2026-10-25). Fill [DMCA AGENT ADDRESS] and [PHONE]
// before launch. Never put a home address here - use a business/agent address.
import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';

export const metadata: Metadata = {
  title: 'DMCA Policy - Lootix',
  description: 'How to report copyright infringement to Lootix and how to send a counter-notice.',
};

export default function DmcaPage() {
  return (
    <ContentPage eyebrow="Legal" title="DMCA Copyright Policy" updated="[EFFECTIVE DATE]">
      <p>Lootix LLC respects the intellectual property rights of others and responds to notices of claimed copyright infringement under the Digital Millennium Copyright Act (DMCA), 17 U.S.C. &sect;512.</p>

      <h2>1. Reporting infringement (takedown notice)</h2>
      <p>If you believe material on getlootix.com infringes your copyright, send a written notice to our Designated Agent (Section 4). Under 17 U.S.C. &sect;512(c)(3), your notice must include all of the following:</p>
      <ol>
        <li>Your physical or electronic signature (or that of a person authorized to act for the copyright owner).</li>
        <li>Identification of the copyrighted work you claim is infringed (or, if several works are covered by one notice, a representative list of them).</li>
        <li>Identification of the material you claim is infringing and that you want removed or disabled, with enough information for us to find it (for example, the page URL).</li>
        <li>Your contact information: name, mailing address, telephone number, and email address if available.</li>
        <li>A statement that you have a good-faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
        <li>A statement that the information in the notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on the owner&rsquo;s behalf.</li>
      </ol>
      <p>Notices missing these elements may not be acted on. Knowingly misrepresenting that material is infringing can make you liable for damages under 17 U.S.C. &sect;512(f).</p>
      <p>When we receive a valid notice, we will remove or disable access to the material promptly and tell the user who posted it.</p>

      <h2>2. Counter-notice</h2>
      <p>If material you posted or supplied was removed because of a takedown notice and you believe it was removed by mistake or misidentification, you may send a counter-notice to our Designated Agent. Under 17 U.S.C. &sect;512(g)(3), it must include:</p>
      <ol>
        <li>Your physical or electronic signature.</li>
        <li>Identification of the material that was removed or disabled and where it appeared before it was removed.</li>
        <li>A statement, under penalty of perjury, that you have a good-faith belief the material was removed or disabled as a result of mistake or misidentification.</li>
        <li>Your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal district court for the judicial district where your address is located (or, if your address is outside the United States, any judicial district in which Lootix may be found), and that you will accept service of process from the person who sent the original notice or that person&rsquo;s agent.</li>
      </ol>
      <p>When we receive a valid counter-notice, we will send a copy to the person who sent the original notice. We will restore the material no less than 10 and no more than 14 business days after we receive the counter-notice, unless our Designated Agent first receives notice that the complaining party has filed a court action seeking to stop the activity.</p>

      <h2>3. Repeat infringers</h2>
      <p>In appropriate circumstances, Lootix will terminate the accounts, orders, or site access of users who are repeat infringers.</p>

      <h2>4. Designated Agent</h2>
      <p>Send notices and counter-notices to our Designated Agent:</p>
      <p>Bennie McCoy<br />Lootix LLC<br />[DMCA AGENT ADDRESS]<br />Email: <a href="mailto:hello@getlootix.com">hello@getlootix.com</a><br />Phone: [PHONE]</p>
      <p>This contact information matches our designated agent filing with the U.S. Copyright Office.</p>
      <p>Use the subject line &ldquo;DMCA Notice&rdquo; or &ldquo;DMCA Counter-Notice.&rdquo; This contact is for copyright matters only; other messages may not get a response here.</p>
    </ContentPage>
  );
}