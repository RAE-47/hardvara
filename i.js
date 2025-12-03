// Enkelt: Förvalda komponenter, kopplat med data-idx
const hardware = [
    {
        name: "CPU",
        img: "images/cpu.png",
        desc: "Utför beräkningar, är datorns hjärna.",
        func: "Kör program, styr systemet.",
        adv: "Snabb, klarar multitasking.",
        dis: "Kan bli varm, dyr.",
        break: "Datorn startar ej eller kraschar."
    },
    {
        name: "GPU",
        img: "images/gpu.png",
        desc: "Renderar grafik, används i spel/video.",
        func: "Visar bilder/video och snabbar upp grafiktunga appar.",
        adv: "Bra för gaming, grafik och AI.",
        dis: "Drar mycket ström, kostar mycket.",
        break: "Ingen bild, störningar, kraschar."
    },
    {
        name: "RAM",
        img: "images/ram.png",
        desc: "Snabbt arbetsminne för aktuell data.",
        func: "Tillfällig lagring, hjälper multitasking.",
        adv: "Ger snabb respons, lätt att byta.",
        dis: "Förlorar allt vid strömavbrott.",
        break: "Frysningar, appkrascher."
    },
    {
        name: "SSD",
        img: "images/ssd.png",
        desc: "Snabb lagring av filer och OS.",
        func: "Snabb filåtkomst, OS startar snabbare.",
        adv: "Tyst, stöttålig, blixtsnabb.",
        dis: "Dyrare än HDD.",
        break: "Dataförlust, Windows startar ej."
    },
    {
        name: "HDD",
        img: "images/hdd.png",
        desc: "Stor, billig lagring med rörliga delar.",
        func: "Lagrar mycket data och backup.",
        adv: "Billig per GB.",
        dis: "Långsammare än SSD, känslig för stötar.",
        break: "Klickande ljud, kan ej läsa data."
    },
    {
        name: "Nätaggregat",
        img: "images/psu.png",
        desc: "Ger ström till allt.",
        func: "Försörjer komponenter.",
        adv: "Skyddar mot strömspikar.",
        dis: "Dålig PSU kan förstöra datorn.",
        break: "Startar ej, elproblem."
    },
    {
        name: "Moderkort",
        img: "images/motherboard.png",
        desc: "Kopplar ihop alla delar.",
        func: "Låter komponenter kommunicera.",
        adv: "Möjligt att uppgradera.",
        dis: "Jobbig att byta.",
        break: "Instabilt eller startar inte."
    },
    {
        name: "Windows",
        img: "images/windows.png",
        desc: "Ett populärt operativsystem av Microsoft.",
        func: "Startar program, hanterar filer och hårdvara.",
        adv: "Enkelt, stort stöd för spel och program.",
        dis: "Virusrisk, kräver licens.",
        break: "Kraschar, seg eller startar inte alls."
    }
];

// Interaktivt: markera och visa valt kort, hämta allt från HTML
const cards = document.querySelectorAll('.card');
const selectedDiv = document.getElementById('selected');

cards.forEach(card => {
    card.addEventListener('click', function(){
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const idx = card.getAttribute('data-idx');
        const part = hardware[idx];
        selectedDiv.innerHTML = 
        `<img src="${part.img}" alt="${part.name}">
        <span class="bold">${part.name}</span>: <em>${part.desc}</em><br>
        <span class="bold">Funktion:</span> ${part.func}<br>
        <span class="adv bold">Fördel:</span> ${part.adv}<br>
        <span class="dis bold">Nackdel:</span> ${part.dis}<br>
        <span class="bold">Vid skada:</span> ${part.break}`;
    });
});