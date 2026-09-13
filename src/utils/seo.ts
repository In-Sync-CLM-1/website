/**
 * SEO Utility Functions
 * Centralized SEO management for meta tags, structured data, and optimization
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  /** Falls back to `title`/`description` when omitted — set these only when the og: card copy should read shorter/differently than the <title>/meta description. */
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: any;
}

/**
 * Generate structured data for Organization
 */
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "In-Sync",
  "alternateName": "In-Sync Platform",
  "url": "https://in-sync.co.in",
  "logo": "https://in-sync.co.in/logo.png",
  "description": "Business operations platform for growing Indian companies — ten focused apps for CRM, campaigns, events, field force, expenses, vendor verification, recruitment, and lending on one platform",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-11-4084-1521",
    "contactType": "Customer Service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/in-sync-crm",
    "https://twitter.com/insynccrm",
    "https://www.youtube.com/c/insynccrm"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Corporate Office",
    "addressLocality": "New Delhi",
    "addressRegion": "Delhi",
    "postalCode": "110001",
    "addressCountry": "IN"
  }
});

/**
 * Generate structured data for SoftwareApplication
 */
export const getSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "In-Sync Platform",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "500",
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": "One platform, ten products: CRM, WhatsApp and email campaigns, event management, field force tracking, task management, expense claims, vendor verification, recruitment, and loan origination"
});

/**
 * Generate structured data for FAQ page
 */
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * Generate structured data for Article/Blog
 */
export const getArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  imageUrl?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "datePublished": article.publishDate,
  "dateModified": article.modifiedDate || article.publishDate,
  "image": article.imageUrl || "https://in-sync.co.in/default-og-image.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "In-Sync",
    "logo": {
      "@type": "ImageObject",
      "url": "https://in-sync.co.in/logo.png"
    }
  }
});

/**
 * Generate structured data for Product/Service
 */
export const getProductSchema = (product: {
  name: string;
  description: string;
  price?: string;
  currency?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": "In-Sync"
  },
  "offers": product.price ? {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": product.currency || "INR",
    "availability": "https://schema.org/InStock"
  } : undefined
});

/**
 * Generate breadcrumb structured data
 */
export const getBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

/**
 * Default SEO configurations for different pages
 */
