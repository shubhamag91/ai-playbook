---
title: Machine Learning — Interview Prep
description: Comprehensive interview preparation for ML Engineer and Data Scientist roles. Covers classical algorithms, model evaluation, feature engineering, deep learning fundamentals, and MLOps.
sidebar:
  order: 4
tags:
  - interview
  - machine-learning
  - engineering
  - reference
lastUpdated: 2026-05-16
nextVerificationDue: 2026-11-16
---

Targeted preparation for **ML Engineer**, **Data Scientist**, **Applied Scientist**, and **Research Scientist** roles. Covers classical ML, deep learning, evaluation, and production ML systems.

**Roles covered:** ML Engineer · Data Scientist · Applied Scientist · MLOps Engineer · ML Platform Engineer

---

## 1. Classical ML Algorithms

### Decision Trees & Ensembles

**Q: How does a decision tree split? What makes a good split?**

At each node, the tree tries every feature and every threshold, picking the split that maximizes information gain (or minimizes Gini impurity).

**Information Gain** = H(parent) − weighted average H(children), where H = entropy = -Σ p log₂ p

**Gini Impurity** = 1 − Σ pᵢ² (default in sklearn)

A split is good when child nodes are more pure (lower impurity) than the parent. Stops when: max depth reached, min samples threshold, or no improvement.

**Q: Why does Random Forest reduce variance while Gradient Boosting reduces bias? When do you prefer each?**

**Random Forest:** Bagging (bootstrap samples) + feature subsampling. Each tree is decorrelated from others. Averaging N decorrelated trees reduces variance without increasing bias. Parallelizable; robust to noisy features.

**Gradient Boosting (XGBoost, LightGBM):** Sequential ensemble — each tree fits the residuals of previous trees. Reduces bias (high-bias weak learners become strong together). More powerful but prone to overfitting; need careful tuning of n_estimators, learning_rate, max_depth.

**Use Random Forest when:** Quick baseline, noisy data, don't have time to tune, interpretability via feature importance.  
**Use XGBoost/LightGBM when:** Tabular data, maximizing performance, enough time to tune, low to moderate noise.

**Q: Explain XGBoost's key innovations over vanilla gradient boosting.**

1. **Regularization:** L1 (α) and L2 (λ) regularization on leaf weights — reduces overfitting that vanilla GBDT lacks
2. **Approximate split finding:** Quantile sketch for finding splits on large datasets (faster than exact greedy)
3. **Column subsampling:** Like Random Forest — randomly select features per tree (reduces variance)
4. **Sparsity awareness:** Handles missing values by learning a default direction for missing data at each split
5. **Cache-aware access:** Tree learning algorithm optimized for CPU cache misses
6. **Parallel tree construction:** Build each tree in parallel (node-level parallelism)

**Q: What is the difference between bagging and boosting?**

| Aspect | Bagging (Random Forest) | Boosting (XGBoost) |
|--------|------------------------|-------------------|
| **Training** | Parallel (independent trees) | Sequential (each tree corrects previous) |
| **Data sampling** | With replacement (bootstrap) | Weighted by residuals |
| **Goal** | Reduce variance | Reduce bias |
| **Risk** | Underfitting | Overfitting |
| **Tuning** | Less sensitive | More sensitive |

### Support Vector Machines

**Q: Explain SVMs intuitively. When do kernels help?**

SVM finds the hyperplane with maximum margin between classes. The "support vectors" are the training points closest to the boundary — only these determine the decision boundary.

**Kernel trick:** Instead of mapping to a higher-dimensional feature space explicitly (expensive), kernels compute dot products in that space cheaply:
- **Linear:** No transformation (fast, works for linearly separable data)
- **RBF (Gaussian):** Infinite-dimensional space — can model any decision boundary (hyperparameter: γ controls smoothness)
- **Polynomial:** Degree-d polynomial features implicitly

Use kernels when: data is not linearly separable in original space, but you believe a transformation would separate it.

### k-Nearest Neighbors

**Q: What are the computational challenges of kNN and how do you address them?**

kNN at inference: compute distance to every training point → O(Nd) per query. Prohibitive for N=1M+.

Solutions:
- **KD-trees:** Exact search in O(d log N) for low-d (d ≤ ~20)
- **Ball trees:** Better for moderate d
- **Approximate nearest neighbor (ANN):** FAISS (Facebook AI), HNSW, ScaNN — sacrifice exact correctness for speed. 99%+ recall at 100× speedup. Used in vector databases (Pinecone, Weaviate) for RAG.

