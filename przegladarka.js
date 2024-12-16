function usunStare() {
    var dzisiaj = new Date();
    dzisiaj.setHours(0, 0, 0, 0);
    var keysToRemove = [];

    for (var i = 0; i < localStorage.length; i++) {
        var klucz = localStorage.key(i);
        var dataRezerwacji = new Date(klucz);
        dataRezerwacji.setHours(0, 0, 0, 0);

        if (dataRezerwacji < dzisiaj) {
            keysToRemove.push(klucz);
        }
    }

    keysToRemove.forEach(klucz => localStorage.removeItem(klucz));
}

function utworz(){
    usunStare();
    var elementTresc = document.getElementById('przegladarka');
    var tresc = '';
    tresc += '<table><thead><tr><td colspan="4">Znajdź swoją rezerwację</td></tr></thead><tbody>';

    var localStorageKeys = [];
    for (var i = 0; i < localStorage.length; i++) {
        localStorageKeys.push(localStorage.key(i));
    }

    localStorageKeys.sort((a, b) => {
        var dateA = new Date(a);
        var dateB = new Date(b);
        return dateA - dateB;
    });

    for (var i = 0; i < localStorageKeys.length; i++) {
        var key = localStorageKeys[i];
        var wpis = JSON.parse(localStorage.getItem(key));
        for (var j = 0; j < wpis.length; j++) {
            var nazwisko = `${wpis[j].nazwisko}`.toLowerCase();
            var filtr = `${document.getElementById('filtr').value}`.toLowerCase();
            if(nazwisko.includes(filtr))
                tresc += `<tr><td>${wpis[j].data}</td><td>${wpis[j].nazwisko}</td><td>${wpis[j].imie}</td><td><button onclick='haslo(${i}, ${j})'>Szczegóły</button></td></tr>`;
        }
    }

    tresc += '</tbody></table>';
    elementTresc.innerHTML = tresc;
    
    
    document.getElementById('naglowek').innerHTML = "Obecne rezerwacje";
    document.getElementById('styl').href = "przegladarka.css";
    document.getElementById('wyszukiwarka').style.display = 'flex';
}


function haslo(i, j){
    var elementTresc = document.getElementById('przegladarka');
    var tresc = '';
    tresc += '<input type="password" id="podajHaslo" placeholder="Podaj hasło"><br>'
    tresc += `<button id="ok" onclick='ok(${i}, ${j})'>Ok</button><button id="anuluj" onclick="utworz()">Anuluj</button>`

    elementTresc.innerHTML = tresc;
    document.getElementById('wyszukiwarka').style.display = 'none';
}

function md5(str) {
    let hash = CryptoJS.MD5(str).toString();
    return hash;

}

function ok(i, j){
    var localStorageKeys = [];
    for (var k = 0; k < localStorage.length; k++) {
        localStorageKeys.push(localStorage.key(k));
    }

    localStorageKeys.sort((a, b) => {
        var dateA = new Date(a);
        var dateB = new Date(b);
        return dateA - dateB;
    });
    var wpisane = document.getElementById('podajHaslo').value;
    var key = localStorageKeys[i];
    var wpis = JSON.parse(localStorage.getItem(key));
    var poprawne = wpis[j].haslo;
    if(md5(wpisane) == poprawne){
        szczegoly(i, j);
    }else{
        alert("Hasło niepoprawne");
    }
}

function zajęteDaty(){
    var daty = [];

    for(var i = 0; i < localStorage.length; i++)
    {
        wpisy = localStorage.getItem(localStorage.key(i));
        if(JSON.parse(wpisy).length >= 4) daty.push(localStorage.key(i));
    }

    return daty;
 }

