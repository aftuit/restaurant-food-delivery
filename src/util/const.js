import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import WindowIcon from '@mui/icons-material/Window';
import HandymanIcon from '@mui/icons-material/Handyman';
import ElectricRickshawIcon from '@mui/icons-material/ElectricRickshaw';

export const API_URL = "https://dev716.pythonanywhere.com";
export const language = {
    uz: {
        goBack: 'Orqaga qaytish',
        navbar: {
            contact: 'Aloqa',
            cart: 'Savatcha'
        },
        storeTitle: {
            prof: 'Profil',
            acces: 'Aksessuarlar',
        },
        filter: ['Alyumin', 'PVH', 'Thermo', 'Stanok va uskunalar'],
        service: {
            title: 'Bizning xizmatlarimiz',
            info: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Tempora neque blanditiis et ratione1, ad eum sit est non corporis fugit, 
                    itaque temporibus architecto, labore in iure earum optio asperiores omnis 
                    cumque exercitationem molestiae harum repellendus? Suscipit doloribus omnis 
                    error dicta earum. Dolores, eius possimus modi minus quibusdam repudiandae. 
                    A dolorum id nihil officia, minima hic? Nostrum illo itaque molestiae dicta.`,
            adding: [
                {id: 1, icon: <MeetingRoomIcon/>, title: 'Ajoyib tanlov'},
                {id: 2, icon: <WindowIcon/>, title: 'Yuqori sifat'},
                {id: 3, icon: <HandymanIcon/>, title: 'Yaxshi mahsulot'},
                {id: 4, icon: <ElectricRickshawIcon/>, title: 'Yetkazib berish'},
            ]

        },
        contact: {
            title: 'Biz bilan aloqa',
            address: {
                title: 'Manzil:',
                info: 'Toshkent shahar Sergeli rayoni 27-А Jun Ariq\n' +
                    'Р/С 2020 8000 3050 4775 4001\n' +
                    'ATIB Ipoteka banki Yakkasaroy filyal\n' +
                    'МФО 010017 ИНН: 306 275 341 ОКЭД: 25120',
                link: "Xaritadan ko'rish",
            },
            email: {
                title: 'Pochta:',
                info: 'Tauto.wash@gmail.com'
            },
            btn: {
                btn: 'Biz bilan aloqa',
                info: 'Qo\'ng\'iroq qiling yoki so\'rov qoldiring'
            },
        },
        footer: {
            address: 'OOO «BILLUR BURGUT PARVOZI»\n' +
                'г. Ташкент Сергелийский р-н Джун Арык 27-А\n' +
                'в АТИБ Ипотека банк Яккасарайский ф-л\n' +
                'Р/С 2020 8000 3050 4775 4001\n' +
                'МФО 010017 ИНН: 306 275 341 ОКЭД: 25120',
            links: ['Yetkazib berish', 'Savatcha']
        },
        card: {
            save: 'saqlash',
        },
        cart: {
            title: 'SAQLANMALAR',
            empty: {
                title: 'Savatchaga saqlangan mahsulotlar mavjud emas',
                menu: 'Manyu',
                go: ' ga qaytish'
            },
            soum: "so'm",
            card: {
                save: 'Savatga saqlash',
                delete: "Savatdan o'chirish",
            },
            delete: "O'chirish",
            total: 'Jami: ',
            btn: 'Buyurtma qilish',
            modal: {
                title: "Savatcha bo'sh",
                btn: 'Menyuga qaytish',
            }
        },
        order: {
            title: 'BUYURTMA',
            contact: {
                title: "Kontakt ma'lumotlari",
                name: 'Ismingiz',
                tel: 'Telefon raqam',
            },
            deliver: {
                title: 'Yetkazish',
                btn1: 'Yetkazib berish',
                btn2: 'Borib olish',
            },
            address: {
                title: "Manzilingiz",
                dist: {
                    title: "Tuman",
                    obl: [
                        {val: 'BEKTEMIR', name: 'Bektemir'},
                        {val: 'MIROBOD', name: 'Mirobod'},
                        {val: 'MIRZO ULUGBEK', name: 'Mirzo Ulug\'bek'},
                        {val: 'CHILONZOR', name: 'Chilonzor'},
                        {val: 'OLMAZOR', name: 'Olmazor'},
                        {val: 'SERGELI', name: 'Sergeli'},
                        {val: 'SHAYHONTOHUR', name: 'Shayhontohur'},
                        {val: 'YAKKASAROY', name: 'Yakkasaroy'},
                        {val: 'YASHNAOBOD', name: 'Yashnabod'},
                        {val: 'YUNUSOBOD', name: 'Yunusobod'},
                    ]
                },
                street: "Ko'cha nomi",
                flat: 'Xonadon raqami',
                comment: 'Izoh qoldiring',

            },
            payment: {
                title: "To'lov",
                btn1: 'Naqd pulda',
                btn2: 'Karta orqali',
            },
            call: {
                title: "Qo'ng'rioq qilishimizni xohlaysizmi?",
                opt1: 'Hodim qo\'ng\'irog\'i talab qilinadi',
                opt2: 'Yo\'q shart emas',
            },
            btn: 'Yuborish',
            modal: {
                title: "To'lov",
                input: 'Karta raqami',
                label: '16 xonali karta raqamingizni kiriting!',
            },
        },
        delivery: {
            title: 'YETKAZIB BERISH TARTIBI',
            points: [
                {id: 1, title: 'lorem ipsum dore', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.'},
                {id: 2, title: 'lorem ipsum dore', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.'},
                {id: 3, title: 'lorem ipsum dore', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.'},
                {id: 4, title: 'lorem ipsum dore', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.'},
            ],
            time: {
                title: 'Ish vaqti:',
            }
        }
    },
    ru: {
        goBack: 'Вернуться назад',
        navbar: {
            contact: 'Контакты',
            cart: 'Корзина'
        },
        storeTitle: {
            prof: 'Профиль',
            acces: 'Аксессуары',
        },
        filter: ['Алюминий', 'ПВХ', 'Термо', 'Станок и оборудование'],
        service: {
            title: 'Bizning xizmatlarimiz',
            info: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Tempora neque blanditiis et ratione1, ad eum sit est non corporis fugit, 
                    itaque temporibus architecto, labore in iure earum optio asperiores omnis 
                    cumque exercitationem molestiae harum repellendus? Suscipit doloribus omnis 
                    error dicta earum. Dolores, eius possimus modi minus quibusdam repudiandae. 
                    A dolorum id nihil officia, minima hic? Nostrum illo itaque molestiae dicta.`,
            adding: [
                {id: 1, icon: <MeetingRoomIcon/>, title: 'Хороший выбор'},
                {id: 2, icon: <WindowIcon/>, title: 'Высокое качество'},
                {id: 3, icon: <HandymanIcon/>, title: 'Хороший товар'},
                {id: 4, icon: <ElectricRickshawIcon/>, title: 'Доставка'},
                    ]
        },
        contact: {
            title: 'КОНТАКТЫ',
            address: {
                title: 'Наш адрес:',
                info: 'Toshkent shahar Sergeli rayoni 27-А Jun Ariq\n' +
                    'Р/С 2020 8000 3050 4775 4001\n' +
                    'ATIB Ipoteka banki Yakkasaroy filyal\n' +
                    'МФО 010017 ИНН: 306 275 341 ОКЭД: 25120',
                link: 'посмотреть на карте',
            },
            email: {
                title: 'Наша почта:',
                info: 'Tauto.wash@gmail.com'
            },
            btn: {
                btn: 'Перезвоните нам',
                info: 'Звоните или оставляйте заявку'
            },
        },
        footer: {
            address: 'OOO «BILLUR BURGUT PARVOZI»\n' +
                'г. Ташкент Сергелийский р-н Джун Арык 27-А\n' +
                'в АТИБ Ипотека банк Яккасарайский ф-л\n' +
                'Р/С 2020 8000 3050 4775 4001\n' +
                'МФО 010017 ИНН: 306 275 341 ОКЭД: 25120',
            links: ['Условия доставки', 'Корзина']
        },
        card: {
            save: 'В корзину',
        },
        cart: {
            title: 'КОРЗИНА',
            empty: {
                title: 'В корзине нет товаров',
                menu: 'Меню',
                go: '',
            },
            card: {
                save: 'В корзину',
                delete: "Удалить из корзины",
            },
            delete: "Удалить",
            total: 'Итого: ',
            soum: 'сўм',
            btn: 'Оформить заказ',
            modal: {
                title: "КОРЗИНА ПУСТАЯ",
                btn: 'Посмотреть меню',
            }
        },
        order: {
            title: 'Оформление заказа',
            contact: {
                title: 'Контактная информация',
                name: 'Имя',
                tel: 'Телефон',
            },
            deliver: {
                title: 'Доставка',
                btn1: 'Доставка',
                btn2: 'Самовывоз',
            },
            address: {
                title: "Адрес доставки",
                dist: {
                    title: "Выбор района",
                    obl: [
                        {val: 'BEKTEMIR', name: 'Бектемир'},
                        {val: 'MIROBOD', name: 'Мирабад'},
                        {val: 'MIRZO ULUGBEK', name: 'Мирзо Улугбек'},
                        {val: 'CHILONZOR', name: 'Чиланзар'},
                        {val: 'OLMAZOR', name: 'Алмазар'},
                        {val: 'SERGELI', name: 'Сергели'},
                        {val: 'SHAYHONTOHUR', name: 'Шайхонтохур'},
                        {val: 'YAKKASAROY', name: 'Яккасарой'},
                        {val: 'YASHNAOBOD', name: 'Яшнабод'},
                        {val: 'YUNUSOBOD', name: 'Юнусабад'},
                    ]
                },
                street: "Укажите улицу",
                flat: 'Номер дома',
                comment: 'Комментарий',

            },
            payment: {
                title: "Оплатить",
                btn1: 'Наличными',
                btn2: 'Курьеру картой',
            },
            call: {
                title: "Хотите мы позвоним?",
                opt1: 'Потребуется звонок оператора',
                opt2: 'Не перезванивать',
            },
            btn: 'Оформить заказ',
            modal: {
                title: "Оплатить",
                input: 'Номер карты',
                label: 'Введите 16-значный номер карты!',
            },
        },
        delivery: {
            title: 'Условия доставки',
            points: [
                {id: 1, title: 'lorem ipsum dore', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.'},
                {id: 2, title: 'lorem ipsum dore', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.'},
                {id: 3, title: 'lorem ipsum dore', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.'},
                {id: 4, title: 'lorem ipsum dore', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.'},
            ],
            time: {
                title: 'График работы: ',
            }
        }
    },
};