---
title: Quantitative Methods
description: Linear regression in depth — OLS derivation, Gauss-Markov assumptions, diagnostics, regularisation, extensions — plus time series, factor models, PCA, and the statistical testing framework used in quantitative analytics.
sidebar:
  order: 7
lastUpdated: 2026-05-18
tags:
  - deep-dive
  - statistics
  - quantitative
  - regression
  - time-series
  - finance
tldr:
  - OLS finds the coefficient vector that minimises the sum of squared residuals; the closed-form solution is β = (XᵀX)⁻¹Xᵀy.
  - The Gauss-Markov theorem guarantees OLS is the Best Linear Unbiased Estimator (BLUE) — but only when its five assumptions hold.
  - Violations (heteroscedasticity, autocorrelation, multicollinearity) have specific diagnostics and specific fixes — don't guess.
  - Ridge and Lasso add regularisation to handle multicollinearity and variable selection; quantile regression handles non-normal error distributions.
  - Time series requires stationarity before modelling — the ARIMA family handles autocorrelated residuals that OLS ignores.
  - Factor models (PCA, Fama-French) decompose returns into systematic and idiosyncratic components.
seeAlso:
  - label: Interview Prep — Quantitative Analytics
    href: /learn/interview-prep-quant-banking
    description: Interview questions for quant roles
  - label: Neural Networks
    href: /deep-dive/neural-networks
    description: How ML extends classical statistical models
---

## The Core Idea

Linear regression models the relationship between a response variable $y$ and one or more predictors $\mathbf{x}$ as a linear function, then estimates that function from data by minimising prediction error. It is the workhorse of quantitative analytics — directly useful for modelling returns, risk factors, and economic relationships, and the conceptual foundation for nearly every more complex method.

---

## Part 1: Ordinary Least Squares (OLS)

### The Model

The population regression model assumes:

$$
y_i = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \cdots + \beta_k x_{ik} + \varepsilon_i
$$

In matrix form with $n$ observations and $k$ predictors:

$$
\mathbf{y} = X\boldsymbol{\beta} + \boldsymbol{\varepsilon}
$$

Where:
- $\mathbf{y} \in \mathbb{R}^n$ — response vector
- $X \in \mathbb{R}^{n \times (k+1)}$ — design matrix (first column is a vector of ones for the intercept)
- $\boldsymbol{\beta} \in \mathbb{R}^{k+1}$ — coefficient vector (what we estimate)
- $\boldsymbol{\varepsilon} \in \mathbb{R}^n$ — error vector (unobservable)

### OLS Derivation

OLS minimises the residual sum of squares:

$$
\text{RSS}(\boldsymbol{\beta}) = \sum_{i=1}^n (y_i - \mathbf{x}_i^\top \boldsymbol{\beta})^2 = (\mathbf{y} - X\boldsymbol{\beta})^\top(\mathbf{y} - X\boldsymbol{\beta})
$$

Taking the derivative with respect to $\boldsymbol{\beta}$ and setting it to zero:

$$
\frac{\partial \text{RSS}}{\partial \boldsymbol{\beta}} = -2X^\top(\mathbf{y} - X\boldsymbol{\beta}) = 0
$$

This gives the **normal equations**: $X^\top X \boldsymbol{\beta} = X^\top \mathbf{y}$

Solving (when $X^\top X$ is invertible):

$$
\boxed{\hat{\boldsymbol{\beta}} = (X^\top X)^{-1} X^\top \mathbf{y}}
$$

This is the OLS estimator. It has a closed-form solution — no iteration required.

**Intuition:** OLS projects $\mathbf{y}$ orthogonally onto the column space of $X$. The fitted values $\hat{\mathbf{y}} = X\hat{\boldsymbol{\beta}}$ are the point in that column space closest to $\mathbf{y}$ under the Euclidean norm.

### The Gauss-Markov Theorem

Under five assumptions, OLS is the **Best Linear Unbiased Estimator (BLUE)** — it has the smallest variance among all linear unbiased estimators.

