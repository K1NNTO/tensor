import React from 'react';



/**
 * Компонент Footer отображает информационные ссылки и нижнюю часть с юридическими ссылками и часовой зоной.
 */
const Footer = () => {
  const footerLinks = [
    {
      title: "Company",
      links: ["About", "Contact", "Jobs", "Features"]
    },
    {
      title: "Help",
      links: ["Track My Music", "Community Support", "Community Guidelines", "Help"]
    },
    {
      title: "Goodies",
      links: ["Download Scrobbler", "Developer API", "Free Music Downloads", "Merchandise"]
    },
    {
      title: "Account",
      links: ["Inbox", "Settings", "Last.fm Pro", "Logout"]
    },
    {
      title: "Follow Us",
      links: ["Facebook", "X", "Bluesky", "Instagram", "YouTube"]
    }
  ];

  const bottomLinks = ["Terms of Use", "Privacy Policy", "Legal Policies", "Cookie Details"];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top-row">
          {footerLinks.map((section, index) => (
            <div className="footer-col" key={index}>
              <h2>{section.title}</h2>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}><a href="">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© 2025 Last.fm Ltd. All rights reserved</p>
          <ul>
            {bottomLinks.map((link, index) => (
              <li key={index}><a href="">{link}</a></li>
            ))}
          </ul>
          <p>Time zone: Europe/Moscow</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