function szczegoly(i, j){
    var przegladarka = document.getElementById('przegladarka');
    var tresc = '';

    tresc += `
     <table>
                <tbody>
                    <tr>
                        <td colspan="2"><input type="text" id="imie" placeholder="Wprowadź imię"></td>
                        <td><div id="errorImie" class="error"></div></td>
                    </tr>
                    <tr>
                        <td colspan="2"><input type="text" id="nazwisko" placeholder="Wprowadź nazwisko"></td>
                        <td><div id="errorNazwisko" class="error"></div></td>
                    </tr>
                    <tr>
                        <td colspan="2"><input type="text" id="email" placeholder="Wprowadź email"></td>
                        <td><div id="errorEmail" class="error"></div></td>
                    </tr>
                    <tr>
                        <td colspan="2"><input type="text" id="data" placeholder="Wprowadź datę" readonly></td>
                        <td><div id="errorData" class="error"></div></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <select id="typ">
                                <option value="" disabled selected>Wybierz typ roweru</option>
                                <option value="górski">Górski</option>
                                <option value="miejski">Miejski</option>
                                <option value="trekkingowy">Trekkingowy</option>
                                <option value="szosowy">Szosowy</option>
                                <option value="crossowy">Crossowy</option>
                                <option value="bmx">BMX</option>
                                <option value="dziecięcy">Dziecięcy</option>
                            </select>
                        </td>
                        <td><div id="errorTyp" class="error"></div></td>
                    </tr>
                    <tr>
                        <td colspan="2"><h4>Co chcesz naprawiać?</h4></td>
                        <td><div id="errorCo" class="error"></div></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="co" value="koła" id="kola">Koła</td>
                        <td><input type="checkbox" name="co" value="pedały" id="pedaly">Pedały</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="co" value="łańcuch" id="lancuch">Łańcuch</td>
                        <td><input type="checkbox" name="co" value="zębatki" id="zebatki">Zębatki</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="co" value="chamulce" id="chamulce">Chamulce</td>
                        <td><input type="checkbox" name="co" value="kierownica" id="kierownica">Kierownica</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="co" value="przerzutki" id="przerzutki">Przerzutki</td>
                        <td><input type="checkbox" name="co" value="inne" id="inne">Inne</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2"><h4>Sposób płatności</h4></td>
                        <td><div id="errorPlatnosc" class="error"></div></td>
                    </tr>
                    <tr>
                        <td><input type="radio" name="platnosc" value="gotówka" id="gotowka">Gotówka</td>
                        <td><input type="radio" name="platnosc" value="kartaPłatnicza" id="kartaPlatnicza">Karta płatnicza</td>
                        <td></td>
                    </tr>                    
                    <tr>
                        <td><input type="radio" name="platnosc" value="blik" id="blik">Blik</td>
                        <td><input type="radio" name="platnosc" value="kartaPodatunkowa" id="kartaPodatunkowa">Karta podarunkowa</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <button id='zapisz' onclick='zapisz(${i},${j})'>Zapisz</button>
            <button id='anuluj' onclick="utworz()">Anuluj</button>
            <button id='usun' onclick='usun(${i},${j})'>Usuń</button>
    `;

    document.getElementById('styl').href = "formularz.css";
    document.getElementById('naglowek').innerHTML = "Szczegóły rezerwacji";

    przegladarka.innerHTML = tresc;

    var localStorageKeys = [];
    for (var k = 0; k < localStorage.length; k++) {
        localStorageKeys.push(localStorage.key(k));
    }

    localStorageKeys.sort((a, b) => {
        var dateA = new Date(a);
        var dateB = new Date(b);
        return dateA - dateB;
    });
    var key = localStorageKeys[i];
    var wpis = JSON.parse(localStorage.getItem(key))[j];

    kalendarz();

    document.getElementById('imie').value = wpis.imie;
    document.getElementById('nazwisko').value = wpis.nazwisko;
    document.getElementById('email').value = wpis.email;
    document.getElementById('data').value = wpis.data;
    document.getElementById('typ').value = wpis.typ;

    var platnosc = document.getElementsByName('platnosc');
    for(var k = 0; k<platnosc.length; k++){
        if(platnosc[k].value == wpis.platnosc) platnosc[k].checked = true;
    }

    var co = document.getElementsByName('co');
    for(var k = 0; k<co.length; k++){
        if(wpis.co[k]) co[k].checked = true;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    utworz();
});

function usun(i, j){
    

    if(confirm("Czy chcesz usunąć rezerwację?")){
        var localStorageKeys = [];
        for (var k = 0; k < localStorage.length; k++) {
            localStorageKeys.push(localStorage.key(k));
        }

        localStorageKeys.sort((a, b) => {
            var dateA = new Date(a);
            var dateB = new Date(b);
            return dateA - dateB;
        });
        var wpis = JSON.parse(localStorage.getItem(localStorageKeys[i]));
        wpis.splice(j, 1);
        if(wpis.length > 0)
            localStorage.setItem(localStorageKeys[i], JSON.stringify(wpis));
        else
            localStorage.removeItem(localStorageKeys[i]);

        utworz();
    }
}