| Assumption | Statement | What breaks it |
|---|---|---|
| **L** Linearity | $y = X\beta + \varepsilon$ is correctly specified | Omitted variables, wrong functional form |
| **I** Independence | Observations are independent | Time series autocorrelation, clustered data |
| **H** Homoscedasticity | $\text{Var}(\varepsilon_i) = \sigma^2$ (constant) | Volatility clustering in financial returns |
| **N** Normality | $\varepsilon \sim \mathcal{N}(0, \sigma^2 I)$ | Fat tails, outliers (needed for exact inference, not BLUE) |
| **E** Exogeneity | $\mathbb{E}[\varepsilon | X] = 0$ | Endogeneity, reverse causality, omitted variable bias |

When these hold, $\hat{\boldsymbol{\beta}}$ is unbiased ($\mathbb{E}[\hat{\boldsymbol{\beta}}] = \boldsymbol{\beta}$) and efficient.

---

## Part 2: Inference and Model Evaluation

### Coefficient Standard Errors

The variance-covariance matrix of $\hat{\boldsymbol{\beta}}$ under homoscedasticity:

$$
\text{Var}(\hat{\boldsymbol{\beta}}) = \sigma^2 (X^\top X)^{-1}
$$

Since $\sigma^2$ is unknown, replace it with the unbiased estimator:

$$
\hat{\sigma}^2 = \frac{\text{RSS}}{n - k - 1} = \frac{\sum_i \hat{\varepsilon}_i^2}{n-k-1}
$$

The standard error of $\hat{\beta}_j$ is $\text{SE}(\hat{\beta}_j) = \hat{\sigma} \sqrt{[(X^\top X)^{-1}]_{jj}}$

### Hypothesis Testing

**t-test for individual coefficients:**

$$
t_j = \frac{\hat{\beta}_j}{\text{SE}(\hat{\beta}_j)} \sim t_{n-k-1} \quad \text{under } H_0: \beta_j = 0
$$

**F-test for joint significance:**

$$
F = \frac{(\text{RSS}_\text{restricted} - \text{RSS}_\text{unrestricted})/q}{\text{RSS}_\text{unrestricted}/(n-k-1)} \sim F_{q,\, n-k-1}
$$

Where $q$ is the number of restrictions. Tests whether a group of coefficients are jointly zero.

### Goodness of Fit

**R² (coefficient of determination):**

$$
R^2 = 1 - \frac{\text{RSS}}{\text{TSS}} = 1 - \frac{\sum_i \hat{\varepsilon}_i^2}{\sum_i (y_i - \bar{y})^2}
$$

R² measures the fraction of total variance in $y$ explained by the model. It never decreases when you add predictors — regardless of whether they're useful.

**Adjusted R²** penalises for adding irrelevant predictors:

$$
\bar{R}^2 = 1 - \frac{(1-R^2)(n-1)}{n-k-1}
$$

**AIC and BIC** — information criteria for model selection:

$$
\text{AIC} = 2k - 2\ln(\hat{L}), \quad \text{BIC} = k\ln(n) - 2\ln(\hat{L})
$$

Lower is better. BIC penalises complexity more heavily than AIC and tends to select simpler models.

### Confidence Intervals

A 95% confidence interval for $\beta_j$:

$$
\hat{\beta}_j \pm t_{n-k-1,\, 0.025} \cdot \text{SE}(\hat{\beta}_j)
$$

