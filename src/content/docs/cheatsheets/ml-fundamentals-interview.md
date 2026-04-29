---
title: ML Fundamentals Interview Prep
description: Machine learning interview questions and answers for AI/ML Engineer, AI Data Scientist, and AI Product Manager roles.
---

## Supervised vs Unsupervised vs Reinforcement Learning

| Question | Answer |
|----------|--------|
| **What is supervised learning?** | Learning from labeled data. The model learns a mapping from inputs to outputs by training on examples where the correct answer is known (e.g., classification, regression). |
| **What is unsupervised learning?** | Learning from unlabeled data to find patterns or structure (e.g., clustering, dimensionality reduction). No ground truth labels are provided during training. |
| **What is reinforcement learning?** | Learning through trial and error by interacting with an environment. An agent receives rewards/penalties and learns a policy to maximize cumulative reward over time. |
| **When would you use supervised vs unsupervised?** | Use supervised when you have labeled data and a clear prediction task. Use unsupervised when you want to explore data structure or labels aren't available. Use RL when an agent must learn through interaction (robotics, games, recommendation). |
| **What's semi-supervised learning?** | Training on a small amount of labeled data combined with a large amount of unlabeled data. Often used when labeling is expensive. |
| **What's self-supervised learning?** | Creating labels from the data itself (e.g., predicting next word in a sentence, image inpainting). Used heavily in pre-trained models like BERT. |

## Bias-Variance Tradeoff

| Question | Answer |
|----------|--------|
| **What is the bias-variance tradeoff?** | High bias causes underfitting (model too simple, misses patterns). High variance causes overfitting (model too complex, fits noise). The goal is to find the sweet spot where total error is minimized. |
| **How do you diagnose bias vs variance?** | High training error + high test error = high bias (underfitting). Low training error + high test error = high variance (overfitting). |
| **How do you reduce bias?** | Increase model complexity (more features, deeper trees, more layers), reduce regularization, add polynomial features. |
| **How do you reduce variance?** | More training data, reduce model complexity, regularization (L1/L2, dropout), cross-validation, ensemble methods. |
| **Engineer**: How does this affect production ML? | In production, you often face data distribution shift. A high-variance model may degrade faster as new data arrives. Balance complexity based on expected data stability. |
| **Scientist**: How do you communicate this to stakeholders? | Use the analogy: bias is like a sports team that always loses (consistently wrong), variance is like an unpredictable player (sometimes great, sometimes terrible). |

## Overfitting and Underfitting

| Question | Answer |
|----------|--------|
| **What is overfitting?** | When a model learns noise in training data rather than the underlying pattern. Performs well on training data but poorly on unseen data. |
| **What is underfitting?** | When a model is too simple to capture the patterns in data. Poor performance on both training and test data. |
| **How do you prevent overfitting?** | More data, cross-validation, regularization (L1/L2), dropout, early stopping, reduce model complexity, feature selection. |
| **How do you detect overfitting?** | Large gap between training and validation/test error. Plot learning curves — if training error keeps decreasing but validation error increases, you're overfitting. |
| **What's the difference between L1 and L2 regularization?** | L1 (Lasso) adds sum of absolute weights, encourages sparsity (some weights become exactly zero). L2 (Ridge) adds sum of squared weights, shrinks weights toward zero but rarely to exactly zero. |
| **PM**: How do you explain overfitting risks to non-technical stakeholders? | "Imagine a student who memorizes past exam answers but can't answer new questions — they've overfitted to the test. Our model might do the same with historical data." |

## Evaluation Metrics

