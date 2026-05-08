---
title: Banking Analytics Interview Prep
description: Interview questions for analytics roles in banking — domain knowledge, use cases, and regulatory considerations.
lastUpdated: 2026-05-08
---

## Banking Domain Knowledge

### Core Banking Concepts

| Question | Answer |
|----------|--------|
| **What are the key metrics in banking?** | NIM (Net Interest Margin), ROE (Return on Equity), CAR (Capital Adequacy Ratio), NPA (Non-Performing Assets), CASA ratio (Current & Savings Account). |
| **What is the difference between retail and corporate banking?** | Retail: individual customers, smaller transactions, mass market (loans, deposits, cards). Corporate: businesses, larger transactions, relationship banking (trade finance, working capital). |
| **What is the banking revenue model?** | Interest income (loan interest - deposit interest), fee income (transactions, cards, advisory), trading/investment income. |
| **What is a credit cycle?** | Expansion (easy credit) → Peak → Contraction (defaults rise) → Trough → Recovery. Banks manage risk across cycles. |

## ML/AI Use Cases in Banking

### Fraud Detection

| Question | Answer |
|----------|--------|
| **How would you build a fraud detection model?** | Features: transaction amount, location, time, device, merchant category. Models: rule-based (speed), ML (random forest, gradient boosting), deep learning (for complex patterns). Key: real-time scoring, low latency. |
| **What metrics would you use for fraud detection?** | Recall (catch all frauds - critical), Precision (minimize false positives - customer experience), False positive rate, AUPRC. Trade-off: more fraud caught = more false positives. |
| **How do you handle imbalanced data in fraud detection?** | SMOTE, undersampling, class weights, focal loss, anomaly detection approaches (Isolation Forest, Autoencoders). |
| **What is adaptive authentication?** | Risk-based authentication that adjusts based on transaction risk. Low risk = simple auth, high risk = additional verification (OTP, biometrics). |
| **How do you handle new fraud patterns?** | Continuous learning, drift detection, feature engineering from new patterns, expert rules for emerging threats. |

### Credit Risk & Scoring

| Question | Answer |
|----------|--------|
| **What is credit scoring and how does it work?** | Predict probability of default using borrower features (income, existing debts, payment history, employment). Models: logistic regression (explainable), XGBoost (accurate), neural networks. |
| **What are the key features in credit scoring?** | Payment history (35%), amounts owed (30%), length of credit history (15%), new credit (10%), credit mix (10%). FICO model. |
| **What is PD, LGD, and EAD?** | PD: Probability of Default (likelihood borrower defaults). LGD: Loss Given Default (loss if default occurs). EAD: Exposure at Default (amount at risk when default happens). Used in Basel calculations. |
| **What is a credit risk model validation?** | Checking model performance on holdout data, stability over time, calibration (predicted vs actual defaults), segment analysis. |
| **How would you build a scorecard?** | Binning continuous variables, weight of evidence transformation, logistic regression for interpretability. Validate using PSI (population stability index), Gini, KS statistic. |

### Customer Analytics

| Question | Answer |
|----------|--------|
| **What is customer segmentation in banking?** | Grouping customers by behavior (savers, borrowers, investors), lifecycle stage, profitability, risk profile. Used for targeted marketing, product design. |
| **What is customer lifetime value (CLV) in banking?** | Predicting total value a customer will generate. Factors: product holdings, transaction frequency, tenure, cross-sell potential. |
| **How would you predict customer churn?** | Features: transaction decline, NPS drop, product gaps, support complaints. Models: logistic regression, survival analysis. |
| **What is next-best-action in banking?** | Recommending the right product/offer to each customer at the right time, maximizing conversion while managing risk. |
| **How do you personalize banking experiences?** | Recommendation engines for products, spending insights, personalized pricing, dynamic credit limits. |

### Regulatory & Compliance

| Question | Answer |
|----------|--------|
| **What is AML (Anti-Money Laundering)?** | Detecting suspicious transactions that might indicate money laundering. Rules-based + ML models. Key: reduce false positives while catching real suspicious activity. |
| **What is KYC (Know Your Customer)?** | Verifying customer identity and assessing risk. Digital KYC uses OCR, face recognition, liveness detection. |
| **What is Basel III and why does it matter?** | International banking regulations requiring minimum capital reserves, stress testing, liquidity requirements. Affects how banks can use ML models (model risk management). |
| **What is model risk management (MRM)?** | Governance around ML models: documentation, validation, monitoring, governance. Required by regulators for banks. |
| **What is explainability in banking ML?** | Ability to explain model decisions, especially for credit decisions. Required for consumer credit (ECOA, Fair Lending). Methods: SHAP, LIME, monotonic constraints. |