---

## 2. Model Evaluation

**Q: Explain the bias-variance trade-off. How do you diagnose which problem you have?**

Total error = Bias² + Variance + Irreducible Noise

| Problem | Symptoms | Fix |
|---------|----------|-----|
| **High bias (underfitting)** | High train error, high test error, similar errors | More complex model, more features, fewer regularization |
| **High variance (overfitting)** | Low train error, high test error, large gap | More data, more regularization, simpler model, dropout |
| **High noise** | Both errors high, similar → irreducible | Better data quality, feature engineering |

Learning curves: plot train/val error vs training set size. High bias: both errors plateau high. High variance: large gap between train and val error.

**Q: When is AUC-ROC misleading? What do you use instead?**

AUC-ROC can be misleadingly high when the positive class is rare. Example: 1% fraud rate. A model that marks 50% of transactions as fraud has high TPR but terrible FPR — yet ROC-AUC can still look reasonable because the denominator (N negatives) is large.

**AUC-PR (precision-recall):** More informative for imbalanced problems. Random classifier has AUC-PR ≈ prevalence rate (1%); a good model significantly above that.

**Log loss / Brier score:** For calibration — does P(fraud)=0.8 actually mean 80% of such cases are fraud? Critical for decision-making systems.

**Q: What is k-fold cross-validation? When would you use stratified k-fold?**

k-fold CV: split data into k folds; train on k-1, validate on the remaining fold; rotate k times; average performance.

- **Standard k-fold:** Randomized split. Default for regression.
- **Stratified k-fold:** Each fold preserves the class distribution. Always use for classification (especially imbalanced).
- **Group k-fold:** Ensure all samples from the same group (e.g., same customer) are in the same fold — prevents data leakage when a customer has multiple rows.
- **Time series split:** No shuffling; train on past, validate on future. Prevents temporal leakage.

**Q: How do you calibrate a model's probability outputs?**

A well-calibrated model means: when it predicts P(y=1) = 0.7, 70% of those samples actually are positive.

Check calibration: reliability diagram (calibration curve) — plot mean predicted probability vs fraction of positives in each bin.

Calibration methods:
- **Platt scaling:** Fit a logistic regression on held-out validation predictions → calibrated probability
- **Isotonic regression:** Non-parametric; more flexible than Platt but requires more data
- **Temperature scaling:** For neural networks — scale logits by a temperature T (single parameter)

Why it matters: credit risk scores, medical diagnosis, fraud thresholds — any decision that depends on the probability magnitude (not just ranking) requires calibration.

---

## 3. Feature Engineering & Selection

**Q: How do you handle missing values? Walk through the decision process.**

1. **Understand why the data is missing:**
   - **MCAR** (Missing Completely At Random): safe to drop or impute
   - **MAR** (Missing At Random): conditional on observed data — impute carefully
   - **MNAR** (Missing Not At Random): the fact that it's missing is informative (e.g., income not reported for high earners) — add a missing indicator feature

2. **Strategies:**
   | Method | When | Risk |
   |--------|------|------|
   | Drop rows | MCAR, small fraction | Reduces sample size |
   | Mean/median imputation | MAR, numerical | Distorts distribution, hides uncertainty |
   | Mode imputation | Categorical | May introduce bias |
   | Model-based (MICE) | MAR, complex patterns | Expensive but principled |
   | Add missing indicator | MNAR | Additional feature |
   | Forward fill | Time series | Only when temporal order justifies it |

3. **For gradient boosting (XGBoost):** Built-in handling — can learn optimal direction for missing values.

**Q: How do you handle categorical features with high cardinality (e.g., merchant_id with 50K unique values)?**

| Method | When | Notes |
|--------|------|-------|
| **Target encoding** | High cardinality + strong signal | Risk of leakage; use cross-val folds |
| **Frequency encoding** | High cardinality + frequency matters | Replace category with count in training data |
| **Embedding** | Neural network, many categories | Learn dense representation end-to-end |
| **Hashing trick** | Very high cardinality, memory constraints | Hash to fixed-size vector; collisions are rare issue |
| **Grouping rare categories** | Long tail | Group all categories with < N occurrences into "Other" |

**Q: What is feature leakage? Give three examples.**

Leakage: the model learns from features that contain information about the target that wouldn't be available at prediction time.

