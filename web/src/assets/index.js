var token = sessionStorage.getItem("sessTkn");
var idJ = sessionStorage.getItem("idJ");
var myChart;
var stats;
var showAni = 300;
var typeS;
var page = 1;
console.log(token);
console.log(idJ);
$(function() {
    hideAll();
    if(token!=null)
    {
        
        var sendData = {"id":idJ,"tkn":token};
        $.post( "../microservicios/checkToken.php", sendData).done(function( data ) {
            
            if(data.status==1)
            {
                /*   Sidebar button     */
                
                $(".back").click(function(e) {
                    e.preventDefault();
                    $("#wrapper").toggleClass("toggled");
                    $(".dashTit").toggleClass("esconder");
                    $("#extraStats").toggleClass("esconder");
                    $(".puntos").toggleClass("esconder");
                    $(".nombres").toggleClass("esconder");
                });
                
                //------------------------------------
                
                /*Profile picture*/
                $("#imageUpload").change(function(){
                    fasterPreview( this );
                });

                $("#profileImage").click(function(e) {
                    $("#imageUpload").click();
                });
                
                $("#profileSave").click(function(e) {

                    uploadProfile();

                });

                //-----------------------------
                
                /* Busqueda */ 
                
                $("#buscarBtn").click(function(e) {
                    
                    var busqueda = $("#busqueda").val();
                    console.log(busqueda);
                    getSearch(busqueda,typeS);
                });
                
                $('#buscaSelect').on('change', function (e) {
                    var optionSelected = $("option:selected", this);
                    var valueSelected = this.value;
                    if(valueSelected!="0")
                    {
                        $("#buscarTxt").prop("disabled",false);
                        $("#buscarBtn").prop("disabled",false);
                        typeS=valueSelected;
                    }
                    else
                    {
                        $("#buscarTxt").prop("disabled",true);
                        $("#buscarBtn").prop("disabled",true);
                    }

                });
                //-----------------------------
                
                /*      Dashboard         */
                $(".dashC").click(function(e){

                    var idEle = e.currentTarget.id;
                    switch(idEle)
                    {
                        case "1":
                            $("#dashboard").hide(1);
                            $("#perfil").show(showAni);
                            break;

                        case "2":
                            getTorneos();
                            $("#dashboard").hide(1);
                            $("#torneos").show(showAni);
                            break;

                        case "3":
                            getStats();
                            $("#dashboard").hide(1);
                            $("#estadisticas").show(showAni);
                            break;

                        case "4":
                            fillSearch();
                            $("#dashboard").hide(1);
                            $("#buscar").show(showAni);
                            break;
                    }

                });
                //----------------------------------------
                
                /*           Elementos sidebar        */
                $("li").click(function(e){
                    var idEle = e.currentTarget.id.substr(2);
                    switch(idEle)
                    {
                        case "1":
                            hideAll();
                            $("#dashboard").show(showAni);
                            break;

                        case "2":
                            hideAll();
                            $("#perfil").show(showAni);
                            break;

                        case "3":
                            hideAll();
                            getTorneos();
                            $("#torneos").show(showAni);
                            break;

                        case "4":
                            hideAll();
                            getStats(1);
                            $("#estadisticas").show(showAni);
                            break;

                        case "5":
                            fillSearch();
                            hideAll();
                            $("#buscar").show(showAni);
                            break;
                        case "6":
                            logout();
                            break;
                    }

                });
                
                //---------------------------------------
                $(".btn-stats").click(function(e){
                    var tgt = e.currentTarget;
                    var dataset = tgt.dataset;
                    var type = dataset["type"];

                    switch(type)
                    {
                        case "1":
                            myChart.options.plugins.title.text = 'Singles';
                            myChart.data.datasets[0].data[0]=stats.singles["juegosGanados"];
                            myChart.data.datasets[0].data[1]=stats.singles["juegosPerdidos"];
                            myChart.data.datasets[0].data[2]=stats.singles["juegosEmpatados"];
                            $("#torneosNum").html(stats["torneosS"]);
                            $("#puntosNum").html(stats["puntosS"]);
                            $("#statBtn1").attr("disabled",true);
                            $("#statBtn2").attr("disabled",false);
                            $(".btn-stats").toggleClass("disabled");
                            break;
                        case "2":
                            $("#statBtn1").attr("disabled",false);
                            $("#statBtn2").attr("disabled",true);
                            $(".btn-stats").toggleClass("disabled");
                            $("#torneosNum").html(stats["torneosD"]);
                            $("#puntosNum").html(stats["puntosD"]);
                            myChart.options.plugins.title.text = 'Dobles';
                            myChart.data.datasets[0].data[0]=stats.dobles["juegosGanados"];
                            myChart.data.datasets[0].data[1]=stats.dobles["juegosPerdidos"];
                            myChart.data.datasets[0].data[2]=stats.dobles["juegosEmpatados"];
                            break;
                    }
                    
                    myChart.update();
                });
                $("#torneoCard").click(function(e){
                    hideAll();
                    getTorneos();
                    $("#torneos").show(showAni);
                });
                
                $("#dashboard").show(showAni);
            }
            else
            {
                logout();
            }
        });
    }
    else
    {
        location.replace("https://clande.intellilabs.com.mx/login");
    }
});

