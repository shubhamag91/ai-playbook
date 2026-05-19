---
title: AI Data Scientist — Interview Prep
description: Comprehensive interview preparation for AI Data Scientist roles. Covers statistics and probability, machine learning, LLM application, experimentation design, SQL, model evaluation, and translating data science into business impact.
sidebar:
  order: 8
tags:
  - interview
  - data-science
  - machine-learning
  - reference
lastUpdated: 2026-05-20
nextVerificationDue: 2026-11-20
---

Targeted preparation for **AI Data Scientist**, **Applied Data Scientist**, and **Senior Data Scientist (AI/ML)** roles. Covers the full spectrum: statistical rigour, classical ML, LLM application, experimentation, and translating model outputs into business decisions.

**Roles covered:** AI Data Scientist · Applied Data Scientist · Research Data Scientist · Decision Scientist · AI Analyst

**What makes this role distinct:** Unlike a pure ML Engineer (who focuses on deployment and infrastructure) or an LLM Engineer (who focuses on model APIs), an AI Data Scientist is expected to own the full analytical loop — define the problem, collect and clean data, build and evaluate models, design experiments, and communicate findings to non-technical stakeholders.

---

## 1. Statistics & Probability

### Distributions and Core Concepts

**Q: When would you use a Poisson distribution vs a Normal distribution?**

**Poisson:** Count of events occurring in a fixed interval when events are rare and independent. Examples: number of customer service chats per hour, API errors per day, model prediction failures per week. Key parameter: λ (mean = variance). Use when: discrete counts, events are independent, rate is constant.

**Normal:** Continuous outcomes that result from many independent additive effects (Central Limit Theorem). Examples: model prediction errors, user session lengths at scale, average latency across many requests. Use when: large samples, continuous values, symmetric distribution expected.

**Key interview trick:** If you're modelling errors or residuals from a model, you typically assume Normal. If you're modelling counts (how many users clicked, how many fraud cases), you start with Poisson and upgrade to Negative Binomial if variance > mean (overdispersion).

**Q: What is the Central Limit Theorem and why does it matter for A/B testing?**

The CLT states that the sampling distribution of the mean of any independent random variable converges to Normal as sample size grows — regardless of the underlying distribution. This is why A/B test metrics (average order value, click rate, session length) can be analysed with z-tests and t-tests even when the raw distribution is skewed or bounded.

**Practical implication:** If your metric is a ratio (e.g., revenue per user), use the Delta Method to estimate variance correctly rather than assuming the ratio is normally distributed directly.

---

### Hypothesis Testing

**Q: Walk through how you would set up an A/B test from scratch.**