| Question | Answer |
|----------|--------|
| **When would you use accuracy vs precision vs recall?** | Accuracy: balanced classes. Precision: minimize false positives (e.g., spam filter). Recall: minimize false negatives (e.g., fraud detection). |
| **What is F1 score?** | The harmonic mean of precision and recall: 2 × (Precision × Recall) / (Precision + Recall). Useful when you need a single metric for imbalanced classes. |
| **What is AUC-ROC?** | Area Under the Receiver Operating Characteristic curve. Measures how well the model distinguishes between classes across all thresholds. 1.0 = perfect, 0.5 = random. |
| **What is a confusion matrix?** | A table showing true positives, true negatives, false positives, false negatives. Used to calculate metrics like precision, recall, F1. |
| **When is accuracy misleading?** | When classes are imbalanced (e.g., 99% negative, 1% positive — a model predicting all negatives gets 99% accuracy but is useless). |
| **What is log loss?** | Measures probabilistic prediction quality. Penalizes confident wrong predictions more than uncertain ones. Lower is better. |
| **Engineer**: How do you choose metrics for production? | Consider business impact: false positives vs false negatives have different costs. A/B test to validate metrics align with business outcomes. |
| **PM**: How do you pick metrics for AI products? | Start with business KPIs, then work backward to proxy ML metrics. Example: if goal is user retention, proxy might be click-through rate on recommendations. |

## Cross-Validation

| Question | Answer |
|----------|--------|
| **What is k-fold cross-validation?** | Split data into k equal folds. Train on k-1 folds, validate on 1 fold. Repeat k times, average the results. Gives more reliable performance estimates. |
| **Why use cross-validation?** | More robust performance estimate than single train/test split. Uses all data for both training and validation. Helps detect overfitting. |
| **What's the difference between stratified and regular k-fold?** | Stratified maintains class distribution in each fold (important for imbalanced data). Regular doesn't guarantee this. |
| **What is leave-one-out cross-validation (LOOCV)?** | k = n (one sample left out each time). Computationally expensive but uses maximum data for training. Useful for small datasets. |
| **When would you not use cross-validation?** | Time series data (need temporal ordering), very large datasets where compute is a constraint, production model evaluation. |

## Gradient Descent

| Question | Answer |
|----------|--------|
| **What is gradient descent?** | An optimization algorithm that iteratively moves toward the minimum of a loss function by taking steps in the direction of the negative gradient. |
| **What are the variants?** | Batch GD (all data), Stochastic GD (one sample), Mini-batch GD (small batches). Trade-offs: batch is stable but slow, stochastic is fast but noisy. |
| **What is learning rate?** | Step size for each iteration. Too large = overshoot minimum, may diverge. Too small = slow convergence. |
| **What is momentum?** | Adds inertia to gradient updates, helping escape local minima and speeding up convergence. Think of a ball rolling down a hill. |
| **What is adaptive learning rate?** | Methods like Adam, Adagrad, RMSprop automatically adjust learning rate per parameter. Usually faster convergence. |
| **Engineer**: How do you debug slow training? | Check learning rate, batch size, gradient norms. Use learning rate finder curves. Monitor GPU utilization — might be I/O bound, not compute bound. |
| **Scientist**: How do you choose an optimizer?** | Start with Adam (robust default). For simple problems, SGD with momentum often works well and is more interpretable. |

## Feature Engineering

| Question | Answer |
|----------|--------|
| **What is feature engineering?** | Creating new features from raw data to improve model performance. Domain knowledge + creativity often matter more than model choice. |
| **What are common techniques?** | One-hot encoding, scaling/normalization, binning, polynomial features, date/time decomposition, text TF-IDF, aggregations. |
| **What is feature selection?** | Choosing the most relevant features to reduce complexity, improve interpretability, and reduce overfitting. Methods: correlation analysis, recursive feature elimination, L1 regularization. |
| **What is feature importance?** | Techniques (tree-based feature importance, permutation importance) that quantify how much each feature contributes to predictions. |
| **What is a feature store?** | Centralized repository for storing and serving precomputed features, ensuring consistency between training and serving. Tools: Feast, Tecton. |
| **Engineer**: How do you handle categorical features?** | Low cardinality: one-hot or label encoding. High cardinality: target encoding, embedding layers, or feature hashing. Consider compute cost. |
| **Scientist**: How do you handle missing data?** | Option 1: Remove rows (if small % missing). Option 2: Impute (mean/median, KNN, model-based). Option 3: Add missing as a feature (captures information that data was absent). |
| **PM**: Why does feature engineering matter for AI products?** | Domain expertise creates competitive advantage. Good features can outperform fancy models. Also affects data pipeline complexity and cost. |

