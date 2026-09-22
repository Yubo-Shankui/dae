// ---- Video cases -----------------------------------------------------------
// These are already side-by-side, labeled comparisons, not separate outputs.
// Encode each filename as a URL segment: the source names contain [] and :.
const COMPARISON_FILES = [
  "Amazement_en-txt_[Energy_Level]:_High.mp4",
  "Amazement_zh-txt_nergy_Level]:_Medium.mp4",
  "Amusement_en-txt_[Energy_Level]:_High.mp4",
  "Anger_zh-txt__[Energy_Level]:_Low.mp4",
  "Anguish_zh_2-txt_[Energy_Level]:_High.mp4",
  "Confusion_en-txt_nergy_Level]:_Medium.mp4",
  "Defensiveness_en_1-txt__[Energy_Level]:_Low.mp4",
  "Denial_en-txt__[Energy_Level]:_Low.mp4",
  "Disappointment_en-txt_nergy_Level]:_Medium.mp4",
  "Disappointment_zh-txt_nergy_Level]:_Medium.mp4",
  "Disbelief_en-txt_nergy_Level]:_Medium.mp4",
  "Elation_zh-txt_nergy_Level]:_Medium.mp4",
  "Explanatory_zh_6-txt_[Energy_Level]:_High.mp4",
  "Fear_zh-txt_[Energy_Level]:_High.mp4",
  "Happiness_en-txt_nergy_Level]:_Medium.mp4",
  "Hurt_zh-txt__[Energy_Level]:_Low.mp4",
  "Rage_en-txt_ar_Status]:_no_tears.mp4",
  "Rage_zh_1-txt_[Energy_Level]:_High.mp4",
  "Regret-en-txt_nergy_Level]:_Medium.mp4",
  "Sadness_en_1-txt_nergy_Level]:_Medium.mp4",
  "Sadness_en_2-txt_nergy_Level]:_Medium.mp4",
  "Sadness_zh-txt_[Energy_Level]:_High.mp4",
  "Shame_zh-txt_nergy_Level]:_Medium.mp4",
  "Surprise_zh_2-txt_[Energy_Level]:_High.mp4",
  "Unease_zh-txt_nergy_Level]:_Medium.mp4",
  "large_en4-txt_[Energy_Level]:_High.mp4",
  "large_en5-txt_nergy_Level]:_Medium.mp4",
  "large_zh5-txt_[Energy_Level]:_High.mp4",
  "large_zh6-txt_[Energy_Level]:_High.mp4",
  "large_zh7-txt_nergy_Level]:_Medium.mp4",
  "large_zh8-txt_nergy_Level]:_Medium.mp4",
  "medium_en_1-txt_nergy_Level]:_Medium.mp4",
  "medium_en_3-txt_nergy_Level]:_Medium.mp4",
  "medium_en_5-txt_nergy_Level]:_Medium.mp4",
  "medium_en_7-txt_nergy_Level]:_Medium.mp4",
  "medium_zh_4-txt_nergy_Level]:_Medium.mp4",
  "medium_zh_8-txt_nergy_Level]:_Medium.mp4",
  "small_en_1-txt_nergy_Level]:_Medium.mp4",
  "small_en_2-txt_nergy_Level]:_Medium.mp4",
  "small_en_4-txt_nergy_Level]:_Medium.mp4",
  "small_en_6-txt_nergy_Level]:_Medium.mp4",
  "small_zh_1-txt_nergy_Level]:_Medium.mp4",
  "small_zh_2-txt_nergy_Level]:_Medium.mp4",
  "small_zh_4-txt_nergy_Level]:_Medium.mp4",
  "small_zh_5-txt_nergy_Level]:_Medium.mp4",
  "small_zh_8-txt_nergy_Level]:_Medium.mp4",
];

const grid = document.getElementById("case-grid");
const languageFilter = document.getElementById("comparison-language");
const moreButton = document.getElementById("comparison-more");
const comparisonCount = document.getElementById("comparison-count");
const batchSize = 6;
let visibleCount = 0;
let filteredFiles = COMPARISON_FILES;

// Avoid continuing playback (especially audio) after scrolling away.
const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) entry.target.pause();
  });
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) grid.querySelectorAll("video").forEach(video => video.pause());
});

function showMoreComparisons() {
  const batch = filteredFiles.slice(visibleCount, visibleCount + batchSize);
  batch.forEach(file => {
    const figure = document.createElement("figure");
    figure.className = "case";
    const sample = file.split("-txt_")[0];
    const title = sample.replace(/[_-]/g, " ");
    const url = "compare/DAE_Baseline_labeled/" + encodeURIComponent(file);
    const video = document.createElement("video");
    video.className = "comparison-video";
    video.setAttribute("aria-label", title + ": DAE left, Baseline right");
    video.muted = true; video.loop = true; video.playsInline = true;
    video.controls = true;
    video.preload = "none";
    video.poster = "assets/comparison-posters/" + encodeURIComponent(file.replace(/\.mp4$/, ".jpg"));
    video.src = url;
    video.addEventListener("play", () => {
      grid.querySelectorAll("video").forEach(other => {
        if (other !== video) other.pause();
      });
    });
    video.addEventListener("error", () => {
      const message = document.createElement("p");
      message.className = "comparison-error";
      message.textContent = "This video could not be loaded. Try the MP4 link below.";
      video.after(message);
    }, { once: true });
    const caption = document.createElement("figcaption");
    caption.className = "comparison-caption";
    const label = document.createElement("span");
    const energy = file.match(/Energy_Level\]:_(Low|Medium|High)/)
      || file.match(/nergy_Level\]:_(Low|Medium|High)/);
    label.textContent = title + (energy ? " · energy: " + energy[1].toLowerCase() : "");
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Open MP4 ↗";
    link.setAttribute("aria-label", "Open " + title + " MP4");
    caption.append(label, link);
    figure.append(video, caption);
    grid.appendChild(figure);
    videoObserver.observe(video);
  });
  visibleCount += batch.length;
  comparisonCount.textContent = visibleCount + " / " + filteredFiles.length + " comparisons";
  moreButton.hidden = visibleCount >= filteredFiles.length;
}

moreButton.addEventListener("click", showMoreComparisons);
languageFilter.addEventListener("change", () => {
  grid.querySelectorAll("video").forEach(video => video.pause());
  videoObserver.disconnect();
  grid.replaceChildren();
  visibleCount = 0;
  filteredFiles = COMPARISON_FILES.filter(file =>
    languageFilter.value === "all" ||
    new RegExp("[_-]" + languageFilter.value + "(?=[_\\d-])").test(file)
  );
  showMoreComparisons();
});
showMoreComparisons();

// TOC active highlight
const tocLinks = Array.from(document.querySelectorAll("nav.toc a"));
const targets = tocLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      tocLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-20% 0px -70% 0px" });
targets.forEach(t => obs.observe(t));
