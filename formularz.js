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
    var haslo1 = document.getElementById('haslo1');
    var haslo2 = document.getElementById('haslo2');
    var ehaslo1 = document.getElementById('errorHaslo1');
    var ehaslo2 = document.getElementById('errorHaslo2');

    var imiePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]{1,}$/;
    var nazwiskoPattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?$/;
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if(imie.value == ""){
        eimie.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wprowadź imię';
        ok = false;
    }else if(!imiePattern.test(imie.value)){
        eimie.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wprowadz imię poprawnie';
        ok = false;
    }else{
        eimie.innerHTML = "";
    }

    if(nazwisko.value == ""){
        enazwisko.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wprowadź nazwisko';
        ok = false;
    }else if(!nazwiskoPattern.test(nazwisko.value)){
        enazwisko.innerHTML = '<img src="ikony/error.png" alt="ikona error">Wprowadz nazwisko poprawnie';
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

    if(haslo1.value == ""){
        ehaslo1.innerHTML = '<img src="ikony/error.png" alt="ikona error">Podaj hasło';
        ok = false;
    }else{
        ehaslo1.innerHTML = '';
    }
    
    if(haslo2.value == ""){
        ehaslo2.innerHTML = '<img src="ikony/error.png" alt="ikona error">Powtórz hasło';
        ok = false;
    }else{
        ehaslo2.innerHTML = '';
    }

    if(haslo1.value != haslo2.value){
        ehaslo1.innerHTML = '<img src="ikony/error.png" alt="ikona error">Hasła nie są zgodne';
        ok = false;
    }else{
        if(haslo1.value != '') ehaslo1.innerHTML = '';
    }

    return ok;
}

function anuluj(){
    document.getElementById('imie').value = '';
    document.getElementById('errorImie').innerHTML = '';
    document.getElementById('nazwisko').value = '';
    document.getElementById('errorNazwisko').innerHTML = '';
    document.getElementById('email').value = '';
    document.getElementById('errorEmail').innerHTML = '';
    document.getElementById('data').value = '';
    document.getElementById('errorData').innerHTML = '';
    document.getElementById('typ').value = '';
    document.getElementById('errorTyp').innerHTML = '';
    document.getElementById('errorPlatnosc').innerHTML = '';
    document.getElementById('errorCo').innerHTML = '';
    
    document.getElementById('haslo1').value = '';
    document.getElementById('haslo2').value = '';
    document.getElementById('errorHaslo1').innerHTML = '';
    document.getElementById('errorHaslo2').innerHTML = '';
    
    var co = document.getElementsByName('co');
    var platnosc = document.getElementsByName('platnosc');

    for(var i = 0; i<co.length; i++) co[i].checked = false;
    for(var i = 0; i<platnosc.length; i++) platnosc[i].checked = false;
}


 class Rezerwacja{
    constructor(imie='', nazwisko='', email='', data='', typ='', co=[], platnosc='', haslo=''){
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.email = email;
        this.data = data;
        this.typ = typ;
        this.co = co;
        this.platnosc = platnosc;
        this.haslo = haslo;
    }
 }

 document.addEventListener('DOMContentLoaded', () => {
    var rezerwacja = new Rezerwacja();
    rezerwuj.addEventListener('click', () =>{
        zapisz(rezerwacja);
        rezerwacja = new Rezerwacja();
    });
 });

 function sprawdzDate() {
    var data = document.getElementById('data').value;
    var dzisiaj = new Date();
    dzisiaj.setHours(0, 0, 0, 0);
    
    var dataUzytkownika = new Date(data);
    dataUzytkownika.setHours(0, 0, 0, 0);

    if (dataUzytkownika < dzisiaj) {
        alert("Podano datę z przeszłości");
        return false;
    }
    
    var wpisy = localStorage.getItem(data);
    console.log(wpisy != null);
    console.log(wpisy);
    
    if (wpisy != null) {
        var rezerwacje = JSON.parse(wpisy);
        if (rezerwacje.length < 4) {
            return true;
        } else {
            alert("Na ten dzień już nie ma wolnych miejsc");
            return false;
        }
    } else {
        return true; // Brak rezerwacji dla tej daty, można dodać
    }
}

function md5(str) {
    let hash = CryptoJS.MD5(str).toString();
    return hash;

}


 function zapisz(rezerwacja){
    var ok = walidacja();
    if(ok) ok = sprawdzDate();
    if(!ok) return 0;
    rezerwacja.imie = document.getElementById('imie').value;
    rezerwacja.nazwisko = document.getElementById('nazwisko').value;
    rezerwacja.email = document.getElementById('email').value;
    rezerwacja.data = document.getElementById('data').value;
    rezerwacja.typ = document.getElementById('typ').value;
    rezerwacja.haslo = md5(document.getElementById('haslo1').value);
    var co = document.getElementsByName('co');
    var platnosc = document.getElementsByName('platnosc');
    for(var i = 0; i<co.length; i++){
        if(co[i].checked)
            rezerwacja.co.push(true);
        else
            rezerwacja.co.push(false);
    }

    for(var i = 0; i<platnosc.length; i++){
        if(platnosc[i].checked) rezerwacja.platnosc = platnosc[i].value;
    }


    var wpis = JSON.parse(localStorage.getItem(rezerwacja.data));
    if(wpis == null){
        wpis = [];
    }
    wpis.push(rezerwacja);
    localStorage.setItem(rezerwacja.data, JSON.stringify(wpis));
    sortowanie();
    anuluj();
    alert('Rezerwacja przyjęta');
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


 function sortowanie() {
    var localStorageData = [];
    
    // Pobierz dane z localStorage i przechowuj je w tablicy
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        localStorageData.push({ key: key, value: value });
    }

    // Sortuj tablicę według klucza (daty)
    localStorageData.sort((a, b) => {
        var dateA = new Date(a.key);
        var dateB = new Date(b.key);
        return dateA - dateB;
    });

    // Wyczyść localStorage
    localStorage.clear();

    // Zapisz posortowane dane z powrotem do localStorage
    localStorageData.forEach(item => {
        localStorage.setItem(item.key, item.value);
    });
}





document.addEventListener("DOMContentLoaded", function() {
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
});

