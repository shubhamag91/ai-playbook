---
title: Quantitative Analytics in Banking — Interview Prep
description: Comprehensive interview preparation for quantitative analytics and data science roles in banking. Covers statistics, risk modeling, time series, credit/fraud, regulatory context, and SQL/Python patterns.
sidebar:
  order: 3
tags:
  - interview
  - banking
  - quantitative
  - machine-learning
  - reference
lastUpdated: 2026-05-16
nextVerificationDue: 2026-11-16
---

Targeted preparation for **Quantitative Analyst**, **Model Risk Analyst**, **Data Scientist**, and **ML Engineer** roles at banks, asset managers, and fintech firms. Covers both technical depth and banking-specific context.

**Roles covered:** Credit Risk Quant · Market Risk Analyst · Data Scientist (Banking) · Model Risk Analyst (SR 11-7) · Fraud Analytics · Customer Analytics

---

## 1. Statistics & Probability Foundations

### Core Concepts

**Q: What is the Central Limit Theorem and why does it matter in banking?**

The CLT states that the distribution of sample means approaches normal as sample size grows, regardless of the underlying population distribution. In banking: even if individual loan defaults are Bernoulli (binary), the portfolio loss distribution approaches normal at large N — enabling Gaussian-based risk models. The CLT breaks down at tails, which is why Basel III requires stress testing beyond the normal approximation.

**Q: Explain p-value and how you'd explain it to a business stakeholder.**

A p-value is the probability of observing your test statistic (or more extreme) assuming the null hypothesis is true. It is NOT the probability that the null hypothesis is true.

Business framing: "If our new credit model had no real improvement over the old one, there's only a 3% chance we'd see results this good by random chance. We use 5% as our threshold — so yes, this is statistically significant."

**Q: Type I vs Type II error — pick an example from banking.**

| Error | Definition | Banking Example | Cost |
|-------|-----------|-----------------|------|
| **Type I (False Positive)** | Reject true null | Flag a legitimate transaction as fraud | Customer friction, relationship damage |
| **Type II (False Negative)** | Fail to reject false null | Miss an actual fraudulent transaction | Direct financial loss |

In fraud: regulators often care more about Type II (missed fraud), but product teams obsess over Type I (false declines hurt conversion). Tune the threshold based on business cost of each error.

**Q: What is the difference between correlation and causation? Give a banking example.**

Correlation: two variables move together. Causation: one causes the other. Classic confound: high credit scores correlate with low default rates, but a score drop could be caused by a divorce (income drop, stress) — the score is a proxy, not the driver.

Implication: if your model uses correlated features without understanding causality, it may fail when the correlation breaks — e.g., in a systemic downturn, all correlated risk indicators fail simultaneously.

**Q: When would you use a t-test vs chi-square vs ANOVA?**

| Test | Data Type | Use Case |
|------|-----------|----------|
| **t-test (2-sample)** | Continuous | Do approved and rejected applicants differ in average income? |
| **ANOVA** | Continuous (3+ groups) | Do default rates differ across 5 product tiers? |
| **Chi-square** | Categorical | Is fraud rate independent of payment method? |
| **Mann-Whitney U** | Non-parametric | Same as t-test when you can't assume normality (small samples, skewed distributions) |

**Q: What is Bayesian vs Frequentist inference? Which do you use in banking?**

Frequentist: probabilities are long-run frequencies. Parameters are fixed; data is random. P-values and confidence intervals.

Bayesian: probability is a degree of belief. You update prior beliefs with data to get a posterior. Credit scoring can use Bayesian approaches to incorporate prior knowledge (industry default rates as priors) before seeing an applicant's data — useful when data is sparse for new customer segments.

---

## 2. Regression & Model Fundamentals

**Q: Walk me through interpreting a logistic regression for credit risk.**

Logistic regression models P(default) = 1 / (1 + e^(-β₀ - β₁X₁ - ...)).