## Ensemble Methods

| Question | Answer |
|----------|--------|
| **What is bagging?** | Bootstrap Aggregating. Train multiple models on different bootstrap samples, combine predictions (usually by voting or averaging). Reduces variance. Example: Random Forest. |
| **What is boosting?** | Train models sequentially, each correcting the errors of the previous. Reduces bias. Examples: AdaBoost, XGBoost, LightGBM. |
| **What's the difference between bagging and boosting?** | Bagging: parallel, reduces variance, models independent. Boosting: sequential, reduces bias, models depend on each other. |
| **What is stacking?** | Combine multiple models' predictions as input to a meta-model that makes the final prediction. |
| **Engineer**: When would you choose XGBoost vs Random Forest?** | XGBoost: better performance on structured data, more hyperparameters to tune. Random Forest: more robust out of the box, less prone to overfitting. |
| **Scientist**: How do you tune ensemble models?** | Use cross-validation. For boosting, key params: learning rate, max depth, number of trees, subsample rate. Early stopping prevents overfitting. |

## Model Selection

| Question | Answer |
|----------|--------|
| **How do you choose between algorithms?** | Consider: data size, interpretability needs, training time, feature types, problem type (classification/regression). No free lunch — try multiple. |
| **When would you use linear models?** | Baseline, interpretability needed, linearly separable data, fast prototyping. |
| **When would you use tree-based models?** | Non-linear relationships, mixed feature types, feature importance needed. Good default for structured data. |
| **When would you use neural networks?** | Complex patterns, unstructured data (images, text), large datasets, need state-of-the-art performance. |
| **What's Occam's razor in ML?** | Simpler models are preferable. Don't add complexity unless it significantly improves performance. |
| **PM**: How do you decide between model accuracy vs interpretability?** | High-stakes decisions (healthcare, finance) need interpretability. Low-stakes, high-volume applications can prioritize accuracy. Consider regulatory requirements. |

## Common Algorithms

| Question | Answer |
|----------|--------|
| **Explain logistic regression.** | Classification algorithm that outputs probabilities using the logistic (sigmoid) function. Decision boundary is linear. |
| **Explain decision trees.** | Recursively split data based on feature values to minimize impurity (Gini/entropy). Easy to interpret, prone to overfitting. |
| **Explain k-nearest neighbors (KNN).** | Predict by finding k closest training examples and majority voting. Simple but slow at inference time. |
| **Explain k-means clustering.** | Unsupervised algorithm that partitions data into k clusters by iteratively updating cluster centroids. |
| **Explain Naive Bayes.** | Probabilistic classifier based on Bayes' theorem with strong independence assumption. Fast, works well for text classification. |
| **Explain SVM.** | Finds the hyperplane that maximally separates classes. Kernel trick allows non-linear decision boundaries. Good for small-medium datasets. |

## Deep Learning Basics

| Question | Answer |
|----------|--------|
| **What is a neural network?** | Composed of layers of interconnected "neurons" that transform inputs through weighted connections and non-linear activations to produce outputs. |
| **What is backpropagation?** | Algorithm for training neural networks by computing gradients of loss with respect to weights, using chain rule. Enables efficient gradient descent. |
| **What are common activation functions?** | ReLU (most common), sigmoid (0-1), tanh (-1 to 1), softmax (for multi-class output). ReLU avoids vanishing gradient problem. |
| **What is dropout?** | Randomly "drops" neurons during training to prevent overfitting. Forces the network to learn redundant representations. |
| **What is batch normalization?** | Normalizes layer inputs to have zero mean and unit variance. Stabilizes training, allows higher learning rates, acts as regularizer. |
| **Engineer**: How do you choose architecture?** | Start with established architectures for your domain (ResNet for images, transformers for text). Adjust based on data size and compute budget. |
| **Scientist**: How do you debug neural networks?** | Check gradients (not exploding/vanishing), overfit on small batch first, use learning rate schedulers, monitor training/validation gap. |

