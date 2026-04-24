import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  desc:        { type: String, default: '' },
  category:    { type: String, default: '' },
  model:       { type: String, default: '' },
  spec:        { type: String, default: '' },
  hsn:         { type: String, default: '' },
  qty:         { type: String, default: '1' },
  unit:        { type: String, default: 'Pcs' },
  netWeight:   { type: String, default: '' },
  grossWeight: { type: String, default: '' },
  unitPrice:   { type: String, default: '' },
  total:       { type: String, default: '' },
})

const userDataSchema = new mongoose.Schema(
  {
    // ── Lookup key ─────────────────────────────────────────────────────
    sellerName: { type: String, required: true, unique: true, trim: true },

    // ── Seller ─────────────────────────────────────────────────────────
    sellerTagline:     { type: String, default: '' },
    sellerAddr1:       { type: String, default: '' },
    sellerAddr2:       { type: String, default: '' },
    sellerGST:         { type: String, default: '' },
    sellerIEC:         { type: String, default: '' },
    sellerPAN:         { type: String, default: '' },
    sellerEmail:       { type: String, default: '' },
    sellerPhoneCode:   { type: String, default: '+91' },
    sellerPhoneNum:    { type: String, default: '' },
    sellerPhone:       { type: String, default: '' },
    sellerProprietor:  { type: String, default: '' },
    sellerDesignation: { type: String, default: '' },

    // ── Buyer ──────────────────────────────────────────────────────────
    buyerName:      { type: String, default: '' },
    buyerAddr1:     { type: String, default: '' },
    buyerAddr2:     { type: String, default: '' },
    buyerCountry:   { type: String, default: '' },
    buyerEmail:     { type: String, default: '' },
    buyerPhoneCode: { type: String, default: '+1' },
    buyerPhoneNum:  { type: String, default: '' },
    buyerPhone:     { type: String, default: '' },

    // ── Transaction ────────────────────────────────────────────────────
    piNumber:          { type: String, default: '' },
    ciNumber:          { type: String, default: '' },
    poNumber:          { type: String, default: '' },
    maNumber:          { type: String, default: '' },
    loiNumber:         { type: String, default: '' },
    docDate:           { type: String, default: '' },
    dispatchDate:      { type: String, default: '' },
    deliveryDate:      { type: String, default: '' },
    currency:          { type: String, default: 'USD' },
    incoterms:         { type: String, default: '' },
    purposeCode:       { type: String, default: '' },
    agreementDuration: { type: String, default: '' },

    // ── Shipping ───────────────────────────────────────────────────────
    portLoading:   { type: String, default: '' },
    portDischarge: { type: String, default: '' },
    shipMode:      { type: String, default: '' },
    awbNumber:     { type: String, default: '' },
    countryOrigin: { type: String, default: 'India' },

    // ── Banking ────────────────────────────────────────────────────────
    bankName:       { type: String, default: '' },
    bankBranch:     { type: String, default: '' },
    bankAccount:    { type: String, default: '' },
    bankIFSC:       { type: String, default: '' },
    bankAD:         { type: String, default: '' },
    paymentMethods: { type: String, default: '' },

    // ── Financials ─────────────────────────────────────────────────────
    freight:     { type: String, default: '' },
    insurance:   { type: String, default: '' },
    gateway:     { type: String, default: '' },
    tax:         { type: String, default: '' },
    grandTotal:  { type: String, default: '' },
    amountWords: { type: String, default: '' },
    advance:     { type: String, default: '' },
    balance:     { type: String, default: '' },

    // ── Nodal ──────────────────────────────────────────────────────────
    nodalName:  { type: String, default: '' },
    nodalDesig: { type: String, default: '' },

    // ── Line items ─────────────────────────────────────────────────────
    items: { type: [itemSchema], default: [] },
  },
  { timestamps: true }
)

export default mongoose.model('UserData', userDataSchema)
