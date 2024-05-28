// Encontra a chave da API
const key = window.process.env.API_KEY;

async function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
}

// Chamar a função para carregar o script
window.addEventListener('load', loadGoogleMapsScript);

var map;
var markers = [];
var searchBox;
var infowindow;
var isMobile;

// Função de inicialização do mapa, chamada pelo callback do Google Maps
window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.55052, lng: -46.633308 }, // Centro de São Paulo
        zoom: 15,
        disableDefaultUI: true
    });

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var styles = JSON.parse(xhr.responseText);
            // Atribua os estilos ao mapa
            map.setOptions({ styles: styles });
        }
    };
    xhr.open('GET', 'js/styles.json');
    xhr.send();

    var input = document.getElementById('location-input');
    if (google.maps.places) {
        searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    } else {
        console.error('google.maps.places is not defined');
    }

    isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        clearMarkers();

        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Localização retornada não contém geometria");
                return;
            }
            createMarker(place);
        });

        map.setCenter(places[0].geometry.location);
    });

    infowindow = new google.maps.InfoWindow();

    document.getElementById('search').addEventListener('click', searchNearby);

    // Pega o valor da URL e realiza a busca automática
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        document.getElementById('location-input').value = searchQuery;
        google.maps.event.trigger(searchBox, 'places_changed');
    }
};

function searchNearby() {
    var location = map.getCenter();

    var request = {
        location: location,
        radius: '300',
        type: ['parking']
    };

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers();

            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    });
}

function createMarker(place) {
    var icon = {
        url: 'image/pin.png',
        scaledSize: new google.maps.Size(32, 32)
    };

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: icon
    });
    markers.push(marker);

    if (isMobile) {
        marker.addListener('click', function () {
            showParkingInfo(place);
        });
    } else {
        marker.addListener('mouseover', function () {
            showParkingInfo(place);
        });
    }
}

function showParkingInfo(place) {
    var infoContent = '<div style="max-width: 300px;"><strong>' + place.name + '</strong><br>' +
        'Endereço: ' + place.vicinity + '<br>';

    var request = {
        placeId: place.place_id,
        fields: ['opening_hours', 'utc_offset_minutes']
    };

    var service = new google.maps.places.PlacesService(map);
    service.getDetails(request, function (details, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (details.opening_hours) {
                if (details.opening_hours.isOpen()) {
                    infoContent += 'Aberto agora<br>';
                } else {
                    infoContent += 'Fechado no momento<br>';
                }

                if (details.opening_hours.periods && details.opening_hours.periods.length > 0) {
                    infoContent += 'Horário de Funcionamento:<br>';
                    for (var i = 0; i < details.opening_hours.periods.length; i++) {
                        var period = details.opening_hours.periods[i];
                        if (period.open && period.close) {
                            infoContent += 'Aberto das ' + period.open.time + ' às ' + period.close.time + '<br>';
                        } else {
                            infoContent += 'Aberto 24 horas<br>';
                        }
                    }
                }
            } else {
                infoContent += 'Horário de Funcionamento: Informações não disponíveis<br>';
            }
        }

        infoContent += 'Quantidade de vagas: 50<br>';
        infoContent += 'Preço: R$ 5,00/hora<br>';
        infoContent += '<button onclick="window.location.href=\'selecionar.html\'">Selecionar</button></div>';
        document.getElementById('parking-info').innerHTML = infoContent;
        document.getElementById('parking-info').style.display = 'block';
    });
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    document.getElementById('parking-info').style.display = 'none';
}

const estacionamentos = [
    { nome: 'Estacionamento A', endereco: 'Rua A, 123', vagasDisponiveis: 10 },
    { nome: 'Estacionamento B', endereco: 'Rua B, 456', vagasDisponiveis: 5 },
    { nome: 'Estacionamento C', endereco: 'Rua C, 789', vagasDisponiveis: 8 }
];

function exibirEstacionamentos() {
    const listaEstacionamentos = document.querySelector('.lista-estacionamentos');
    listaEstacionamentos.innerHTML = '';
    estacionamentos.forEach(estacionamento => {
        const itemEstacionamento = document.createElement('div');
        itemEstacionamento.classList.add('lista-estacionamentos-item');
        itemEstacionamento.innerHTML = `
            <h3>${estacionamento.nome}</h3>
            <p><strong>Endereço:</strong> ${estacionamento.endereco}</p>
            <p><strong>Vagas Disponíveis:</strong> ${estacionamento.vagasDisponiveis}</p>
            <button class="selecionar-btn">Selecionar</button>
        `;
        listaEstacionamentos.appendChild(itemEstacionamento);
    });
}

exibirEstacionamentos();