function hideAll()
{
    $("#estadisticas").hide(1);
    $("#dashboard").hide(1);
    $("#torneos").hide(1);
    $("#torneoDet").hide(1);
    $("#perfil").hide(1);
    $("#buscar").hide(1);
    try{
        myChart.destroy();
    }
    catch(err) {
        
    }
}

function fasterPreview( uploader ) {
    if ( uploader.files && uploader.files[0] ){
          $('#profileImage').attr('src', 
             window.URL.createObjectURL(uploader.files[0]) );
    }
}

function getStats()
{
    
    var sendData = {"id":idJ};
    $.post( "../microservicios/getStats.php", sendData).done(function( datos ) {
        stats=datos;
        console.log(datos);
        $("#torneosNum").html(datos["torneosS"]);
        $("#puntosNum").html(datos["puntosS"]);
        const data = {
          labels: [
            'Ganados',
            'Perdidos',
            'Empatados'
          ],
          datasets: [{
            data: [datos.singles["juegosGanados"], datos.singles["juegosPerdidos"], datos.singles["juegosEmpatados"]],
            backgroundColor: [
              'rgb(96, 153, 26)',
              'rgb(220, 57, 18)',
              'rgb(255, 184, 0)'
            ],
            hoverOffset: 4
          }]
        };
        var strokeWidth = 5;
        const config = {
            type: 'doughnut',
            data: data,
            options:{
                animation: {
                    duration: 0
                },
                segmentStrokeWidth : strokeWidth,
                plugins: {
                    legend: {
                        display: false
                    },
                  title: {
                    display: true,
                    text: "Singles",
                    font: {
                        size: 16
                    },
                    color:'#FFFFFF'
                    
                  }
                }
            }
        };

        myChart = new Chart(
            document.getElementById('statChart'),
            config
        );
        myChart.outerRadius -= (strokeWidth/2);
    });
}
function logout()
{
    if(confirm("Seguro que quieres cerrar la sesión?"))
    {
        sessionStorage.removeItem('sessTkn');
        sessionStorage.removeItem('idJ');
        location.replace("https://clande.intellilabs.com.mx/login");
    }
    
}
function getTorneos()
{

    var sendData = {"id":idJ};
    console.log(sendData); 
    $.post( "../microservicios/getTorneos.php", sendData).done(function( data ) {
        
        console.log(data);
        var contF = data.length;
        $("#torneoBody").html(""); 
        for(var i = 0; i < data.length; i++)
        {
            var strapp = "";
            if(contF>1)
            {
                strapp+="<div class='row justify-content-between'>";
                for(var j = 0;j<2;j++)
                {
                    if(data[i].participa==1)
                    {
                        var clase = "card torneo mb-2 participa";
                        strapp+="<div class='col'><div class='"+clase+"' data-torneo='"+data[i+j]["torneo"]+"'><div class='card-body text-center'><div class='card-title'><h5 class='azul'>"+data[i+j]["torneo"]+"</h5></div><span class='azul torneoText'>Categoría: </span><span class='verde torneoText'>"+data[i+j]["categoria"]+"</span><br><span class='azul torneoText'>Nivel: </span><span class='verde torneoText'>"+data[i+j]["nivel"]+"</span><br><span class='azul torneoText'>Puntos: </span><span class='verde torneoText'>"+data[i+j]["puntos"]+"</span></div></div></div>";
                    }
                    else
                    {
                        var clase = "card torneo mb-2 noparticipa";
                        strapp+="<div class='col'><div class='"+clase+"' data-torneo='"+data[i+j]["torneo"]+"'><div class='card-body text-center'><div class='card-title'><h5 class='azul'>"+data[i+j]["torneo"]+"</h5></div><span class='azul torneoText'>Categoría: </span><span class='verde torneoText'>"+data[i+j]["categoria"]+"</span></div></div></div>";
                    }
                    
                }
                strapp+="</div>";
                i++;
                
            }
            $("#torneoBody").append(strapp);
        }
        $(".torneo").unbind();
        $(".torneo").click(function(e){
            var tgt = e.currentTarget;
            var dataset = tgt.dataset;
            var torneo = dataset["torneo"];
            getDetalleTorneo(torneo);
        });
    });
}

