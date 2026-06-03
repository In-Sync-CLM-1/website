// Operating-entity details — single source of truth for legal pages, footer, and invoices.
// Entity: PROSYNC AI SOLUTIONS (OPC) PRIVATE LIMITED (the company In-Sync operates from).
export const COMPANY = {
  legalName: "Prosync AI Solutions (OPC) Private Limited",
  brandName: "In-Sync",
  cin: "U62091HR2026OPC145741",
  pan: "AARCP0859N",
  gstin: "06AARCP0859N1ZO",
  // Registered office (matches GST registration record).
  address: {
    line1: "C-042C, 4th Floor, Super Mart-1",
    line2: "DLF Phase-IV, New Gurugram",
    city: "Gurugram",
    state: "Haryana",
    pin: "122002",
    country: "India",
  },
  email: "delight@in-sync.co.in",
  phone: "+91 92115 14326",
  // Jurisdiction for dispute resolution / governing law.
  jurisdiction: "Gurugram, Haryana, India",
  paymentProcessor: "Razorpay Software Private Limited",
} as const;

export const COMPANY_ADDRESS_ONELINE =
  `${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.city}, ${COMPANY.address.state} ${COMPANY.address.pin}, ${COMPANY.address.country}`;