- **Coefficient interpretation:** A unit increase in debt-to-income ratio (X₁) multiplies the odds of default by e^β₁. If β₁ = 0.5, odds increase by e^0.5 ≈ 1.65×.
- **Regularization:** L1 (LASSO) for feature selection in high-dimensional applicant data; L2 (Ridge) to handle multicollinearity between correlated financial features.
- **Interaction terms:** Income × Employment type — self-employed applicants at the same income level may behave differently.

**Q: What is multicollinearity and how do you handle it?**

When predictor variables are highly correlated (e.g., income and assets both proxy for wealth). Effects:
- Inflated standard errors → unstable coefficient estimates
- Coefficients flip signs → misleading interpretation

Detection: Variance Inflation Factor (VIF > 10 is a warning). Fixes: remove one of the correlated features, use PCA to create orthogonal components, or apply Ridge regression (L2 penalizes large coefficients).

**Q: How do you handle class imbalance in a fraud model?**

Fraud is rare (0.1–1% of transactions). Naive models predict "not fraud" always → 99%+ accuracy but useless.

Strategies:
- **Threshold adjustment:** Move decision threshold from 0.5 → 0.1 to catch more fraud
- **Resampling:** Oversample minority (SMOTE) or undersample majority
- **Class weights:** Set `class_weight='balanced'` in sklearn — penalizes fraud misses more
- **Metrics:** Use AUC-PR (precision-recall) instead of AUC-ROC for highly imbalanced problems
- **Ensemble methods:** Random forest and XGBoost handle imbalance better than logistic regression

**Q: What is AUC-ROC and AUC-PR? When is each appropriate?**

- **AUC-ROC:** Area under ROC curve (TPR vs FPR). Threshold-independent. Robust to class imbalance in the ROC sense but can be misleading when positives are rare.
- **AUC-PR:** Area under precision-recall curve. More informative when positives are rare (fraud, loan defaults at low rate). A model can have high ROC-AUC but poor PR-AUC.

Rule of thumb: **If the positive class is rare (< 5%), use AUC-PR as the primary metric.**

---

## 3. Risk Modeling

### Credit Risk

**Q: Explain PD, LGD, EAD and how they relate to Expected Loss.**

Expected Loss (EL) = PD × LGD × EAD

| Component | Definition | Typical Range |
|-----------|-----------|---------------|
| **PD** (Probability of Default) | Probability the borrower defaults in 12 months | 0.1% (prime) → 15%+ (subprime) |
| **LGD** (Loss Given Default) | % of exposure lost if default occurs | 30–80% depending on collateral |
| **EAD** (Exposure at Default) | Total exposure at time of default | Outstanding balance + undrawn credit |

Example: $100K mortgage, PD=2%, LGD=40%, EAD=$100K → EL = $800.

Regulatory capital under Basel III must also cover Unexpected Loss (tail scenarios).

**Q: What is VaR and what are its limitations?**

Value at Risk: the maximum loss expected over a period with a given confidence level. "1-day 99% VaR = $1M" means: on 99% of days, losses won't exceed $1M.

Methods:
- **Parametric:** Assumes normal returns. Fast, wrong in tails.
- **Historical simulation:** Use last N days of actual returns. No distributional assumption, but assumes history repeats.
- **Monte Carlo:** Simulate thousands of scenarios. Flexible, computationally expensive.

**Limitations:**
- Not subadditive (VaR of a portfolio can exceed sum of component VaRs)
- Ignores the magnitude of losses beyond the threshold
- Fails in regime changes (2008 crisis: historical simulation understated risk)
- CVaR (Conditional VaR / Expected Shortfall) addresses the tail magnitude issue — used in Basel III internally modeled approaches

**Q: What is stress testing? How does it differ from VaR?**

VaR covers normal market conditions (99% scenarios). Stress testing covers extreme, plausible scenarios that the historical data may not capture:
- 2008 credit crisis severity applied to current portfolio
- Pandemic scenario (unemployment spike + real estate drop)
- Geopolitical shock (energy price spike)