## Technical Banking Questions

| Question | Answer |
|----------|--------|
| **How would you design a real-time transaction monitoring system?** | Stream processing (Kafka, Flink), feature store, real-time scoring model, decision engine, alert management. Latency <100ms. |
| **What is a feature store in banking?** | Centralized feature repository ensuring consistency between training and production. Critical for compliance and audit. |
| **How do you handle data privacy in banking ML?** | Data masking, tokenization, differential privacy, on-premise processing for sensitive data. |
| **What is model deployment in banking?** | Shadow mode (run alongside existing), canary rollout, A/B testing. Strict change management and approval processes. |
| **How do you monitor ML models in production?** | Data drift detection, performance degradation, business metric tracking, model decay. Alerts for threshold breaches. |

## Banking Interview Scenarios

| Scenario | What to Demonstrate |
|----------|---------------------|
| **Design a fraud detection system** | Real-time processing, feature engineering, trade-off between fraud and false positives, monitoring |
| **Build a credit scoring model** | Feature selection, model interpretability, regulatory compliance, validation |
| **Customer churn prediction** | Business impact, feature importance, retention strategies |
| **Explain model to compliance team** | Simple language, risk metrics, limitations |
| **Handle biased model** | Fairness metrics, bias mitigation, regulatory requirements |

## Quick Reference Cards

### Key Banking Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **NIM** | Net Interest Margin | 2-3% |
| **ROE** | Return on Equity | 10-15% |
| **CAR** | Capital Adequacy Ratio | >8% (Basel) |
| **NPA** | Non-Performing Assets | <3% |
| **CASA** | Current & Savings Account ratio | 40-50% |

### Common ML Models in Banking

| Use Case | Models |
|----------|--------|
| Fraud Detection | XGBoost, Random Forest, Autoencoders |
| Credit Scoring | Logistic Regression, XGBoost, Neural Networks |
| Customer Churn | Survival Analysis, Random Forest |
| Marketing Response | Uplift Models, XGBoost |
| AML | Rule-based, Isolation Forest, Graph Networks |

### Regulatory Frameworks

| Framework | Region | Relevance |
|-----------|--------|-----------|
| **Basel III** | Global | Capital, risk models |
| **GDPR** | EU | Data privacy |
| **CCPA** | US | Data privacy |
| **ECOA** | US | Fair lending |
| **RBI Guidelines** | India | Local compliance |

## Regulatory Stress Testing (CCAR, BoE, RRP)

### CCAR (Comprehensive Capital Analysis and Review)

| Question | Answer |
|----------|--------|
| **What is CCAR?** | US Federal Reserve's annual exercise to assess if large banks have enough capital to survive adverse economic scenarios. Tests capital planning, stress testing, and capital distribution (dividends, buybacks). |
| **What are the CCAR scenarios?** | Baseline (most likely), Adverse (significant recession), Severely Adverse (crisis). Each includes macroeconomic variables: GDP, unemployment, interest rates, housing prices, equity markets. |
| **What is the CCAR capital adequacy framework?** | Minimum CET1 ratio (4.5%), capital conservation buffer (2.5%), stress capital buffer (varies). Banks must maintain capital ratios above thresholds under stress. |
| **What is the CCAR quantitative test?** | Project incomes, losses, and capital ratios over 9 quarters under each scenario. Must show capital above minimum thresholds throughout. |
| **What is the CCAR qualitative test?** | Assesses bank's capital planning process: governance, model validation, internal controls, stress testing methodology. |
| **What is a CCAR model?** | Econometric models linking macroeconomic variables to income statement and balance sheet items (interest income, credit losses, expenses). Types: wholesale credit, retail credit, pre-provision net revenue (PPNR). |
| **How would you build a credit loss model for CCAR?** | Segment by portfolio (commercial, retail), apply loss rates by segment, project using macroeconomic drivers (PD, LGD, EAD). Validate with backtesting. |
| **What is PPNR in CCAR?** | Pre-Provision Net Revenue = Net interest income + Non-interest income - Expenses. Projected under stress to determine capital generation capacity. |
| **What is capital action timeline in CCAR?** | Q1: Fed releases scenarios. Q2: Banks submit capital plans. Q3: Fed reviews, announces results. Q4: Implementation. |
| **How do you validate CCAR models?** | Backtesting (actual vs projected), sensitivity analysis, benchmarking, model governance, documentation. |

