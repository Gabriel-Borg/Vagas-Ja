// MENU TRANSIÇÃO
const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
})

function redirecionar() {
    window.location.href = '#';
}

// Encontra a chave da API
const key = window.process.env.API_KEY;

// Função para carregar o script do Google Maps dinamicamente
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

    // Adicionar input de busca com autocomplete
    var input = document.getElementById('location-input');
    if (google.maps.places) {
        // Se google.maps.places estiver definido, é seguro acessar SearchBox
        searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    } else {
        // Se google.maps.places não estiver definido, faça algo para lidar com isso, como exibir uma mensagem de erro
        console.error('google.maps.places is not defined');
    }

    // Detectar se o usuário está em um dispositivo móvel
    isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    // Adicionar listener para atualizar o mapa quando o usuário seleciona um lugar
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        // Limpar os marcadores existentes antes de adicionar novos
        clearMarkers();

        // Criar marcador para cada lugar selecionado
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Localização retornada não contém geometria");
                return;
            }
            createMarker(place);
        });

        // Centralizar o mapa no primeiro lugar encontrado
        map.setCenter(places[0].geometry.location);
    });

    // Definir infowindow globalmente
    infowindow = new google.maps.InfoWindow();

    // Adicionar listener para buscar estacionamentos quando o botão for clicado
    document.getElementById('search').addEventListener('click', searchNearby);
};

function searchNearby() {
    var location = map.getCenter(); // Usar o centro do mapa como local padrão

    var request = {
        location: location,
        radius: '300', // Raio de busca em metros
        type: ['parking'] // Tipo de lugar para buscar (neste caso, estacionamentos)
    };

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Limpar os marcadores existentes antes de adicionar novos
            clearMarkers();

            // Adicionar marcadores para cada estacionamento encontrado
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    });
}

function createMarker(place) {
    var icon = {
        url: 'image/pin.png', // Ícone amarelo
        scaledSize: new google.maps.Size(32, 32) // Tamanho do ícone
    };

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: icon // Define o ícone personalizado
    });
    markers.push(marker);

    // Verificar se o usuário está em um dispositivo móvel
    if (isMobile) {
        // Adicionar listener de click para mostrar informações no dispositivo móvel
        marker.addListener('click', function () {
            showParkingInfo(place);
        });
    } else {
        // Adicionar listener de mouseover para mostrar informações no desktop
        marker.addListener('mouseover', function () {
            showParkingInfo(place);
        });
    }
}

// Modifique a função showParkingInfo(place)
function showParkingInfo(place) {
    var infoContent = '<div style="max-width: 300px;">'; // Limitar largura para melhor visualização

    var infoContent = '<div><strong>' + place.name + '</strong><br>' +
        'Endereço: ' + place.vicinity + '<br>';

    // Criar uma solicitação de detalhes do lugar
    var request = {
        placeId: place.place_id,
        fields: ['opening_hours', 'utc_offset_minutes']
    };

    // Obter detalhes do lugar
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
                        }
                        else {
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
        // Atualize o conteúdo do elemento HTML com as informações do estacionamento
        document.getElementById('parking-info').innerHTML = infoContent;

        // Exiba o elemento HTML
        document.getElementById('parking-info').style.display = 'block';
    });
}

// Função para limpar marcadores
function clearMarkers() {
    for (var i = 0; i < markers
.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];

    // Esconda o elemento HTML
    document.getElementById('parking-info').style.display = 'none';
}

// Exemplo de dados dos estacionamentos (substitua isso com seus próprios dados)
const estacionamentos = [
    { nome: 'Estacionamento A', endereco: 'Rua A, 123', vagasDisponiveis: 10 },
    { nome: 'Estacionamento B', endereco: 'Rua B, 456', vagasDisponiveis: 5 },
    { nome: 'Estacionamento C', endereco: 'Rua C, 789', vagasDisponiveis: 8 }
];

// Função para exibir estacionamentos na lista
function exibirEstacionamentos() {
    const listaEstacionamentos = document.querySelector('.lista-estacionamentos');

    // Limpar lista antes de adicionar novos estacionamentos
    listaEstacionamentos.innerHTML = '';

    // Adicionar cada estacionamento à lista
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

// Chamada da função para exibir os estacionamentos na inicialização
exibirEstacionamentos();