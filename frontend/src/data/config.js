// ── 10 Colour Themes ─────────────────────────────────────────
export const THEMES = [
  {
    id: 'forest', name: 'Forest Green', desc: 'Classic professional green',
    navy: '#1B4332', red: '#D4A017', silver: '#F5F0E8', border: '#C8BFA8',
    text: '#1A1E0F', muted: '#6B7355', white: '#FFFDF7', gold: '#4A7C59',
    goldLt: '#EAF2EC', bg: '#EDF3EE', s1: '#1B4332', s2: '#D4A017',
  },
  {
    id: 'royal', name: 'Royal Navy', desc: 'Deep navy with gold accents',
    navy: '#1A2A4A', red: '#C89B3C', silver: '#F0EEF8', border: '#BFB9D0',
    text: '#0F1530', muted: '#5A6180', white: '#FAFAFF', gold: '#3A5080',
    goldLt: '#E8EEFA', bg: '#E8ECF5', s1: '#1A2A4A', s2: '#C89B3C',
  },
  {
    id: 'crimson', name: 'Crimson Edge', desc: 'Bold red with dark slate',
    navy: '#7B1D1D', red: '#1D3557', silver: '#FFF0F0', border: '#EBBCBC',
    text: '#1A0808', muted: '#7B5050', white: '#FFF8F8', gold: '#A31515',
    goldLt: '#FFE8E8', bg: '#FDF0F0', s1: '#7B1D1D', s2: '#1D3557',
  },
  {
    id: 'slate', name: 'Corporate Slate', desc: 'Neutral grey & teal',
    navy: '#2D3748', red: '#2C7A7B', silver: '#F7F8FA', border: '#CBD5E0',
    text: '#1A202C', muted: '#718096', white: '#FFFFFF', gold: '#2C7A7B',
    goldLt: '#E6FFFA', bg: '#EDF2F7', s1: '#2D3748', s2: '#2C7A7B',
  },
  {
    id: 'midnight', name: 'Midnight Blue', desc: 'Deep midnight with cyan',
    navy: '#1A1F5E', red: '#0097A7', silver: '#EEF0FF', border: '#B0B8E0',
    text: '#0D1033', muted: '#5A62A0', white: '#F8F9FF', gold: '#1A6B8A',
    goldLt: '#E0F4FF', bg: '#E8ECFF', s1: '#1A1F5E', s2: '#0097A7',
  },
  {
    id: 'emerald', name: 'Emerald Pro', desc: 'Vivid emerald & dark',
    navy: '#064E3B', red: '#059669', silver: '#ECFDF5', border: '#A7F3D0',
    text: '#022C22', muted: '#065F46', white: '#F0FDF4', gold: '#047857',
    goldLt: '#D1FAE5', bg: '#E8FDF5', s1: '#064E3B', s2: '#059669',
  },
  {
    id: 'amber', name: 'Amber Craft', desc: 'Warm amber & brown',
    navy: '#78350F', red: '#D97706', silver: '#FFFBEB', border: '#FDE68A',
    text: '#451A03', muted: '#92400E', white: '#FFFEF5', gold: '#B45309',
    goldLt: '#FEF3C7', bg: '#FFFAEB', s1: '#78350F', s2: '#D97706',
  },
  {
    id: 'violet', name: 'Violet Executive', desc: 'Regal purple & lavender',
    navy: '#4C1D95', red: '#7C3AED', silver: '#F5F3FF', border: '#DDD6FE',
    text: '#1E0A45', muted: '#6D28D9', white: '#FAFAFF', gold: '#5B21B6',
    goldLt: '#EDE9FE', bg: '#EEE8FF', s1: '#4C1D95', s2: '#7C3AED',
  },
  {
    id: 'rose', name: 'Rose Gold', desc: 'Elegant rose & dark',
    navy: '#881337', red: '#E11D48', silver: '#FFF1F2', border: '#FECDD3',
    text: '#4C0519', muted: '#9F1239', white: '#FFF5F7', gold: '#BE123C',
    goldLt: '#FFE4E6', bg: '#FFF0F2', s1: '#881337', s2: '#E11D48',
  },
  {
    id: 'ocean', name: 'Ocean Depth', desc: 'Deep ocean blue & aqua',
    navy: '#0C4A6E', red: '#0284C7', silver: '#F0F9FF', border: '#BAE6FD',
    text: '#082F49', muted: '#075985', white: '#F8FCFF', gold: '#0369A1',
    goldLt: '#E0F2FE', bg: '#E8F5FF', s1: '#0C4A6E', s2: '#0284C7',
  },
]

// ── 12 Documents ──────────────────────────────────────────────
export const DOCS = [
  { id: 'proforma',    name: 'Proforma Invoice',           icon: '📄', file: 'SEH_Proforma_Invoice.html' },
  { id: 'commercial',  name: 'Commercial Invoice',         icon: '🧾', file: 'SEH_Commercial_Invoice.html' },
  { id: 'packing',     name: 'Packing List',               icon: '📦', file: 'SEH_Packing_List.html' },
  { id: 'coo',         name: 'Certificate of Origin',      icon: '🌍', file: 'SEH_Certificate_of_Origin.html' },
  { id: 'po',          name: 'Purchase Order',             icon: '🛒', file: 'SEH_Purchase_Order.html' },
  { id: 'loi',         name: 'Letter of Intent',           icon: '✉️',  file: 'SEH_Letter_of_Intent.html' },
  { id: 'master',      name: 'Master Agreement',           icon: '📜', file: 'SEH_Master_Agreement.html' },
  { id: 'nodal',       name: 'Nodal Officer Appointment',  icon: '👔', file: 'SEH_Nodal_Officer_Appointment.html' },
  { id: 'undertaking', name: 'Undertaking Letter',         icon: '📋', file: 'SEH_Undertaking_Letter.html' },
  { id: 'fema',        name: 'FEMA Declaration',           icon: '🏛️',  file: 'SEH_FEMA_Declaration.html' },
  { id: 'pre',         name: 'Pre-Transaction Intimation', icon: '📤', file: 'SEH_Pre_Transaction_Intimation.html' },
  { id: 'post',        name: 'Post-Transaction Intimation',icon: '📥', file: 'SEH_Post_Transaction_Intimation.html' },
]