**Interpretation:** If you repeated the experiment many times and computed this interval each time, 95% of intervals would contain the true $\beta_j$. It is NOT "95% probability that the true parameter is in this interval" (that's the Bayesian credible interval).

---

## Part 3: Regression Diagnostics

Diagnostics test whether the Gauss-Markov assumptions hold. Violating them doesn't always invalidate the regression — but it changes what you can conclude.

### Residual Analysis

Always start with residual plots:
- **Residuals vs. fitted values** — should be random scatter. Patterns indicate heteroscedasticity or non-linearity.
- **Q-Q plot** — residuals vs. theoretical normal quantiles. Deviations at tails indicate non-normality (common in financial data).
- **Scale-location plot** — $\sqrt{|\hat{\varepsilon}_i|}$ vs. fitted values. Increasing spread = heteroscedasticity.
- **Residuals vs. time** — for time-ordered data. Patterns indicate autocorrelation.

### Heteroscedasticity

When $\text{Var}(\varepsilon_i) = \sigma_i^2$ varies across observations, OLS is still unbiased but no longer efficient. Standard errors are wrong — t-tests and confidence intervals are invalid.

**Detection:**
- **Breusch-Pagan test** — regress squared residuals on the predictors. Significant F-stat = heteroscedasticity.
- **White test** — more general, includes squared terms and cross-products.

**Fixes:**
- **Heteroscedasticity-consistent (HC) standard errors** (White standard errors) — correct the standard errors without changing $\hat{\boldsymbol{\beta}}$.
- **Weighted Least Squares (WLS)** — weight observations by the inverse of their error variance when the variance structure is known.
- **Generalised Least Squares (GLS)** — the general fix when the error covariance structure $\Sigma$ is known: $\hat{\boldsymbol{\beta}}_\text{GLS} = (X^\top \Sigma^{-1} X)^{-1} X^\top \Sigma^{-1} \mathbf{y}$

### Autocorrelation

When errors are correlated across time ($\text{Cov}(\varepsilon_t, \varepsilon_{t-s}) \neq 0$), OLS standard errors are too small — you over-reject the null.

**Detection:**
- **Durbin-Watson statistic** — tests for first-order autocorrelation. DW ≈ 2 means no autocorrelation; DW < 2 means positive autocorrelation (very common in financial time series).
- **Ljung-Box Q-test** — tests for autocorrelation at multiple lags simultaneously.
- **ACF/PACF plots** of residuals — visual inspection of autocorrelation structure.

**Fixes:**
- Newey-West standard errors (HAC — heteroscedasticity and autocorrelation consistent)
- Explicitly model the autocorrelation structure (ARIMA residuals)
- Include lagged dependent variable as a predictor (Cochrane-Orcutt)

### Multicollinearity

When predictors are highly correlated, $(X^\top X)^{-1}$ becomes unstable. Coefficients have large standard errors and wrong signs — individual coefficients can't be trusted even when the overall fit is good.

**Detection:**
- **Variance Inflation Factor (VIF):** $\text{VIF}_j = \frac{1}{1 - R_j^2}$ where $R_j^2$ is the R² from regressing $x_j$ on all other predictors. VIF > 10 (or > 5 conservatively) indicates a problem.
- **Condition number** of $X^\top X$ — above 30 indicates moderate, above 100 indicates severe multicollinearity.
- **Correlation matrix** — pairwise correlations above 0.8 are a warning sign.

**Fixes:** Ridge regression (shrinks coefficients), PCA regression (transforms to orthogonal predictors), removing one of the collinear variables.

### Influential Observations

**Leverage** measures how far an observation's $x$-values are from the mean. High-leverage points have outsized influence on the regression line regardless of their $y$-value.

$$
h_{ii} = [X(X^\top X)^{-1}X^\top]_{ii}
$$

**Cook's Distance** combines leverage and residual size into a single influence measure:

$$
D_i = \frac{\hat{\varepsilon}_i^2}{(k+1)\hat{\sigma}^2} \cdot \frac{h_{ii}}{(1-h_{ii})^2}
$$

$D_i > 1$ is a common threshold for "influential." Examine these observations: data errors, legitimate outliers, or regime changes.

---

## Part 4: Regularised Regression

When predictors are numerous or collinear, OLS over-fits. Regularisation adds a penalty term to the loss function, shrinking coefficients toward zero.

### Ridge Regression (L2)

$$
\hat{\boldsymbol{\beta}}_\text{ridge} = \arg\min_{\boldsymbol{\beta}} \left\{ \sum_i (y_i - \mathbf{x}_i^\top \boldsymbol{\beta})^2 + \lambda \sum_j \beta_j^2 \right\}
$$

Closed-form solution:

$$
\hat{\boldsymbol{\beta}}_\text{ridge} = (X^\top X + \lambda I)^{-1} X^\top \mathbf{y}
$$

Adding $\lambda I$ makes the matrix invertible even under perfect multicollinearity. Ridge shrinks all coefficients toward zero but never exactly to zero — it does not perform variable selection. Choose $\lambda$ via cross-validation.

### Lasso Regression (L1)

$$
\hat{\boldsymbol{\beta}}_\text{lasso} = \arg\min_{\boldsymbol{\beta}} \left\{ \sum_i (y_i - \mathbf{x}_i^\top \boldsymbol{\beta})^2 + \lambda \sum_j |\beta_j| \right\}
$$

The L1 penalty produces **sparse solutions** — it drives some coefficients exactly to zero. Lasso does automatic variable selection. No closed-form solution (solved with coordinate descent or LARS algorithm).

### Elastic Net

Combines L1 and L2:

$$
\hat{\boldsymbol{\beta}}_\text{enet} = \arg\min_{\boldsymbol{\beta}} \left\{ \text{RSS} + \lambda_1 \sum_j |\beta_j| + \lambda_2 \sum_j \beta_j^2 \right\}
$$

Useful when predictors number in the thousands (genomics, factor zoo in finance) — Lasso tends to select only one variable from a correlated group; Elastic Net can include all of them with reduced coefficients.

| Method | Penalty | Selects variables? | Handles multicollinearity? |
|---|---|---|---|
| OLS | None | No | No |
| Ridge | $\lambda \|\boldsymbol{\beta}\|_2^2$ | No | Yes |
| Lasso | $\lambda \|\boldsymbol{\beta}\|_1$ | Yes | Partially |
| Elastic Net | Both | Yes | Yes |

### Quantile Regression

Standard OLS estimates the **conditional mean** of $y$ given $X$. Quantile regression estimates any conditional quantile — the median, the 5th percentile, the 95th percentile.

Minimises the asymmetric loss function (pinball loss):

$$
\hat{\boldsymbol{\beta}}_\tau = \arg\min_{\boldsymbol{\beta}} \sum_i \rho_\tau(y_i - \mathbf{x}_i^\top \boldsymbol{\beta})
$$

Where $\rho_\tau(u) = u(\tau - \mathbf{1}[u < 0])$ and $\tau \in (0,1)$ is the quantile.

**Why it matters in finance:** Asset returns have fat tails. OLS ignores tail behaviour. Quantile regression at $\tau = 0.05$ directly models Value-at-Risk; at $\tau = 0.95$ models upside potential. No normality assumption required.

---

## Part 5: Panel Data and Fixed Effects

Panel data has both a cross-sectional dimension ($i$, e.g., stocks) and a time dimension ($t$). Standard OLS ignores the panel structure.

The panel model:

$$
y_{it} = \mathbf{x}_{it}^\top \boldsymbol{\beta} + \alpha_i + \varepsilon_{it}
$$

Where $\alpha_i$ is an **individual fixed effect** — a time-invariant, unit-specific unobservable (e.g., a company's management quality).

### Fixed Effects (Within) Estimator

Demean each variable within its unit:

$$
\tilde{y}_{it} = y_{it} - \bar{y}_i, \quad \tilde{\mathbf{x}}_{it} = \mathbf{x}_{it} - \bar{\mathbf{x}}_i
$$

Then regress $\tilde{y}$ on $\tilde{\mathbf{x}}$. This eliminates $\alpha_i$ entirely — fixed effects are controlled for regardless of whether they're correlated with $\mathbf{x}_{it}$ (no endogeneity from time-invariant confounders).

### Random Effects

Assumes $\alpha_i \sim \mathcal{N}(0, \sigma_\alpha^2)$ and $\text{Cov}(\alpha_i, \mathbf{x}_{it}) = 0$. More efficient than fixed effects when the assumption holds, but biased when it doesn't.

**Hausman test** — tests whether random effects is consistent (i.e., whether $\alpha_i$ is uncorrelated with $\mathbf{x}_{it}$). Significant → use fixed effects. Not significant → random effects is valid and more efficient.

---

## Part 6: Time Series

OLS assumes independent observations. Financial time series violates this — returns and prices are autocorrelated. Time series methods model the temporal dependence explicitly.

### Stationarity

A time series $\{y_t\}$ is **weakly stationary** if:
- $\mathbb{E}[y_t] = \mu$ (constant mean)
- $\text{Var}(y_t) = \sigma^2$ (constant variance)
- $\text{Cov}(y_t, y_{t-s})$ depends only on $s$, not on $t$

Non-stationary series (trending prices, unit root processes) produce **spurious regressions** — high R² and significant t-stats between unrelated variables.

**Testing for stationarity:**
- **ADF (Augmented Dickey-Fuller) test** — $H_0$: unit root (non-stationary). Reject = stationary.
- **KPSS test** — $H_0$: stationary. Reject = non-stationary.
- Run both: if ADF rejects and KPSS doesn't reject, strong evidence of stationarity.

**Transformations to achieve stationarity:**
- First-difference: $\Delta y_t = y_t - y_{t-1}$ (removes trend)
- Log transformation: stabilises variance
- Log-difference: $\ln(y_t/y_{t-1})$ — log returns in finance, typically stationary

### ACF and PACF

**Autocorrelation function (ACF):** $\rho(s) = \text{Corr}(y_t, y_{t-s})$ — correlation between the series and its $s$-period lag. Decays slowly for AR processes, cuts off sharply for MA processes.

**Partial autocorrelation function (PACF):** correlation between $y_t$ and $y_{t-s}$ after removing the effects of $y_{t-1}, \ldots, y_{t-s+1}$. Cuts off sharply for AR processes, decays slowly for MA.

Use ACF/PACF plots to identify model order before fitting ARIMA.

### ARIMA

**AR(p) — Autoregressive:**

$$
y_t = c + \phi_1 y_{t-1} + \phi_2 y_{t-2} + \cdots + \phi_p y_{t-p} + \varepsilon_t
$$

Current value is a linear function of $p$ past values. ACF decays geometrically; PACF cuts off at lag $p$.

**MA(q) — Moving Average:**

$$
y_t = \mu + \varepsilon_t + \theta_1 \varepsilon_{t-1} + \cdots + \theta_q \varepsilon_{t-q}
$$

Current value is a linear combination of $q$ past shocks. ACF cuts off at lag $q$; PACF decays geometrically.

**ARIMA(p, d, q):** Apply AR($p$) and MA($q$) to the $d$-times differenced series. $d=1$ handles a linear trend; $d=2$ handles a quadratic trend.

**Model selection:**
1. Plot series → identify obvious non-stationarity
2. Difference until stationary (confirm with ADF)
3. ACF/PACF to identify $p$ and $q$
4. Fit candidates, compare AIC/BIC
5. Diagnose residuals (should be white noise — no significant ACF)

### GARCH (Volatility Modelling)

Financial return series exhibit **volatility clustering** — large moves follow large moves. ARIMA models the conditional mean; GARCH models the conditional variance.

**GARCH(1,1):**

$$
\sigma_t^2 = \omega + \alpha \varepsilon_{t-1}^2 + \beta \sigma_{t-1}^2
$$

Where $\sigma_t^2$ is today's variance, $\varepsilon_{t-1}^2$ is yesterday's squared shock (ARCH term), and $\sigma_{t-1}^2$ is yesterday's variance (GARCH term). Stationarity requires $\alpha + \beta < 1$.

GARCH is the standard model for VaR, option pricing (implied vol dynamics), and risk management.

### VAR (Vector Autoregression)

Extends AR to multiple time series, each equation regressing on lags of all variables:

$$
\mathbf{y}_t = \mathbf{c} + A_1 \mathbf{y}_{t-1} + A_2 \mathbf{y}_{t-2} + \cdots + A_p \mathbf{y}_{t-p} + \boldsymbol{\varepsilon}_t
$$

Useful for modelling interdependencies between variables (e.g., macro factors). Key tools:
- **Granger causality** — does $x$ help predict $y$ beyond $y$'s own history?
- **Impulse response functions (IRF)** — trace the effect of a shock in one variable through the system over time
- **Forecast error variance decomposition (FEVD)** — what fraction of variable $i$'s forecast error variance is attributable to shocks from variable $j$?

### Cointegration

Two non-stationary series $y_t$ and $x_t$ are **cointegrated** if there exists a linear combination $y_t - \gamma x_t$ that is stationary — they share a common stochastic trend and move together in the long run.

**Engle-Granger test:** Regress $y_t$ on $x_t$; test residuals for stationarity. If stationary, the series are cointegrated with cointegrating vector $(1, -\hat{\gamma})$.

**Error Correction Model (ECM):** When series are cointegrated, model short-run dynamics and long-run equilibrium together:

$$
\Delta y_t = \alpha_0 + \alpha_1 (y_{t-1} - \gamma x_{t-1}) + \beta \Delta x_{t-1} + \varepsilon_t
$$

The term $(y_{t-1} - \gamma x_{t-1})$ is the **error correction term** — it measures how far the system deviated from long-run equilibrium last period, and $\alpha_1$ determines the speed of mean reversion back.

Applications: pairs trading (equity or fixed income), purchasing power parity, yield curve dynamics.

---

## Part 7: Principal Component Analysis (PCA)

PCA finds directions of maximum variance in high-dimensional data. It's used for dimensionality reduction, factor construction, and dealing with multicollinearity.

### The Math

Given a centred data matrix $X \in \mathbb{R}^{n \times p}$ (zero mean columns), compute the sample covariance matrix:

$$
S = \frac{1}{n-1} X^\top X
$$

Decompose via eigendecomposition:

$$
S = V \Lambda V^\top
$$

Where $V$ contains eigenvectors (principal components) and $\Lambda = \text{diag}(\lambda_1, \ldots, \lambda_p)$ contains eigenvalues in decreasing order. Equivalently, via SVD of $X$: $X = U D V^\top$.

Project onto the first $k$ components:

$$
Z = X V_k \in \mathbb{R}^{n \times k}
$$

The fraction of variance explained by the first $k$ components is $\sum_{i=1}^k \lambda_i / \sum_{i=1}^p \lambda_i$.

### Interpretation in Finance

The first principal component of a set of stock returns often approximates the market factor. The second and third components often capture sector or style effects. PCA on the yield curve typically extracts:
- **PC1** — level (parallel shift, ~90% of variance)
- **PC2** — slope (short vs. long rates)
- **PC3** — curvature (butterfly)

### PCA Regression

When predictors are collinear, regress on the first $k$ principal components instead of the original variables. Eliminates multicollinearity by construction (PCs are orthogonal). Trade-off: PCs may lack intuitive interpretation.

---

## Part 8: Factor Models

Factor models decompose returns into systematic and idiosyncratic components:

$$
r_i = \alpha_i + \beta_{i1} F_1 + \beta_{i2} F_2 + \cdots + \beta_{ik} F_k + \varepsilon_i
$$

Where $F_j$ are common factors, $\beta_{ij}$ are factor loadings, and $\varepsilon_i$ is idiosyncratic risk.

### CAPM (Single Factor)

$$
r_i - r_f = \alpha_i + \beta_i (r_m - r_f) + \varepsilon_i
$$

$\beta_i$ measures systematic (market) risk. $\alpha_i$ is Jensen's alpha — excess return above what CAPM predicts. Estimated by OLS regression of excess returns on excess market returns.

### Fama-French Three-Factor Model

$$
r_i - r_f = \alpha_i + \beta_1 \text{MKT} + \beta_2 \text{SMB} + \beta_3 \text{HML} + \varepsilon_i
$$

Where SMB (Small Minus Big) captures the size premium and HML (High Minus Low) captures the value premium. The Carhart four-factor model adds MOM (momentum). Fama-French five-factor adds RMW (profitability) and CMA (investment).

### Barra-Style Risk Models

Multi-factor risk models used by risk management:
- **Style factors**: value, momentum, quality, size, low volatility
- **Industry factors**: GICS sector exposures
- **Country/currency factors**: for global portfolios

The factor return covariance matrix $\Sigma$ decomposes portfolio risk:

$$
\text{Var}(\mathbf{r}_p) = \mathbf{w}^\top \Sigma \mathbf{w} = \mathbf{w}^\top (B \Sigma_F B^\top + D) \mathbf{w}
$$

Where $B$ is the factor exposure matrix, $\Sigma_F$ is the factor covariance matrix, and $D$ is the diagonal idiosyncratic variance matrix.

---

## Part 9: Statistical Testing Framework

### Hypothesis Testing

1. State $H_0$ (null) and $H_1$ (alternative)
2. Choose a test statistic and its null distribution
3. Compute the p-value: probability of observing a test statistic at least as extreme as the one computed, given $H_0$ is true
4. Compare p-value to significance level $\alpha$ (typically 0.05)

**Type I error** (false positive): Rejecting $H_0$ when it is true. Probability = $\alpha$.
**Type II error** (false negative): Failing to reject $H_0$ when it is false. Probability = $\beta$.
**Power** = $1 - \beta$: probability of correctly rejecting a false null.

**The p-value is not** the probability that $H_0$ is true. It is the probability of the data (or more extreme) given $H_0$.

### Multiple Testing

When testing $m$ hypotheses simultaneously, the probability of at least one false positive explodes:

$$
P(\text{at least one false positive}) = 1 - (1-\alpha)^m
$$

For $m=20$ tests at $\alpha=0.05$: $1 - 0.95^{20} \approx 64\%$ chance of a false positive.

**Bonferroni correction** — divide $\alpha$ by $m$: test each hypothesis at $\alpha/m$. Conservative (controls family-wise error rate).

**Benjamini-Hochberg (FDR)** — controls the **false discovery rate** (expected proportion of false positives among rejections). Less conservative than Bonferroni; preferred when testing many hypotheses:
1. Order p-values: $p_{(1)} \leq p_{(2)} \leq \cdots \leq p_{(m)}$
2. Find the largest $k$ such that $p_{(k)} \leq \frac{k}{m} \alpha$
3. Reject all hypotheses with $p \leq p_{(k)}$

In finance this matters enormously — Harvey, Liu & Zhu (2016) showed most published factor discoveries fail to survive multiple testing corrections.

### Key Tests Reference

| Test | Null hypothesis | Use when |
|---|---|---|
| **t-test (one sample)** | $\mu = \mu_0$ | Testing if mean return differs from zero |
| **t-test (two sample)** | $\mu_1 = \mu_2$ | Comparing means of two groups |
| **F-test** | $\beta_{j} = \cdots = \beta_k = 0$ | Joint significance of predictors |
| **Jarque-Bera** | Normality ($\text{skew}=0$, $\text{kurt}=3$) | Testing normality of returns |
| **Breusch-Pagan** | Homoscedasticity | Testing for heteroscedasticity |
| **Durbin-Watson** | No first-order autocorrelation | Time series residual checking |
| **Ljung-Box** | No autocorrelation up to lag $h$ | Residual diagnostics |
| **ADF** | Unit root (non-stationary) | Pre-testing time series |
| **KPSS** | Stationarity | Pre-testing time series |
| **Hausman** | RE consistent ($\alpha_i \perp X$) | Fixed vs. random effects choice |
| **Granger causality** | $x$ does not Granger-cause $y$ | VAR causal inference |
| **Chow test** | No structural break | Testing regime changes |

---

## Common Pitfalls

| Pitfall | What happens | Fix |
|---|---|---|
| Omitted variable bias | $\hat{\boldsymbol{\beta}}$ is biased and inconsistent | Add the variable; use IV or FE |
| Spurious regression | Fake significance between unrelated non-stationary series | Test stationarity; difference or use ECM |
| Look-ahead bias | Future data leaks into predictors | Align data carefully; use lagged values |
| P-hacking | Testing many models, reporting the best | Pre-register hypothesis; correct for multiple testing |
| Overfitting | Model fits in-sample noise | Cross-validate; use regularisation; hold-out test set |
| Ignoring autocorrelation | Standard errors too small; over-rejection | Use HAC standard errors or model residuals |
| Reverse causality | Causal direction is ambiguous | Instrumental variables; Granger causality |
