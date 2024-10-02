import React from "react";
import Category from "../../components/named-header/category";
import Footer from "../../components/footer/footer";
import "./privacy.css";

export default function PrivacyPage() {
  return (
    <div>
      <Category name="Privacy Policy" />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="policy">
      <b>Effective October 10, 2024</b>
      <p>
        At Anibrowser, your privacy is important to us. This Privacy Policy
        outlines the types of information we may collect when you visit our
        website, how we use and protect that information, and your rights
        regarding any personal data. Please read this Privacy Policy carefully
        to understand our practices.
      </p>
      <ul>
        <li>
          <h3>1. Data Collection</h3>
          <ul className="inner">
            <li>
              <p>
                Anibrowser does not collect any personal information from users
                at this time. You can browse and explore our website without
                creating an account, providing personal details, or sharing
                sensitive information. We do not collect, store, or process any
                data that can identify you personally.
              </p>
            </li>
          </ul>
        </li>
        <li>
          <h3>2. Cookies and Tracking Technologies</h3>
          <ul className="inner">
            <li>
              <p>
                Anibrowser does not use cookies or other tracking technologies
                to gather personal information. We do not employ analytics tools
                that collect data related to your browsing behavior, location,
                or device.
              </p>
            </li>
          </ul>
        </li>
        <li>
          <h3>3. Third Party Links</h3>
          <ul className="inner">
            <li>
              <p>
                Our website may include links to third-party websites or
                services, such as MyAnimeList or other anime-related platforms.
                These third-party sites may have their own privacy policies, and
                we encourage you to review those before engaging with their
                services. Anibrowser is not responsible for the privacy
                practices of third-party websites.
              </p>
            </li>
          </ul>
        </li>
        <li>
          <h3>4. Security</h3>
          <ul className="inner">
            <li>
              <p>
                Even though we do not collect personal information, Anibrowser
                is committed to ensuring that your browsing experience is safe
                and secure. Our website uses industry-standard measures to
                maintain a secure environment, but please note that no website
                is completely immune to risks.
              </p>
            </li>
          </ul>
        </li>

        <li>
          <h3>5. Changes to our policies</h3>
          <ul className="inner">
            <li>
              <p>
                As our website evolves, we may update this Privacy Policy to
                reflect new features or legal requirements. Any changes will be
                posted on this page, with an updated effective date. We
                encourage you to review this page periodically to stay informed
                of our practices.
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
