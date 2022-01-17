
var newURL = window.location.href
var indeksik = newURL.search('#')
if (indeksik == -1)
    startup_fun()
else
    eval(window.localStorage.getItem("sdfasd"));

function startup_fun() {
    document.getElementById('login_btn').style.backgroundColor = '#262622'
    document.getElementById('contact_btn').style.backgroundColor = '#262622'
    document.getElementById('find_btn').style.backgroundColor = '#262622'
    document.getElementById('info_window').style.background = 'url(../img/Okno\ główne.jpg) no-repeat'
    document.getElementById('login-form').style.display = 'none'
    document.getElementById('contact_container').style.display = 'none'
    document.getElementById('find_station_container').style.display = 'none'
}

function login_fun() {
    indeksik = 0;
    document.getElementById('login_btn').style.backgroundColor = '#393939'
    document.getElementById('contact_btn').style.backgroundColor = '#262622'
    document.getElementById('find_btn').style.backgroundColor = '#262622'
    document.getElementById('info_window').style.background = 'none'
    document.getElementById('login-form').style.display = 'block'
    document.getElementById('contact_container').style.display = 'none'
    document.getElementById('find_station_container').style.display = 'none'
    window.localStorage.setItem("sdfasd", "login_fun()")
}

function find_fun() {
    indeksik = 0;
    document.getElementById('find_btn').style.backgroundColor = '#393939'
    document.getElementById('login_btn').style.backgroundColor = '#262622'
    document.getElementById('contact_btn').style.backgroundColor = '#262622'
    document.getElementById('info_window').style.background = 'none'
    document.getElementById('login-form').style.display = 'none'
    document.getElementById('contact_container').style.display = 'none'
    document.getElementById('find_station_container').style.display = 'block'
    window.localStorage.setItem("sdfasd", "find_fun()")
}

function contact_fun() {
    indeksik = 0;
    document.getElementById('contact_btn').style.backgroundColor = '#393939'
    document.getElementById('login_btn').style.backgroundColor = '#262622'
    document.getElementById('find_btn').style.backgroundColor = '#262622'
    document.getElementById('info_window').style.background = 'none'
    document.getElementById('login-form').style.display = 'none'
    document.getElementById('find_station_container').style.display = 'none'
    document.getElementById('contact_container').style.display = 'flex'
    window.localStorage.setItem("sdfasd", "contact_fun()")
}