### BoE (Bank of England) Stress Testing

| Question | Answer |
|----------|--------|
| **What is the BoE stress test?** | Annual UK bank stress test conducted by PRA (Prudential Regulation Authority). Tests whether banks can support the economy through severe scenarios. |
| **What is the BoE scenario design?** | Global scenario with UK-specific elements: recession, property market crash, interest rate spikes, inflation, unemployment. More severe than CCAR. |
| **What is the Bank of England's systemic risk scenario?** | Forward-looking scenario testing system-wide vulnerabilities: commercial real estate, leverage in financial system, interconnectedness. |
| **What are the key BoE metrics?** | CET1 ratio, leverage ratio, liquidity coverage ratio, funding risk. Must remain above minimum throughout stress. |
| **How does BoE differ from CCAR?** | BoE more severe scenarios, tests system-wide (not just individual banks), includes conduct risk, more emphasis on resolvability. |
| **What is the BoE's approach to model validation?** |IMA (Internal Model Approach) approval, PRA scrutiny, Independent validation, benchmarking across banks. |
| **What is the 'macroeconomic scenario' in BoE?** | Created by BoE's Monetary Policy Committee, includes GDP path, unemployment, inflation, interest rates, exchange rates, asset prices. |

### RRP (Recovery and Resolution Planning)

| Question | Answer |
|----------|--------|
| **What is RRP?** | Recovery and Resolution Planning - regulators require banks to have plans to recover from financial distress and be resolvable if they fail. |
| **What is the Recovery Plan?** | Bank's own plan to restore viability if in crisis: capital actions (raise capital, sell assets), liquidity management, cost reduction, restructuring. |
| **What is the Resolution Plan?** | "Living Will" - plan for orderly resolution if bank fails: which parts to close, which to sell, how to protect depositors, how to minimize taxpayer cost. |
| **What is MREL in RRP?** | Minimum Requirement for own Funds and Eligible Liabilities - loss-absorbing capital that must be written down/bailed-in in resolution. |
| **What is TLAC in RRP?** | Total Loss-Absorbing Capacity - global standard for resolvability. Large banks must issue enough TLAC instruments. |
| **What is the resolvability assessment?** | BoE/Fed assessment of whether bank can be resolved without taxpayer bail-out. Tests: governance, operational continuity, data, bail-in capacity. |
| **What is a 'gone concern' loss absorbency?** | Instruments that can be written down or converted to equity when bank fails (bail-in). Includes MREL, TLAC. |
| **How would you build a RRP model?** | Analyze business lines, identify critical functions, model intercompany dependencies, design resolution strategies, estimate resolution costs. |
| **What is the 'run-off' analysis in RRP?** | Modeling how deposits and wholesale funding would run off in stress, affecting liquidity and resolution options. |

### Stress Testing Technical Questions

| Question | Answer |
|----------|--------|
| **How do you project credit losses under stress?** | Segment portfolio by risk type, apply scenario-specific PD/LGD, account for portfolio growth/run-off, validate with historical stress. |
| **What is backtesting in stress testing?** | Comparing actual outcomes to stress projections from prior periods. Key metric: actual vs projected losses. |
| **What is sensitivity analysis in stress testing?** | Testing model output changes when individual inputs change (e.g., what if unemployment is 2% higher?). Identifies model drivers. |
| **How do you handle model risk in stress testing?** | Independent validation, documentation, governance, multiple models for key projections, expert judgment overlays. |
| **What is the stress testing governance framework?** | Board approval, model validation team, internal audit, regulatory submission, ongoing monitoring. |
| **How would you explain CCAR to a non-technical stakeholder?** | "We test if the bank has enough money to survive a worst-case scenario like 2008. We project losses, capital needs, and show we can meet regulatory requirements." |
| **What are the key differences between CCAR, BoE, and RRP?** | CCAR: US, annual, capital planning focus. BoE: UK, severe scenarios, system-wide. RRP: Global, recovery & resolution, bail-in capacity. |

