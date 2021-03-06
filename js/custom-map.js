ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 4,
            behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"],
            controls: ['zoomControl', 'fullscreenControl']
        }, {
            searchControlProvider: 'yandex#search'
        }),

        clusterIcons = [
            {
                href: 'img/m1.png',
                size: [40, 40],
                // Отступ, чтобы центр картинки совпадал с центром кластера.
                offset: [-20, -20]
            },
            {
                href: 'img/m1.png',
                size: [40, 40],
                offset: [-20, -20]
            }],

        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.geoObjects.length]</div>'),

        clusterer = new ymaps.Clusterer({
            clusterIcons: clusterIcons,
            clusterIconContentLayout: MyIconContentLayout,
            /*Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.*/
            groupByCoordinates: false,
            /*Опции кластеров указываем в кластеризаторе с префиксом "cluster".*/
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        }),

        /*шаблон попапа*/
        myBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="c-card-cafe c-card-map">' +
            '<div class="c-card-map__header">' +
            '<span class="popup-close" id="close-balloon"></span>' +
            '<a href="#" class="c-card-map__title">$[properties.name]</a>' +
            '</div>' +
            '<div class="c-card-map__body">' +
            '<div class="c-card-cafe__img">' +
            '<img src="img/cafe-foto.jpg" alt="">' +
            '<a  href="#" class="c-card-cafe__menu">' + '<i class="icon-food-menu"></i>' + 'меню</a>' +
            '</div>' +
            '<div class="c-card-cafe__body">' +
            '<div class="c-card-cafe__item">' + '<b>Адрес: </b>' + '$[properties.address]</div>' +
            '<div class="c-card-cafe__item">' + '<b>Телефон: </b>' + '$[properties.phoneNumber]</div>' +
            '<div class="c-card-cafe__item">' + '<b>Время работы: </b>' + '$[properties.timeWork]</div>' +
            '<div class="c-card-cafe__item c-card-cafe__subway">' +
            '$[properties.subway]' +
            '</div>' +
            '<div class="c-card-cafe__item c-card-cafe__entertainment">$[properties.entertainment]</div>' +
            '<ul class="c-card-cafe-advantages">' +
            '<li class="c-card-cafe-advantages__item"><i class="advantages-coffe"></i></li>' +
            '<li class="c-card-cafe-advantages__item"><i class="advantages-guests"></i>150</li>' +
            '<li class="c-card-cafe-advantages__item"><i class="advantages-teddy"></i></li>' +
            '<li class="c-card-cafe-advantages__item"><i class="advantages-nipple"></i></li>' +
            '<li class="c-card-cafe-advantages__item"><i class="advantages-balloon"></i></li>' +
            '<li class="c-card-cafe-advantages__item"><i class="advantages-umbrella"></i></li>' +
            '<li class="c-card-cafe-advantages__item"><i class="advantages-bottle"></i></li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>', {

                build: function () {
                    this.constructor.superclass.build.call(this);
                    $('.popup-close').bind('click', $.proxy(this.onCloseClick, this));
                },
                clear: function () {
                    $('.popup-close').unbind('click', $.proxy(this.onCloseClick, this));
                    this.constructor.superclass.build.call(this);
                },
                onCloseClick: function () {
                    this.getData().geoObject.balloon.close();
                }
            }),

        getPointOptions = function () {
            return {
                iconImageHref: 'img/icons/icon-map-point.png',
                iconImageSize: [44, 53],
                iconImageOffset: [-22, -56],
                iconLayout: 'default#image',
                balloonLayout: myBalloonLayout,
                balloonOffset: [-107, -280],
                balloonShadow: false,
                balloonAutoPan: false
            };
        },

        placemarks = [
            new ymaps.Placemark([55.74352990795752, 37.56841313754272], {
                name: 'АндерСон для Пап',
                address: 'Московский, ул. Хабарова, дом 2, ТРЦ Новомосковский, вход со стороны пруда',
                phoneNumber: '+7 (495) 125-49-07, +7 (495) 125-49-07',
                timeWork: 'пн-вс с 09:00 до 23:00',
                entertainment: 'Зоопарк, Ледовая Арена, Цирк, Театр кукол, Гулливер, Игровая площадка',
                pic: '',
                subway: '<img src="img/icons/icon-metro-1.png" alt="">Молодежная'
            }, getPointOptions()),

            new ymaps.Placemark([55.8, 37.9], {
                name: 'АндерСон для Пап',
                address: 'Московский, ул. Хабарова, дом 2, ТРЦ Новомосковский, вход со стороны пруда',
                phoneNumber: '+7 (495) 125-49-07, +7 (495) 125-49-07',
                timeWork: 'пн-вс с 09:00 до 23:00',
                entertainment: 'Зоопарк, Ледовая Арена, Цирк, Театр кукол, Гулливер, Игровая площадка',
                pic: '',
                subway: '<img src="img/icons/icon-metro-1.png" alt="">Молодежная'
            }, getPointOptions()),

            new ymaps.Placemark([59, 31], {
                name: 'АндерСон для Пап2',
                address: 'Московский, ул. Хабарова, дом 2, ТРЦ Новомосковский, вход со стороны пруда',
                phoneNumber: '+7 (495) 125-49-07, +7 (495) 125-49-07',
                timeWork: 'пн-вс с 09:00 до 23:00',
                entertainment: 'Зоопарк, Ледовая Арена, Цирк, Театр кукол, Гулливер, Игровая площадка',
                pic: '',
                subway: '<img src="img/icons/icon-metro-1.png" alt="">Молодежная'
            }, getPointOptions()),

            new ymaps.Placemark([57, 34], {
                name: 'на Класносельской',
                address: 'Московский, ул. Хабарова, дом 2',
                phoneNumber: '+7 (495) 125-49-07, +7 (495) 125-49-07',
                timeWork: 'пн-вс с 09:00 до 23:00',
                entertainment: 'Зоопарк, Ледовая Арена, Цирк, Театр кукол, Гулливер, Игровая площадка',
                pic: '',
                subway: '<img src="img/icons/icon-metro-1.png" alt="">Молодежная'
            }, getPointOptions()),

            new ymaps.Placemark([60, 40], {
                name: 'Тестовое кафе ',
                address: 'Московский, ул. Хабарова, дом 2б Московский, ул. Хабарова, дом 2',
                phoneNumber: '+7 (495) 125-49-07, +7 (495) 125-49-07',
                timeWork: 'пн-вс с 09:00 до 23:00',
                entertainment: 'Зоопарк, Ледовая Арена, Цирк, Театр кукол, Гулливер, Игровая площадка',
                pic: '',
                subway: '<img src="img/icons/icon-metro-1.png" alt="">Молодежная'
            }, getPointOptions())
        ];

    // myMap.behaviors.disable('multiTouch');
    // myMap.behaviors.disable('drag');
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // после вызова карты
    if (isMobile.any()) {
        myMap.behaviors.disable('drag');
    }

    myMap.geoObjects.events.add([
        'balloonopen'
    ], function (e) {
        var geoObject = e.get('target');
        myMap.panTo(geoObject.geometry.getCoordinates(), {
            delay: 0
        });
    });

    clusterer.options.set({
        gridSize: 80,
        clusterDisableClickZoom: false
    });

    // В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
    clusterer.add(placemarks);
    myMap.geoObjects.add(clusterer);

    // Спозиционируем карту так, чтобы на ней были видны все объекты.
    // myMap.setBounds(clusterer.getBounds(), {
    //     checkZoomRange: true
    // });


});