function walidacja(){
    var ok = true;

    var imie = document.getElementById('imie');
    var eimie = document.getElementById('errorImie');
    var nazwisko = document.getElementById('nazwisko');
    var enazwisko = document.getElementById('errorNazwisko');
    var email = document.getElementById('email');
    var eemail = document.getElementById('errorEmail');
    var data = document.getElementById('data');
    var edata = document.getElementById('errorData');
    var typ = document.getElementById('typ');
    var etyp = document.getElementById('errorTyp');
    var platnosc = document.getElementsByName('platnosc');
    var eplatnosc = document.getElementById('errorPlatnosc');
    var co = document.getElementsByName('co');
    var eco = document.getElementById('errorCo');

    var imiePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]{1,}$/;
    var nazwiskoPattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?$/;
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if(imie.value == ""){
        eimie.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wprowadź dane';
        ok = false;
    }else if(!imiePattern.test(imie.value)){
        eimie.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wprowadz dane poprawnie';
        ok = false;
    }else{
        eimie.innerHTML = "";
    }

    if(nazwisko.value == ""){
        enazwisko.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wprowadź dane';
        ok = false;
    }else if(!nazwiskoPattern.test(nazwisko.value)){
        enazwisko.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wprowadz dane poprawnie';
        ok = false;
    }else{
        enazwisko.innerHTML = "";
    }

    if(email.value == ""){
        eemail.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wprowadź email';
        ok = false;
    }else if(!emailPattern.test(email.value)){
        eemail.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wprowadz email poprawnie';
        ok = false;
    }else{
        eemail.innerHTML = "";
    }

    if(data.value == ''){
        ok = false;
        edata.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wybierz datę';
    }else{
        edata.innerHTML = "";
    }

    if(typ.value == ''){
        ok = false;
        etyp.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wybierz typ roweru';
    }else{
        etyp.innerHTML = "";
    }

    var czyPlatnosc = false;
    for(var i = 0; i<platnosc.length; i++){
        if(platnosc[i].checked) czyPlatnosc = true;
    }

    if(czyPlatnosc){
        eplatnosc.innerHTML = "";
    }else{
        ok = false;
        eplatnosc.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wybierz formę płatności';
    }

    var czyCo = false;
    for(var i = 0; i<co.length; i++){
        if(co[i].checked) czyCo = true;
    }

    if(czyCo){
        eco.innerHTML = "";
    }else{
        ok = false;
        eco.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wybierz co chcesz naprawiać';
    }

    return ok;
}

function zapisz(i, j){
    if(walidacja()){
        var localStorageKeys = [];
        for (var k = 0; k < localStorage.length; k++) {
            localStorageKeys.push(localStorage.key(k));
        }

        localStorageKeys.sort((a, b) => {
            var dateA = new Date(a);
            var dateB = new Date(b);
            return dateA - dateB;
        });

        var wpis = JSON.parse(localStorage.getItem(localStorageKeys[i]));
        wpis[j].imie = document.getElementById('imie').value;
        wpis[j].nazwisko = document.getElementById('nazwisko').value;
        wpis[j].email = document.getElementById('email').value;
        wpis[j].data = document.getElementById('data').value;
        wpis[j].typ = document.getElementById('typ').value;
        var co = document.getElementsByName('co');
        for(var k = 0; k<co.length; k++){
            wpis[j].co[k] = co[k].checked;
        }
        var platnosc = document.getElementsByName('platnosc');
        for(var k = 0; k<platnosc.length; k++){
            if(platnosc[k].checked) wpis[j].platnosc = platnosc[k].value;
        }


        localStorage.setItem(localStorageKeys[i], JSON.stringify(wpis));
        utworz();
    }
}


