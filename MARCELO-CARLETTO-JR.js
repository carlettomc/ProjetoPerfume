class Perfume{
    constructor(codigo_perfume, nome_perfume, volumetria, valor_uni) {
        //propriedade - variavel
        this.codigo_perfume = codigo_perfume;
        this.nome_perfume = nome_perfume;
        this.volumetria = volumetria;
        this.valor_uni = valor_uni;
    }
}

function montarTabela(lista){
    let auxHTML =  '';
    for(let i = 0; i < lista.length; i++){
        auxHTML += '<tr>'+
                    '<td>'+ lista[i].codigo_perfume +'</td>'+
                    '<td>'+ lista[i].nome_perfume+'</td>'+
                    '<td>'+ lista[i].volumetria+'ml</td>'+
                    '<td>R$'+ lista[i].valor_uni.toFixed(2).replace('.',',') +'</td>'+
                    '<td>'+
                        '<a href="#" class="btn btn-warning" rel="'+ i +'">'+
                        '<img src="editar.png" width="25" rel="'+ i + '"/>' +
                    '</a>'+
                    '</td>'+
                    '<td>'+
                    '<a href="#" class="btn btn-danger " rel="'+ i +'">'+
                     '<img src="excluirbaw.png" width="25" rel="'+ i +'" />'+
                    '</a>'+
                    '</td>'+
                    '</tr>'; 
    }
    return auxHTML;
}

function validar(valor_uni) {
    if(!isNaN(valor_uni) && valor_uni != ''){
        return true;
    }else{
        return false;
    }
}

auxPosicao = '';
listaPerfumes = [];

let perfume1 = new Perfume(1, '212 Men NYC', 50, 399);
let perfume2 = new Perfume(2, 'Le Male', 125, 479);
let perfume3 = new Perfume(3, 'Invictus', 200, 550);
listaPerfumes.push(perfume1);
listaPerfumes.push(perfume2);
listaPerfumes.push(perfume3);

$(document).ready( () => {
$('#tabela').html(montarTabela(listaPerfumes));

$('#btnSalvar').click( () => {
        let codigo_perfume = $('#codigo_perfume').val();
        let nome_perfume = $('#nome_perfume').val();
        let volumetria = $('#volumetria').val();
        let valor_uni = $('#valor_uni').val();
        if(validar(codigo_perfume) && nome_perfume != '' && validar(volumetria) && validar(valor_uni) && isNaN(nome_perfume)) {
            codigo_perfume = parseInt(codigo_perfume);
            volumetria = parseFloat(volumetria);
            valor_uni = parseFloat(valor_uni);
            let novoPerfume = new Perfume(codigo_perfume, nome_perfume,volumetria, valor_uni);

            if (auxPosicao == '') {
                listaPerfumes.push(novoPerfume);
            } else {
                listaPerfumes[auxPosicao] = novoPerfume;
                auxPosicao = '';
            }
            //listaPerfumes.push(novoPerfume);

            $('#tabela').html(montarTabela(listaPerfumes));

            $('input').val('');

        }else{
            alert('Informe os dados corretamente...');
        }
    });


    $('#tabela').on('click','.btn-warning', (evento) => {
        auxPosicao = (evento.target.getAttribute('rel'));
        $('#codigo_perfume').val(listaPerfumes[auxPosicao].codigo_perfume);
        $('#nome_perfume').val(listaPerfumes[auxPosicao].nome_perfume);
        $('#volumetria').val(listaPerfumes[auxPosicao].volumetria);
        $('#valor_uni').val(listaPerfumes[auxPosicao].valor_uni);
    });

    $('#tabela').on('click', '.btn-danger', (evento) =>{
        if (confirm('Tem certeza que deseja excluir?')) {
            listaPerfumes.splice(evento.target.getAttribute('rel'), 1);
            $('#tabela').html(montarTabela(listaPerfumes));
        } else {

        }
    });

    $('#btnCancelar').click( () => {
        $('input').val('');
        auxPosicao = '';
    });

    $('#valor_uni').keypress( (evento) => {
        if(evento.wich==13) {
            $('#btnSalvar').trigger('click');
        }
    });

    $('#btnJSON').click( () =>{
        let produtosJSON = JSON.stringify(listaPerfumes);
        alert(produtosJSON);
    });

    $('#btnAjax').click( () => {
        $.ajax({
            url: 'http://date.jsontest.com/',
            method: 'GET',
            dataType: 'json'
        }).done(function(dados) {
            $('#data').html(dados.date);
        });
    });

    $('table').DataTable();

});
