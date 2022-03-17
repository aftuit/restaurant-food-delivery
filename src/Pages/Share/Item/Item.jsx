import React from 'react'

const Item = () => {
    return (
        <div className='share-item-card mt-2'>
            <img src="/assets/img/aksiya.png" alt="" />
            <div className="card--body text-wh">
                <h3 className="font-semibold">Без мяса? Здесь!</h3>
                <p className="font-regular">
                    Самое время попробовать «Сырную» пиццу, «Маргариту»,
                    пиццу «Овощи и грибы», Пасту Четыре сыра, Томатный
                    суп с гренками, Грибной Стартер, Рулетики с сыром,
                    Картофель из печи, Картофельные оладьи или Греческий
                    салат. Выберите свой вкус!
                </p>
            <p className='deadline'>до 31 июля.</p>
            </div>
        </div>
    )
}

export default Item