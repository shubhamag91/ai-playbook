---
title: Banking Analytics Interview Prep
description: Interview questions for analytics roles in banking — domain knowledge, use cases, and regulatory considerations.
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

## See Also

- [ML Fundamentals Interview Prep](/cheatsheets/ml-fundamentals-interview/)
- [AI System Design Interview Prep](/cheatsheets/ai-system-design-interview/)
- [Behavioral Interview Prep](/cheatsheets/behavioral-interview/)
- [AI Product Interview Prep](/cheatsheets/ai-product-interview/)