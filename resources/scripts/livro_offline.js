    /*  Funcão FullScreen  */
    function entrarFullScreen(){
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    }

    function sairFullScreen(){
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    $( document ).ready(function() {

      var fFullScreen = false;
      var zoomSizeStorage = Number(1); /*comentar se for para deixar o zoom permanecer na troca da pagina*/

        $(document).delegate(".pFonte","click",function(event){
            event.preventDefault();
            var zIncremento = 0.1;
            var zMin = 1;
            var zMax = 1.5;
            var fAcao = $(this).attr('action');
            
            /*zoomSizeStorage = parseFloat(localStorage.getItem('Versus_Zoom'));*/ //usado para permanecer o zoom em todas as páginas           

            switch (fAcao) {
                case "+":
                  if(zoomSizeStorage < zMax){
                        zoomSizeStorage += zIncremento;
                        zoomSizeStorage = Number(zoomSizeStorage.toFixed(1));
                        $('.conteudo-pagina').css('transform', 'scale(' + zoomSizeStorage + ')');
                        /*localStorage.setItem('Versus_Zoom', zoomSizeStorage);*/                        
                    }
                    break;
                case "-":
                    if(zoomSizeStorage > zMin){
                        zoomSizeStorage -= zIncremento;
                        zoomSizeStorage = Number(zoomSizeStorage.toFixed(1));
                        $('.conteudo-pagina').css('transform', 'scale(' + zoomSizeStorage + ')');
                        /*localStorage.setItem('Versus_Zoom', zoomSizeStorage);*/
                    }
                    break;
                case "fullScreen":
                    if(fFullScreen === false){
                        fFullScreen = true;
                        entrarFullScreen();
                    }else{
                        fFullScreen = false;
                        sairFullScreen();
                    }
                    break;
                default:
                    zoomSizeStorage = 1;
                    $('.conteudo-pagina').css('transform', 'scale(' + zoomSizeStorage + ')');
                    /*localStorage.setItem('Versus_Zoom', zoomSizeStorage);*/

            }
        });

       //Controle de audiolivro
        var audio = $('#audioPlayer')[0];
        var audioBookId = 'audio_audiobook_'+$('#audioPlayer').attr('livro');
        var audioStart = $('#audioPlayer').attr('inicio');

        if(audio){
            if(audioStart ){
                 // Verifica se a string segue o padrão "00:00:00"
                const regex = /^\d{2}:\d{2}:\d{2}$/;
                if(regex.test(audioStart)){
                    const [aHours, aMinutes, aSeconds] = audioStart.split(':').map(Number);  // Separa horas, minutos e segundos
                    savedTime = (aHours * 3600) + (aMinutes * 60) + aSeconds;  // Converte para segundos

                    audio.currentTime = savedTime;  // Restaura o tempo do áudio
                }                
            }

            
            /* Código para salvar a posição do vídeo e continuar de onde parou */
            /*
            // Verifica se há um tempo armazenado no localStorage
            var savedTime = localStorage.getItem(audioBookId);

            if (savedTime) {
                audio.currentTime = savedTime;  // Restaura o tempo do áudio
            }

            // Atualiza o localStorage a cada 500ms, apenas se o áudio estiver tocando
            setInterval(function() {
                if (!audio.paused) {  // Verifica se o áudio está tocando
                  localStorage.setItem(audioBookId, audio.currentTime);
                  console.log('gravou'+audio.currentTime);
                }
            }, 500);*/


        }


        /* Adiciona Tooltip */
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    });