1. **Temporal leakage:** Using current month's transaction count to predict whether a loan from 6 months ago will default — the count wasn't known at origination.
2. **Label-derived features:** Including "outcome_category" (e.g., "charged off") as a feature when the target is default — trivially predicts itself.
3. **Group leakage:** Customer has 10 rows (monthly snapshots). Training on 8 rows and validating on 2 from the same customer — the model learns customer-level patterns that don't generalize.

**Q: How do you select important features? What are the pitfalls of each approach?**

| Method | Pros | Pitfalls |
|--------|------|---------|
| **Gini/permutation importance (tree-based)** | Fast, model-native | Gini biased toward high-cardinality features |
| **SHAP values** | Game-theoretically consistent, shows direction | Slow for large ensembles; correlated features split importance |
| **L1 (LASSO)** | Sparse, interpretable | Arbitrary selection among correlated features |
| **Mutual information** | Non-parametric, catches non-linear dependencies | Univariate (misses interactions) |
| **Recursive Feature Elimination** | Principled, model-validated | Computationally expensive |

---

## 4. Regularization & Optimization

**Q: Explain L1 vs L2 regularization. When would you use each?**

Both penalize large weights, preventing overfitting:
- **L2 (Ridge):** Adds λΣwᵢ² to loss. Penalizes large weights smoothly. Solution: all weights shrink toward zero, none exactly zero. Good for: multicollinearity (distributes weight across correlated features).
- **L1 (LASSO):** Adds λΣ|wᵢ| to loss. Produces sparse solutions (some weights exactly zero). Good for: feature selection when you believe few features are truly predictive.
- **Elastic Net:** L1 + L2 combined. Best of both — sparse solutions while handling correlated features better than pure L1.

**Q: What is the difference between SGD, Adam, and AdamW? When would each be preferred?**

| Optimizer | Update Rule | Best For |
|-----------|------------|---------|
| **SGD** | w ← w - η∇L | LLMs (with momentum + LR schedule); most robust with proper tuning |
| **Adam** | Adaptive per-parameter LR using 1st/2nd moment estimates | Fast convergence; good default for deep learning |
| **AdamW** | Adam + decoupled weight decay | LLM fine-tuning (weight decay is correctly decoupled from adaptive LR) |
| **RMSprop** | Adaptive LR (1 moment) | RNNs |

AdamW is the default for fine-tuning LLMs. Pure Adam conflates L2 regularization with weight decay — AdamW corrects this for proper regularization.

**Q: What is batch normalization and what problem does it solve?**

Problem: As the network trains, the distribution of activations at each layer shifts with parameter updates — forces each layer to constantly adapt to the changing input distribution ("internal covariate shift").

BatchNorm: normalize activations within each mini-batch (zero mean, unit variance), then apply learnable γ, β to rescale. Computed per-channel over the batch.

Benefits: enables higher learning rates, acts as mild regularization, reduces sensitivity to initialization.

LayerNorm vs BatchNorm: LLMs use LayerNorm (normalize over the feature dimension within a single sample — batch-independent). BatchNorm is standard for CNNs.

---

## 5. Deep Learning Fundamentals

**Q: Explain backpropagation without using the word "gradient."**

Backprop is the chain rule applied to compute how much each parameter contributed to the final loss.

Forward pass: input flows through the network layer by layer → prediction → loss computed.

Backward pass: starting from the loss, work backwards. At each operation, compute: "how much did this input/parameter affect the output?" using the derivative of that operation. Multiply these effects together along every path back to each parameter (chain rule).

The result: for each weight, a value indicating whether increasing that weight increases or decreases the loss. Update weights in the direction that decreases loss.

**Q: What is the vanishing gradient problem and how do modern architectures address it?**

In deep networks, gradients are multiplied through many layers. If each layer multiplies gradients by < 1 (e.g., sigmoid saturates at ~0 gradient in the tails), gradients shrink exponentially → early layers learn very slowly.

