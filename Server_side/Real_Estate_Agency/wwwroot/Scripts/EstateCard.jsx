function BuildCard(props) {
    console.log(props.toggleFavorite);

    return <div class='estateCard'>
        <div hidden>{props.id}</div>
        <div class='cardMainInfo'></div>
        <div>
            <div class='estName'>{props.name}</div>
            <label>Цена: </label>{props.price}
        </div>
        <div class='cardDetails'>
            <div>
                <label>Площадь: </label>{props.size}
            </div>
            <div>
                <label>Кол-во комнат: </label>{props.roomCount}
            </div>
            <div>
                <label>Адрес: </label>{props.address}
            </div>
        </div>
        <div class='cardContacts'>
            <div>
                <label>Опубликовал(-а): </label>{props.author.name}
            </div>
            <div>
                <label>Контакты: </label>{props.author.phone}
            </div>
        </div>
        {props.photos.length && (
            <>
                <Favourite toggleFavorite={props.toggleFavorite} id={props.id} />
                <EstateImage photos={props.photos} />
            </>
        )};
    </div>

}

function Favourite(props) {
    const isFav = () => {
        return favsJs.includes(props.id) ? 'favPinEnable' : 'favPinDisable';
    };

    return <div>
        <img className={isFav()} src='/Images/heart.png' onClick={props.toggleFavorite(props.id, this)} />
    </div>
}

function EstateImage(props) {
    return props.photos.map(p => (
        <img src={p.photoUrl} />
    ));
}
function Hello() {
    return <h1>Hello</h1>;
}