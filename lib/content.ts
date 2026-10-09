import { brandName, brandNameStart, monthlyPrice, partner, setupPrice } from "@/lib/partner"

const { offer, promises, contact } = partner
const edits = promises.edits
const firstVersion = promises.firstVersion
const responseTime = contact.responseTime

/** Phrases in the headline that get the highlight color. */
export const HEADLINE_HIGHLIGHTS = ["custom website", "built and maintained for you."]

export const content = {
  hero: {
    headline: offer.headline,
    subhead: offer.subhead,
    pricePill: {
      setup: setupPrice,
      setupLabel: "one-time setup, then",
      monthly: `${monthlyPrice} a month`,
    },
    priceText: `${setupPrice} one-time setup, then ${monthlyPrice} a month`,
    priceNote: offer.priceNote,
    chips: ["Custom-designed", "Made for phones and computers", "Hosting and updates included"],
  },

  why: {
    title: "Your website is often the first thing people see.",
    text: "Before they call, visit, or buy, many people look a business up online. A clear, professional website answers their questions, shows what you do, and gives them an easy way to reach you.",
    items: [
      {
        title: "Show what you do",
        body: "Explain your services and share your hours and the areas you serve.",
      },
      {
        title: "Look established",
        body: "Your name, logo, and colors give people confidence in your business.",
      },
      {
        title: "Be easy to reach",
        body: "A simple contact form puts customers one step away from getting in touch.",
      },
    ],
  },

  whatYouGet: {
    title: "What you get",
    subtitle: "Everything you need to get online, with nothing to put together yourself.",
    cards: [
      {
        title: "Custom design",
        body: "Designed around your business, with your logo, colors, and services. Built from scratch, not dropped into a template.",
      },
      {
        title: "A page for each main service",
        body: "Each of your main services gets its own page, so visitors find exactly what they came for. Smaller, related services are grouped together on the same page.",
      },
      {
        title: "Made for phones and computers",
        body: "Your site adjusts to fit the screen it's viewed on. Text stays readable and buttons are easy to tap.",
      },
      {
        title: "Hosting and SSL included",
        body: "We host your site and add an SSL certificate, so your address starts with https and visitors connect securely.",
      },
      {
        title: "Search-friendly structure",
        body: "Pages are built with clean structure, titles, and descriptions that search engines can read. No one can promise rankings, but your site gives search engines what they need to understand it.",
      },
      {
        title: "A contact form that reaches you",
        body: "Visitors send a message from your site, and it goes straight to your email. We set it up and test it before launch.",
      },
      {
        title: "Updates when your business changes",
        body: `New hours, a new photo, a new phone number? Send us the change. Content edits are ${edits}.`,
      },
      {
        title: "Simple tracking included",
        body: "Using Google Analytics, Google Ads conversion tracking, or a Meta Pixel? Give us the tag from your account and we'll install it.",
      },
      {
        title: "Two rounds of changes",
        body: "Review a private preview, send us your changes, and we'll revise. You get two rounds before your site goes live.",
      },
    ],
  },

  goodFit: {
    title: "A good fit if...",
    items: [
      "You don't have a website yet.",
      "Your current one is out of date or hard to change.",
      "You'd rather hand it off than learn to build it yourself.",
    ],
  },

  pricing: {
    title: "Simple, flat pricing",
    subtitle: "Two prices. Everything below is included.",
    plans: [
      {
        price: setupPrice,
        caption: "one-time setup",
        bullets: [
          "Custom design and build",
          "A page for each main service",
          "A private preview before launch",
          "Two rounds of changes",
          "Contact form set up and tested",
          "Help connecting your domain",
        ],
      },
      {
        price: monthlyPrice,
        caption: "a month",
        bullets: [
          "Hosting and SSL",
          `Content updates, ${edits}`,
          "Technical support",
          "Simple tracking tags",
          "No long-term contract",
        ],
      },
    ],
    notIncluded: {
      title: "Not included",
      body: "Your domain name (you buy it and you own it), online stores and new features, extra pages added after launch, and redesigns. Ask us about any of these and we'll quote it separately.",
    },
  },

  howItWorks: {
    title: "How it works",
    subtitle: "From your first request to launch day.",
    steps: [
      {
        title: "Send a request",
        body: `Tell us your name, phone number, and a little about your business. ${brandNameStart} will reach out within ${responseTime} to answer your questions.`,
      },
      {
        title: "Get started",
        body: "When you're ready, pay the setup fee and fill in a short online form about your business: your services, where you work, your logo, and your photos.",
      },
      {
        title: "Review your first version",
        body: `Your first version is ${firstVersion}. You see it in a private preview before anything goes public.`,
      },
      {
        title: "Make it yours",
        body: "Send us one list of changes and we'll revise it. You get two rounds of changes before launch.",
      },
      {
        title: "Launch",
        body: "We connect your own domain, test your contact form, and publish your site. After that, your monthly plan covers hosting, updates, and support.",
      },
    ],
  },

  ready: {
    title: "What to have ready",
    text: "You don't need to write a lot. These are the things that make your site better.",
    items: [
      "Your logo, if you have one",
      "Photos of your work (real ones are best)",
      "A list of your services and the areas you serve",
      "Your hours and contact details",
      "A few sentences about your business",
      "Your domain name, if you already have one",
    ],
    footnote: "Don't have some of these yet? Tell us, and we'll help you work out what to do.",
  },

  faq: {
    title: "Questions",
    items: [
      {
        question: "How much does it cost?",
        answer: `${setupPrice} one-time setup, then ${monthlyPrice} a month. That covers design, hosting, SSL, support, and content updates. No long-term contract.`,
      },
      {
        question: "What's included?",
        answer:
          "A custom-designed website with a page for each of your main services, a version that works on phones and computers, hosting and SSL, a contact form, a private preview, two rounds of changes, and help connecting your domain.",
      },
      {
        question: "How long does it take?",
        answer: `Your first version is ${firstVersion}. Then you get two rounds of changes. How quickly you send your information and feedback affects the timeline.`,
      },
      {
        question: "What do I need to send you?",
        answer:
          'A short online form about your business, plus your logo and photos if you have them. See "What to have ready" above.',
      },
      {
        question: "Do I own my website?",
        answer:
          "You own your domain name and your content, like your logo, text, and photos. The website itself is a managed service, so it stays online while your monthly plan is active.",
      },
      {
        question: "What about my domain name?",
        answer:
          "You'll need your own domain, which you buy from a domain registrar. If you don't have one, we'll help you choose one and connect it. If you do, we'll show you exactly what to change.",
      },
      {
        question: "What if I need changes later?",
        answer: `Send us the change: text, photos, hours, or contact details. These updates are ${edits}. New pages, features, and redesigns are quoted separately.`,
      },
      {
        question: "Can I cancel?",
        answer:
          "Yes. Cancel any month. Your site stays online until the end of that month, then goes offline. You keep your domain and your content.",
      },
      {
        question: "Is there a contract?",
        answer: "There's no long-term contract. You'll agree to simple written terms before work starts.",
      },
      {
        question: "How does the contact form work?",
        answer:
          "When someone fills in your site's form, the message goes straight to your email. It uses a free email service account (EmailJS) that you own, and we help you set it up. Free plans have monthly limits, so if you ever outgrow it, that service bills you directly.",
      },
      {
        question: "Do I need photos?",
        answer:
          "Real photos of your work and your team help most. If you don't have many yet, tell us. We can talk through options, including licensed stock images with your approval.",
      },
      {
        question: "Will I show up on Google?",
        answer:
          "We build every site with a search-friendly structure, but no one can promise rankings or a certain number of customers.",
      },
    ],
  },

  finalCta: {
    title: "Ready to get your business online?",
    text: `Send us a request. Tell us about your business, and ${brandName} will get back to you within ${responseTime}. Sending a request doesn't commit you to anything.`,
  },

  leadForm: {
    subtitle: `Tell us a little about your business. ${brandNameStart} will contact you within ${responseTime}.`,
  },
} as const