// ── Build theme CSS override ───────────────────────────────────
export function buildThemeCSS(t) {
  return `
:root {
  --navy:    ${t.navy};
  --red:     ${t.red};
  --silver:  ${t.silver};
  --border:  ${t.border};
  --text:    ${t.text};
  --muted:   ${t.muted};
  --white:   ${t.white};
  --gold:    ${t.gold};
  --gold-lt: ${t.goldLt};
}
body { background: ${t.bg} !important; }
.stripe-top   { background: linear-gradient(90deg,${t.s1} 0%,${t.s1} 60%,${t.s2} 60%,${t.s2} 100%) !important; }
.stripe-bottom{ background: linear-gradient(90deg,${t.s2} 0%,${t.s2} 40%,${t.s1} 40%,${t.s1} 100%) !important; }
table.items thead tr, .footer, .tot-row.grand, .purpose-code-tag,
.doc-stamp { background: ${t.navy} !important; }
.brand-name, .invoice-label, .section-title, .bank-title,
.meta-table td:last-child, .terms-header, .clause-title,
.sig-name { color: ${t.navy} !important; }
.sig-block { border-top-color: ${t.navy} !important; }
.header    { border-bottom-color: ${t.navy} !important; }
.brand-tagline, .party-label { color: ${t.red} !important; }
.party-name { color: ${t.navy} !important; }
.purpose-banner { background:${t.goldLt}!important; border-left-color:${t.gold}!important; color:${t.gold}!important; }
.hs-badge   { background:${t.goldLt}!important; color:${t.gold}!important; }
.highlight-card, .request-box { background:${t.goldLt}!important; border-left-color:${t.navy}!important; }
.success-card { background:${t.goldLt}!important; border-left-color:${t.gold}!important; }
.alert-box  { background:${t.goldLt}!important; border-left-color:${t.red}!important; }
`
}

// ── Text replacements: original → form field ──────────────────
export function applyData(html, d) {
  const map = [
    ['SIVA ELECTRONICS &amp; HOME APPLIANCES', d.sellerName],
    ['SIVA ELECTRONICS & HOME APPLIANCES', d.sellerName],
    ['Siva Electronics &amp; Home Appliances', d.sellerName],
    ['Siva Electronics & Home Appliances', d.sellerName],
    ['Exporter of Consumer Electronics &amp; Home Appliances', d.sellerTagline],
    ['Exporter of Consumer Electronics & Home Appliances', d.sellerTagline],
    ['Opp. to 21, J.K. Plaza, Pallipat Main Road', d.sellerAddr1],
    ['Podhatur Pettai, Tiruvallur, Tamil Nadu – 631 208, India', d.sellerAddr2],
    ['33BKPPK9686N1Z2', d.sellerGST],
    ['BKPPK9686N', d.sellerIEC],
    ['sivaelectronicsandhomeappliances@gmail.com', d.sellerEmail],
    ['+91 99436 91712', d.sellerPhone],
    ['R C Karthik', d.sellerProprietor],
    ['R&nbsp;C&nbsp;Karthik', d.sellerProprietor],
    ['Daniel R. Fitzgerald', d.buyerName],
    ['1482 Clearwater Blvd, Suite 7', d.buyerAddr1],
    ['Austin, Texas – 78701', d.buyerAddr2],
    ['United States of America', d.buyerCountry],
    ['daniel.fitzgerald@austintechimports.com', d.buyerEmail],
    ['+1 (512) 394-7821', d.buyerPhone],
    ['SEH-2026-0001', d.piNumber],
    ['CI-SEH-2026-0001', d.ciNumber],
    ['PO-DAN-2026-0001', d.poNumber],
    ['MA-SEH-DAN-2026', d.maNumber],
    ['SEH-LOI-2026-0001', d.loiNumber],
    ['April 20, 2026', d.docDate],
    ['May 12, 2026', d.dispatchDate],
    ['May 20, 2026', d.deliveryDate],
    ['CIF – Houston, TX', d.incoterms],
    ['Chennai Sea Port', d.portLoading],
    ['Port of Houston, TX', d.portDischarge],
    ['Air Freight – FedEx', d.shipMode],
    ['6394-8821-5507', d.awbNumber],
    ['P0103', d.purposeCode],
    ['24 Months (Auto-renewable)', d.agreementDuration],
    ['USD (US Dollar)', d.currency],
    ['HDFC Bank Ltd (Settlement)', d.bankName],
    ['Tiruvallur Branch, Tamil Nadu', d.bankBranch],
    ['50200114338560', d.bankAccount],
    ['HDFC0007166', d.bankIFSC],
    ['HDFC Bank – Authorised Dealer Category I', d.bankAD],
    ['$210.00', d.freight],
    ['$28.00', d.insurance],
    ['$25.00', d.gateway],
    ['$3,367.00', d.grandTotal],
    ['Three Thousand Three Hundred and Sixty Seven US Dollars Only', d.amountWords],
    ['$1,010.10', d.advance],
    ['$2,356.90', d.balance],
    ['Proprietor &amp; Nodal Officer', d.nodalDesig],
    ['Proprietor & Nodal Officer', d.nodalDesig],
  ]
  let out = html
  map.forEach(([f, r]) => { if (f && r) out = out.split(f).join(r) })
  return out
}
