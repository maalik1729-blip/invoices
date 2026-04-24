import React, { useState } from 'react'
import { generateProducts } from '../services/groqService'

// ── exported for App.jsx ──────────────────────────────────────

/* ══ STATIC DATA ════════════════════════════════════════════════════ */
export const DEFAULT_ITEMS = [
  {
    desc: '', category: 'Consumer Electronics', model: '',
    spec: '', hsn: '', qty: '1', unit: 'Pcs',
    netWeight: '', grossWeight: '',
    unitPrice: '', total: '',
  },
]

const PRODUCT_CATEGORIES = [
  'Consumer Electronics', 'Home Appliances', 'Kitchen Appliances',
  'Audio & Visual Equipment', 'Personal Care Electronics',
  'Lighting & Electrical', 'Computer & Accessories',
  'Mobile & Accessories', 'Power Equipment', 'Other',
]

const UNITS = ['Pcs', 'Sets', 'Nos', 'Box', 'Carton', 'Kg', 'Dozen', 'Pairs']

const COUNTRY_CODES = [
  { code: '+91', label: '🇮🇳 +91 India' },
  { code: '+1',  label: '🇺🇸 +1 USA / Canada' },
  { code: '+44', label: '🇬🇧 +44 UK' },
  { code: '+61', label: '🇦🇺 +61 Australia' },
  { code: '+971', label: '🇦🇪 +971 UAE' },
  { code: '+65', label: '🇸🇬 +65 Singapore' },
  { code: '+60', label: '🇲🇾 +60 Malaysia' },
  { code: '+49', label: '🇩🇪 +49 Germany' },
  { code: '+33', label: '🇫🇷 +33 France' },
  { code: '+81', label: '🇯🇵 +81 Japan' },
  { code: '+82', label: '🇰🇷 +82 South Korea' },
  { code: '+86', label: '🇨🇳 +86 China' },
  { code: '+55', label: '🇧🇷 +55 Brazil' },
  { code: '+27', label: '🇿🇦 +27 South Africa' },
  { code: '+7',  label: '🇷🇺 +7 Russia' },
  { code: '+966', label: '🇸🇦 +966 Saudi Arabia' },
  { code: '+20', label: '🇪🇬 +20 Egypt' },
  { code: '+234', label: '🇳🇬 +234 Nigeria' },
  { code: '+92', label: '🇵🇰 +92 Pakistan' },
  { code: '+880', label: '🇧🇩 +880 Bangladesh' },
]

const INDIAN_BANKS = [
  {
    name: 'HDFC Bank Ltd',
    adLabel: 'HDFC Bank – Authorised Dealer Category I',
    ifscPrefix: 'HDFC',
  },
  {
    name: 'State Bank of India (SBI)',
    adLabel: 'State Bank of India – Authorised Dealer Category I',
    ifscPrefix: 'SBIN',
  },
  {
    name: 'ICICI Bank Ltd',
    adLabel: 'ICICI Bank – Authorised Dealer Category I',
    ifscPrefix: 'ICIC',
  },
  {
    name: 'Axis Bank Ltd',
    adLabel: 'Axis Bank – Authorised Dealer Category I',
    ifscPrefix: 'UTIB',
  },
  {
    name: 'Kotak Mahindra Bank',
    adLabel: 'Kotak Mahindra Bank – Authorised Dealer Category I',
    ifscPrefix: 'KKBK',
  },
  {
    name: 'Bank of Baroda',
    adLabel: 'Bank of Baroda – Authorised Dealer Category I',
    ifscPrefix: 'BARB',
  },
  {
    name: 'Punjab National Bank',
    adLabel: 'Punjab National Bank – Authorised Dealer Category I',
    ifscPrefix: 'PUNB',
  },
  {
    name: 'Canara Bank',
    adLabel: 'Canara Bank – Authorised Dealer Category I',
    ifscPrefix: 'CNRB',
  },
  {
    name: 'Union Bank of India',
    adLabel: 'Union Bank of India – Authorised Dealer Category I',
    ifscPrefix: 'UBIN',
  },
  {
    name: 'Yes Bank Ltd',
    adLabel: 'Yes Bank – Authorised Dealer Category I',
    ifscPrefix: 'YESB',
  },
  {
    name: 'IndusInd Bank',
    adLabel: 'IndusInd Bank – Authorised Dealer Category I',
    ifscPrefix: 'INDB',
  },
  {
    name: 'Federal Bank',
    adLabel: 'Federal Bank – Authorised Dealer Category I',
    ifscPrefix: 'FDRL',
  },
  {
    name: 'Indian Overseas Bank',
    adLabel: 'Indian Overseas Bank – Authorised Dealer Category I',
    ifscPrefix: 'IOBA',
  },
  {
    name: 'South Indian Bank',
    adLabel: 'South Indian Bank – Authorised Dealer Category I',
    ifscPrefix: 'SIBL',
  },
  {
    name: 'Karnataka Bank',
    adLabel: 'Karnataka Bank – Authorised Dealer Category I',
    ifscPrefix: 'KARB',
  },
]