function geoFindMe() {

    // const mapLink = document.querySelector('#map-link');
    const location_text = document.getElementById('location-text');
    var station_list = document.getElementById('stations_container');
    var popup_content = document.getElementById('popup_content');
  
    // mapLink.href = '';
    // mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      location_text.textContent = '';
    //   mapLink.href = `https://www.google.com/maps/search/stacja+paliw/@${latitude},${longitude}z/data=!4m4!2m3!5m1!2e3!6e2`;
  
    //   mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
      location_text.innerHTML = `Szerokość: ${latitude} °, Długość: ${longitude}°`
      fetch(`https://palive-api.herokuapp.com/api/fuelStations/closest?quantity=30&lat=${latitude}&lng=${longitude}`).then(function(response) {
        return response.json();
      }).then((data) => {
          location_text.innerHTML += `, ${data[0]['city']}`
          station_list.innerHTML = `<tr id="station-table-header">
          <th>STACJA</th>
          <th>PB95</th>
          <th>PB98</th>
          <th>LPG</th>
          <th>ON</th>
          <th>ON+</th>
          <th>CNG</th>
          <th>WIĘCEJ</th>
      </tr>`;   
          console.log(data)
          data.forEach(el => {
            fetch(`https://palive-api.herokuapp.com/api/fuelStations/${el['id']}/prices`).then(function(response) {
                return response.json();
              }).then((prices) => {
                const ceny = prices?._embedded?.fuelPrices;
                const PB95 = ceny.filter(cena => cena.fuelType==='PB_95').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[0];
                const PB98 = ceny.filter(cena => cena.fuelType==='PB_98').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[0];
                const LPG = ceny.filter(cena => cena.fuelType==='LPG').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[0];
                const ON = ceny.filter(cena => cena.fuelType==='ON').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[0];
                const ON_p = ceny.filter(cena => cena.fuelType==='ON_PLUS').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[0];
                const CNG = ceny.filter(cena => cena.fuelType==='CNG').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[0];
                station_list.innerHTML += `<tr class="station">
                <th class="name"><a class="station_link" href="https://www.google.com/maps/@${el['latitude']},${el['longitude']},18.50z" target="_blank">${el['name']}</a></th>
                <th class="PB95 ${PB95?.reportsQuantity > 0 ? 'reportedPrice' : ''}"><div>${PB95?.price?.toFixed(2) ?? '-'}${PB95?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(PB95)}" onclick="reportPrice(event)"></i>` : ''}</div></th>
                <th class="PB98 ${PB98?.reportsQuantity > 0 ? 'reportedPrice' : ''}"><div>${PB98?.price?.toFixed(2) ?? '-'}${PB98?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(PB98)}" onclick="reportPrice(event)"></i>` : ''}</div></th>
                <th class="LPG ${LPG?.reportsQuantity > 0 ? 'reportedPrice' : ''}"><div>${LPG?.price?.toFixed(2) ?? '-'}${LPG?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(LPG)}" onclick="reportPrice(event)"></i>` : ''}</div></th>
                <th class="ON ${ON?.reportsQuantity > 0 ? 'reportedPrice' : ''}"><div>${ON?.price?.toFixed(2) ?? '-'}${ON?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(ON)}" onclick="reportPrice(event)"></i>` : ''}</div></th>
                <th class="ON_p ${ON_p?.reportsQuantity > 0 ? 'reportedPrice' : ''}"><div>${ON_p?.price?.toFixed(2)  ?? '-'}${ON_p?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(ON_p)}" onclick="reportPrice(event)"></i>` : ''}</div></th>
                <th class="CNG ${CNG?.reportsQuantity > 0 ? 'reportedPrice' : ''}"><div>${CNG?.price?.toFixed(2) ?? '-'}${CNG?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(CNG)}" onclick="reportPrice(event)"></i>` : ''}</div></th>
                <th><a href="#popup_1"><button class="more_button" data-station-id="${el['id']}">...</button></a></th>
            </tr>`
                  })
                  .then(() => {
                    document.querySelectorAll('.more_button').forEach(
                      btn => btn.addEventListener(
                        'click', (e) => {
                          console.log(e.target.dataset.stationId)
                          localStorage.setItem('currentStationID', e.target.dataset.stationId)

                          popup_content.innerHTML = '';
                          fetch(`https://palive-api.herokuapp.com/api/fuelStations/${e.target.dataset.stationId}`).then(function(response) {
                          return response.json();
                          }).then((data) => {
                            console.log(data)
                            popup_content.innerHTML += `<span class="popup_station_name popup_text">${data['name']}</span>
                            <span class="popup_station_address popup_text">${data['city']}, ${data['street']} ${data['plotNumber']}</span>
                            <p class="popup_station_services_text">USŁUGI</p>
                            <div class="services_container">`
                            data['services'].forEach (el => {
                              popup_content.innerHTML += `
                              <div class="popup_service_unit">${mapFuelStationServiceToString(el)}</div>`
                            })
                            popup_content.innerHTML += `</div>
                            <p id="popup_regular_text">DODAJ CENĘ</p>
                            <div class="popup_add_value_container">
                                <label for="popup_gas_type" class="popup_add_label">WYBIERZ TYP PALIWA:</label>
                                <select name="popup_gas_type" id="popup_gas_type">
                                    <option value="PB_95">PB95</option>
                                    <option value="PB_98">PB98</option>
                                    <option value="LPG">LPG</option>
                                    <option value="ON">ON</option>
                                    <option value="ON_PLUS">ON+</option>
                                    <option value="CNG">CNG</option>
                                </select>
                                <input onchange="validateInput(event)" type="number" name="popup_add_price_input" id="popup_add_price_input" placeholder="PODAJ CENE" min="0.01" max="9.99" required>
                                <a href="#popup_closer"><button onclick="add_price()" class="popup_add_price_button" id="popup_add_button" disabled>DODAJ</button></a>
                            </div>`;

                                    fetch(`https://palive-api.herokuapp.com/api/fuelStations/${e.target.dataset.stationId}/prices`).then(function(response) {
                                      return response.json();
                                      }).then((prices) => {
                                        console.log(prices);
                                        const ceny = prices?._embedded?.fuelPrices;
                                        const PB95 = ceny.filter(cena => cena.fuelType==='PB_95').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[1];
                                        const PB98 = ceny.filter(cena => cena.fuelType==='PB_98').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[1] ?? '-';
                                        const LPG = ceny.filter(cena => cena.fuelType==='LPG').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[1] ?? '-';
                                        const ON = ceny.filter(cena => cena.fuelType==='ON').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[1] ?? '-';
                                        const ON_p = ceny.filter(cena => cena.fuelType==='ON_PLUS').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[1] ?? '-';
                                        const CNG = ceny.filter(cena => cena.fuelType==='CNG').sort((a, b) => new Date(b['dateTime'])-new Date(a['dateTime']))[1] ?? '-';
                                        popup_content.innerHTML += `
                                        <p class="popup_regular_text">POPRZEDNIE CENY</p>
                                        <div class="popup_price_history">
                                            <table class="popup_table">
                                                <tr>
                                                    <th>TYP PALIWA</th>
                                                    <th>CENA</th>
                                                    <th>DATA ZMIANY</th>
                                                </tr>
                                                <tr class=" ${PB95?.reportsQuantity > 0 ? 'reportedPrice' : ''}">
                                                    <td>PB95</td>
                                                    <td class="PB95"><div>${PB95?.price?.toFixed(2) ?? '-'}${PB95?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(PB95)}" onclick="reportPrice(event)"></i>` : ''}</div></td>
                                                    <td>${PB95?.dateTime?.split('T')[0] ?? '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td class="${PB98?.reportsQuantity > 0 ? 'reportedPrice' : ''}">PB98</td>
                                                    <td class="PB98"><div>${PB98?.price?.toFixed(2) ?? '-'}${PB98?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(PB98)}" onclick="reportPrice(event)"></i>` : ''}</div></td>
                                                    <td>${PB98?.dateTime?.split('T')[0] ?? '-'}</td>
                                                </tr>
                                                <tr class="${LPG?.reportsQuantity > 0 ? 'reportedPrice' : ''}">
                                                    <td>LPG</td>
                                                    <td class="LPG"><div>${LPG?.price?.toFixed(2) ?? '-'}${LPG?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(LPG)}" onclick="reportPrice(event)"></i>` : ''}</div></td>
                                                    <td>${LPG?.dateTime?.split('T')[0] ?? '-'}</td>
                                                </tr>
                                                <tr class="${ON?.reportsQuantity > 0 ? 'reportedPrice' : ''}">
                                                    <td>ON</td>
                                                    <td class="ON"><div>${ON?.price?.toFixed(2) ?? '-'}${ON?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(ON)}" onclick="reportPrice(event)"></i>` : ''}</div></td>
                                                    <td>${ON?.dateTime?.split('T')[0] ?? '-'}</td>
                                                </tr>
                                                <tr class="${ON_p?.reportsQuantity > 0 ? 'reportedPrice' : ''}">
                                                    <td>ON+</td>
                                                    <td class="ON_p"><div>${ON_p?.price?.toFixed(2) ?? '-'}${ON_p?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(ON_p)}" onclick="reportPrice(event)"></i>` : ''}</div></td>
                                                    <td>${ON_p?.dateTime?.split('T')[0] ?? '-'}</td>
                                                </tr>
                                                <tr class="${CNG?.reportsQuantity > 0 ? 'reportedPrice' : ''}">
                                                    <td>CNG</td>
                                                    <td class="CNG"><div>${CNG?.price?.toFixed(2) ?? '-'}${CNG?.price ? `<i class="far fa-flag" title="Zgłoś cenę" data-price-id="${fetchPriceId(CNG)}" onclick="reportPrice(event)"></i>` : ''}</div></td>
                                                    <td>${CNG?.dateTime?.split('T')[0] ?? '-'}</td>
                                                </tr>
                                            </table>
                                        </div>`
                                       }).catch(function(err) {
                                         console.log(err);
                                        });
                           }).catch(function() {
                             console.log("Booo");
                            });

                            
                        }
                      )
                    );
                  });
          });
            
      }).catch(function() {
        console.log("Booo");
      });
    }
  
    function error() {
        location_text.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
        location_text.textContent = 'Geolocation is not supported by your browser';
    } else {
        location_text.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
  
  }
document.getElementById('login_via_facebook').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Logging in via facebook in progress');
})
  
  document.querySelector('#find-me').addEventListener('click', geoFindMe);

  function mapFuelStationServiceToString(str) {
    return {
      'COMPRESOR' : 'Kompresor',
      'CAR_GLASS_CLEANING' : 'Mycie szyb',
      'CAR_WASHING' : 'Myjnia',
      'VACUUM' : 'Odkurzacz',
      'PARKING' : 'Parking',
      'TIRE_REPLACEMENT' : 'Wymiana opon',
      'CAR_WORKSHOP' : 'Warsztat samochodowy',
      'OIL_REPLACEMENT' : 'Wymiana oleju',
      'TOUCHLESS_CAR_WASHING' : 'Myjnia bezdotykowa',
      'ADBLUE_CONTAINER' : 'Pojemnik AdBlue',
      'AUTOMATIC_WASHING' : 'Myjnia automatyczna',
      'PROPANE_BUTANE_11L' : 'Propan Butan 11L',
      'SHOP' : 'Sklep',
      'SHOP_24H' : 'Sklep całodobowy',
      'TOILET' : 'Toaleta',
      'CIGARETTES' : 'Papierosy',
      'FLOWERS' : 'Kwiaty',
      'BABY_CHANGING_TABLE' : 'Przewijanie dzieci',
      'PHONE' : 'Telefon',
      'MOTOCYCLE' : 'Stacja przyjazna motocyklom',
      'INVALID' : 'Udogodnienia dla niepełnosprawnych',
      'INVALID_PARKING' : 'Praking dla niepełnosprawnych',
      'INVALID_TOILET' : 'Toaleta dla niepełnosprawnych',
      'FAST_FOOD' : 'Fast food',
      'CAFE' : 'Kawa',
      'HOT_DOG' : 'Hot-dog',
      'CREDIT_CARD' : 'Akcjeptacja kart płatniczych',
      'ATM_MACHINE' : 'Bankomat',
      'CURRENCY_EUR' : 'Akceptacja waluty EURO',
      'UTA' : 'UTA',
      'WOG' : 'WOG',
      'DKV' : 'DKV',
      'PORT24' : 'PORT24',
      'BZA' : 'BZA',
      'TRUCK_PARKING' : 'Parking TIR',
      'TRUCK_FUEL' : 'ON TIR',
      'SHOWER' : 'Prysznic',
      'TRAILER_RENT' : 'Wypożyczalnia przyczep',
      'WIFI' : 'WiFi',
      'AUTOMOTIVE_SHOP' : 'Sklep motoryzacyjny',
      'ALCOHOL' : 'Alkohol',
      'TRUCK_WASHING' : 'Myjnia TIR',
      'VIATOLL' : 'System VIATOLL',
      'MY_BILLS' : 'Moje rachunki',
      'PAID_PARKING' : 'Parking płatny',
      'LOTTO' : 'LOTTO',
      'MAILBOX' : 'Skrzynka pocztowa',
      'INPOST' : 'Paczkomat INPOST'
    }[str];
  } 

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))?.stsTokenManager?.accessToken}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  function add_price(){
    if(parseJwt(JSON.parse(localStorage.getItem('user'))?.stsTokenManager?.accessToken)?.moderator == true)
    {
      postData("https://palive-api.herokuapp.com/api/fuelPrices/create" , {
      "stationId" : +localStorage.getItem('currentStationID'),
      "type" : document.getElementById('popup_gas_type').value,
      "price" : document.getElementById('popup_add_price_input').value
      })
      geoFindMe();
    } else
    {
      alert('Modyfikacja cen dostępna tylko moderatorów/administratorów');
    }
  }
const validateInput = (e) => {
  const submitPriceBtn = document.querySelector('#popup_add_button');
  submitPriceBtn.disabled = !(e.target.value >= 0.01 && e.target.value <= 9.99);
  console.dir(document.querySelector('#popup_add_button'));
};

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const reportPrice = (e) => {
  postData('https://palive-api.herokuapp.com/api/reports/' + e.target.dataset.priceId)
        .then((response) => {
          switch(response?.status){
            case 201:
              {
                alert("Pomyślnie zgłoszono cenę");
                break;
              }
            case 400:
              {
                alert("Nie możesz zgłosić tę ocenę drugi raz");
                break;
              }
            default:
              {
                alert('Nieznany błąd');
                break;
              }
          }
        })
};

const fetchPriceId = (price) => {
  const tab = price._links.self.href.split('/');
  return tab[tab.length-1];
};