export const defaultSEOConfig: Record<string, SEOConfig> = {
  home: {
    title: "In-Sync - Run Your Entire Business on One Platform | India",
    description: "Ten focused apps for growing Indian businesses: CRM, WhatsApp & email campaigns, event management, field force tracking, expense claims, vendor verification, recruitment, and loan origination — on one platform.",
    keywords: "business software India, CRM software India, WhatsApp campaigns, event management software, field force management, vendor verification, applicant tracking system, loan origination system",
    canonical: "https://in-sync.co.in/",
    ogType: "website",
    ogImage: "https://in-sync.co.in/og-home.jpg",
    twitterCard: "summary_large_image"
  },
  features: {
    title: "In-Sync CRM Features - AI Automation, Multi-Channel Marketing & Calling",
    description: "Explore In-Sync CRM's features: AI-powered calling, WhatsApp automation, sales pipeline management, email campaigns, and AI lead scoring — the flagship product of the In-Sync platform.",
    keywords: "CRM features, AI calling, WhatsApp automation, sales pipeline, AI lead scoring, marketing automation",
    canonical: "https://in-sync.co.in/features",
    ogType: "website"
  },
  pricing: {
    title: "In-Sync Pricing - Simple Per-User Pricing | Transparent Pricing",
    description: "Simple, transparent per-user pricing for the In-Sync platform. No hidden fees, scales with your business. Prepaid communication wallet for WhatsApp, email, and calling.",
    keywords: "CRM pricing, business software pricing India, per user pricing, transparent pricing",
    canonical: "https://in-sync.co.in/pricing",
    ogType: "website"
  },
  industries: {
    title: "Industry Solutions | Healthcare, Finance, Manufacturing, Real Estate & More",
    description: "In-Sync platform solutions tailored for your industry — healthcare, financial services, manufacturing, real estate, technology, education, and professional services.",
    keywords: "industry software, healthcare software, financial services software, manufacturing software, real estate software",
    canonical: "https://in-sync.co.in/industries",
    ogType: "website"
  },
  resources: {
    title: "Resources - Guides, Whitepapers, Tutorials & Webinars | In-Sync",
    description: "Guides, whitepapers, video tutorials, and webinars on sales, marketing, operations, and the In-Sync platform.",
    keywords: "business software resources, CRM guides, tutorials, whitepapers, webinars",
    canonical: "https://in-sync.co.in/resources",
    ogType: "website"
  },

  // Product pages — each MUST be self-referencing (canonical to its own
  // /products/<slug> URL, never the homepage) and lead the title with the
  // exact keyword phrase a buyer searches, before the brand name. Found
  // 2026-09-13: every one of these pages rendered zero page-level SEO tags
  // at all, so all ten silently inherited index.html's homepage <title> and
  // canonical — suppressing organic search sitewide, not just on paid
  // traffic.
  worksync: {
    title: "Task Tracking Software for Teams | WorkSync by In-Sync",
    description: "WorkSync is task tracking and accountability software for Indian teams. Assign tasks, track progress to sign-off, and stop losing work in WhatsApp chats. Book a demo.",
    keywords: "task tracking software, task management software for teams, project and task management tools, employee task tracking, whatsapp task tracking",
    canonical: "https://in-sync.co.in/products/worksync",
    ogTitle: "WorkSync — Task Tracking Software for Teams",
    ogDescription: "Assign tasks, track progress to sign-off, and stop losing work in WhatsApp chats.",
    ogType: "website"
  },
  crm: {
    title: "AI Sales CRM Software for Closing Deals | In-Sync CRM",
    description: "In-Sync CRM is AI-powered sales CRM software for Indian teams. Score every lead, know who to call next, and see exactly where a deal is stalling. Book a demo.",
    keywords: "sales CRM software, AI CRM software India, lead scoring software, sales pipeline management, deal tracking software",
    canonical: "https://in-sync.co.in/products/crm",
    ogType: "website"
  },
  ats: {
    title: "Applicant Tracking System for Recruiters | ATS by In-Sync",
    description: "In-Sync ATS is applicant tracking system software for high-volume recruitment. Match candidates to mandates, automate screening calls, and track every stage. Book a demo.",
    keywords: "applicant tracking system, ATS software India, recruitment software, candidate tracking software, recruitment automation",
    canonical: "https://in-sync.co.in/products/ats",
    ogType: "website"
  },
  expense: {
    title: "Expense Management Software for Teams | Expense by In-Sync",
    description: "In-Sync Expense is expense claims and approval software for Indian teams. Submit, approve and reimburse claims with a full audit trail — no more chasing over chat. Book a demo.",
    keywords: "expense management software, expense claims software, employee expense tracking, expense approval workflow, travel expense software",
    canonical: "https://in-sync.co.in/products/expense",
    ogType: "website"
  },
  fieldSync: {
    title: "Field Force Tracking Software for Teams | FieldSync by In-Sync",
    description: "FieldSync is field force tracking and management software for Indian field teams. Real-time location, visit verification, and beat-plan tracking. Book a demo.",
    keywords: "field force tracking software, field employee tracking, field service management software, sales rep tracking app, beat plan software",
    canonical: "https://in-sync.co.in/products/field-sync",
    ogType: "website"
  },
  vendorVerification: {
    title: "Vendor Verification & Onboarding Software | Vendor-Sync by In-Sync",
    description: "Vendor-Sync is vendor verification and onboarding software with automated KYC — PAN, GST and bank checks before you commit. Book a demo.",
    keywords: "vendor verification software, vendor onboarding software, vendor KYC software, supplier verification, vendor management system",
    canonical: "https://in-sync.co.in/products/vendor-verification",
    ogType: "website"
  },
  eventSync: {
    title: "Event Registration & Management Software | EventSync by In-Sync",
    description: "EventSync is event registration and management software that runs the whole lifecycle — reminders, live check-in, and post-event lead scoring. Book a demo.",
    keywords: "event management software, event registration software, event check-in software, attendee management software, event lead scoring",
    canonical: "https://in-sync.co.in/products/eventsync",
    ogType: "website"
  },
  emailBroadcast: {
    title: "Email Marketing Software for Teams | Email Broadcast by In-Sync",
    description: "In-Sync Email is bulk email marketing software with real deliverability tracking — know who opened, clicked, and replied. Book a demo.",
    keywords: "email marketing software, bulk email software, email campaign software, email deliverability tracking, transactional email software",
    canonical: "https://in-sync.co.in/products/email-broadcast",
    ogType: "website"
  },
  whatsappCampaigns: {
    title: "WhatsApp Business API Software for Teams | In-Sync WhatsApp",
    description: "In-Sync WhatsApp is WhatsApp Business API software for marketing and support campaigns — send, track replies, and automate follow-ups. Book a demo.",
    keywords: "WhatsApp Business API software, WhatsApp marketing software, WhatsApp campaign software, WhatsApp automation for business, bulk WhatsApp sender",
    canonical: "https://in-sync.co.in/products/whatsapp-campaigns",
    ogType: "website"
  },
  paisaaSaarthi: {
    title: "Loan Origination System Software | PaisaaSaarthi by In-Sync",
    description: "PaisaaSaarthi is loan origination system software — lead capture through KYC, credit, underwriting and disbursal, with AI document parsing and fraud detection. Book a demo.",
    keywords: "loan origination system, LOS software India, NBFC lending software, loan management software, digital lending platform",
    canonical: "https://in-sync.co.in/products/paisaa-saarthi",
    ogType: "website"
  }
};

/**
 * Generate canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
  const baseUrl = "https://in-sync.co.in";
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Generate meta robots content
 */
export const getRobotsContent = (noindex?: boolean, nofollow?: boolean): string => {
  const directives = [];
  if (noindex) directives.push('noindex');
  if (nofollow) directives.push('nofollow');
  
  if (directives.length === 0) {
    return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  }
  
  return directives.join(', ');
};

/**
 * Truncate text for meta descriptions
 */
export const truncateDescription = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * Generate keywords string from array
 */
export const generateKeywords = (keywords: string[]): string => {
  return keywords.join(', ');
};