## Probability and Statistics

| Question | Answer |
|----------|--------|
| **What is the difference between correlation and causation?** | Correlation: two variables move together. Causation: one variable directly causes change in another. ML models find correlations — establishing causation requires experiments. |
| **What is Bayes' theorem?** | P(A|B) = P(B|A) × P(A) / P(B). Foundation for many ML algorithms (Naive Bayes, probabilistic models). |
| **What is a p-value?** | Probability of observing results at least as extreme as actual results, assuming null hypothesis is true. Used for statistical significance. |
| **What is the central limit theorem?** | Sample means converge to normal distribution as sample size increases, regardless of original distribution. Enables many statistical tests. |
| **What is A/B testing?** | Randomized experiment comparing two variants (A vs B). Statistical tests determine if differences are significant or due to chance. |
| **Engineer**: How do you determine sample size for A/B tests?** | Use power analysis: desired effect size, baseline conversion, significance level (α), desired power (1-β). Tools: online calculators, stats libraries. |
| **PM**: What metrics matter for A/B testing?** | Primary metric (the key business KPI), secondary metrics (guardrail metrics to catch negative side effects), and segment analysis. |

## Data Quality

| Question | Answer |
|----------|--------|
| **What is data drift?** | Changes in input data distribution over time that can degrade model performance. Types: concept drift (relationship changes), feature drift (feature distribution changes). |
| **How do you monitor for data drift?** | Track statistical properties of inputs (mean, std, distributions). Use tools like Evidently, Great Expectations, or custom dashboards. |
| **What is label noise?** | Incorrect labels in training data. Can significantly impact model performance. Solutions: label smoothing, noise-robust loss functions, label cleaning. |
| **How do you handle class imbalance?** | Resampling (oversample minority, undersample majority), class weights, SMOTE, evaluation metrics (precision/recall/F1, not accuracy). |
| **Engineer**: What is data versioning?** | Tracking changes to datasets over time, similar to code versioning. Enables reproducibility, rollback, and A/B testing on data. Tools: DVC, LakeFS. |

## Production ML

| Question | Answer |
|----------|--------|
| **What is model serving?** | Deploying trained models to make predictions on new data. Options: batch inference, real-time API, embedded. |
| **What is model versioning?** | Tracking model iterations, enabling rollback, A/B testing, and reproducibility. |
| **What is canary deployment?** | Gradually rolling out new model to a small subset of traffic, monitoring for issues before full rollout. |
| **How do you handle latency requirements?** | Model optimization (pruning, quantization), caching, model distillation, async processing, edge deployment. |
| **Engineer**: What is MLOps?** | Practices for deploying and maintaining ML models in production: CI/CD, monitoring, retraining, reproducibility. |
| **Scientist**: How do you hand off models to engineering?** | Clear documentation of data requirements, expected input/output formats, performance benchmarks, edge cases, monitoring plan. |
| **PM**: How do you plan for model maintenance?** | Budget for ongoing monitoring, retraining, and compute costs. Establish SLAs for model performance and degradation response. |

## Career & Role-Specific

| Question | Answer |
|----------|--------|
| **Engineer**: What makes a good ML engineer vs data scientist?** | ML Engineer: stronger software engineering, production systems, MLOps. Data Scientist: stronger statistics, experimentation, business insight. Many roles overlap. |
| **Scientist**: How do you stay current with ML research?** | Read papers (ArXiv, distill.pub), follow key researchers on Twitter, attend conferences (NeurIPS, ICML), implement papers. Focus on what's practical, not just trending. |
| **PM**: What makes a good AI PM?** | Technical enough to understand trade-offs, product sense to identify valuable problems, communication skills to align engineering and stakeholders. |

## Diagrams

### Bias-Variance

