var repositorios = document.querySelector('#lista-repo');
var starreds = document.querySelector('#lista-starred');
var detalhes = document.querySelector('#lista-detalhe')

function buscaUser(f){

    let usuario = f.pesquisaUser.value;
    f.pesquisaUser.value='';
    hideDivResultado();

    $.getJSON(`https://api.github.com/users/${usuario}`, function(data) {
        showDivResultado();
        buscarDados(usuario);
        showUser(data);
        showDetalhes(data);

        
    }).fail(function(){
        alert("Usuário não encontrado")
        window.location.reload()
        
    })
     
}
function buscarDados(usuario){
    $.getJSON(`https://api.github.com/users/${usuario}/repos`, function(data) {
        let dadosRepositorios = data;
       showRepositorios(dadosRepositorios);
    })

    $.getJSON(`https://api.github.com/users/${usuario}/starred`, function(data) {
        owner:'octocat'
        repo:'hello-world'
        let dadoStarred = data;
     showStarred(dadoStarred);
    })
}
function showUser(dadosUsuario){
    let titleResult = document.querySelector('#title-resultado');
    titleResult.innerHTML = '';
    let nickname = dadosUsuario.login;    
    $('#title-resultado').append(`User: ${nickname}`);  
    
    let img = document.querySelector(".avatar-img");
    img.src=dadosUsuario.avatar_url;
    $(img).addClass("rounded-circle");
    
}
function showRepositorios(dadosRepositorios){
    repositorios.innerHTML = '';
    let tamanho = dadosRepositorios.length;
    if(tamanho==0){
        let repositorio = document.createTextNode("Nenhum repositório encontrado");
        let newRepositorio = document.createElement('li');
        newRepositorio.appendChild(repositorio);
        repositorios.appendChild(newRepositorio);
    }
    else{
        for (let i = 0; i < tamanho; i++){
            let repositorio = document.createTextNode(dadosRepositorios[i].name);
            let newRepositorio = document.createElement('li');
            newRepositorio.appendChild(repositorio);
            repositorios.appendChild(newRepositorio);
        }
    }
}

function showStarred(dadosStarred){
    starreds.innerHTML = ' ';
    var tamanho = dadosStarred.length;
    if(tamanho==0){
        let starred = document.createTextNode("Nenhum visitado encontrado");
        let newStarred = document.createElement('li');
        newStarred.appendChild(starred);
        starreds.appendChild(newStarred);
    }
    else{
        for (var i = 0; i < tamanho; i++){
            let starred = document.createTextNode(dadosStarred[i].name);
            let newStarred = document.createElement('li');
            newStarred.appendChild(starred);
            starreds.appendChild(newStarred);
        }
    }
}
function showDetalhes(dadosUsuario){
    detalhes.innerHTML = '';
    let atributo = ['login','id','node_id','avatar_url','gravatar_id','url','html_url','followers_url',
                    'following_url', 'gists_url','starred_url','subscriptions_url','organizations_url',
                    'repos_url', 'events_url','received_events_url','type','site_admin','name','company',
                    'blog','location','email','hireable','bio','twitter_username','public_repos','public_gists',
                    'followers','following','created_at', 'updated_at']
    let tamanho = atributo.length;
    for (let i = 0; i < tamanho; i++) {
        let detalhe = document.createTextNode(atributo[i]+': ' +dadosUsuario[atributo[i]]);
        let newDetalhe = document.createElement('li');
        newDetalhe.appendChild(detalhe);
        detalhes.appendChild(newDetalhe)  
    }
    

}
function showDivResultado(){
    let div =  document.getElementsByClassName("div-resultado-filtro");
    $(div).addClass("div-aparece");
    $(div).removeClass("div-esconde");
}

function hideDivResultado(){
    let div =  document.getElementsByClassName("div-resultado-filtro");
    $(div).removeClass("div-aparece");
    $(div).addClass("div-esconde");
}
function filter(el){
    let itens = document.getElementsByClassName("lista-resultado-busca");
    idButton = el.id;
    idBusca = 'lista-' + idButton.substring(idButton.indexOf("-") + 1);
		
	for(var i = 0; i < itens.length; i++){
	  if(itens[i].classList.contains(idBusca)){
        $(itens[i]).removeClass("div-esconde");
		$(itens[i]).addClass("div-aparece");

	  }
	  else{
        $(itens[i]).removeClass("div-aparece");
		$(itens[i]).addClass("div-esconde");
		
	  }
	}
}