(async function () {
  const [csvText, canvasText] = await Promise.all([
    fetch('assets/filtered.csv').then((r) => r.text()),
    fetch('assets/canvas').then((r) => r.text()),
  ]);

  const daily = {};
  const weekly = {};

  function weekKeyFor(dateKey) {
    const dt = new Date(dateKey + 'T00:00:00');
    const day = dt.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(dt);
    monday.setDate(dt.getDate() + mondayOffset);
    return monday.toISOString().slice(0, 10);
  }

  csvText.trim().split('\n').forEach((line) => {
    const cols = line.split(',');
    const date = cols[7].trim();
    const [h, m, s] = cols[11].trim().split(':').map(Number);
    const hours = h + m / 60 + s / 3600;
    daily[date] = (daily[date] || 0) + hours;
    const wk = weekKeyFor(date);
    weekly[wk] = (weekly[wk] || 0) + hours;
  });

  const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  const postsDaily = {};
  const postsWeekly = {};
  const detailDaily = {};
  const detailWeekly = {};

  function bumpPost(bucket, key, type) {
    if (!bucket[key]) bucket[key] = { post: 0, comment: 0, extra: 0 };
    bucket[key][type]++;
  }

  function bumpDetail(bucket, key, type, assignment) {
    if (!bucket[key]) bucket[key] = { post: {}, comment: {}, extra: {} };
    bucket[key][type][assignment] = (bucket[key][type][assignment] || 0) + 1;
  }

  const lines = canvasText.split('\n').map((l) => l.trim());
  let currentAssignment = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    if (line.startsWith('#')) {
      currentAssignment = line.replace(/^#+\s*/, '').trim();
      continue;
    }
    const m = line.match(/^([A-Za-z]+)\s+(\d+)\s+(?:at\s+)?\d+:\d+\s*(?:am|pm)$/i);
    if (!m) continue;
    const monIdx = MONTHS[m[1].toLowerCase()];
    if (monIdx === undefined) continue;
    let typeLine = '';
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j]) {
        typeLine = lines[j];
        break;
      }
    }
    const slashIdx = typeLine.indexOf('/');
    const firstRaw = slashIdx === -1 ? typeLine : typeLine.slice(0, slashIdx);
    const first = firstRaw.trim().toLowerCase();
    const type = first === 'post' ? 'post' : first === 'reply' ? 'comment' : first === 'extra' ? 'extra' : null;
    if (!type) continue;
    const dateKey = '2026-' + String(monIdx + 1).padStart(2, '0') + '-' + String(parseInt(m[2], 10)).padStart(2, '0');
    const wkKey = weekKeyFor(dateKey);
    bumpPost(postsDaily, dateKey, type);
    bumpPost(postsWeekly, wkKey, type);
    bumpDetail(detailDaily, dateKey, type, currentAssignment || '(unassigned)');
    bumpDetail(detailWeekly, wkKey, type, currentAssignment || '(unassigned)');
  }

  function formatLabel(dateStr) {
    const parts = dateStr.split('-').map(Number);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[parts[1] - 1] + ' ' + parts[2];
  }

  const allDailyKeys = [...new Set([...Object.keys(daily), ...Object.keys(postsDaily)])].sort();
  const start = new Date(allDailyKeys[0] + 'T00:00:00');
  const end = new Date(allDailyKeys[allDailyKeys.length - 1] + 'T00:00:00');
  const allDays = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    allDays.push(d.toISOString().slice(0, 10));
  }
  const allWeekKeys = [...new Set([...Object.keys(weekly), ...Object.keys(postsWeekly)])].sort();

  const typeVals = (src, keys, t) => keys.map((k) => (src[k] && src[k][t]) || 0);

  const COLORS = {
    hours:   { bg: 'rgba(74, 111, 165, 0.7)',  border: 'rgba(74, 111, 165, 1)'  },
    post:    { bg: 'rgba(45, 134, 89, 0.8)',   border: 'rgba(45, 134, 89, 1)'   },
    comment: { bg: 'rgba(212, 168, 75, 0.85)', border: 'rgba(180, 140, 55, 1)'  },
    extra:   { bg: 'rgba(122, 90, 159, 0.8)',  border: 'rgba(122, 90, 159, 1)'  },
  };

  const datasets = {
    weekly: {
      labels: allWeekKeys.map((d) => 'Wk of ' + formatLabel(d)),
      hours: allWeekKeys.map((k) => Math.round((weekly[k] || 0) * 10) / 10),
      post: typeVals(postsWeekly, allWeekKeys, 'post'),
      comment: typeVals(postsWeekly, allWeekKeys, 'comment'),
      extra: typeVals(postsWeekly, allWeekKeys, 'extra'),
      hoursBg: COLORS.hours.bg,
      hoursBorder: COLORS.hours.border,
    },
    daily: {
      labels: allDays.map(formatLabel),
      hours: allDays.map((k) => Math.round((daily[k] || 0) * 10) / 10),
      post: typeVals(postsDaily, allDays, 'post'),
      comment: typeVals(postsDaily, allDays, 'comment'),
      extra: typeVals(postsDaily, allDays, 'extra'),
      hoursBg: allDays.map((k) => ((daily[k] || 0) > 0 ? COLORS.hours.bg : 'rgba(74, 111, 165, 0.15)')),
      hoursBorder: allDays.map((k) => ((daily[k] || 0) > 0 ? COLORS.hours.border : 'rgba(74, 111, 165, 0.3)')),
    },
  };

  function postDataset(label, key) {
    return {
      label: label,
      data: datasets.weekly[key],
      backgroundColor: COLORS[key].bg,
      borderColor: COLORS[key].border,
      borderWidth: 1,
      yAxisID: 'y2',
      stack: 'posts',
    };
  }

  const ctx = document.getElementById('timeChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: datasets.weekly.labels,
      datasets: [
        {
          label: 'Hours',
          data: datasets.weekly.hours,
          backgroundColor: COLORS.hours.bg,
          borderColor: COLORS.hours.border,
          borderWidth: 1,
          yAxisID: 'y',
          stack: 'hours',
        },
        postDataset('Post', 'post'),
        postDataset('Comment', 'comment'),
        postDataset('Extra', 'extra'),
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 8, right: 4, left: 4 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          filter: function (c) {
            if (c.dataset.label === 'Hours') return true;
            return c.parsed.y > 0;
          },
          callbacks: {
            label: function (c) {
              if (c.dataset.label === 'Hours') {
                const hrs = c.parsed.y;
                const mins = Math.round(hrs * 60);
                return 'Hours: ' + (hrs >= 1 ? hrs.toFixed(1) + ' hrs (' + mins + ' min)' : mins + ' min');
              }
              return c.dataset.label + ': ' + c.parsed.y;
            },
            afterLabel: function (c) {
              if (c.dataset.label === 'Hours') return '';
              const type = c.dataset.label.toLowerCase();
              const keys = currentView === 'daily' ? allDays : allWeekKeys;
              const key = keys[c.dataIndex];
              const src = currentView === 'daily' ? detailDaily : detailWeekly;
              const detail = (src[key] && src[key][type]) || {};
              return Object.entries(detail)
                .sort((a, b) => b[1] - a[1])
                .map(([name, n]) => '  ' + n + ' × ' + name);
            },
          },
        },
      },
      scales: {
        y:  { beginAtZero: true, position: 'left',  display: false },
        y2: { beginAtZero: true, max: 10, position: 'right', display: false, ticks: { stepSize: 1, precision: 0 } },
      },
    },
  });

  const canvasEl = document.getElementById('timeChart');
  const inner = document.getElementById('chartInner');
  const leftPin = document.getElementById('leftAxisPin');
  const rightPin = document.getElementById('rightAxisPin');
  canvasEl.style.transition = 'opacity 0.15s';

  const DAILY_PX_PER_GROUP = 42;
  let currentView = 'weekly';
  const LABEL_STYLE = 'position: absolute; transform: translateY(-50%); font-size: 0.7rem; color: #555; white-space: nowrap;';

  function renderAxis(pin, scale, side, title) {
    pin.innerHTML = '';
    if (!scale || !chart.chartArea) return;
    const top = chart.chartArea.top;
    const bottom = chart.chartArea.bottom;

    const line = document.createElement('div');
    line.style.cssText =
      'position: absolute; ' +
      (side === 'left' ? 'right: 0;' : 'left: 0;') +
      ' top: ' + top + 'px; height: ' + (bottom - top) + 'px; ' +
      (side === 'left' ? 'border-right' : 'border-left') + ': 1px solid #bbb;';
    pin.appendChild(line);

    const ticks = scale.ticks || [];
    for (const t of ticks) {
      const y = scale.getPixelForValue(t.value);
      if (y < top - 1 || y > bottom + 1) continue;
      const lbl = document.createElement('div');
      lbl.style.cssText = LABEL_STYLE + (side === 'left' ? ' right: 6px;' : ' left: 6px;');
      lbl.style.top = y + 'px';
      lbl.textContent = t.label != null ? t.label : t.value;
      pin.appendChild(lbl);

      const tick = document.createElement('div');
      tick.style.cssText =
        'position: absolute; ' +
        (side === 'left' ? 'right: 0;' : 'left: 0;') +
        ' width: 4px; height: 1px; background: #bbb;';
      tick.style.top = y + 'px';
      pin.appendChild(tick);
    }

    const titleEl = document.createElement('div');
    const rot = side === 'left' ? '-90deg' : '90deg';
    const edge = side === 'left' ? 'left: 2px;' : 'right: 2px;';
    titleEl.style.cssText =
      'position: absolute; ' + edge +
      ' top: ' + ((top + bottom) / 2) + 'px;' +
      ' transform: translateY(-50%) rotate(' + rot + '); transform-origin: center;' +
      ' font-size: 0.8rem; color: #333;';
    titleEl.textContent = title;
    pin.appendChild(titleEl);
  }

  function renderSideAxes() {
    renderAxis(leftPin, chart.scales.y, 'left', 'Hours');
    renderAxis(rightPin, chart.scales.y2, 'right', 'Posts');
  }

  function applyWidth(view) {
    inner.style.width = '';
    if (view === 'daily') {
      inner.style.flex = '0 0 ' + datasets.daily.labels.length * DAILY_PX_PER_GROUP + 'px';
    } else {
      inner.style.flex = '1 1 0';
    }
  }

  window.setView = function (view) {
    currentView = view;
    canvasEl.style.opacity = 0;
    setTimeout(function () {
      const d = datasets[view];
      applyWidth(view);
      chart.data.labels = d.labels;
      chart.data.datasets[0].data = d.hours;
      chart.data.datasets[0].backgroundColor = d.hoursBg;
      chart.data.datasets[0].borderColor = d.hoursBorder;
      chart.data.datasets[1].data = d.post;
      chart.data.datasets[2].data = d.comment;
      chart.data.datasets[3].data = d.extra;
      chart.resize();
      chart.update('none');
      renderSideAxes();
      canvasEl.style.opacity = 1;
    }, 150);
    document.getElementById('btn-weekly').classList.toggle('active', view === 'weekly');
    document.getElementById('btn-daily').classList.toggle('active', view === 'daily');
  };

  // Initial axis render after Chart.js finishes first layout
  requestAnimationFrame(renderSideAxes);
  window.addEventListener('resize', () => requestAnimationFrame(renderSideAxes));
})();