Solutions:
- **Residual connections (ResNets):** x → x + f(x). The gradient of x flows directly, bypassing f(x) — gradient highway to early layers.
- **ReLU activation:** Gradient is exactly 1 for positive inputs (doesn't saturate). Replaced sigmoid/tanh in deep nets.
- **Layer normalization:** Normalizes activations, preventing exploding/vanishing values.
- **Careful initialization (He, Xavier):** Scale initial weights to maintain variance through layers.

**Q: When would you use a CNN vs RNN vs Transformer for sequence data?**

| Architecture | Inductive Bias | Best For | Weakness |
|---|---|---|---|
| **CNN** | Local patterns, translation invariance | Short patterns (text classification), image features | Long-range dependencies |
| **RNN/LSTM** | Sequential order, recurrent state | Time series with clear temporal structure | Slow training, vanishing gradients at long range |
| **Transformer** | Global attention (all pairs) | Long-range dependencies, parallel training | O(N²) attention, no built-in position sense |

For most NLP today: Transformer wins. For short time series with clear temporal patterns: RNN still competitive. For image patches → now also Transformer (ViT).

**Q: What is transfer learning and when does fine-tuning outperform training from scratch?**

Transfer learning: use a model pre-trained on a large dataset as initialization for a downstream task.

Fine-tuning outperforms scratch when:
- **Data is limited:** Pre-trained weights provide a strong prior (Imagenet features generalize to medical images)
- **Task is similar:** Text classification benefits from BERT's language understanding
- **Compute is limited:** Fine-tuning < 5% of pre-training cost

Training from scratch when:
- **Domain is radically different:** Molecular biology, specialized sensor data
- **Data is abundant:** If you have 100B tokens, pre-training a custom model may outperform general pre-trained models
- **Architecture needs differ:** Custom input/output structure

---

## 6. MLOps & Production ML

**Q: What is the ML lifecycle? What breaks in production that tests don't catch?**

Lifecycle: Data collection → Feature engineering → Training → Evaluation → Deployment → Monitoring → Retraining

What breaks in production:
- **Data drift:** Input distribution changes (seasonality, macro events, user behavior changes)
- **Concept drift:** P(Y|X) changes — same features, different true labels (e.g., fraud patterns evolve)
- **Pipeline failures:** Upstream feature computation fails silently → model receives null/stale features
- **Training-serving skew:** Feature computed differently in training vs serving code
- **Model staleness:** Model trained 6 months ago on old patterns

**Q: How do you detect and handle model drift in production?**

**Detection:**
| Signal | How | Threshold |
|--------|-----|-----------|
| **PSI (feature drift)** | Compare feature distributions train vs current | PSI > 0.2 = significant |
| **Score drift** | Model's output distribution shifted | Mean score ± 2σ from baseline |
| **Label drift** | Actual outcomes drift from predictions | Monitor calibration weekly |
| **Covariate shift** | Train classifier to distinguish train vs current data | AUC > 0.6 = detectable shift |

**Response:** Minor drift → recalibrate. Moderate drift → retrain on recent data. Severe drift → rebuild model + features.

**Q: What is training-serving skew and how do you prevent it?**

Training-serving skew: a feature computed one way during training and differently in production (e.g., `age_in_days` computed as `current_date - birth_date`, but in production `current_date` is UTC while in training it was local time).

Prevention:
- **Feature store:** Single source of truth for feature computation — both training and serving read from the same feature definitions
- **Shared feature computation library:** Import the same Python module in training pipeline and serving code
- **Shadow mode testing:** Before deploying, run new model in parallel with old model; compare feature distributions
- **Integration tests:** Test feature pipeline with known inputs → known outputs (not just unit tests)

**Q: What is a feature store? When do you need one?**

A feature store is a centralized repository that stores, computes, and serves ML features consistently across training and inference.

Components:
- **Offline store:** Historical features for training (Spark/SQL on data warehouse)
- **Online store:** Low-latency feature lookup at inference time (Redis, DynamoDB)
- **Feature registry:** Metadata, lineage, versioning

Need one when:
- Multiple teams are computing the same features differently
- Features need to be served at < 50ms latency in production
- Training-serving skew is causing model degradation
- Feature reuse across multiple models would save significant engineering time

Early-stage (single model, single team): a simple Pandas/SQL pipeline is fine.

---

## 7. ML System Design

**Q: Design a recommendation system for a streaming platform.**

**Requirements:** 50M users, 1M content items, latency < 100ms, fresh recommendations daily.

**Two-stage architecture:**

```
Stage 1: Candidate Generation (fast, coarse)
  ├── Collaborative filtering (user-item matrix factorization)
  ├── Content-based (item embedding similarity)  
  └── → Top-500 candidates per user (precomputed offline, stored in cache)

Stage 2: Ranking (slow, precise)
  ├── Features: user context, time of day, device, watch history recency
  ├── Model: gradient boosted tree or neural ranker
  └── → Top-20 recommendations (computed at request time)
```

**Why two stages?**
- 1M items × 50M users × real-time ranking = computationally infeasible
- Candidate generation reduces to 500 items; ranker can afford deep features on 500

**Key features for ranking:**
- User watch history (last 10 items' genres, duration completed)
- Item freshness (hours since release)
- Context (time of day, weekend, device)
- Collaborative signals (similar users' recent watches)

**Evaluation:** Offline: NDCG, hit rate. Online: click-through rate, watch time, completion rate.

**Q: How do you design an offline evaluation pipeline for a fraud model before deployment?**

```
Historical transactions (12 months)
    ↓
Walk-forward splits (monthly):
    Train: months 1–6 → Validate: month 7
    Train: months 1–7 → Validate: month 8
    ...
    Train: months 1–11 → Validate: month 12
    ↓
Per-fold metrics:
    • AUC-PR (primary) and AUC-ROC
    • Precision@K (top K flagged transactions)
    • Gini coefficient
    • Calibration curve
    ↓
Stability check:
    • Feature PSI across folds (features shouldn't drift drastically month-over-month)
    • Score distribution stability
    ↓
Fairness check:
    • Approval/denial rates by demographic group (disparate impact test)
    ↓
Champion vs challenger:
    • Statistical significance test for AUC improvement
    • Business impact estimate: (TP × avg fraud amount) - (FP × customer service cost)
```

---

## 8. Common Interview Questions & Answers

**Q: How do you approach a new ML problem from scratch?**

1. **Understand the business problem:** What decision will this model make? What's the cost of a false positive vs false negative?
2. **Define the label:** What exactly are we predicting? Ensure labels are clean and representative.
3. **Exploratory data analysis:** Class distribution, missing values, feature correlations, temporal patterns.
4. **Baseline:** Simplest model (logistic regression, majority-class predictor). Never skip this.
5. **Feature engineering:** Domain knowledge + statistical analysis.
6. **Model selection:** Start simple, escalate complexity as needed.
7. **Evaluation:** Correct metrics for the problem (not just accuracy).
8. **Error analysis:** Examine failure cases to find systematic patterns.
9. **Production plan:** Monitoring, retraining cadence, fallback.

**Q: Explain the difference between precision and recall to a non-technical person. Which is more important for spam filtering?**

Precision: "Of all emails I flagged as spam, how many were actually spam?" (Avoid false alarms — blocking a real email is bad)

Recall: "Of all actual spam emails, how many did I catch?" (Avoid missing spam — letting spam through is annoying)

For spam filtering: precision matters more. Missing a spam email is annoying; blocking an important email (missed meeting invite, job offer) damages trust more. High-precision, lower-recall spam filter is preferred.

**Q: Why would a model perform well on a test set but fail in production?**

Five main causes:
1. **Distribution shift:** Test set drawn from same distribution as train (historical data), but production data is different (new market segment, post-COVID behavior)
2. **Data leakage in evaluation:** Test set contaminated with train-time information
3. **Incorrect evaluation metric:** Test metric doesn't reflect production cost function
4. **Non-representative test set:** Test set too small, wrong time period, or curated (cherry-picked)
5. **Training-serving skew:** Feature computation differs between offline and online environments

---

## Quick-Reference: Algorithm Cheatsheet

| Algorithm | Type | Pros | Cons | Hyperparams |
|-----------|------|------|------|------------|
| **Logistic Regression** | Classification | Interpretable, fast, calibrated | Linear boundary only | C (regularization) |
| **Random Forest** | Ensemble | Robust, handles nonlinearity, OOB estimate | Slow inference for large N | n_estimators, max_depth, max_features |
| **XGBoost** | Ensemble | Best tabular performance | Many hyperparams to tune | n_estimators, learning_rate, max_depth, subsample |
| **LightGBM** | Ensemble | Faster than XGBoost, good for large data | Less interpretable | Similar to XGBoost |
| **SVM (RBF)** | Kernel method | Non-linear boundary, effective high-d | Slow for large N, hard to tune | C, γ |
| **k-NN** | Instance-based | Simple, no training | Slow inference, sensitive to scale | k, distance metric |
| **Neural Network** | Deep learning | Universal approximator | Data hungry, black box | Architecture, LR, batch size, regularization |

---

## See Also

- [LLM Engineering Interview Track](/learn/interview-prep-llm)
- [Quantitative Analytics Interview Track](/learn/interview-prep-quant-banking)
- [Training & Fine-tuning Deep Dive](/deep-dive/training-finetuning)
- [Evaluation & Testing Deep Dive](/deep-dive/eval-and-testing)
- [Interview Prep Overview](/learn/interview-prep)