Regulatory stress tests: DFAST (Dodd-Frank), CCAR (Fed), EBA stress tests (Europe). Banks must show capital adequacy even in severely adverse scenarios.

**Q: Explain the difference between Point-in-Time (PIT) and Through-the-Cycle (TTC) credit ratings.**

| Approach | Definition | Use Case |
|----------|-----------|----------|
| **PIT** | Reflects current economic conditions (cycle-sensitive) | Provisioning, IFRS 9 expected credit loss |
| **TTC** | Averages across economic cycles | Regulatory capital (Basel IRB approach) |

IFRS 9 introduced a forward-looking expected credit loss (ECL) model: 12-month ECL (Stage 1) or lifetime ECL (Stage 2/3) depending on whether significant credit deterioration has occurred.

---

## 4. Time Series & Financial Data

**Q: What makes financial time series different from other data?**

- **Non-stationarity:** Returns have changing mean and variance over time (volatility clustering)
- **Fat tails:** Black swan events occur more frequently than normal distribution predicts (kurtosis > 3)
- **Autocorrelation:** Today's volatility predicts tomorrow's (GARCH effect)
- **Regime changes:** Statistical properties shift during crisis periods
- **Look-ahead bias:** Training data must strictly precede test data (no future leakage)

**Q: What is ARIMA? Walk me through fitting it.**

ARIMA(p, d, q) — AutoRegressive Integrated Moving Average:
- **AR(p):** Current value depends on p lagged values
- **I(d):** Differencing to achieve stationarity (d times)
- **MA(q):** Current value depends on q lagged error terms

Steps:
1. Check stationarity (ADF test) — if non-stationary, difference until stationary
2. Plot ACF and PACF to identify p and q
3. Fit and check residuals (should be white noise)
4. Validate on hold-out period (rolling window forecast)

**Q: What is GARCH and when would you use it over ARIMA?**

GARCH (Generalized Autoregressive Conditional Heteroskedasticity) models time-varying volatility. ARIMA models the mean; GARCH models the variance.

Use GARCH for: option pricing, VaR estimation, volatility forecasting — anytime variance clustering matters ("calm periods followed by turbulent periods").

GARCH(1,1): σ²ₜ = ω + α·ε²ₜ₋₁ + β·σ²ₜ₋₁

**Q: How do you prevent look-ahead bias in financial ML?**

Look-ahead bias occurs when your model training data inadvertently includes future information.

Prevention:
- **Rolling/expanding window validation:** Train on data up to T, validate on T+1 to T+k
- **Walk-forward testing:** Retrain model as time progresses, never peeking at future data
- **Feature engineering:** All features computed only from data available at prediction time
- **Index rebalancing:** If using index membership as a feature, use point-in-time membership (survivorship bias: failed companies are removed from current indices but were present historically)

---

## 5. Banking ML Applications

### Fraud Detection

**Q: Design a real-time fraud detection system for a bank's payment network. Latency budget: 200ms.**

**Requirements clarification:** Volume (10K TPS peak), decision types (approve/decline/review), explanation requirement (regulator-facing), feedback loop (confirmed fraud labels within 24h).

**Architecture:**

```
Payment event (50ms budget for scoring)
    ↓
1. Rules engine (< 5ms) — hard rules: card locked, international block, velocity checks
    ↓  
2. Feature extraction (< 10ms) — real-time features from Redis (30-day aggregates), streaming features (last 5 transactions)
    ↓
3. ML scoring (< 20ms) — LightGBM or neural network (pre-loaded in memory)
    ↓
4. Risk threshold (< 5ms) — approve / review queue / decline
    ↓
Output + async: log to data warehouse, update velocity counters, append to review queue
```