```
┌─────────────────────────────────────┐
│        Model Complexity            │
│                                     │
│   Low ──► High                     │
│                                     │
│   Underfitting ──► Optimal ──► Overfitting  │
│   (high bias)    ✓      (high variance)    │
└─────────────────────────────────────┘
```

### Neural Network

```
Input → Hidden → Hidden → Output
  ↓        ↓        ↓        ↓
Weights flow forward, gradients flow back
```

### Ensemble Methods

```
Bagging (Random Forest)    Boosting (XGBoost)
- Parallel training        - Sequential training  
- Reduces variance         - Reduces bias
```

## Practice Questions

### Scenario-Based

| Question | Hint |
|----------|------|
| You're building a fraud detection model. 0.1% of transactions are fraudulent. What metrics would you use and why? | Think about cost of false negatives vs false positives |
| Your model's training accuracy is 99% but test accuracy is 85%. What's happening and how would you fix it? | Consider overfitting signals |
| You have 1M samples but only 10 features. Should you use a complex model? Explain your reasoning. | Think about bias-variance and model capacity |
| How would you decide whether to collect more data vs engineer better features? | Consider data quality and feature utility |
| Your model performs well on all test sets but fails in production. What could be wrong? | Think about data drift, distribution shift |

### "Explain This Concept" Quick Questions

- Explain gradient descent to a 5-year-old
- What happens when learning rate is too high? Too low?
- Why do we need activation functions?
- What is the difference between a parameter and a hyperparameter?
- How does regularization prevent overfitting?

## Quick Reference Cards

### Evaluation Metrics at a Glance

| Metric | Formula | Use When |
|--------|---------|----------|
| **Accuracy** | (TP + TN) / (TP + TN + FP + FN) | Balanced classes |
| **Precision** | TP / (TP + FP) | False positives costly |
| **Recall** | TP / (TP + FN) | False negatives costly |
| **F1 Score** | 2 × (P × R) / (P + R) | Imbalanced, single metric needed |
| **AUC-ROC** | Area under ROC curve | Class separation quality |

### Regularization Quick Look

| Method | Effect | Use When |
|--------|--------|----------|
| **L1 (Lasso)** | Sparsity, feature selection | High-dimensional data |
| **L2 (Ridge)** | Weight shrinkage | All features relevant |
| **Dropout** | Prevents co-adaptation | Deep networks |
| **Early Stopping** | Prevents overfitting | Any training |

### Optimizer Comparison

| Optimizer | Pros | Cons |
|-----------|------|------|
| **SGD + Momentum** | Interpretable, well-studied | Manual LR tuning |
| **Adam** | Robust default, adapts LR | May overfit on small data |
| **RMSprop** | Good for RNNs | Sensitive to hyperparameters |

## External Resources

### Essential Reading

- [The Elements of Statistical Learning](https://link.springer.com/book/10.1007/978-0-387-84858-7) - Classic textbook
- [Machine Learning Yearning](https://www.mlyearning.org/) - Andrew Ng's practical guide
- [Dive into Deep Learning](https://d2l.ai/) - Interactive book with code

### Practice Platforms

- [Kaggle](https://kaggle.com) - Competitions and datasets
- [LeetCode ML](https://leetcode.com/ml/) - ML coding practice
- [Machine Learning Practice Questions](https://github.com/rfordatascience/tidytuesday) - Real-world datasets

### Video Courses

- [Fast.ai](https://fast.ai) - Practical deep learning
- [CS229 (Stanford)](https://cs229.stanford.edu/) - Machine Learning
- [3Blue1Brown Neural Networks](https://www.3blue1brown.com/topics/neural-networks) - Visual explanations

## See Also

- [LLM Interview Prep](/cheatsheets/llm-interview/)
- [AI System Design Interview Prep](/cheatsheets/ai-system-design-interview/)
- [Behavioral Interview Prep](/cheatsheets/behavioral-interview/)
- [AI Product Interview Prep](/cheatsheets/ai-product-interview/)