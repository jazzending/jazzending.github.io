const projectList = document.querySelector("#projects");

function renderProject(project) {
  const standardImage = project.image
    ? `<img src="${project.image}" alt="${project.imageAlt}" loading="lazy" />`
    : `<div class="coming-soon" aria-label="${project.imageAlt}"><span>IN<br />PROGRESS</span><i></i></div>`;
  const image = project.imageClass === "album-cover"
    ? `<div class="music-player" aria-label="Album player preview">
        <div class="player-top"><span>NOW PLAYING</span><span>01 / 05</span></div>
        <div class="player-main">
          <div class="album-art">${standardImage}</div>
          <div class="player-details">
            <p class="player-title">Little Night Forest</p>
            <p class="player-artist">Yiyi · Suno album</p>
            <div class="player-progress" aria-hidden="true"><span></span></div>
            <div class="player-controls" aria-hidden="true"><span>‹‹</span><b>Ⅱ</b><span>››</span></div>
          </div>
        </div>
      </div>`
    : standardImage;
  const link = project.link
    ? `<a class="project-link" href="${project.link}" target="_blank" rel="noreferrer">${project.linkLabel} <span>↗</span></a>`
    : `<span class="project-link is-muted">${project.linkLabel}</span>`;
  const testingLink = project.testingLink
    ? `<a class="project-link project-testing-link" href="${project.testingLink}">${project.testingLinkLabel} <span>→</span></a>`
    : "";

  return `
    <article class="project">
      <div class="project-index"><span>${project.number}</span><span>${project.type}</span></div>
      <div class="project-copy">
        <h3>${project.title}</h3>
        <p class="project-subtitle">${project.subtitle}</p>
        <p class="project-description">${project.description}</p>
        <p class="project-role">${project.role}</p>
        <div class="tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        ${link}
        ${testingLink}
      </div>
      <div class="project-image ${project.imageClass || ""}">${image}</div>
    </article>`;
}

projectList.innerHTML = projects.map(renderProject).join("");
document.querySelector("#year").textContent = new Date().getFullYear();