ymaps.ready(init);

function init() {
    /*--------------------------------------------------------------------*/
    var mapDelivery = new ymaps.Map('order-delivery__map', {
            center: [55.73, 37.75],
            zoom: 9,
            behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"],
            controls: ['zoomControl', 'fullscreenControl']
        },
        {
            searchControlProvider: 'yandex#search'
        });
    var mapPickup = new ymaps.Map('order-pickup__map', {
            center: [55.73, 37.75],
            zoom: 9,
            behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"],
            controls: ['zoomControl', 'fullscreenControl']
        },
        {
            searchControlProvider: 'yandex#search'
        });

    var mapDeliveryCake = new ymaps.Map('order-cake-delivery__map', {
            center: [55.73, 37.75],
            zoom: 9,
            behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"],
            controls: ['zoomControl', 'fullscreenControl']
        },
        {
            searchControlProvider: 'yandex#search'
        });

    var mapPickupCake = new ymaps.Map('order-cake-pickup__map', {
            center: [55.73, 37.75],
            zoom: 9,
            behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"],
            controls: ['zoomControl', 'fullscreenControl']
        },
        {
            searchControlProvider: 'yandex#search'
        });

    var cakePageOrder = new ymaps.Map('cake-order__map', {
            center: [55.73, 37.75],
            zoom: 9,
            behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"],
            controls: ['zoomControl', 'fullscreenControl']
        },
        {
            searchControlProvider: 'yandex#search'
        });

    var deliveryCollection = new ymaps.GeoObjectCollection(),
        pickupCollection = new ymaps.GeoObjectCollection(),
        deliveryCakeCollection = new ymaps.GeoObjectCollection(),
        pickupCakeCollection = new ymaps.GeoObjectCollection(),
        cakePageOrderCollection = new ymaps.GeoObjectCollection(),

        placemarksOrder = [
            [55.74352990795752, 37.56841313754272],
            [55.8, 37.9],
            [59, 31],
            [57, 34],
            [60, 40]
        ];

    function addPlacemark(collection) {
        for (var i = 0, l = placemarksOrder.length; i < l; i++) {
            collection.add(new ymaps.Placemark(placemarksOrder[i], {
                iconContent: "Кафе АндерСон на Красносельской"
            }, {
                iconLayout: 'default#image',
                iconImageHref: '../img/icon-map-point.png',
                // iconImageHref: 'https://image.ibb.co/fpL27R/icon_map_point.png',
                iconImageSize: [44, 53],
                iconImageOffset: [-5, -38]
            }));
        }
    }

    addPlacemark(deliveryCollection);
    addPlacemark(pickupCollection);
    addPlacemark(deliveryCakeCollection);
    addPlacemark(pickupCakeCollection);
    addPlacemark(cakePageOrderCollection);


    mapDelivery.geoObjects.add(deliveryCollection);
    mapPickup.geoObjects.add(pickupCollection);
    mapDeliveryCake.geoObjects.add(deliveryCakeCollection);
    mapPickupCake.geoObjects.add(pickupCakeCollection);
    cakePageOrder.geoObjects.add(cakePageOrderCollection);


}

function loftMap(){
    /*карта в экскурсиях*/
    ymaps.ready(function () {
        /**/
        var loftMap = new ymaps.Map('loft-map', {
                center: [55.780026, 37.715920],
                zoom: 15,
                behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"],
            }, {
                searchControlProvider: 'yandex#search'
            }),

            loftPlacemark = new ymaps.Placemark([55.780026, 37.715920], {
                hintContent: 'Лофт'
            }, {
                iconLayout: 'default#image',
                iconImageHref: './img/icon-map-point.png',
                iconImageSize: [44, 53],
                iconImageOffset: [-5, -38]
            });

        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };

        if (isMobile.any()) {
            loftMap.behaviors.disable('drag');
        }

        loftMap.geoObjects
            .add(loftPlacemark);
    });
}

loftMap();