### Stress Testing Scenarios

| Scenario | CCAR | BoE | RRP |
|----------|------|-----|-----|
| **GDP Decline** | -4% to -6% | -5% to -7% | Projected |
| **Unemployment** | 8-10% | 10-12% | Estimated |
| **Property Prices** | -20% to -30% | -30% to -40% | Scenario |
| **Interest Rates** | Up 200bps | Up 300bps | Stress |

## Advanced Regulatory Technical Questions

### CCAR Model Development

| Question | Answer |
|----------|--------|
| **How would you build a wholesale credit model for CCAR?** | Segment by industry, geography, exposure. Link PD to macroeconomic variables (GDP, sector performance). Model LGD using recovery rates. EAD = current exposure + undrawn commitment × credit conversion factor. Aggregate at counterparty level. |
| **What is the difference between point-in-time (PIT) and through-the-cycle (TTC) PDs in stress testing?** | PIT PDs reflect current economic conditions, rise quickly in stress. TTC PDs are long-run averages, more stable. CCAR typically uses PIT for conservatism. |
| **How do you handle exposure at default (EAD) modeling for revolving facilities?** | Use credit conversion factors (CCF) for undrawn commitments. CCF may increase in stress due to drawdown behavior. Model based on facility type, customer behavior, economic conditions. |
| **What is overlays in CCAR modeling?** | Expert judgment adjustments on top of model outputs. Used when model doesn't capture known risks (e.g., pandemic, war). Must be documented and validated. |
| **How would you project pre-provision net revenue (PPNR) under stress?** | Model net interest income (NII) using interest rate risk gap, non-interest income (fee income, trading), and expenses (fixed + variable). Apply stress to each component using economic drivers. |
| **What is interest rate risk in the banking book (IRRBB)?** | Risk to earnings and capital from interest rate movements. Affects NII projections in stress. Measure using repricing gap, duration analysis, sensitivity to rate shocks. |

### BoE Deep Dive

| Question | Answer |
|----------|--------|
| **What is the UK PRA's approach to model approval?** | Banks needIMA approval for internal models used in stress testing. PRA assesses: theoretical foundation, data quality, governance, validation. Ongoing supervision includes annual model review. |
| **What is the 'capital action' constraint in BoE?** | Banks assume no capital raises, dividends, or share buybacks during stress. Tests organic capital generation only. Makes stress more severe. |
| **How does BoE incorporate climate stress?** | Climate stress scenarios test transition risk (carbon taxes, stranded assets) and physical risk (property damage, productivity loss). Emerging requirement. |
| **What is the 'systemic risk buffer' in BoE?** | Additional capital for banks that pose systemic risk. Counter-cyclical in nature. Added to minimum capital requirements in stress. |
| **What is the leverage ratio floor in BoE?** | BoE applies a leverage ratio floor (3.25%) in addition to risk-weighted requirements. Ensures minimum capital regardless of risk model assumptions. |

### RRP Technical Questions

| Question | Answer |
|----------|--------|
| **What is the 18-month resolution timeline in RRP?** | Regulators require banks to be resolvable within 18 months of failure. Affects: data infrastructure, intercompany agreements, operational continuity planning. |
| **How would you calculate MREL requirements?** | MREL = (8% of RWA + 6% of Leverage Exposure) - Capital Requirements. Adjustments for tier 2, senior unsecured. Phased implementation. |
| **What is the 'critical function' test in resolution?** | Identify services that if disrupted would cause harm to real economy: payment services, deposit taking, lending. Must be maintained in resolution. |
| **What is CESS (Creditor Hierarchy) in resolution?** | Order in which creditors are bailed in: equity > subordinated debt > senior debt > depositors. Understanding helps design TLAC/MREL. |
| **How do you model operational continuity in resolution?** | Identify key processes, systems, staff needed. Ensure they can transfer to another entity or be wound down. Test with table-top exercises. |

### Model Risk Management for Stress Testing