**Features:**
- **Card features:** Transaction amount vs cardholder average, merchant category, geography delta (country change in < 1h), time-of-day anomaly
- **Merchant features:** Fraud rate at this merchant in past 30 days, new vs established merchant
- **Network features:** Device fingerprint, IP risk score, velocity across multiple cards at same merchant

**Monitoring:** Track false positive rate (good transactions declined), false negative rate (fraud not caught), score distribution drift, and label lag (fraud confirmed 24h later).

### Credit Scoring

**Q: What features would you use in a personal loan credit scoring model?**

| Category | Features | Notes |
|----------|---------|-------|
| **Application data** | Income, employment type, tenure, DTI ratio | Self-reported, verify against bank statements |
| **Credit bureau** | Credit score, derogatory marks, utilization, inquiries, age of oldest account | Most predictive signals |
| **Behavioral** | Bank account transactions, salary credits, overdraft frequency | Rich signal if open banking consent given |
| **Alternative** | Rental payment history, utility payments, telecom data | Useful for thin-file customers |

**Fairness constraint:** Protected attributes (race, gender, religion) cannot be used directly. But proxy variables (zip code) can encode demographic information — must audit for disparate impact using the 80% rule or statistical parity difference.

**Q: What is the scorecard methodology and why do banks prefer it?**

A scorecard converts logistic regression into an integer point system. Each feature range gets a score value; total score maps to credit decision.

Why preferred:
- **Interpretability:** Regulators require "reason codes" for adverse action (ECOA). A scorecard makes it easy to say: "Score reduced because of high utilization."
- **Auditability:** Easy for model risk teams to validate
- **Governance:** Non-technical credit officers can challenge decisions
- **Stability:** Integer scores are less prone to floating-point instability

---

## 6. Regulatory Context & Model Risk

**Q: What is SR 11-7 and what does it require?**

SR 11-7 is the Federal Reserve's 2011 guidance on model risk management. It defines a model as: a quantitative method, system, or approach with inputs, processing, and outputs used in decision-making.

Three pillars:
1. **Model development and implementation** — robust documentation, validation before production
2. **Model validation** — independent team tests the model conceptual soundness, data quality, and outcomes analysis
3. **Model use** — ongoing monitoring, performance review, audit trails, escalation paths

Key implication: every model (credit scoring, fraud, pricing) must go through a validation process before production use. Banks maintain a model inventory with risk ratings.

**Q: What is IFRS 9 / CECL and how does it differ from the old incurred loss model?**

| Approach | When Loss Recognized | Requirement |
|----------|---------------------|-------------|
| **Incurred loss (IAS 39)** | Only when loss event occurs | Pre-2018 standard |
| **IFRS 9 / CECL** | At origination: lifetime expected loss | Current standard |

Under IFRS 9, banks must provision for expected losses immediately at loan origination, not wait until a borrower misses a payment. This requires:
- Forward-looking PD models (not just historical rates)
- Macroeconomic scenarios (base case, optimistic, pessimistic with probability weights)
- Stage classification (Stage 1: 12-month ECL, Stage 2/3: lifetime ECL)

**Q: What is model drift? How do you detect and respond to it?**

Model drift occurs when the model's performance degrades over time.

| Type | Cause | Detection |
|------|-------|-----------|
| **Data drift** | Input feature distribution changes | PSI (Population Stability Index) > 0.2 signals instability |
| **Concept drift** | Relationship between features and target changes | Monitor discrimination metrics (Gini, KS) on recent cohorts |
| **Label drift** | Target variable behavior changes | Track actual vs predicted default rates |

Response: If PSI < 0.1 — monitoring only. PSI 0.1–0.2 — investigate. PSI > 0.2 — recalibrate or rebuild. After a major economic shock, models trained on normal periods may need complete rebuild.

**Q: How would you audit a model for fair lending compliance?**

Fair lending applies to credit decisions under ECOA and Fair Housing Act. Protected classes: race, color, religion, national origin, sex, familial status, disability.

