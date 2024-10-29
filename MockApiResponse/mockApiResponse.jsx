export const mockApiResponse = {
    items: [
      {
        open_state: {
          body: {
            title: "How much do you need?",
            subtitle: "Move the dial and set any amount you need up to ₹487891",
            card: {
              header: "credit amount",
              description: "@1.04% monthly",
              max_range: 487891,
              min_range: 500
            },
            footer: "Stash is instant. Money will be credited within seconds"
          }
        },
        closed_state: {
          body: {
            key1: "credit amount"
          }
        },
        cta_text: "Proceed to EMI selection"
      },
      {
        open_state: {
          body: {
            title: "How do you wish to repay?",
            subtitle: "Choose one of our recommended plans or make your own",
            items: [
              {
                emi: "₹4,247 /mo",
                duration: "12 months",
                title: "₹4,247 /mo for 12 months",
                subtitle: "See calculations"
              },
              {
                emi: "₹5,580 /mo",
                duration: "9 months",
                title: "₹5,580 /mo for 9 months",
                subtitle: "See calculations",
                tag: "recommended"
              },
              {
                emi: "₹8,270 /mo",
                duration: "6 months",
                title: "₹8,270 /mo for 6 months",
                subtitle: "See calculations"
              }
            ],
            footer: "Create your own plan"
          }
        },
        closed_state: {
          body: {
            key1: "emi",
            key2: "duration"
          }
        },
        cta_text: "Select your bank account"
      },
      {
        open_state: {
          body: {
            title: "Where should we send the money?",
            subtitle: "Amount will be credited to the bank account. EMI will also be debited from this bank account",
            items: [
              {
                icon: "",
                title: "HDFC BANK",
                subtitle: "897458935"
              },
              {
                icon: "",
                title: "SBI",
                subtitle: "897453435"
              },
              {
                icon: "",
                title: "PNB",
                subtitle: "8974589334535"
              }
            ],
            footer: "Change account"
          }
        },
        closed_state: {
          body: {}
        },
        cta_text: "Tap for 1-click KYC"
      }
    ]
  };