1. **Define the hypothesis:** "Showing users personalised recommendations increases 7-day retention." The null hypothesis is no effect.
2. **Choose the metric:** Primary (7-day retention), guardrail (page load time, error rate), and secondary (session depth).
3. **Calculate sample size:** Use a power calculation — specify minimum detectable effect (MDE), significance level α (typically 0.05), and power 1−β (typically 0.80 or 0.90). Use `scipy.stats` or a sample size calculator. Under-powering is the most common mistake.
4. **Randomise correctly:** Randomise at the right unit (user, session, or device). User-level randomisation avoids carryover effects. Ensure SUTVA — Stable Unit Treatment Value Assumption (one user's treatment doesn't affect another's).
5. **Run the experiment:** Don't peek at results until the predetermined end date. Early stopping inflates false positive rate.
6. **Analyse:** Two-sample t-test (or z-test for large N). Compute p-value and confidence interval on the effect size. Check for novelty effects (flatten curve over time).
7. **Decision:** Reject null if p < α AND the confidence interval excludes zero AND effect size is practically significant. A statistically significant 0.001% lift that requires 6 months of engineering is not worth shipping.

**Q: What's the difference between Type I and Type II errors? Which is worse in practice?**

| | Null True | Null False |
|---|---|---|
| **Reject null** | Type I error (false positive, α) | Correct |
| **Fail to reject** | Correct | Type II error (false negative, β) |

Which is worse depends on the context. For fraud detection: Type II (missing fraud) is worse — financial loss. For cancer screening: Type II (missing disease) is worse — patient harm. For A/B testing a UI change: Type I (shipping something that doesn't work) wastes engineering resources; Type II (missing a real improvement) forgoes revenue. Most product experiments prioritise controlling Type I (set α = 0.05) and accept higher Type II via smaller sample sizes.

**Q: What is p-value hacking and how do you prevent it?**

P-hacking occurs when you run repeated tests on accumulating data and stop as soon as p < 0.05 — which inflates the Type I error rate well above the nominal α. Prevention:

- Pre-register your hypothesis and stopping rule before the experiment starts
- Use **sequential testing** methods (e.g., always-valid p-values via mSPRT) if you need early stopping
- Apply **Bonferroni correction** or False Discovery Rate (Benjamini-Hochberg) when testing multiple metrics simultaneously
- Treat the primary metric as the decision metric; secondaries are exploratory

---

### Bayesian Thinking

**Q: When would you choose Bayesian over frequentist analysis?**

**Bayesian when:**
- You have meaningful prior information (previous experiments, domain knowledge)
- Small sample sizes — priors regularise estimates
- You need a probability statement about the parameter ("there's 90% chance variant B is better") rather than a p-value
- Multi-armed bandit / online decision making — update beliefs continuously

**Frequentist when:**
- Large samples with no strong prior
- Regulatory or audit environments that require fixed, interpretable p-values
- Team is not familiar with Bayesian interpretation — communication matters

**Q: Explain Bayes' theorem with a practical example.**

P(A|B) = P(B|A) × P(A) / P(B)

**Example:** A fraud model flags 1% of transactions. The base rate of fraud is 0.1%. The model's sensitivity (recall) is 90% and specificity is 99%.

- P(fraud) = 0.001
- P(flagged | fraud) = 0.90
- P(flagged | not fraud) = 0.01
- P(flagged) = 0.90 × 0.001 + 0.01 × 0.999 = 0.0009 + 0.00999 = 0.01089

P(fraud | flagged) = (0.90 × 0.001) / 0.01089 ≈ **8.3%**

Only 8% of flagged transactions are actually fraud — because the base rate is very low. This is why precision matters as much as recall in imbalanced classification problems, and why you should always sanity-check model outputs against base rates.

---

## 2. Machine Learning for Data Scientists

**Q: You have a dataset with 1M rows and 500 features. How do you approach feature selection before modelling?**

1. **Remove leakage first:** Any feature that contains information from the future (e.g., a column updated after the outcome) must be removed before any analysis.
2. **Remove near-zero variance features:** Features with >99% of values the same carry almost no information.
3. **Correlation filter:** Remove one of any pair of features with correlation > 0.95 (keeps the dataset stable for linear models).
4. **Univariate filter:** Compute mutual information or F-score between each feature and target. Drop the bottom 20-30%.
5. **Model-based selection:** Train a quick Random Forest or LightGBM; use `feature_importances_` to identify top features. Or use L1 regularisation (Lasso) which zeros out unimportant coefficients.
6. **Recursive Feature Elimination (RFE):** Iteratively remove the weakest feature and retrain — expensive but thorough.

For interpretability-critical contexts (finance, healthcare), prefer fewer features from domain knowledge over algorithmic selection — a model with 15 interpretable features is often more valuable than one with 200 black-box features.

**Q: How do you handle class imbalance in a binary classification problem?**

| Technique | How | When |
|---|---|---|
| **Threshold tuning** | Move decision threshold below 0.5 to increase recall | Always try first — no data modification |
| **Class weights** | Set `class_weight='balanced'` in sklearn | Simple, built into most algorithms |
| **Oversampling (SMOTE)** | Synthesise minority class examples | When you have some minority samples to interpolate from |
| **Undersampling** | Randomly drop majority class samples | Very large datasets; fast but lossy |
| **Ensemble methods** | BalancedRandomForest, EasyEnsemble | Strong baselines for tabular data |
| **Alternative metric** | Optimise F1, PR-AUC, or G-mean instead of accuracy | Always — accuracy is meaningless on imbalanced data |

**Q: What is the bias-variance trade-off and how does it change your model selection strategy?**

**Bias:** Error from overly simplistic assumptions — model misses real patterns (underfitting).  
**Variance:** Error from sensitivity to small fluctuations in training data — model memorises noise (overfitting).

Total Error = Bias² + Variance + Irreducible Noise

**Practical strategy:**
- Start with a high-bias, low-variance baseline (logistic regression, linear model) to establish a floor
- Increase complexity (decision trees, then ensembles) only if bias is the bottleneck
- Use cross-validation to catch variance issues before they reach production
- Regularisation (L1/L2, dropout, early stopping) trades bias for variance reduction

For data science roles (vs pure research), a well-regularised gradient boosting model with careful feature engineering beats a complex neural network in most business settings — because it's faster to iterate, easier to explain, and less prone to surprise failures.

---

## 3. LLMs & Generative AI for Data Scientists

**Q: How would you use an LLM to accelerate a data science workflow?**

Common high-value applications:

| Task | LLM Approach | Benefit |
|---|---|---|
| **Data labelling** | Zero-shot or few-shot classification of text samples | Replaces manual annotation for NLP tasks |
| **Feature generation** | Extract structured fields from unstructured text (addresses, sentiment, entities) | Turns free text into model features |
| **Code generation** | Generate boilerplate ETL, SQL queries, visualisation code | Faster iteration |
| **Report generation** | Summarise model outputs, anomalies, experiment results | Communication to stakeholders |
| **Synthetic data** | Generate training examples for rare classes | Addresses data scarcity |

**Q: What are the key failure modes when using LLMs for data tasks, and how do you mitigate them?**

1. **Hallucination in structured extraction:** LLM invents field values. Mitigation: constrain output with JSON schema, validate against regex/enum, run consistency checks.
2. **Inconsistency at scale:** Same input produces different outputs across batches. Mitigation: set temperature=0, use a fixed model version, cache results.
3. **Label noise when using LLM as annotator:** Model has biases from training data. Mitigation: compute inter-rater agreement between LLM and human sample (aim for Cohen's κ > 0.7), audit failures by category.
4. **Context length constraints:** Long documents get truncated. Mitigation: chunking + RAG; summarise by section before synthesis.
5. **Cost at scale:** 1M rows at $0.01/call = $10,000. Mitigation: use a smaller model for initial pass, escalate to large model only for low-confidence outputs.

**Q: How would you evaluate whether an LLM-generated label is good enough for downstream model training?**

1. **Human gold standard:** Sample 200-500 records; have domain experts label them. Compute precision, recall, and Cohen's κ against LLM labels.
2. **Downstream model quality:** Train a classifier on LLM-labelled data and a classifier on human-labelled data. Compare test performance on a held-out human-labelled set — if performance is within 2-3%, LLM labels are likely sufficient.
3. **Error analysis by category:** Identify which label categories the LLM struggles with (often ambiguous or rare classes). Apply human labelling selectively to hard cases only.

---

## 4. Experimentation & Causal Inference

**Q: What is the difference between correlation and causation? Give a practical example.**

Correlation means two variables move together. Causation means one variable directly produces a change in another. The classic confusion: ice cream sales and drowning deaths are correlated (both rise in summer) but ice cream doesn't cause drowning. The confounder is temperature.

**Practical data science example:** Users who use your AI assistant feature have 40% higher retention. Does the assistant cause retention, or do highly engaged users simply adopt more features? This is the **selection bias** problem — more motivated users self-select into the treatment. Without a randomised experiment, you cannot attribute the retention lift to the feature.

**Q: When is a randomised controlled experiment (A/B test) not possible? What are the alternatives?**

**When RCTs aren't possible:**
- Ethical constraints (can't deny a beneficial treatment to a control group)
- Spillover effects make randomisation invalid (e.g., network effects on social platforms)
- Rare events with insufficient sample size
- Legacy systems where randomisation isn't implemented

**Alternatives:**

| Method | When to Use | Key Assumption |
|---|---|---|
| **Difference-in-Differences (DiD)** | Before/after with a control group that didn't receive treatment | Parallel trends assumption |
| **Regression Discontinuity (RD)** | Treatment assigned at a threshold (e.g., credit score > 700 gets a product) | No manipulation of the running variable near the threshold |
| **Instrumental Variables (IV)** | You have a variable that affects treatment but not outcome directly | Valid instrument (rare and hard to find) |
| **Propensity Score Matching** | Match treated and control users on observed covariates | No unmeasured confounders |
| **Synthetic Control** | Single treated unit (e.g., one market) vs many controls | Pre-treatment fit |

**Q: What is interference in A/B testing and how do you detect and handle it?**

Interference (SUTVA violation) occurs when one user's assignment affects another user's outcome. Common on marketplace or social platforms: treating one side of a marketplace (sellers) changes outcomes for the other side (buyers) in the control group.

**Detection:** Check if control group metrics look unusually good or bad versus historical baselines. Use network analysis to identify clusters of users who interact.

**Solutions:**
- **Cluster randomisation:** Randomise at the cluster (city, region, friend group) level instead of individual user
- **Switchback experiments:** Alternate treatment and control over time periods (works for supply/demand experiments)
- **Bipartite experimentation:** For two-sided markets, use specialised designs that account for cross-side effects

---

## 5. SQL for Data Scientists

**Q: Write a query to find the top 3 models by total tokens consumed in the last 30 days, broken down by day.**

```sql
WITH daily_usage AS (
    SELECT
        DATE(created_at)        AS usage_date,
        model_name,
        SUM(tokens_consumed)    AS daily_tokens
    FROM api_requests
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY DATE(created_at), model_name
),
model_totals AS (
    SELECT
        model_name,
        SUM(daily_tokens) AS total_tokens,
        RANK() OVER (ORDER BY SUM(daily_tokens) DESC) AS rnk
    FROM daily_usage
    GROUP BY model_name
)
SELECT
    d.usage_date,
    d.model_name,
    d.daily_tokens
FROM daily_usage d
JOIN model_totals m
    ON d.model_name = m.model_name
WHERE m.rnk <= 3
ORDER BY d.usage_date, m.rnk;
```

**Q: What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?**

Given scores: 100, 90, 90, 80

| Function | Results |
|---|---|
| `ROW_NUMBER()` | 1, 2, 3, 4 — always unique |
| `RANK()` | 1, 2, 2, 4 — gaps after ties |
| `DENSE_RANK()` | 1, 2, 2, 3 — no gaps |

Use `ROW_NUMBER` when you need exactly one row per group (e.g., most recent record per user). Use `RANK`/`DENSE_RANK` for leaderboards.

**Q: How would you detect data quality issues in a production feature table?**

```sql
-- Null check
SELECT
    COUNT(*) AS total_rows,
    COUNT(user_id) AS non_null_user_id,
    COUNT(feature_x) AS non_null_feature_x,
    100.0 * COUNT(feature_x) / COUNT(*) AS pct_complete
FROM feature_table;

-- Distribution shift: compare mean and stddev this week vs last week
SELECT
    CASE WHEN created_at >= CURRENT_DATE - 7 THEN 'this_week' ELSE 'last_week' END AS period,
    AVG(feature_x) AS mean_x,
    STDDEV(feature_x) AS std_x,
    MIN(feature_x), MAX(feature_x)
FROM feature_table
WHERE created_at >= CURRENT_DATE - 14
GROUP BY 1;

-- Duplicate check
SELECT user_id, COUNT(*) AS n
FROM feature_table
GROUP BY user_id
HAVING COUNT(*) > 1;
```

---

## 6. Model Evaluation & Monitoring

**Q: What metrics would you use to evaluate a recommendation model, and how do they differ?**

| Metric | What it measures | When to use |
|---|---|---|
| **Precision@K** | Of the top K recommendations, what fraction are relevant? | When showing a small fixed list (top 5 results) |
| **Recall@K** | Of all relevant items, what fraction appear in top K? | When missing items has high cost (medical, legal search) |
| **NDCG@K** | Normalised ranking quality — rewards putting the best item first | Ranked lists where position matters |
| **Mean Reciprocal Rank (MRR)** | Average of 1/rank of first relevant result | Search and question answering |
| **Coverage** | What fraction of the catalogue gets recommended? | Detecting popularity bias |
| **Novelty / Serendipity** | How surprising are recommendations vs user history? | Detecting filter bubbles |

Offline metrics (above) often don't fully correlate with business metrics. Always validate with online A/B tests measuring CTR, conversion, or retention.

**Q: How would you set up monitoring for an ML model in production?**

```
Data quality → Feature drift → Prediction drift → Business metric drift
      ↓               ↓               ↓                   ↓
  Null rates,    PSI / KL           Output            Revenue,
  outliers,    divergence on       distribution       conversion,
  schema       input features      shift               engagement
  changes
```

**Population Stability Index (PSI):** Measures how much a feature distribution has shifted between training and production.

| PSI | Interpretation |
|---|---|
| < 0.1 | No significant shift — model likely still valid |
| 0.1 – 0.2 | Moderate shift — monitor closely |
| > 0.2 | Significant shift — investigate and consider retraining |

**Retraining triggers:** Time-based (weekly retrain), performance-based (accuracy drops below threshold), or drift-based (PSI > 0.2 on key features). Most production systems use all three.

**Q: What is data leakage, and how do you find it in a production pipeline?**

Data leakage is when information from outside the training window (future data, or proxy variables correlated with the target due to data collection artefacts) is included in training features, causing deceptively high validation performance that doesn't hold in production.

**How to detect it:**
1. Model performs dramatically better in cross-validation than in production
2. A single feature has suspiciously high importance (check if it's a proxy for the target)
3. Test set performance degrades sharply after a date boundary
4. Features are computed using post-event data (e.g., "was flagged for review" before the review decision)

**How to prevent it:**
- Always split data temporally (train on older data, test on newer) rather than randomly
- Audit every feature for its timestamp — can it be known at prediction time?
- Use strict pipeline encapsulation (fit preprocessing on train split only, transform test separately)

---

## 7. Communication & Business Impact

**Q: How do you communicate a model result to a non-technical stakeholder?**

The most common mistake is leading with model metrics (AUC = 0.87, precision = 0.74). Stakeholders care about outcomes, not statistics.

**Framework:**
1. **The problem in business terms:** "Today, our operations team manually reviews 10,000 customer applications a week, taking 3 minutes each."
2. **What the model does:** "The model scores each application and routes the 80% we're most confident about to auto-approve or auto-reject. Only the remaining 20% go to manual review."
3. **The business outcome:** "This reduces manual review volume by 80%, saves approximately 400 hours per week, and maintains a false positive rate below our current manual error rate."
4. **What can go wrong:** "If the model encounters application types it hasn't seen before, it may route them incorrectly. We've built a monitoring dashboard to catch this and will alert the team if auto-decisions drop in accuracy."

**Q: A stakeholder says your model's 85% accuracy isn't good enough — they want 99%. How do you respond?**

First, clarify what 99% accuracy means in the business context — do they mean precision (can we trust the decisions it makes) or recall (will it catch all the cases)? These pull in opposite directions.

Then reframe: in practice, the right question is "what is the current human accuracy baseline?" If the manual process is 82% accurate, an 85% model is already an improvement. If human reviewers achieve 97%, you need to identify where the 12-point gap comes from and whether more data, better features, or a different model architecture closes it — or whether it's fundamentally limited by the signal in the available data.

Finally, introduce the cost asymmetry: is a false positive (approving bad applications) or false negative (rejecting good applications) more costly? A model optimised for the right objective at 85% overall accuracy may outperform a 99%-accurate model optimised for the wrong one.

---

## 8. System Design for Data Scientists

**Q: Design a personalised content ranking system for a news feed.**

**1. Clarify requirements**
- Users: 5M DAU. Feed refreshes on open. Target: increase time-in-app and scroll depth.
- Latency: < 200ms to rank 100 candidate articles.
- Cold start: handle new users with no history.

**2. Data pipeline**

```
Content signals:          User signals:           Context signals:
- Article embeddings      - Click/read history    - Time of day
- Category, author        - Engagement rate       - Device type
- Freshness score         - Session duration      - Location
- Viral velocity          - Preference vectors    - Previously seen
```

**3. Two-stage architecture**

```
Candidate Generation (fast, recall-focused)
  → Retrieval model: ANN search in embedding space
  → 100-500 candidates in < 50ms

Ranking (slower, precision-focused)
  → LightGBM or small neural ranker
  → User × Content feature cross-features
  → Final 20 items in < 150ms
```

**4. Cold start**
- New users: use popularity signal + onboarding preference survey
- New articles: use content embeddings to find similar items with known engagement

**5. Feedback loop**
- Collect implicit feedback (read time, scrolls past, shares) not just clicks
- Log position bias: clicks on position 1 inflate importance of top items
- Correct for position bias during training (inverse propensity weighting)

**6. Monitoring**
- Track CTR, read-through rate, time-in-app per session
- Watch for filter bubble effects (diversity of categories per user decreasing)
- Detect popularity collapse (all feeds converging to same viral content)

---

## Quick Revision: The Data Scientist's Mental Checklist

Before every interview, run through this:

| Question | What the interviewer tests |
|---|---|
| "How would you validate this model?" | You know the difference between train/validation/test; can detect leakage |
| "What metric would you use?" | Business context first; not defaulting to accuracy |
| "How would you handle missing data?" | Understand imputation trade-offs (mean, model-based, drop) |
| "Why did performance drop in production?" | Training-serving skew, data drift, feature pipeline bugs, leakage |
| "How would you explain this to a manager?" | Can translate model output into business outcome |
| "What would you do with more time?" | Prioritise: more data > better features > model complexity |

---

## See Also

- [Machine Learning Interview Track](/resources/interview-prep/ml)
- [LLM Engineering Interview Track](/resources/interview-prep/llm)
- [Quantitative Analytics Interview Track](/resources/interview-prep/quant-banking)
- [RAG Architecture Deep Dive](/deep-dive/rag-architecture)
- [Evaluation & Testing Deep Dive](/deep-dive/eval-and-testing)
- [Interview Prep Overview](/resources/interview-prep)
