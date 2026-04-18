---
layout: default
title: "Reflecting on Visual Compositions"
author: "Zack Eisbach"
class: "ENGW 3315"
---
<!-- markdownlint-disable MD033 -->

## Introduction

Coming into ENGW 3315, I sought to strengthen the writing skills most
frequently exercised by academics, with an eye towards a (potential) future
career in academia. In particular, I hoped to practice both technical writing
and pedagogical explanation. As the semester continued, I realized that our
learning community was not always the most appropriate audience for my highly
technical work (though this didn't always stop me from trying :-P).

To lean into the educational side, I thought back on the various lectures and
presentations I have given during my time at Northeastern. I was able to
recognize a common through line—the talks of mine that were the best received
were (perhaps unsurprisingly) those with an abundance of **visualizations**.

This realization came at a point in the semester where this class's assignments
began calling for visual compositions. I was inspired to pursue additional
writings with visual components, and (in hindsight) found this through line
recurring across many of my favorite pieces from earlier in the semester.

The selective portfolio below showcases my evolving use of visuals throughout
this semester. I have organized it as a website to easily embed various media,
as well as to include a new (interactive!) data visualization recapping my
experience interacting with our online learning community. Along the way, I use
these visual compositions to reflect on my experience with the course as a
whole.

---

## Highlighting Extra

{% capture response1 %}
The majority of mathematics textbooks follow a "<mark
class="green">definition</mark>-<mark class="orange">theorem</mark>-<mark
class="yellow">proof</mark>"
structure, in which chapters consist of (cycles of) the following three phases:

1. <mark class="green">Definition</mark>: a new mathematical object is defined,
   and examples are given.
2. <mark class="orange">Theorem</mark>: a theorem (mathematical proposition)
   about that object is stated.
3. <mark class="yellow">Proof</mark>: the theorem is proved rigorously.

Often, there are many theorems and proofs about some newly defined mathematical
object before moving onto the next definition. Some of these mathematical
propositions are of lesser importance, perhaps only being proved to assist in
another proof; such propositions are called _lemmas_ (technically, lemmata),
rather than _theorems_.

Recently, I have observed parallels between this common structure of
mathematical writing and the structure I impose upon works as I actively read
them. Specifically, I use the following highlighting scheme:

1. Words and sentences highlighted in <mark class="green">green</mark> are
   newly defined words and their corresponding definitions.
2. Sentences highlighted in <mark class="orange">orange</mark> are the primary
   claims that the author makes.
3. Sentences highlighted in <mark class="yellow">yellow</mark> are most common,
   representing key details and examples that support the primary claims.

I have been using this highlighting scheme since high school; it seems that I
have been (subconsciously) reading like a mathematician for many years.

Now that I have drawn this connection, I am trying to consciously take
inspiration from the structure of mathematical writing to improve my
highlighting scheme. Specifically, I notice myself highlighting some minor
claims (lemmas) in <mark class="orange">orange</mark>, but others—those which I
(arbitrarily) deem less important—in <mark class="yellow">default
yellow</mark>. I am trying to use <mark class="purple">purple</mark> to
highlight these equivalents of lemmas, instead of implicitly promoting half of
them to the status of theorems.
{% endcapture %}
{% include canvas-post.html date="Feb 1 10:18pm | Last reply Feb 2 11:12am" body=response1 %}


### Analysis or something

Not sure if I actually want to have a subsection but I'll workshop.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur.

---

## Responses

Two separate responses going in here probably

### Analysis

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur.

---

## Curry-Howard Infographic

![Propositions as Types](assets/prop-as-type.jpg){: .img-small}

![Proofs as Programs](assets/proof-as-prog.jpg)

### More commentary

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur.

---

## Writing timeline

<iframe src="assets/timeline.pdf" width="100%" style="aspect-ratio: 16/9; margin-bottom: 0.25rem;" frameborder="0"></iframe>

<iframe width="75%" height="300px" src="https://www.youtube.com/embed/crq0q88R-Uc" style="display: block; margin: 0 auto;" frameborder="0" allowfullscreen></iframe>

### Commentary

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur.

---

## Data visualization

<div style="text-align: center; margin-bottom: 0.75rem;">
  <button class="chart-toggle active" id="btn-weekly" onclick="setView('weekly')">Weekly</button>
  <button class="chart-toggle" id="btn-daily" onclick="setView('daily')">Daily</button>
</div>
<div id="chartLegend" style="display: flex; justify-content: center; gap: 1rem; font-size: 0.9rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
  <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="width: 14px; height: 14px; display: inline-block; background: rgba(74,111,165,0.7); border: 1px solid rgba(74,111,165,1);"></span>Hours</span>
  <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="width: 14px; height: 14px; display: inline-block; background: rgba(45,134,89,0.8); border: 1px solid rgba(45,134,89,1);"></span>Post</span>
  <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="width: 14px; height: 14px; display: inline-block; background: rgba(212,168,75,0.85); border: 1px solid rgba(180,140,55,1);"></span>Comment</span>
  <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="width: 14px; height: 14px; display: inline-block; background: rgba(122,90,159,0.8); border: 1px solid rgba(122,90,159,1);"></span>Extra</span>
</div>
<div id="chartScroll" style="overflow-x: auto; width: 100%; display: flex; align-items: stretch;">
  <div id="leftAxisPin" style="position: sticky; left: 0; z-index: 3; background: #fafaf8; flex: 0 0 48px; height: 360px;"></div>
  <div id="chartInner" style="position: relative; height: 360px; flex: 1 0 auto; min-width: 0;">
    <canvas id="timeChart"></canvas>
  </div>
  <div id="rightAxisPin" style="position: sticky; right: 0; z-index: 3; background: #fafaf8; flex: 0 0 48px; height: 360px;"></div>
</div>

<script src="assets/chart.js"></script>

### Still not sure about sub-headings

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur.

---

## Conclusion / reflection

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur.