function getDetalleTorneo(torneo)
{
    var sendData = {"torneo":torneo};
    console.log(sendData); 
    $.post( "../microservicios/getDetalleTorneo.php", sendData).done(function( data ) {
        console.log(data);
        var strCompleto = "";
        var strCorto = "";
        var strPuntos = "";
        var name = "";
        $("#nomTorneo").html(torneo);
        $("#origen").html(data[0]["origen"]);
        $("#nombresCompletos").html("");
        $("#nombresCortos").html("");
        $("#puntosBody").html("");
        for(var i = 0; i<data.length;i++)
        {
            strCompleto = "<span>"+data[i]["nivel"]+". "+data[i]["nombre_completo"]+"</span><br>";
            strPuntos = "<span class='verde'>"+data[i]["puntos"]+"</span><br>";
            
            if(data[i]["nombre_corto"]!=null)
            {
                strCorto = "<span>"+data[i]["nivel"]+". "+data[i]["nombre_corto"]+"</span><br>";
            }
            else
            {
                name = data[i]["nombre_completo"].split(" ");
                strCorto = "<span>"+data[i]["nivel"]+". "+name[0]+"</span><br>";
            }
            $("#nombresCompletos").append(strCompleto);
            $("#nombresCortos").append(strCorto);
            $("#puntosBody").append(strPuntos);
        }
        $("#torneos").hide(1);
        $("#torneoDet").show(showAni);
    });
}

function getSearch(busqueda,typeS)
{
    var sendData = {"id":idJ,"type":typeS,"busqueda":busqueda};
    console.log(sendData); 
    $.post( "../microservicios/getSearch.php", sendData).done(function( datos ) {
        var data = datos.data;
        let unique = [...new Set(data.map(item => item.torneo))];
        console.log(unique);
        $("#resultsCont").html("");
        var outApp = "";
        var app = "";
        for(var j = 0 ; j<unique.length;j++)
        {
            
            outApp="<div class='row'><h4>Torneo: <span class='verde'>"+unique[j]+"</span></h4></div>";
            $("#resultsCont").append(outApp);
            app="";
            app+="<div  class='row table-responsive'><table class='table table-striped'><thead><tr><th scope='col'>J1</th><th scope='col'>G</th><th scope='col'>J2</th><th scope='col'>G</th></tr></thead><tbody class='table-group-divider'>";
            for(var i = 0 ; i <data.length; i++)
            {
                if(data[i].torneo==unique[j])
                {
                    app += "<tr><td scope='row'>"+data[i].J1+"</td><td>"+data[i].M1+"</td><td>"+data[i].J2+"</td><td>"+data[i].M2+"</td></tr>";
                }
                
            }
            app+="</tbody></table></div>";
            $("#resultsCont").append(app);
        }
        
    });
}

function fillSearch()
{
    var sendData = {"dame":"usuarios"};
    
    console.log(sendData); 
    
    $.post( "microservicios/getUsers.php", sendData).done(function( data ) {
        
        console.log(data);
        var datos = data.data;
        var nombres = [];
        for(var i = 0; i<datos.length;i++)
        {
            nombres.push(datos[i].nombre_completo);
        }
        autocomplete(document.getElementById("busqueda"), nombres);
        /*
        $("#selectJ").html("");
        var app = "";
        for(var i = 0; i< datos.length;i++)
        {
            app="<option data-tokens='"+datos[i].id_jugador+"' value='"+datos[i].id_jugador+"'>"+datos[i].nombre_completo+"</option>";
            
            $("#selectJ").append(app);
        } 
        $("#selectJ").val('default');
        $("#selectJ").selectpicker("refresh");*/
    });
}
function uploadProfile()
{
    var fd = new FormData();
    var files = $('#imageUpload')[0].files;
    var nombre = $("#nombre").val();
    var edad = $("#edad").val();
    var singles = $('#singles').prop('checked');
    var dobles = $('#dobles').prop('checked');
    var mano = $("input[name='manos']:checked").val();

    if(files.length > 0 ){
        fd.append('file',files[0]);
        fd.append('nombre',nombre);
        fd.append('edad',edad);
        fd.append('singles',singles);
        fd.append('dobles',dobles);
        fd.append('mano',mano);
        
        $.ajax({
            url: "microservicios/uploadProfile.php",
            type: 'POST',
            data: fd,
            success: function (data) {
                console.log(data);
            },
            error:function (data) {
                console.log(data);
            },
            cache: false,
            contentType: false,
            processData: false
        });
        
    }
}