Audit approach:
1. **Disparate treatment:** Does the model treat protected class applicants differently for similar risk profiles? Test: hold all risk factors constant, vary protected class proxy → should see no significant score difference.
2. **Disparate impact:** Even a neutral model can produce different approval rates. Test: compute approval rate by demographic group. Flag if approval rate for any group is below 80% of the highest-approval group (80% rule).
3. **Adverse action codes:** When declining, must provide specific reasons that don't reference protected characteristics.
4. **Regression testing:** After model updates, re-run disparate impact analysis to ensure no regression.

---

## 7. SQL & Python Patterns for Banking Analytics

### SQL

**Q: Write a query to identify customers who had 3+ consecutive months of declining balance.**

```sql
WITH monthly_balance AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', transaction_date) AS month,
    SUM(amount) AS net_flow,
    SUM(SUM(amount)) OVER (
      PARTITION BY customer_id
      ORDER BY DATE_TRUNC('month', transaction_date)
    ) AS running_balance
  FROM transactions
  GROUP BY 1, 2
),
month_over_month AS (
  SELECT
    customer_id,
    month,
    running_balance,
    LAG(running_balance) OVER (PARTITION BY customer_id ORDER BY month) AS prev_balance
  FROM monthly_balance
),
declining_flag AS (
  SELECT
    customer_id,
    month,
    CASE WHEN running_balance < prev_balance THEN 1 ELSE 0 END AS is_declining
  FROM month_over_month
  WHERE prev_balance IS NOT NULL
),
consecutive_count AS (
  SELECT
    customer_id,
    month,
    SUM(is_declining) OVER (
      PARTITION BY customer_id
      ORDER BY month
      ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS declining_3m
  FROM declining_flag
)
SELECT DISTINCT customer_id
FROM consecutive_count
WHERE declining_3m = 3;
```

**Q: Write a query to compute a 30-day rolling fraud rate per merchant.**

```sql
SELECT
  merchant_id,
  transaction_date,
  COUNT(*) AS total_txns,
  SUM(is_fraud) AS fraud_txns,
  SUM(is_fraud) * 1.0 / COUNT(*) AS fraud_rate,
  SUM(COUNT(*)) OVER (
    PARTITION BY merchant_id
    ORDER BY transaction_date
    RANGE BETWEEN INTERVAL '30 days' PRECEDING AND CURRENT ROW
  ) AS rolling_30d_txns,
  SUM(SUM(is_fraud)) OVER (
    PARTITION BY merchant_id
    ORDER BY transaction_date
    RANGE BETWEEN INTERVAL '30 days' PRECEDING AND CURRENT ROW
  ) AS rolling_30d_fraud
FROM transactions
GROUP BY merchant_id, transaction_date;
```

### Python Patterns

**Q: How would you compute PSI (Population Stability Index) in Python?**

```python
import numpy as np

def compute_psi(expected, actual, buckets=10):
    """
    expected: array of scores from training period
    actual: array of scores from current period
    """
    breakpoints = np.percentile(expected, np.linspace(0, 100, buckets + 1))
    breakpoints[0] = -np.inf
    breakpoints[-1] = np.inf

    def bucket_pcts(scores, breakpoints):
        counts = np.histogram(scores, bins=breakpoints)[0]
        pcts = counts / len(scores)
        pcts = np.where(pcts == 0, 0.0001, pcts)  # avoid log(0)
        return pcts

    exp_pcts = bucket_pcts(expected, breakpoints)
    act_pcts = bucket_pcts(actual, breakpoints)

    psi = np.sum((act_pcts - exp_pcts) * np.log(act_pcts / exp_pcts))
    return psi

# Interpretation:
# PSI < 0.1: No significant change
# 0.1–0.2: Moderate shift, investigate
# > 0.2: Significant shift, recalibrate
```

**Q: How would you build a walk-forward cross-validation for a credit model?**

