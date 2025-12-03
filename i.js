// Robust bild-laddning: flera fallback-URL:er och tydlig debug-output.
// Byt ut din befintliga i.js med denna.

const hardware = [
    { name: "CPU", img: "images/CPU.jpg", desc: "Utför beräkningar, är datorns hjärna.", func: "Kör program, styr systemet.", adv: "Snabb, klarar multitasking.", dis: "Kan bli varm, dyr.", break: "Datorn startar ej eller kraschar." },
    { name: "GPU", img: "images/GPU.png", desc: "Renderar grafik, används i spel/video.", func: "Visar bilder/video och snabbar upp grafiktunga appar.", adv: "Bra för gaming, grafik och AI.", dis: "Drar mycket ström, kostar mycket.", break: "Ingen bild, störningar, kraschar." },
    { name: "RAM", img: "images/RAM.webp", desc: "Snabbt arbetsminne för aktuell data.", func: "Tillfällig lagring, hjälper multitasking.", adv: "Ger snabb respons, lätt att byta.", dis: "Förlorar allt vid strömavbrott.", break: "Frysningar, appkrascher." },
    { name: "SSD", img: "images/SSD.webp", desc: "Snabb lagring av filer och OS.", func: "Snabb filåtkomst, OS startar snabbare.", adv: "Tyst, stöttålig, blixtsnabb.", dis: "Dyrare än HDD.", break: "Dataförlust, Windows startar ej." },
    { name: "HDD", img: "images/HDD.jpg", desc: "Stor, billig lagring med rörliga delar.", func: "Lagrar mycket data och backup.", adv: "Billig per GB.", dis: "Långsammare än SSD, känslig för stötar.", break: "Klickande ljud, kan ej läsa data." },
    { name: "Nätaggregat", img: "images/nätaggregat.webp", desc: "Ger ström till allt.", func: "Försörjer komponenter.", adv: "Skyddar mot strömspikar.", dis: "Dålig PSU kan förstöra datorn.", break: "Startar ej, elproblem." },
    { name: "Moderkort", img: "images/moderkort.jpg", desc: "Kopplar ihop alla delar.", func: "Låter komponenter kommunicera.", adv: "Möjligt att uppgradera.", dis: "Jobbig att byta.", break: "Instabilt eller startar inte." },
    { name: "Windows", img: "images/windows.png", desc: "Ett populärt operativsystem av Microsoft.", func: "Startar program, hanterar filer och hårdvara.", adv: "Enkelt, stort stöd för spel och program.", dis: "Virusrisk, kräver licens.", break: "Kraschar, seg eller startar inte alls." }
];

const cards = document.querySelectorAll('.card');
const selectedDiv = document.getElementById('selected');

// Init: göm och töm #selected
if (selectedDiv) {
    selectedDiv.innerHTML = '';
    selectedDiv.classList.remove('visible');
    selectedDiv.style.display = 'none';
}

/**
 * Försöker ladda en bild från en lista av URL-kandidater.
 * Returnerar en Promise som resolve:ar med ett <img> element (som laddats) eller null.
 */
function tryLoadImageFromCandidates(candidates) {
    return new Promise((resolve) => {
        let i = 0;

        function tryNext() {
            if (i >= candidates.length) {
                resolve(null);
                return;
            }
            const url = candidates[i++];
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => {
                console.warn('Bild kunde inte laddas från:', url);
                tryNext();
            };
            // Starta laddning
            img.src = url;
            console.log('Försöker bild-URL:', url);
        }

        tryNext();
    });
}

/**
 * Bygger kandidat-lista för bild-URL:er:
 * 1) img src i kortet (om finns)
 * 2) relative path new URL(part.img, location.href)
 * 3) github pages friendly: /REPO_NAME/images/...
 */
function buildImageCandidates(card, part) {
    const candidates = [];

    // 1) img i kortet (om satt i HTML)
    const imgInCard = card ? card.querySelector('img') : null;
    if (imgInCard) {
        const s = imgInCard.getAttribute('src') || imgInCard.src || '';
        if (s) candidates.push(s);
    }

    // 2) relativa vägen relativt sidan
    try {
        const rel = new URL(part.img, location.href).href;
        candidates.push(rel);
    } catch (e) {
        // ignore
    }

    // 3) GitHub Pages: bygg med repo-namn (om path innehåller repo)
    // Ex: https://username.github.io/repoName/ => pathname: /repoName/
    const pathParts = location.pathname.split('/').filter(Boolean); // ta bort tomma
    if (pathParts.length >= 1) {
        const repoName = pathParts[0];
        const ghCandidate = `${location.origin}/${repoName}/${part.img.replace(/^\/+/, '')}`;
        candidates.push(ghCandidate);
    }

    // 4) slutligen absoluta varianter som fallback (samma som rel men säker)
    if (part.img && !part.img.startsWith('http')) {
        candidates.push(location.origin + '/' + part.img.replace(/^\/+/, ''));
    }

    // Filtrera dubbletter
    return [...new Set(candidates)];
}

// Event listener för varje kort
cards.forEach(card => {
    card.addEventListener('click', async function () {
        // Markera kort
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const idx = parseInt(card.getAttribute('data-idx'), 10);
        const part = hardware[idx];

        // Bygg kandidater och försök ladda
        const candidates = buildImageCandidates(card, part);
        const loadedImg = await tryLoadImageFromCandidates(candidates);

        // Rensa #selected
        selectedDiv.innerHTML = '';

        if (loadedImg) {
            loadedImg.classList.add('selected-img');
            // Ställ in attribut som alt och lite styling-klass
            loadedImg.alt = part.name;
            loadedImg.style.maxWidth = '120px';
            loadedImg.style.height = 'auto';
            selectedDiv.appendChild(loadedImg);
            console.log('Bild laddad från:', loadedImg.src);
        } else {
            // Ingen bild hittades — visa fallback och logga alla kandidater i Console
            const tried = candidates.join('\n');
            const msg = document.createElement('div');
            msg.innerHTML = `
                <div style="text-align:center;color:#b00;font-weight:bold;margin-bottom:8px;">
                    Bild hittades ej
                </div>
                <div style="font-size:0.9em;color:#333;">Jag försökte dessa sökvägar:<br><pre style="white-space:pre-wrap;">${tried}</pre></div>
            `;
            selectedDiv.appendChild(msg);
            console.warn('Ingen bild kunde laddas. Testade:', candidates);
        }

        // Bygg övrig info
        const info = document.createElement('div');
        info.style.marginTop = '8px';
        info.innerHTML = `
            <div><span class="bold">${part.name}</span>: <em>${part.desc}</em></div>
            <div><span class="bold">Funktion:</span> ${part.func}</div>
            <div><span class="adv bold">Fördel:</span> ${part.adv}</div>
            <div><span class="dis bold">Nackdel:</span> ${part.dis}</div>
            <div><span class="bold">Vid skada:</span> ${part.break}</div>
        `;
        selectedDiv.appendChild(info);

        // Visa rutan
        selectedDiv.style.display = 'block';
        selectedDiv.classList.add('visible');
    });
});
