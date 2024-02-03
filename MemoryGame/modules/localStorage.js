function displayResults(tezina) {
    let rezultati = JSON.parse(localStorage.getItem('rezultati')) || {};
    let resultTable = document.querySelector('.resultTable');

    // Prazni prethodne rezultate iz tabele
    resultTable.innerHTML = '';

    // Dohvati niz rezultata za odabranu težinu
    let rezultatiZaTezinu = rezultati[tezina] || [];

    // Ako nema rezultata za odabranu težinu
    if (rezultatiZaTezinu.length === 0) {
        resultTable.innerHTML = 'No results!';
        return;
    }

    // Sortiraj rezultate po vremenu (od najmanjeg ka najvećem)
    rezultatiZaTezinu.sort((a, b) => {
        let timeA = a.vreme.split(':');
        let timeB = b.vreme.split(':');

        // Poredi minute
        if (parseInt(timeA[0]) !== parseInt(timeB[0])) {
            return parseInt(timeA[0]) - parseInt(timeB[0]);
        }

        // Ako su minute iste, poredi sekunde
        return parseInt(timeA[1]) - parseInt(timeB[1]);
    });

    // Ako želite da prikažete najviše 10 rezultata
    const maksimalniBrojRezultata = 10;
    rezultatiZaTezinu = rezultatiZaTezinu.slice(0, maksimalniBrojRezultata);

    // Kreiraj tabelu
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    let imeHeader = document.createElement('th');
    let vremeHeader = document.createElement('th');

    imeHeader.textContent = 'Ime';
    vremeHeader.textContent = 'Vreme';

    headerRow.appendChild(imeHeader);
    headerRow.appendChild(vremeHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Kreiraj telo tabele
    let tbody = document.createElement('tbody');
    rezultatiZaTezinu.forEach(function (rezultat) {
        let row = document.createElement('tr');
        let imeCell = document.createElement('td');
        let vremeCell = document.createElement('td');

        imeCell.textContent = rezultat.ime;
        vremeCell.textContent = rezultat.vreme;

        row.appendChild(imeCell);
        row.appendChild(vremeCell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    resultTable.appendChild(table);
}


function saveLocalStorageScore() {
    let radioButton = document.querySelector('input[type="radio"]:checked');
    let ime = document.querySelector('#userName').value;
    let vreme = document.querySelector('#timer').innerHTML;

    if (radioButton && ime && vreme) {
        // Dohvati težinu iz radio dugmeta
        let tezina = radioButton.id;

        // Proveri da li već postoji niz za datu težinu u lokalnom skladištu
        let rezultati = JSON.parse(localStorage.getItem('rezultati')) || {};

        // Ako niz za težinu ne postoji, kreiraj ga
        if (!rezultati[tezina]) {
            rezultati[tezina] = [];
        }

        let existingResult = rezultati[tezina].find(r => r.ime === ime);

        if (existingResult) {
            // Ako postoji rezultat sa istim imenom
            let m1 = Number(vreme.split(':')[0]);
            let s1 = Number(vreme.split(':')[1]);
            let m2 = Number(existingResult.vreme.split(':')[0]);
            let s2 = Number(existingResult.vreme.split(':')[1]);

            if (m1 < m2 || (m1 === m2 && s1 < s2)) {
                // Ako je vreme iz rezultata bolje od vremena iz postojećeg rezultata
                existingResult.vreme = vreme; // Ažuriraj vreme u postojećem objektu
                let bestTime = document.createElement('p');
                bestTime.innerHTML = `Your new best time! <br> Difficulty: ${tezina}`;
                document.querySelector('.winModal').prepend(bestTime);

            }
        } else {
            // Ako ne postoji rezultat sa istim imenom, dodaj novi rezultat
            let rezultat = { ime, vreme };
            rezultati[tezina].push(rezultat);
        }

        // Sačuvaj ažuriran objekat rezultata u lokalnom skladištu
        localStorage.setItem('rezultati', JSON.stringify(rezultati));

    } else {
        console.error('Nisu svi podaci dostupni. Rezultati nisu sačuvani.');
    }
}


export {saveLocalStorageScore, displayResults};