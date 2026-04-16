---
layout: default
title: "Writing Portfolio"
author: "Zack Eisbach"
class: "ENGW 3315"
---
<!-- markdownlint-disable MD033 -->

## Intro / reflection

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur.

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

  const dailyData = Object.entries(daily).sort();
  const weeklyData = Object.entries(weekly).sort();

  const datasets = {
    weekly: {
      labels: weeklyData.map(([d]) => 'Wk of ' + formatLabel(d)),
      values: weeklyData.map(([, v]) => Math.round(v * 10) / 10),
    },
    daily: {
      labels: dailyData.map(([d]) => formatLabel(d)),
      values: dailyData.map(([, v]) => Math.round(v * 10) / 10),
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