function kalendarz() {
    // Ustawienie minimalnej daty na dzisiaj
    var today = new Date().toISOString().split('T')[0];
    var dateInput = document.getElementById("data");
    dateInput.setAttribute('min', today);
    
    // Wybrane daty do zablokowania (przykładowe daty)
    var blockedDates = zajęteDaty();
    
    // Ustawienie nasłuchiwania zdarzenia otwarcia inputu typu date
    dateInput.addEventListener("click", function() {
        this.showPicker();
    });

    // Funkcja do pokazania customowego kalendarza
    HTMLInputElement.prototype.showPicker = function() {
        const picker = this;
        const calendar = document.createElement('div');
        calendar.style.position = 'absolute';
        calendar.style.zIndex = '9999';
        calendar.style.border = '1px solid #444';
        calendar.style.background = '#1a1a1a'; // Ciemne tło
        calendar.style.color = '#e5e5e5'; // Jasny tekst
        calendar.style.padding = '10px';
        calendar.style.borderRadius = '10px';
        
        const monthYear = document.createElement('div');
        monthYear.style.display = 'flex';
        monthYear.style.justifyContent = 'space-between';
        monthYear.style.marginBottom = '10px';
        
        const prevMonth = document.createElement('button');
        prevMonth.innerText = '<';
        prevMonth.style.color = '#e5e5e5';
        prevMonth.style.background = '#444';
        prevMonth.style.border = 'none';
        prevMonth.style.borderRadius = '5px';
        prevMonth.style.padding = '5px';
        prevMonth.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        
        const nextMonth = document.createElement('button');
        nextMonth.innerText = '>';
        nextMonth.style.color = '#e5e5e5';
        nextMonth.style.background = '#444';
        nextMonth.style.border = 'none';
        nextMonth.style.borderRadius = '5px';
        nextMonth.style.padding = '5px';
        nextMonth.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        
        const monthYearLabel = document.createElement('span');
        monthYearLabel.style.color = '#ff4500'; // Jasny czerwony tekst
        
        monthYear.appendChild(prevMonth);
        monthYear.appendChild(monthYearLabel);
        monthYear.appendChild(nextMonth);
        
        const daysGrid = document.createElement('div');
        daysGrid.style.display = 'grid';
        daysGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        daysGrid.style.gridGap = '5px';
        
        const daysOfWeek = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];
        daysOfWeek.forEach(day => {
            const dayLabel = document.createElement('div');
            dayLabel.innerText = day;
            dayLabel.style.textAlign = 'center';
            dayLabel.style.fontWeight = 'bold';
            dayLabel.style.color = '#ff4500'; // Jasny czerwony tekst
            daysGrid.appendChild(dayLabel);
        });

        calendar.appendChild(monthYear);
        calendar.appendChild(daysGrid);
        
        picker.parentNode.appendChild(calendar);
        
        let currentDate = new Date();
        
        function renderCalendar() {
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
            const lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            
            daysGrid.innerHTML = '';
            daysOfWeek.forEach(day => {
                const dayLabel = document.createElement('div');
                dayLabel.innerText = day;
                dayLabel.style.textAlign = 'center';
                dayLabel.style.fontWeight = 'bold';
                dayLabel.style.color = '#ff4500'; // Jasny czerwony tekst
                daysGrid.appendChild(dayLabel);
            });
            
            monthYearLabel.innerText = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + currentDate.getFullYear();
            
            for (let i = 0; i < firstDayOfMonth; i++) {
                daysGrid.appendChild(document.createElement('div'));
            }
            
            for (let date = 1; date <= lastDateOfMonth; date++) {
                const dayButton = document.createElement('button');
                dayButton.innerText = date;
                dayButton.style.color = '#eee'; // Dostępne dni na czerwono
                dayButton.style.background = '#ff4500';
                dayButton.style.border = 'none';
                dayButton.style.borderRadius = '5px';
                dayButton.style.padding = '5px';
                dayButton.style.cursor = 'pointer';

                const dateString = currentDate.getFullYear() + '-' + String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + String(date).padStart(2, '0');
                
                if (new Date(dateString) < new Date(today) || blockedDates.includes(dateString)) {
                    dayButton.disabled = true;
                   
                    dayButton.style.background = '#333'; // Blokowane daty na szaro
                }
                
                dayButton.addEventListener('click', () => {
                    picker.value = dateString;
                    calendar.remove();
                });
                
                daysGrid.appendChild(dayButton);
            }
        }
        
        renderCalendar();

        // Nasłuchujemy kliknięć poza kalendarzem, aby go ukryć
        document.addEventListener('click', function(event) {
            const isClickedOutside = !calendar.contains(event.target) && event.target !== picker;
            if (isClickedOutside) {
                calendar.remove();
            }
        });
    };
}

