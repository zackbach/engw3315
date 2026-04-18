---
layout: default
title: "Writing Portfolio"
author: "Zack Eisbach"
class: "ENGW 3315"
---
<!-- markdownlint-disable MD033 -->

## Introductory Reflection

Coming into ENGW 3315, I was searching for ways to strengthen the writing
skills that are most frequently exercised by academics, with an eye towards a
future career in academia. In particular, I originally wanted to practice
technical writing as well as pedagogical explanations. As the semester
continued, I realized that our online learning community was not necessarily
the most appropriate audience for my technical writings (this seemingly did not
stop me from trying :-P).

Around this time, I was working on a slide deck for a presentation that I was
giving at Northeastern's Software Day, as well as reflecting on some of the
previous talks that I have given. I recognized a common through line—the
presentations of mine that were the best received (covering both educational
and technical information) were those with an abundance of **visualizations**.

This realization came during a point in the semester where some of the
assignments in this class involved creating visual compositions. I was
inspired to pursue additional writings with visual components, and (in
hindsight) found this through line recurring in some of my favorite writings of
the semester.

The selective portfolio below showcases my evolving use of visuals across my
compositions throughout the semester. I have decided to organize my portfolio
as a website to easily embed various types of media, as well as include a new
data visualization recapping my experience interacting with the course (and our
online learning community as a whole). Along the way, I will use these visual
compositions to reflect on my broad experience with the course.

---

## Highlighting Extra

Maybe the extra or something?

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
<canvas id="timeChart"></canvas>

<script>
(async function() {
  const res = await fetch('assets/filtered.csv');
  const text = await res.text();

  const daily = {};
  const weekly = {};

  text.trim().split('\n').forEach(line => {
    const cols = line.split(',');
    const date = cols[7].trim();
    const [h, m, s] = cols[11].trim().split(':').map(Number);
    const hours = h + m / 60 + s / 3600;

    daily[date] = (daily[date] || 0) + hours;

    const dt = new Date(date + 'T00:00:00');
    const day = dt.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(dt);
    monday.setDate(dt.getDate() + mondayOffset);
    const weekKey = monday.toISOString().slice(0, 10);
    weekly[weekKey] = (weekly[weekKey] || 0) + hours;
  });

  function formatLabel(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[m - 1] + ' ' + d;
  }

  // Fill in every day between first and last date
  const dates = Object.keys(daily).sort();
  const start = new Date(dates[0] + 'T00:00:00');
  const end = new Date(dates[dates.length - 1] + 'T00:00:00');
  const allDays = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    allDays.push([key, daily[key] || 0]);
  }

  const weeklyData = Object.entries(weekly).sort();

  const datasets = {
    weekly: {
      labels: weeklyData.map(([d]) => 'Wk of ' + formatLabel(d)),
      values: weeklyData.map(([, v]) => Math.round(v * 10) / 10),
    },
    daily: {
      labels: allDays.map(([d]) => formatLabel(d)),
      values: allDays.map(([, v]) => Math.round(v * 10) / 10),
      colors: allDays.map(([, v]) => v > 0 ? 'rgba(74, 111, 165, 0.7)' : 'rgba(74, 111, 165, 0.15)'),
      borders: allDays.map(([, v]) => v > 0 ? 'rgba(74, 111, 165, 1)' : 'rgba(74, 111, 165, 0.3)'),
    },
  };

  const ctx = document.getElementById('timeChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: datasets.weekly.labels,
      datasets: [{
        label: 'Hours',
        data: datasets.weekly.values,
        backgroundColor: 'rgba(74, 111, 165, 0.7)',
        borderColor: 'rgba(74, 111, 165, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const hrs = ctx.parsed.y;
              const mins = Math.round(hrs * 60);
              return hrs >= 1 ? hrs.toFixed(1) + ' hrs (' + mins + ' min)' : mins + ' min';
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Hours' },
        },
      },
    },
  });

  const canvas = document.getElementById('timeChart');
  canvas.style.transition = 'opacity 0.15s';

  window.setView = function(view) {
    canvas.style.opacity = 0;
    setTimeout(() => {
      chart.data.labels = datasets[view].labels;
      chart.data.datasets[0].data = datasets[view].values;
      if (view === 'daily') {
        chart.data.datasets[0].backgroundColor = datasets.daily.colors;
        chart.data.datasets[0].borderColor = datasets.daily.borders;
      } else {
        chart.data.datasets[0].backgroundColor = 'rgba(74, 111, 165, 0.7)';
        chart.data.datasets[0].borderColor = 'rgba(74, 111, 165, 1)';
      }
      chart.update('none');
      canvas.style.opacity = 1;
    }, 150);
    document.getElementById('btn-weekly').classList.toggle('active', view === 'weekly');
    document.getElementById('btn-daily').classList.toggle('active', view === 'daily');
  };
})();
</script>

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