/* ══ REUSABLE FIELD COMPONENTS ══════════════════════════════════════ */
function Field({ label, id, type = 'text', value, onChange, full, placeholder }) {
  return (
    <div className={`form-group ${full ? 'full' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id} type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

/** Phone field: country-code select + number input */
function PhoneField({ label, codeKey, phoneKey, formData, setFormData, full }) {
  const setField = key => val => setFormData(p => ({ ...p, [key]: val }))
  return (
    <div className={`form-group ${full ? 'full' : ''}`}>
      <label>{label}</label>
      <div className="phone-combo">
        <select
          className="phone-code-select"
          value={formData[codeKey]}
          onChange={e => setField(codeKey)(e.target.value)}
        >
          {COUNTRY_CODES.map(c => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
        <input
          className="phone-number-input"
          type="tel"
          value={formData[phoneKey]}
          placeholder="Phone number"
          onChange={e => setField(phoneKey)(e.target.value)}
        />
      </div>
    </div>
  )
}

/** Bank select dropdown — auto-fills name, IFSC prefix, AD label */
function BankSelect({ formData, setFormData }) {
  const handleBankChange = (bankName) => {
    const bank = INDIAN_BANKS.find(b => b.name === bankName)
    if (bank) {
      setFormData(p => ({
        ...p,
        bankName: bank.name,
        bankAD: bank.adLabel,
        bankIFSC: bank.ifscPrefix + p.bankIFSC.slice(4), // keep branch digits
      }))
    }
  }

  const set = key => val => setFormData(p => ({ ...p, [key]: val }))
  const selectedBank = INDIAN_BANKS.find(b => b.name === formData.bankName)

  return (
    <div className="form-grid">
      {/* Bank Dropdown */}
      <div className="form-group full">
        <label htmlFor="bankSelect">Select Bank</label>
        <select
          id="bankSelect"
          className="styled-select"
          value={selectedBank ? formData.bankName : ''}
          onChange={e => handleBankChange(e.target.value)}
        >
          <option value="">— Choose a bank —</option>
          {INDIAN_BANKS.map(b => (
            <option key={b.name} value={b.name}>{b.name}</option>
          ))}
        </select>
      </div>

      <Field label="Bank Name (editable)"          id="bankName"       value={formData.bankName}       onChange={set('bankName')} full />
      <Field label="Branch"                        id="bankBranch"     value={formData.bankBranch}     onChange={set('bankBranch')} />
      <Field label="Account Number"                id="bankAccount"    value={formData.bankAccount}    onChange={set('bankAccount')} />
      <Field label="IFSC Code"                     id="bankIFSC"       value={formData.bankIFSC}       onChange={set('bankIFSC')} />
      <Field label="AD Bank (Authorised Dealer)"   id="bankAD"         value={formData.bankAD}         onChange={set('bankAD')} full />
      <Field label="Accepted Payment Methods"      id="paymentMethods" value={formData.paymentMethods} onChange={set('paymentMethods')} full />
    </div>
  )
}

/* ══ MAIN COMPONENT ════════════════════════════════════════════════ */
export default function FormSection({ formData, setFormData, items, setItems, onGenerate, generating, onSellerNameBlur, savedNames = [], onManualSave }) {
  const set = key => val => setFormData(p => ({ ...p, [key]: val }))

  // ── AI Generator state ──────────────────────────────────────
  const [aiCategory, setAiCategory] = useState('Consumer Electronics')
  const [aiCount,    setAiCount]    = useState(3)
  const [aiLoading,  setAiLoading]  = useState(false)
  const [aiError,    setAiError]    = useState('')
  const [aiMode,     setAiMode]     = useState('replace') // 'replace' | 'append'

  const runAiGenerate = async () => {
    setAiLoading(true)
    setAiError('')
    try {
      const generated = await generateProducts(aiCategory, aiCount)
      if (!generated || generated.length === 0) throw new Error('No products returned')
      // Ensure all required keys exist
      const normalised = generated.map(p => ({
        desc:        p.desc        || p.name        || '',
        category:    p.category   || aiCategory,
        model:       p.model      || p.modelNo      || '',
        spec:        p.spec       || `Model: ${p.model || ''} | HSN: ${p.hsn || ''}`,
        hsn:         p.hsn        || '',
        qty:         String(p.qty || '1'),
        unit:        p.unit       || 'Pcs',
        netWeight:   p.netWeight  || p.net_weight   || '',
        grossWeight: p.grossWeight|| p.gross_weight || '',
        unitPrice:   p.unitPrice  || p.unit_price   || '$0.00',
        total:       p.total      || '$0.00',
      }))
      setItems(prev => aiMode === 'append' ? [...prev, ...normalised] : normalised)
    } catch (err) {
      setAiError(err.message || 'Failed to generate products. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }

  const addItem = () =>
    setItems(p => [...p, {
      desc: '', category: 'Consumer Electronics', model: '',
      spec: '', hsn: '', qty: '1', unit: 'Pcs',
      netWeight: '', grossWeight: '',
      unitPrice: '$0.00', total: '$0.00',
    }])

  const removeItem = i =>
    setItems(p => p.length > 1 ? p.filter((_, idx) => idx !== i) : p)

  const updateItem = (i, key, val) =>
    setItems(p => p.map((it, idx) => idx === i ? { ...it, [key]: val } : it))

  return (
    <section className="section active" id="section-form">
      <div className="section-header">
        <h1 className="section-title">Business Details Form</h1>
        <p className="section-desc">Fill in the details below — they will be applied to all 12 export documents automatically.</p>
      </div>

      {/* ── SELLER ── */}
      <div className="card">
        <div className="card-head">
          <span className="card-icon">🏢</span>
          <div>
            <div className="card-title">Seller / Exporter Details</div>
            <div className="card-sub">Your business information (Siva Electronics)</div>
          </div>
        </div>
        <div className="form-grid">
          {/* sellerName with autocomplete + auto-fill on blur */}
          <div className="form-group full">
            <label htmlFor="sellerName">Business / Company Name</label>
            <input
              id="sellerName"
              list="seller-names-list"
              value={formData.sellerName}
              placeholder="Type your company name…"
              onChange={e => set('sellerName')(e.target.value)}
              onBlur={e => onSellerNameBlur && onSellerNameBlur(e.target.value)}
            />
            <datalist id="seller-names-list">
              {savedNames.map(n => <option key={n} value={n} />)}
            </datalist>
          </div>
          <Field full  label="Business Tagline"                id="sellerTagline"     value={formData.sellerTagline}     onChange={set('sellerTagline')} />
          <Field full  label="Address Line 1"                  id="sellerAddr1"       value={formData.sellerAddr1}       onChange={set('sellerAddr1')} />
          <Field full  label="Address Line 2"                  id="sellerAddr2"       value={formData.sellerAddr2}       onChange={set('sellerAddr2')} />
          <Field       label="GSTIN"                           id="sellerGST"         value={formData.sellerGST}         onChange={set('sellerGST')}         placeholder="e.g. 33BKPPK9686N1Z2" />
          <Field       label="IEC Code"                        id="sellerIEC"         value={formData.sellerIEC}         onChange={set('sellerIEC')}         placeholder="e.g. BKPPK9686N" />
          {/* ✅ FIX: PAN is separate with its own placeholder */}
          <Field       label="PAN Number"                      id="sellerPAN"         value={formData.sellerPAN}         onChange={set('sellerPAN')}         placeholder="e.g. ABCDE1234F" />
          <Field       label="Email"             type="email"  id="sellerEmail"       value={formData.sellerEmail}       onChange={set('sellerEmail')} />
          {/* ✅ Country code dropdown before phone */}
          <PhoneField
            label="Phone"
            codeKey="sellerPhoneCode"
            phoneKey="sellerPhoneNum"
            formData={formData}
            setFormData={setFormData}
          />
          <Field       label="Proprietor / Authorised Signatory" id="sellerProprietor" value={formData.sellerProprietor} onChange={set('sellerProprietor')} />
          <Field       label="Designation"                     id="sellerDesignation" value={formData.sellerDesignation} onChange={set('sellerDesignation')} />
        </div>
      </div>

      {/* ── BUYER ── */}
      <div className="card">
        <div className="card-head">
          <span className="card-icon">👤</span>
          <div>
            <div className="card-title">Buyer / Importer Details</div>
            <div className="card-sub">Customer information</div>
          </div>
        </div>
        <div className="form-grid">
          <Field full label="Buyer Full Name"     id="buyerName"    value={formData.buyerName}    onChange={set('buyerName')} />
          <Field full label="Address Line 1"      id="buyerAddr1"   value={formData.buyerAddr1}   onChange={set('buyerAddr1')} />
          <Field full label="Address Line 2"      id="buyerAddr2"   value={formData.buyerAddr2}   onChange={set('buyerAddr2')} />
          <Field      label="Country"             id="buyerCountry" value={formData.buyerCountry} onChange={set('buyerCountry')} />
          <Field      label="Email" type="email"  id="buyerEmail"   value={formData.buyerEmail}   onChange={set('buyerEmail')} />
          {/* ✅ Country code dropdown before buyer phone */}
          <PhoneField
            label="Phone"
            codeKey="buyerPhoneCode"
            phoneKey="buyerPhoneNum"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>

      {/* ── TRANSACTION ── */}
      <div className="card">
        <div className="card-head">
          <span className="card-icon">📋</span>
          <div>
            <div className="card-title">Transaction & Document Details</div>
            <div className="card-sub">Invoice numbers, dates, and logistics</div>
          </div>
        </div>
        <div className="form-grid">
          <Field label="Proforma Invoice No."     id="piNumber"          value={formData.piNumber}          onChange={set('piNumber')} />
          <Field label="Commercial Invoice No."   id="ciNumber"          value={formData.ciNumber}          onChange={set('ciNumber')} />
          <Field label="Purchase Order No."       id="poNumber"          value={formData.poNumber}          onChange={set('poNumber')} />
          <Field label="Master Agreement No."     id="maNumber"          value={formData.maNumber}          onChange={set('maNumber')} />
          <Field label="LOI Document No."         id="loiNumber"         value={formData.loiNumber}         onChange={set('loiNumber')} />
          <Field label="Document Date"            id="docDate"           value={formData.docDate}           onChange={set('docDate')} />
          <Field label="Dispatch / Shipment Date" id="dispatchDate"      value={formData.dispatchDate}      onChange={set('dispatchDate')} />
          <Field label="Expected Delivery Date"   id="deliveryDate"      value={formData.deliveryDate}      onChange={set('deliveryDate')} />
          <Field label="Currency"                 id="currency"          value={formData.currency}          onChange={set('currency')} />
          <Field label="Incoterms"                id="incoterms"         value={formData.incoterms}         onChange={set('incoterms')} />
          <Field label="Purpose Code"             id="purposeCode"       value={formData.purposeCode}       onChange={set('purposeCode')} />
          <Field label="Agreement Duration"       id="agreementDuration" value={formData.agreementDuration} onChange={set('agreementDuration')} />
        </div>
      </div>

      {/* ── SHIPPING ── */}
      <div className="card">
        <div className="card-head">
          <span className="card-icon">🚢</span>
          <div>
            <div className="card-title">Shipping & Logistics</div>
            <div className="card-sub">Port, mode, AWB details</div>
          </div>
        </div>
        <div className="form-grid">
          <Field label="Port of Loading"        id="portLoading"   value={formData.portLoading}   onChange={set('portLoading')} />
          <Field label="Port of Discharge"      id="portDischarge" value={formData.portDischarge} onChange={set('portDischarge')} />
          <Field label="Mode of Shipment"       id="shipMode"      value={formData.shipMode}      onChange={set('shipMode')} />
          <Field label="AWB / Tracking Number"  id="awbNumber"     value={formData.awbNumber}     onChange={set('awbNumber')} />
          <Field label="Country of Origin"      id="countryOrigin" value={formData.countryOrigin} onChange={set('countryOrigin')} />
        </div>
      </div>

      {/* ── BANKING (with dropdown) ── */}
      <div className="card">
        <div className="card-head">
          <span className="card-icon">🏦</span>
          <div>
            <div className="card-title">Banking & Payment Details</div>
            <div className="card-sub">Select bank from dropdown — details auto-fill, and are editable</div>
          </div>
        </div>
        <BankSelect formData={formData} setFormData={setFormData} />
      </div>

      {/* ── ORDER LINE ITEMS (with expanded product details) ── */}
      <div className="card">
        <div className="card-head">
          <span className="card-icon">📦</span>
          <div>
            <div className="card-title">Order Line Items</div>
            <div className="card-sub">Enter products manually or generate them instantly with AI ✨</div>
          </div>
        </div>

        {/* ── AI PRODUCT GENERATOR PANEL ── */}
        <div className="ai-generator-panel">
          <div className="ai-panel-header">
            <span className="ai-panel-icon">🤖</span>
            <div>
              <div className="ai-panel-title">AI Product Generator</div>
              <div className="ai-panel-sub">Select a category and let Groq AI generate realistic export products with HSN codes, weights & pricing</div>
            </div>
          </div>

          <div className="ai-controls">
            {/* Category */}
            <div className="ai-control-group">
              <label className="ai-control-label">Product Category</label>
              <select
                className="styled-select"
                value={aiCategory}
                onChange={e => setAiCategory(e.target.value)}
                disabled={aiLoading}
              >
                {PRODUCT_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Count */}
            <div className="ai-control-group ai-control-sm">
              <label className="ai-control-label">No. of Products</label>
              <select
                className="styled-select"
                value={aiCount}
                onChange={e => setAiCount(Number(e.target.value))}
                disabled={aiLoading}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} product{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {/* Mode */}
            <div className="ai-control-group ai-control-sm">
              <label className="ai-control-label">Action</label>
              <select
                className="styled-select"
                value={aiMode}
                onChange={e => setAiMode(e.target.value)}
                disabled={aiLoading}
              >
                <option value="replace">Replace existing</option>
                <option value="append">Append to list</option>
              </select>
            </div>

            {/* Generate button */}
            <div className="ai-control-group ai-control-btn">
              <label className="ai-control-label">&nbsp;</label>
              <button
                className={`btn-ai-generate ${aiLoading ? 'loading' : ''}`}
                onClick={runAiGenerate}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <><span className="ai-spinner" />  Generating…</>
                ) : (
                  <><span>✨</span> Generate Products</>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {aiError && (
            <div className="ai-error">
              ⚠️ {aiError}
            </div>
          )}

          {/* Loading skeleton */}
          {aiLoading && (
            <div className="ai-loading-bar">
              <div className="ai-loading-fill" />
            </div>
          )}
        </div>

        <div className="items-wrapper">
          {items.map((it, i) => (
            <div key={i} className="item-card">
              <div className="item-card-header">
                <span className="item-card-num">Item #{i + 1}</span>
                <button className="btn-remove-item" onClick={() => removeItem(i)}>✕ Remove</button>
              </div>

              <div className="form-grid">
                {/* Product name */}
                <div className="form-group full">
                  <label>Product Description</label>
                  <input
                    value={it.desc}
                    onChange={e => updateItem(i, 'desc', e.target.value)}
                    placeholder="e.g. Samsung 65″ QLED 4K Smart TV"
                  />
                </div>

                {/* Category dropdown */}
                <div className="form-group">
                  <label>Product Category</label>
                  <select
                    className="styled-select"
                    value={it.category}
                    onChange={e => updateItem(i, 'category', e.target.value)}
                  >
                    {PRODUCT_CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div className="form-group">
                  <label>Model / Part No.</label>
                  <input
                    value={it.model}
                    onChange={e => {
                      updateItem(i, 'model', e.target.value)
                      updateItem(i, 'spec', `Model: ${e.target.value} | HSN: ${it.hsn}`)
                    }}
                    placeholder="e.g. QN65Q80C"
                  />
                </div>

                {/* HSN */}
                <div className="form-group">
                  <label>HSN Code</label>
                  <input
                    value={it.hsn}
                    onChange={e => {
                      updateItem(i, 'hsn', e.target.value)
                      updateItem(i, 'spec', `Model: ${it.model} | HSN: ${e.target.value}`)
                    }}
                    placeholder="e.g. 8528.72"
                  />
                </div>

                {/* Specification (auto-built, editable) */}
                <div className="form-group full">
                  <label>Specification (auto-filled, editable)</label>
                  <input
                    value={it.spec}
                    onChange={e => updateItem(i, 'spec', e.target.value)}
                    placeholder="Model: ... | HSN: ..."
                  />
                </div>

                {/* Qty */}
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={it.qty}
                    onChange={e => updateItem(i, 'qty', e.target.value)}
                    placeholder="1"
                    min="1"
                  />
                </div>

                {/* Unit dropdown */}
                <div className="form-group">
                  <label>Unit</label>
                  <select
                    className="styled-select"
                    value={it.unit}
                    onChange={e => updateItem(i, 'unit', e.target.value)}
                  >
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>

                {/* Net weight */}
                <div className="form-group">
                  <label>Net Weight</label>
                  <input
                    value={it.netWeight}
                    onChange={e => updateItem(i, 'netWeight', e.target.value)}
                    placeholder="e.g. 18.5 kg"
                  />
                </div>

                {/* Gross weight */}
                <div className="form-group">
                  <label>Gross Weight</label>
                  <input
                    value={it.grossWeight}
                    onChange={e => updateItem(i, 'grossWeight', e.target.value)}
                    placeholder="e.g. 22.0 kg"
                  />
                </div>

                {/* Unit price */}
                <div className="form-group">
                  <label>Unit Price</label>
                  <input
                    value={it.unitPrice}
                    onChange={e => updateItem(i, 'unitPrice', e.target.value)}
                    placeholder="$0.00"
                  />
                </div>

                {/* Total */}
                <div className="form-group">
                  <label>Total Amount</label>
                  <input
                    value={it.total}
                    onChange={e => updateItem(i, 'total', e.target.value)}
                    placeholder="$0.00"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-add-item" onClick={addItem}>+ Add Product Item</button>

        {/* Financials summary */}
        <div className="form-grid" style={{ marginTop: '24px', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
          <div className="form-group full" style={{ gridColumn: '1 / -1', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.6px' }}>
              Financial Summary
            </span>
          </div>
          <Field label="Freight Amount"       id="freight"      value={formData.freight}      onChange={set('freight')} />
          <Field label="Insurance Amount"     id="insurance"    value={formData.insurance}    onChange={set('insurance')} />
          <Field label="Payment Gateway Charges" id="gateway"   value={formData.gateway}      onChange={set('gateway')} />
          <Field label="GST / Tax"            id="tax"          value={formData.tax}          onChange={set('tax')} />
          <Field label="Grand Total"          id="grandTotal"   value={formData.grandTotal}   onChange={set('grandTotal')} />
          <Field label="Amount in Words"      id="amountWords"  value={formData.amountWords}  onChange={set('amountWords')} full />
          <Field label="30% Advance Amount"   id="advance"      value={formData.advance}      onChange={set('advance')} />
          <Field label="70% Balance Amount"   id="balance"      value={formData.balance}      onChange={set('balance')} />
        </div>
      </div>

      {/* ── NODAL OFFICER ── */}
      <div className="card">
        <div className="card-head">
          <span className="card-icon">👔</span>
          <div>
            <div className="card-title">Nodal Officer Details</div>
            <div className="card-sub">For Nodal Officer Appointment letter</div>
          </div>
        </div>
        <div className="form-grid">
          <Field label="Nodal Officer Name"        id="nodalName"  value={formData.nodalName}  onChange={set('nodalName')} />
          <Field label="Nodal Officer Designation" id="nodalDesig" value={formData.nodalDesig} onChange={set('nodalDesig')} />
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-reset" onClick={() => window.location.reload()}>Reset to Defaults</button>
        <button className="btn-save-db" onClick={onManualSave}>💾 Save to Database</button>
        <button
          className="btn-generate-big"
          onClick={onGenerate}
          disabled={generating}
        >
          {generating ? (
            <><span className="ai-spinner" /> Generating All 12…</>
          ) : (
            '🚀 Generate All 12 Documents'
          )}
        </button>
      </div>
    </section>
  )
}
