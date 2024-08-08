



/* Funções de leitura - Início */

function read_userdata() {

    const user_data_setup = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.github.com/users/Mateus-Resende-Ottoni",
        "method": "GET",
        "headers": {
            "Accept": "*/*"

        }
    };

    $.ajax(user_data_setup).done(function (user_data) {
        set_user(user_data);
    });
}


function read_userforumdata() {

    const user_repos_setup = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.github.com/users/Mateus-Resende-Ottoni/repos",
        "method": "GET",
        "headers": {
            "Accept": "*/*"

        }
    };

    $.ajax(user_repos_setup).done(function (user_repos) {
        set_repositories(user_repos);
    });
}


function read_JSONdata() {

    const user_JSON_setup_recommend = {
        "dataType": "json",
        "url": "/recomendacoes",
        "method": "GET",
        "headers": {
            "Accept": "*/*"

        }
    };

    const user_JSON_setup_people = {
        "dataType": "json",
        "url": "/colegas",
        "method": "GET",
        "headers": {
            "Accept": "*/*"

        }
    };

    const user_JSON_setup_user = {
        "dataType": "json",
        "url": "/autor",
        "method": "GET",
        "headers": {
            "Accept": "*/*"

        }
    };

    $.ajax(user_JSON_setup_recommend).done(function (user_JSON_recommend) {
        set_recommendations(user_JSON_recommend);
    });

    $.ajax(user_JSON_setup_people).done(function (user_JSON_people) {
        set_people(user_JSON_people);
    });

    $.ajax(user_JSON_setup_user).done(function (user_JSON_user) {
        $(".email p").text(user_JSON_user.email);
    });
}


/* Funções de leitura - Fim */





/* Funções de inserção - Início */

function set_user(Dados) {

    $("#autor").attr("src", Dados.avatar_url);

    $(".dados a h3").text(Dados.name);

    $(".seguidores h6").text(Dados.followers);

    $(".descrição").text(Dados.bio);

    $(".localização p").text(Dados.location);
    $(".site a p").text(Dados.html_url);
    $(".site a p").attr("href", Dados.html_url);

    //$(".email p").text(Dados.email);

}


function set_repositories(Dados) {

    for (let x = 0; x < Dados.length; x = x + 1) {
        $('#repositórios').append('<div class="col"> \
                <div class="card"> \
                <div class="card-body"> \
                    <h5 class="card-title"><a href="repo.html">Titulo</a></h5> \
                    <p class="card-text">Descrição.</p> </div> \
                <div class="icones_repositorio"> \
                    <i class="fa-regular fa-star"></i> <h6 class="n_stars">01</h6> \
                    <i class="fa-regular fa-user"></i> <h6 class="n_watchers">01</h6> \
                </div> </div> </div>')
    }

    for (let x = 0; x < Dados.length; x = x + 1) {
        $(".card-title a").eq(x).text(Dados[x].name);
        $(".card-title a").eq(x).attr("href", "repo.html?repoID=".concat(Dados[x].id));

        $(".card-text").eq(x).text(Dados[x].description);

        $(".n_stars").eq(x).text(Dados[x].stargazers_count);
        $(".n_watchers").eq(x).text(Dados[x].watchers_count);
    }

}


function set_recommendations(DadosJSON) {

    for (let x = 0; x < DadosJSON.length; x = x + 1) {
        if (x == 0) {
            $('.carousel-inner').append('<div class="carousel-item active"> \
                <a href="#" target="_blank"> \
                    <img src="#" class="d-block w-100" alt="..."> \
                    <div class="carousel-caption d-none d-md-block"> \
                        <h5>Titulo</h5> \
                    </div> \
                </a> </div>');
        }
        else {
            $('.carousel-inner').append('<div class="carousel-item"> \
                <a href="#" target="_blank"> \
                    <img src="#" class="d-block w-100" alt="..."> \
                    <div class="carousel-caption d-none d-md-block"> \
                        <h5>Titulo</h5> \
                    </div> \
                </a> </div>');
        }
    }

    for (let x = 0; x < DadosJSON.length; x = x + 1) {
        $(".carousel-item a").eq(x).attr("href", DadosJSON[x].link);

        $(".carousel-item a img").eq(x).attr("src", "./assets/images/".concat(DadosJSON[x].imagem));

        $(".carousel-caption h5").eq(x).text(DadosJSON[x].titulo);
    }

    for (let x = 0; x < DadosJSON.length; x = x + 1) {
        if (x == 0) {
            $('.carousel-indicators').append('\
            <button type="button" data-bs-target="#slides" \
            data-bs-slide-to="'.concat(x).concat('"class="active" \
            aria-current="true" \
            aria-label="Slide ').concat(x + 1).concat('"></button>'));
        }
        else {
            $('.carousel-indicators').append('\
            <button type="button" data-bs-target="#slides" \
            data-bs-slide-to="'.concat(x).concat('"\
            aria-label="Slide ').concat(x + 1).concat('"></button>'));
        }
    }

}


function set_people(DadosJSON) {
    console.log(DadosJSON);


    for (let x = 0; x < DadosJSON.length; x = x + 1) {
        $('#colaboradores').append(' \
        <div class="col colaborador"> \
            <a href="#" target="_blank"> \
                <img src="foto_02.jpeg" alt="Colaborador" class="pessoa"> \
                <h5>Bernardo Souza Polakiewicz</h5> \
            </a> \
        </div>')
    }

    for (let x = 0; x < DadosJSON.length; x = x + 1) {
        if ((DadosJSON[x].foto).search('https') != -1) {
            $('.colaborador a img').eq(x).attr("src", DadosJSON[x].foto);
        }
        else {
            $('.colaborador a img').eq(x).attr("src", "./assets/images/".concat(DadosJSON[x].foto));
        }

        $('.colaborador a h5').eq(x).text(DadosJSON[x].nome);

        $('.colaborador a').eq(x).attr("href", DadosJSON[x].link_Git);
        if (DadosJSON[x].link_Git == null) {
            $('.colaborador a').eq(x).attr("href", "#");
        }
    }
}

/* Funções de inserção - Fim */



$(document).ready(function () {

    read_userdata();
    read_userforumdata();
    read_JSONdata();

})