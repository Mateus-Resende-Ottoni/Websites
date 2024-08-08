

function read_page_ID(Dados) {
    let repo_em_busca = true;
    let repo_number = 0;

    let url = new URL(window.location.href);

    let getrepoID = new URLSearchParams(url.search);
    let repoID = getrepoID.get('repoID');
    if (repoID == 0 || repoID == null) { repoID = 765736731; }

    while (repo_em_busca) {
        if (Dados[repo_number].id == repoID) {
            repo_em_busca = false;
        }
        else {
            repo_number = repo_number + 1;
        }
    }

    return (repo_number);
}



function read_repo_data() {

    const repos_setup = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.github.com/users/Mateus-Resende-Ottoni/repos",
        "method": "GET",
        "headers": {
            "Accept": "*/*"

        }
    };

    $.ajax(repos_setup).done(function (repos_data) {
        let repo_number = read_page_ID(repos_data);
        set_menu(repos_data);
        set_repo(repos_data, repo_number);
    });
}


function set_menu(Dados) {

    for (let x = 0; x < Dados.length; x = x + 1) {
        $(".menu_seções").append('\
                <li><button>\
                    <a href="repo.html">Item do menu</a>\
                </button></li>');

        $(".menu_seções li button a").eq(x).attr("href", "repo.html?repoID=".concat(Dados[x].id));

        $(".menu_seções li button a").eq(x).text(Dados[x].name);
    }

    // To remove Mateus-Resende-Ottoni
    for (let x = 0; x < Dados.length; x = x + 1) {
        if (Dados[x].id == 765727276) {
            $(".menu_seções li").eq(x).remove();
        }
    }

}


function set_repo(Dados, repo_number) {
    data = Dados[repo_number];


    $(".título h2").text("Repositório: ".concat(data.name));



    $(".estatísticas h6").eq(0).text(data.stargazers_count);

    $(".estatísticas h6").eq(1).text(data.watchers_count);

    $(".estatísticas h6").eq(2).text(data.forks_count);



    $(".descrição_repositório p").text(data.description);

    let dia = data.created_at.charAt(8).concat(data.created_at.charAt(9));
    let mes = data.created_at.charAt(5).concat(data.created_at.charAt(6));
    let ano = data.created_at.charAt(0).concat(data.created_at.charAt(1)).concat(data.created_at.charAt(2)).concat(data.created_at.charAt(3));
    $(".data_criação p").text(dia.concat("/").concat(mes).concat("/").concat(ano));

    if (data.license) {
        $(".licença p").text(data.license.name);
    }
    else {
        $(".licença p").text("Não possui licença");
    }

    if (data.language) {
        $(".linguagem p").text(data.language);
    }
    else {
        $(".linguagem p").text("Não possui uma linguagem principal");
    }



    $(".proprietário a").attr("href", data.owner.html_url);

    $(".proprietário a img").attr("src", data.owner.avatar_url);

    $(".proprietário a h4").text(data.owner.login);




    $(".link a").attr("href", data.html_url);

    $(".link a p").text(data.html_url);



    for (let x = 0; x < data.topics.length; x = x + 1) {
        $(".lista_tópicos").append('<li>Tópico</li>')

        $(".lista_tópicos li").eq(x).text(data.topics[x]);
    }
}


$(document).ready(function () {
    read_repo_data();

})