| Question | Answer |
|----------|--------|
| **What is model validation in the context of stress testing?** | Independent review of model accuracy, stability, governance. Includes: backtesting, benchmarking, sensitivity analysis, documentation review. |
| **What is the three lines of defense in model risk?** | 1st: Model developers (own risk). 2nd: Model validation team (independent review). 3rd: Internal audit (governance oversight). |
| **What is model documentation requirements for regulators?** | Purpose, methodology, data sources, assumptions, limitations, governance, validation results. Must be comprehensive and maintained. |
| **How do you handle model decay in stress testing models?** | Regular monitoring of backtest results, stability metrics. Trigger recalibration when performance degrades. Document decay and remediation. |

## Practical Interview Scenarios

### Scenario 1: CCAR Model Development
- "Your wholesale credit model is projecting 2% loss rate but actual losses are 3.5%. What do you do?"
- "The Fed questions your PPNR projection methodology. How do you defend it?"

### Scenario 2: RRP Planning
- "Your bank's resolution plan shows $10B in resolution costs. How would you reduce this?"
- "The PRA questions your operational continuity plan. What improvements would you make?"

### Scenario 3: Regulatory Change
- "New Basel IV rules change RWA calculations. How do you update your stress models?"
- "BoE introduces climate stress scenario. How would you build the model?"

### Scenario 4: Model Risk
- "A critical stress model fails backtesting. What's your escalation process?"
- "How would you explain a model limitation to the board?"

## Quick Reference Cards

### CCAR Key Metrics

| Metric | Definition | Minimum |
|--------|------------|---------|
| **CET1 Ratio** | Common Equity Tier 1 / RWA | 4.5% + CCB |
| **Tier 1 Ratio** | Tier 1 Capital / RWA | 6% |
| **Total Capital** | Total Capital / RWA | 8% |
| **Stress Capital Buffer** | Additional buffer in stress | Variable |

### Key Stress Testing Formulas

```
Credit Losses = Σ (Exposure × PD × LGD)
PD_stress = PD_base × (1 + macro_sensitivity)
NII_sensitivity = Gap × Rate_change × Duration
Capital Generation = PPNR - Taxes - Dividends
```

### Model Governance Checklist

- [ ] Clear ownership and documentation
- [ ] Independent validation
- [ ] Backtesting results reviewed
- [ ] Sensitivity analysis documented
- [ ] Governance committee approval
- [ ] Regulatory submission reviewed
- [ ] Ongoing monitoring in place

## May 2026 Analytics Trends in Banking

| Topic | 2026 Shift | Impact |
|-------|-----------|--------|
| **Real-Time Analytics** | From batch pipelines to streaming (Kafka, Kinesis) | Fraud detection <100ms, real-time dashboards |
| **Agentic Reporting** | Humans ask questions → agents generate reports autonomously | Analytics team focuses on strategy vs manual work |
| **Cost Optimization** | Smart model routing (cheap for simple, expensive for complex) | 50-80% reduction in inference costs |
| **Multi-Model Inference** | Claude 4.7 (reasoning), GPT-5.5 Instant (routing), DeepSeek (cost) | Choose right model per task, not one-size-fits-all |
| **Privacy-First Analytics** | Local inference (Ollama + Llama 4) for sensitive data | Keep customer data on-prem, no API calls |
| **Context Windows** | 400K-1M tokens enable entire analyses in one context | RAG-less analytics (just put all data in prompt) |

## Practical Skills (May 2026 Edition)

| Skill | How It's Changed | What You Should Know |
|-------|-----------------|----------------------|
| **SQL** | Still essential, but now: generate with Claude/GPT, optimize with agents | Writing better queries faster with AI assistance |
| **Python** | Write less, understand more (Claude Code generates 80% of code) | Focus on logic/requirements, let AI handle boilerplate |
| **Dashboarding** | Dashboards generated from natural language queries (Claude 4.7) | Design dashboards, don't build them manually |
| **Statistics** | Understanding assumptions still critical (AI can hallucinate statistical claims) | Verify AI's statistical reasoning, don't trust blindly |
| **Communication** | Clearer storytelling (AI helps draft insights, you refine) | Become better at iterating with AI on narratives |

## See Also

- [ML Fundamentals Interview Prep](/cheatsheets/ml-fundamentals-interview/)
- [AI System Design Interview Prep](/cheatsheets/ai-system-design-interview/)
- [Behavioral Interview Prep](/cheatsheets/behavioral-interview/)
- [AI Product Interview Prep](/cheatsheets/ai-product-interview/)