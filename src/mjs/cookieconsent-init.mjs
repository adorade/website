//
// Cookie-consent init
// -----------------------------------------------------------------------------

// eslint-disable-next-line no-undef
CookieConsent.run({
  disablePageInteraction: true,

  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom left',
      equalWeightButtons: false
    },
    preferencesModal: {
      layout: 'box',
      equalWeightButtons: false
    }
  },

  categories: {
    necessary: {
      enabled: true,
      readOnly: true
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga)/
          }
        ],
        reloadPage: true
      }
    },
    marketing: {
      autoClear: {
        reloadPage: true
      }
    }
  },

  language: {
    default: 'en',
    translations: {
      en: {
        consentModal: {
          title: 'We use cookies!',
          description: 'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
          acceptAllBtn: 'Accept all',
          closeIconLabel: 'Reject all and close',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          footer: `
            <a href="#!" target="_blank">Privacy Policy</a>
            <a href="#!" target="_blank">Terms and conditions</a>
          `
        },
        preferencesModal: {
          title: 'Manage cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Accept current selection',
          closeIconLabel: 'Close modal',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Cookie usage 📢',
              description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="cookies-policy.html" class="cc__link">cookie consent</a> policy.'
            },
            {
              title: 'Strictly Necessary cookies <span class="pm__badge">Always Enabled</span>',
              description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',
              linkedCategory: 'necessary',
              cookieTable: {
                headers: {
                  name: 'Name',
                  domain: 'Domain',
                  duration: 'Duration',
                  description: 'Description'
                },
                body: [
                  {
                    name: 'cc_cookie',
                    domain: window.location.hostname,
                    duration: '1 year',
                    description: 'Cookie Consent'
                  }
                ]
              }
            },
            {
              title: 'Performance and Analytics',
              description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Name',
                  domain: 'Domain',
                  duration: 'Duration',
                  description: 'Description'
                },
                body: [
                  {
                    name: '^_ga',
                    domain: window.location.hostname,
                    duration: '1 year',
                    description: 'Cookie set by Google Analytics used to identify users'
                  }
                ]
              }
            },
            {
              title: 'Marketing',
              description: 'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
              linkedCategory: 'marketing',
              cookieTable: {
                headers: {
                  name: 'Name',
                  domain: 'Domain',
                  duration: 'Duration',
                  description: 'Description'
                },
                body: [
                  {
                    name: '^__Secure',
                    domain: 'google.com',
                    duration: 'Session',
                    description: 'Cookie set by Google Ads'
                  },
                  {
                    name: 'NID',
                    domain: 'google.com',
                    duration: 'Session',
                    description: 'Cookie set by Google'
                  }
                ]
              }
            },              {
              title: 'More information',
              description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc__link" href="contact.html">contact us</a>.'
            }
          ]
        }
      }
    }
  }
})
