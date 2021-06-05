---
layout: post
title: Alternative proof of the Spectral Theorem in dimension 2
tags: maths teaching
---


Back in december,
while I was preparing my pupils for Oxbridge interviews,
I wondered whether it would be possible to make them prove
that symmetric $$2 \times 2$$ matrices are diagonalizable.
I found a rather elegant proof that I'm sharing below.

## The proof

**Theorem**.
Let $$A$$ be a $$2 \times 2$$ symmetric matrix.
Then $$A$$ has two eigenvectors
which can be chosen to be orthogonal.

**Proof**.
Let $$x(t) = (\cos t, \sin  t)$$
and consider the associated [Railey quotient](https://en.wikipedia.org/wiki/Rayleigh_quotient)

$$f(t) = x(t) \cdot A x(t).$$

By periodicity and the [extreme value theorem](https://en.wikipedia.org/wiki/Extreme_value_theorem),
$$f$$ has at least one stationary point $$t$$.
At such a point, using the symmetry of $$A$$ yields

$$0 = 2 x'(t) \cdot A x(t).$$

In particular,
$$Ax(t)$$ is perpendicular to $$x'(t)$$,
which is itself perpendicular to $$x(t)$$.
Therefore, $$A x(t)$$ and $$x(t)$$ are parallel,
or in other words, $$x(t)$$ is an eigenvector.

Now let $$s = t + \frac \pi 2$$.
Observe that $$x(s) = x'(t)$$ and $$x'(s) = -x(t)$$,
which yields

$$
f'(s) = 2 x'(s) \cdot A x(s)
= -2 x(t) \cdot A x'(t)
= - f'(t).
$$

In particular, $$s$$ is also a stationary point
and thus by the above, $$x(s)$$ is an eigenvector.
The orthogonality of $$x(t)$$ and $$x(s)$$ follows from the definition of $$s$$.

## As an Oxbridge mock interview question

It is clear that the argument above requires familiarity with symmetric matrices
and multivariable calculus.
These can be bypassed by requiring
that the students perform **explicit calculations**.

In particular, if

$$A = \begin{pmatrix}a & b \\ b & c\end{pmatrix},
\quad Ax(t) = \begin{pmatrix}a \cos t + b \sin t\\ b \cos t + c \sin t\end{pmatrix}$$

$$f$$ takes the following expression

$$f(t) = a \cos^2 t + 2 b \sin t \cos t + c \sin^2 t.$$

The stationary point equation is:

$$0 = -2 a \cos t \sin t + 2 b \cos^2 t - 2 b \sin^2 t + 2 c \sin t \cos t$$

Dividing both sides by $$2$$ and moving the negative terms to the left yields

$$(a \cos t + b \sin t) \sin t = (b \cos t + c \sin t) \cos t,$$

which can be reorganized as follows:

$$\frac {\sin t} {\cos t} = \frac {b \cos t + c \sin t} {a \cos t + b \sin t}.$$

Recognizing the coordinates of $$A x(t)$$ on the right-hand side,
we deduce that the coordinates of $$x(t)$$ and $$A x(t)$$ are in the same ratio,
and both vectors are parallel.
