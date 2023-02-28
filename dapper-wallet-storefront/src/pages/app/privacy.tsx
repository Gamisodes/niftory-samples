import { memo } from "react"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"

function PrivacyComponent() {
  const title = `Privacy | Gamisodes`

  return (
    <>
      <MetaTags title={title} />
      <AppLayout>
        <section className="mx-auto container pb-5">
          <div className="text-black">
            <p className="pb-1 default_heading font-bangers mb-5 text-4xl">
              <b>Privacy Policy</b>
            </p>
            <div className="text-xl">
              <p className="">&nbsp;</p>
              <p className="pb-3">Last Updated: July 20, 2022</p>
              <p className="pb-3">
                This Privacy Policy governs the manner in which Kids Media Inc. dba Gamisodes
                (hereafter also referred to as “Gamisodes” “We” and “Us”) collects, uses, maintains
                and discloses information collected from users (each, a “User” or “You”) for our
                Websites and services (together, collectively the “Service”).
                <span className="Apple-converted-space">&nbsp; </span>By accessing the Service, you
                acknowledge and agree to this Privacy Policy and also agree to the{" "}
                <a href="https://gamisodes.com/pages/terms">
                  <span className="s1">Terms of Service</span>
                </a>
                .
              </p>
              <p className="pb-3">
                We reserve the right to make any changes to our Privacy Policy at any time, notice
                of which may be posted on this privacy page at https://gamisodes.com/privacy.
                <span className="Apple-converted-space">&nbsp; </span>Users must refer back to our
                Privacy Policy to read any changes in our Privacy Policy.
              </p>
              <p className="pb-4 text-2xl">
                <b>Information We Collect</b>
              </p>
              <p className="pb-4">
                Application and Account Information.
                <span className="Apple-converted-space">&nbsp; </span>
                When you access and/or sign up for our Service, you will be providing us with
                personally identifiable information. This refers to information about you that can
                be used to contact or identify you (“Personal Information”).
                <span className="Apple-converted-space">&nbsp; </span>
                Personal Information that we collect may include, but is not limited to, your first
                and last name, mobile phone number, email address, and any other information you
                provide or publicly available through your NFT. We may also collect any
                communications between you and Gamisodes, as well as any information you provide if
                you take part in any interactive features of the Service (e.g., games, contests,
                promotions, surveys, etc.).{" "}
                <span className="Apple-converted-space">&nbsp; &nbsp;</span>
              </p>
              <p className="pb-4">
                Usage Data.<span className="Apple-converted-space">&nbsp; </span>Besides the
                Personal information, we may also collect other information regarding your activity
                during your use of the Service including, but not limited to, session duration, time
                between sessions, searches made during a session, actions taken, log in time, log
                out time, and other behavioral data (collectively, “Usage Information”).{" "}
                <span className="Apple-converted-space">&nbsp;</span>
              </p>
              <p className="pb-5">
                When you use the Service, our servers automatically record information that your
                browser sends whenever you visit our Service.
                <span className="Apple-converted-space">&nbsp; </span>
                This information may include, but is not limited to, your computer’s Internet
                Protocol address (IP address) or other identifier, your general location, browser
                type, the web pages you were visiting before you came to the Service, and in-bound
                tracking, namely, the source (ad, social media channel or blog, search engine) which
                made you aware of the Service. <span className="Apple-converted-space">&nbsp;</span>
              </p>
              <p className="pb-4">
                We may collect your personal information regarding feedback, questions, information
                provided when you interact with our technical support representatives.
                <span className="Apple-converted-space">&nbsp; </span>Your conversations with our
                technical support representatives may be recorded and monitored to improve our
                service, troubleshoot and protect against errors, and process and resolve your
                complaints or questions.
                <span className="Apple-converted-space">&nbsp; </span>We may also collect and use
                any files that you send to us for troubleshooting in order to improve our Service.{" "}
                <span className="Apple-converted-space">&nbsp;</span>
              </p>
              <p className="pb-4 text-2xl">
                <b>How We Use the Information Collected</b>
              </p>
              <p className="pb-4">
                The Personal Information and Usage Information we collect from the Service will be
                used mainly as follows: (i) to provide, maintain, protect and improve the Service
                (including data analytics), (ii) to respond to your submissions, questions,
                comments, requests and complaints and provide customer service; (iii) as part of our
                efforts to keep the Service and integrations safe and secure; (iv) to protect
                Gamisodes’s rights or property; (v) for internal operations, including
                troubleshooting, data analysis, testing, research, customization, and improvements
                to service and experience on the Service; (vi) to send you confirmations, updates,
                security alerts, and support and administrative messages; and (vii) for any other
                legitimate business purpose for which the information was collected.
                <span className="Apple-converted-space">&nbsp; </span>We may use information to
                provide online advertising on the Service and to send you information we think may
                be useful or relevant to you.<span className="Apple-converted-space">&nbsp;</span>
              </p>
              <p className="pb-3">
                We may anonymize and aggregate data collected through the Service and use it for any
                purpose and share with other partners or third parties.
              </p>
              <p className="pb-3">
                We may also receive Personal Information and/or anonymous data about you from
                companies that offer their products and/or services for use in conjunction with our
                Service or whose products and/or services may be linked from our Service.
                <span className="Apple-converted-space">&nbsp; </span>For example, third-party
                wallet providers provide us with your blockchain address and certain other
                information you choose to share with those wallets providers. We may add this to the
                data we have already collected from or about you through our Service.
                <span className="Apple-converted-space">&nbsp;</span>
              </p>
              <p className="pb-4">
                Gamisodes may on occasion combine information collected with additional records
                (such as information from affiliated companies, partners, distributors, or outside
                vendors, and publicly available information, including on social media sites).
                <span className="Apple-converted-space">&nbsp; </span>The combined information may
                be used for purposes such as to market products, features, or services that may be
                of interest to you, or for research and analytics.
              </p>
              <p className="pb-4 text-2xl">
                <b>Sharing Information with Third Parties</b>
              </p>
              <p className="pb-4">
                Gamisodes may share your information: (i) where your consent is obtained, such as
                when you choose to opt-in to the sharing of data; (ii) with vendors and service
                providers retained in connection with provision of the Service, including for data
                analytics purposes (iii) to comply with law enforcement requests and legal process
                (such as a court order or subpoena) legal action or law enforcement (“Legal
                Reasons”); (iv) to enforce or apply this Privacy Policy, our{" "}
                <a href="https://gamisodes.com/pages/terms">
                  <span className="s1">Terms of Service</span>
                </a>{" "}
                or our other policies or agreements; (v) respond to your requests; (vi) protect
                Gamisodes’s, your, or others’ legal rights and/or property (“Prevent Harm”); or
                (vii) if Gamisodes is involved in a merger, acquisition or asset sale, in which case
                the use of your information will be governed by the provisions of this Privacy
                Policy in effect at the time Gamisodes collected such information. One of the
                service providers that we use for data analytics is Google Analytics. If you do not
                want Google Analytics to collect and use information about your use of the Service,
                then you can install an opt-out in your web browser (
                <a href="https://tools.google.com/dlpage/gaoptout/">
                  <span className="s1">https://tools.google.com/dlpage/gaoptout/</span>
                </a>
                ).
              </p>
              <p className="pb-4 text-2xl">
                <b>Your Choices Regarding Your Information</b>
              </p>
              <p className="pb-4">
                Email Communications.<span className="Apple-converted-space">&nbsp; </span>We may
                send you newsletters or promotional communications, and you may indicate a
                preference to stop receiving these communications from us by following the
                unsubscribe instructions provided in the email you receive or by altering your
                account settings.
                <span className="Apple-converted-space">&nbsp; </span>Even if you opt out of
                marketing or promotional communications, we may send you occasional transactional
                service-related informational communications.
              </p>
              <p className="pb-4">
                Cookies.<span className="Apple-converted-space">&nbsp; </span>If you decide at any
                time that you no longer wish to accept Cookies from our Service,
                <span className="Apple-converted-space">&nbsp; </span>you can instruct your browser,
                by changing its settings, to stop accepting Cookies or to prompt you before
                accepting a Cookie from the websites you visit. Consult your browser’s technical
                information. If you do not accept Cookies, however, you may not be able to use all
                portions of the Service or all functionality of the Service.
              </p>
              <p className="pb-4">
                Data Access and Control.<span className="Apple-converted-space">&nbsp; </span>You
                can view, access, edit, or delete your Personal Information for certain aspects of
                the Service via your Settings page.
                <span className="Apple-converted-space">&nbsp; </span>
                If you are a user in the European Economic Area or United Kingdom, you have certain
                rights under the respective European and UK General Data Protection Regulations
                (“GDPR”). These include the right to (i) request access and obtain a copy of your
                personal data; (ii) request rectification or erasure; (iii) object to or restrict
                the processing of your personal data; and (iv) request portability of your personal
                data. Additionally, if we have collected and processed your personal data with your
                consent, you have the right to withdraw your consent at any time.
              </p>
              <p className="pb-4">
                If you wish to exercise your rights under the GDPR or other applicable data
                protection or privacy laws, please contact us at hello@gamisodes.com with the
                subject “Data Privacy Request”, specify your request, and reference the applicable
                law. We may ask you to verify your identity or ask for more information about your
                request. We will consider and act upon any above request in accordance with
                applicable law. We will not discriminate against you for exercising any of these
                rights.
              </p>
              <p className="pb-4">
                Please note that Gamisodes cannot edit or delete any information that is stored on a
                blockchain as we do not have custody or control over any blockchains. The
                information stored on the blockchain may include purchases, sales, and transfers
                related to your blockchain address and NFTs held at that address.
              </p>
              <p className="pb-4 text-2xl">
                <b>Service Providers, Business Partners and Others</b>
              </p>
              <p className="pb-4">
                Gamisodes does not control the privacy policies of third parties, and you are
                subject to the privacy policies of those third parties where applicable.
                <span className="Apple-converted-space">&nbsp; </span>Gamisodes is not responsible
                for the privacy or security practices of other websites on the Internet, even those
                linked to or from the Gamisodes site.
                <span className="Apple-converted-space">&nbsp; </span>We encourage you to ask
                questions before you disclose your personal information to others.
              </p>
              <p className="pb-4">
                We may employ third party service providers to facilitate our Service, to provide
                blockchain services (e.g., blockchain wallets and secondary sales), to provide
                services on our behalf, to perform Website-related services (including but not
                limited to maintenance services, database management, web analytics and improvement
                of Gamisodes’s features) or to assist us in analyzing how our Website and Service
                are used and can be improved. These third parties may have access to your Personal
                Information only for purposes of performing these tasks on our behalf.
              </p>
              <p className="pb-4 text-2xl">
                <b>Compliance with Laws and Law Enforcement</b>
              </p>
              <p className="pb-4">
                Gamisodes must cooperate with government and law enforcement officials and private
                parties to enforce and comply with the law.
                <span className="Apple-converted-space">&nbsp; </span>In the event of a claim and/or
                legal process (including but not limited to subpoenas), to protect the property and
                rights of Gamisodes or a third party, to protect the safety of the public or any
                person, or to prevent or stop any activity we may consider to pose a risk of being
                illegal, unethical, inappropriate or legally actionable, we reserve the right to
                disclose any information about you to government or law enforcement officials or
                private parties as we in our sole discretion find necessary or appropriate.
              </p>
              <p className="pb-4 text-2xl">
                <b>Business Transfers</b>
              </p>
              <p className="pb-4">
                In the event of a bankruptcy, merger, acquisition, reorganization or sale of assets,
                Gamisodes may sell, transfer or otherwise share some or all of its assets, and your
                Personal Information may be transferred as part of that transaction.
                <span className="Apple-converted-space">&nbsp; </span>To the maximum extent
                allowable by law, the Privacy Policy will apply to the User information as
                transferred to the successor entity.
                <span className="Apple-converted-space">&nbsp; </span>However, User information
                submitted after a transfer to a successor entity may be subject to a new privacy
                policy adopted by the successor entity.
              </p>
              <p className="pb-4 text-2xl">
                <b>Security</b>
              </p>
              <p className="pb-4">
                The security of your personal information is important to us.
                <span className="Apple-converted-space">&nbsp; </span>Your Gamisodes account
                information is protected by a password.{" "}
                <span className="Apple-converted-space">&nbsp; </span>It is important that you
                protect against unauthorized access of your account and information by choosing your
                password carefully and keeping your password and computer secure by signing out
                after using our services.
                <span className="Apple-converted-space">&nbsp; </span>Each password owner is
                responsible for keeping the password confidential and safe, as Gamisodes has no
                control or responsibility for this type of user information.
                <span className="Apple-converted-space">&nbsp; </span>You agree not to disclose or
                share your user information and/or password with any third party.
                <span className="Apple-converted-space">&nbsp; </span>You are responsible for any
                activity using your account, whether or not You authorize that activity.
                <span className="Apple-converted-space">&nbsp; </span>Please immediately notify
                Gamisodes of any unauthorized use of your account.{" "}
                <span className="Apple-converted-space">&nbsp;</span>
              </p>
              <p className="pb-4 text-2xl">
                <b>Cookies &amp; Tracking Technologies</b>
              </p>
              <p className="pb-4">
                Gamisodes uses a variety of technologies to help us better understand how people use
                the Site.
              </p>
              <p className="pb-4">
                A cookie is a small data file sent from a web site to your browser that is stored on
                your computer's hard drive.<span className="Apple-converted-space">&nbsp; </span>
                Gamisodes uses our own cookies for a number of purposes, including to access your
                information when you sign in; keep track of preferences you specify; display the
                most appropriate content based on your interests and activity on Gamisodes; estimate
                and report Gamisodes's total audience size and traffic; conduct research to improve
                our content and services. <span className="Apple-converted-space">&nbsp;</span>
              </p>
              <p className="pb-4">
                We use Flash cookies (a.k.a. local shared objects or LSOs) to store some of your
                viewing preferences on our site. Flash cookies are used to collect and store
                information, but differ from browser cookies in the amount, type and manner in which
                data is stored.
                <span className="Apple-converted-space">&nbsp; </span>Gamisodes does not tie the
                information gathered by Flash cookies to your personally identifiable information.
              </p>
              <p className="pb-4">
                Gamisodes may partner with third-party services who may use various tracking
                technologies, such as browser cookies or Flash cookies, to provide certain services
                or features. These technologies allow a partner to recognize your computer each time
                you visit Gamisodes, but do not allow access to personally identifiable information
                from Gamisodes.
                <span className="Apple-converted-space">&nbsp; </span>Gamisodes does not have access
                or control over these third-party technologies, and they are not covered by our
                privacy statement.
                <span className="Apple-converted-space">&nbsp; </span>You may be able to change
                browser settings to refuse and/or disable cookies when you access the Site through a
                web browser.
                <span className="Apple-converted-space">&nbsp; </span>The steps to do this vary
                depending on the browser used, but generally can be found by using the “Help”
                feature available on your browser.
                <span className="Apple-converted-space">&nbsp; </span>
                However, if you do that, the Site may not work properly and/or personalized features
                of the Site will be disabled. <span className="Apple-converted-space">&nbsp;</span>
              </p>
              <p className="pb-4">
                Do Not Track Signals from Web Browsers – The Service is not presently configured to
                support Do Not Track (“DNT”) signals from web browsers.
              </p>
              <p className="pb-4 text-2xl">
                <b>Data Retention</b>
              </p>
              <p className="pb-4">
                Gamisodes will retain your Personal Information for as long as your account is
                active or as needed to provide you services.
                <span className="Apple-converted-space">&nbsp; </span>
                If you no longer want Gamisodes to use your information to provide you services, you
                may close your account.<span className="Apple-converted-space">&nbsp; </span>In some
                instances, we will delete or anonymize the information you provide to us after it is
                no longer needed.
                <span className="Apple-converted-space">&nbsp; </span>We also keep information about
                you and your use of the Service for long as it is necessary for our legitimate
                business interests, legal reasons (e.g., legal requirements to keep data), and to
                prevent harm to Gamisodes and/or its users.
                <span className="Apple-converted-space">&nbsp; </span>If we no longer need your
                personal information, we will delete it.
                <b>
                  <span className="Apple-converted-space">&nbsp;</span>
                </b>
              </p>
              <p className="pb-4 text-2xl">
                <b>Our Policy toward Children</b>
              </p>
              <p className="pb-4">
                The Children’s Online Privacy Protection Act (“COPPA”) requires that online service
                providers obtain parental consent before they knowingly collect personally
                identifiable information online from children who are under thirteen (13) years old.
                We do not knowingly collect or solicit personally identifiable information from a
                child under thirteen (13) without obtaining verifiable consent from that child’s
                parent or guardian (“Parental Consent”), except for the limited amount of personally
                identifiable information we need to collect in order to obtain Parental Consent
                (“Required Information”). Until we have received Parental Consent, we will only use
                Required Information for the purpose of obtaining Parental Consent.
                <span className="Apple-converted-space">&nbsp;</span>
              </p>
              <p className="pb-4">
                If you are a child under thirteen (13), please do not attempt to send any personal
                information about yourself to us before we obtain Parental Consent, except for the
                Required Information in the context of the Parental Consent process. If you believe
                that a child under thirteen (13) has provided us with personal information (beyond
                the Required Information) without our obtaining Parental Consent, please contact us
                at&nbsp;hello@gamisodes.com. We do not condition participation in our Services on
                disclosure of more Personal Information from a child under thirteen (13) than is
                reasonably necessary for that participation, and we do not retain Personal
                Information from children under thirteen (13) longer than is reasonably necessary in
                order to fulfill the purpose for which it was disclosed.
              </p>
              <p className="pb-4">
                If you are a parent or guardian of a child under thirteen (13), you have the right
                to request that we allow you to review, modify or delete your child's personal
                information, or that we stop further collection of the child's personal information.
                If you wish to exercise those rights, please contact us at hello@gamisodes.com. We
                will need to verify your identity before we can comply with your request.
              </p>
              <p className="pb-4 text-2xl">
                <b>For Users Outside of the United States Only</b>
              </p>
              <p className="pb-4">
                The Service is hosted on servers located in the United States.{" "}
                <span className="Apple-converted-space">&nbsp; </span>If you are a user accessing
                the Service from the European Union, Australia, Asia, or any other region with laws
                or regulations governing personal data collection, use, and disclosure, that differ
                from United States laws, you are transferring your personal data to the United
                States which may not have the same data protection laws as such other regions.
                <span className="Apple-converted-space">&nbsp; </span>By providing user information
                through the Service, you are consenting to the transfer of your information to the
                United States for processing and maintenance in accordance with this Privacy Policy
                and the Terms of Use.
                <span className="Apple-converted-space">&nbsp; </span>You are also consenting to the
                application of United States law in all matters concerning the Service and any
                services offered or provided therefrom.
              </p>
              <p className="pb-4 text-2xl">
                <b>For Users Residing in California -- Your California Privacy Rights</b>
              </p>
              <p className="pb-4">
                Pursuant to Section 1798.83 of the California Civil Code, residents of California
                can obtain certain information about the types of personal information that
                companies with whom they have an established business relationship have shared with
                third parties for direct marketing purposes during the preceding calendar year. In
                particular, the law provides that companies must inform consumers about the
                categories of personal information that have been shared with third parties, the
                names and addresses of those third parties, and examples of the types of services or
                products marketed by those third parties. To request a copy of the information
                disclosure provided by Gamisodes pursuant to Section 1798.83 of the California Civil
                Code, please contact us via the email address stated below. Please allow at least 30
                days for a response.
              </p>
              <p className="pb-4 text-2xl">
                <b>Updates to Privacy Policy</b>
              </p>
              <p className="pb-4">
                If we make any material changes to this Privacy Policy, we will post a notice on the
                website or application notifying users of the changes. In some cases, we also may
                send an email notifying users of any changes.
                <span className="Apple-converted-space">&nbsp; </span>You should check this website
                periodically to see if any recent changes to this Privacy Policy have occurred.
              </p>
              <p className="pb-4 text-2xl">
                <b>Contacting Us</b>
              </p>
              <p className="pb-4">
                This Policy is part of the Terms of Use of the Service and any use of the Service is
                governed by those Terms of Service.
                <span className="Apple-converted-space">&nbsp; </span>If you have any questions
                about this Privacy Policy, the practices of this site, or your dealings with this
                site, please contact us at hello@gamisodes.com.
              </p>
            </div>
          </div>
        </section>
      </AppLayout>
    </>
  )
}

export default memo(PrivacyComponent)