```python
from sklearn.model_selection import TimeSeriesSplit
import pandas as pd

def walk_forward_cv(df, model, features, target, n_splits=5):
    """
    df: sorted by origination_date
    Trains on expanding window, validates on next period
    """
    tscv = TimeSeriesSplit(n_splits=n_splits)
    results = []

    for fold, (train_idx, val_idx) in enumerate(tscv.split(df)):
        X_train = df.iloc[train_idx][features]
        y_train = df.iloc[train_idx][target]
        X_val = df.iloc[val_idx][features]
        y_val = df.iloc[val_idx][target]

        model.fit(X_train, y_train)
        proba = model.predict_proba(X_val)[:, 1]

        from sklearn.metrics import roc_auc_score
        auc = roc_auc_score(y_val, proba)
        results.append({'fold': fold, 'val_start': df.iloc[val_idx[0]]['origination_date'], 'auc': auc})

    return pd.DataFrame(results)
```

---

## 8. Behavioral & Case Study Questions

**Q: "Walk me through a time you disagreed with a model's output and how you handled it."**

Structure: (1) Model context (2) What triggered the disagreement — intuition or external signal? (3) How you investigated (4) Resolution — were you right? What was learned?

Good signal: You escalated when the model gave counterintuitive results in a new market segment, discovered training data had survivorship bias (missing historical defaults), retrained, improved Gini by 8 points.

**Q: "How would you explain that your model is biased to a non-technical executive?"**

"Our model approves applicants based on patterns from historical data. We found that applicants from certain zip codes are approved at lower rates than others with similar income and credit profiles. That could reflect a real risk difference — or it could mean the model learned patterns from historical discrimination that we don't want to perpetuate. We're adding a fairness constraint that caps the disparity and reviewing whether the performance difference is explained by legitimate risk factors."

**Q: Case study — A fraud model's false positive rate jumped from 2% to 8% overnight. What do you do?**

1. **Triage immediately:** How many customers affected? Any revenue impact? Any external cause (system deployment, regulatory change, data pipeline issue)?
2. **Check data pipeline:** Is the feature extraction behaving correctly? Run sanity checks on input distributions (PSI).
3. **Check model:** Did the model change? Was a new version deployed?
4. **Compare score distributions:** Plot score distributions for today vs last week. Did a segment shift?
5. **Drill by segment:** Which merchant category, geography, or payment type is driving the increase?
6. **Rollback or adjust threshold:** If a model deployment caused it, rollback. If it's a real-world shift, adjust threshold while investigating.
7. **Root cause and post-mortem:** Document findings, update monitoring alerts.

---

## 9. Quick-Reference: Common Banking Interview Topics

| Topic | Key Points |
|-------|-----------|
| **Expected Loss** | PD × LGD × EAD |
| **VaR** | Max loss at confidence level; limitations: not coherent, misses tail magnitude |
| **CVaR** | Average loss beyond VaR; preferred by Basel III |
| **Gini / KS** | Discrimination measures for credit models |
| **PSI** | Population Stability Index — detects feature drift |
| **IFRS 9** | Forward-looking ECL provisioning; Stage 1/2/3 |
| **SR 11-7** | Fed guidance on model risk; development, validation, use |
| **ECOA** | Fair lending; adverse action reason codes required |
| **80% rule** | Disparate impact: approval rate for any group ≥ 80% of highest group |
| **SMOTE** | Synthetic minority oversampling for imbalanced data |
| **Scorecard** | Logistic regression → integer score for interpretability |
| **Walk-forward CV** | Time-aware cross-validation; no future leakage |

---

## See Also

- [Machine Learning Interview Track](/learn/interview-prep-ml)
- [LLM Engineering Interview Track](/learn/interview-prep-llm)
- [Training & Fine-tuning Deep Dive](/deep-dive/training-finetuning)
- [Evaluation & Testing Deep Dive](/deep-dive/eval-and-testing)
- [Interview Prep Overview](/learn/interview-prep)
