
export function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

export function exitFullScreen(){
    // if(document.exitFullscreen){
    //     document.exitFullscreen();
    // }
    // else if(document.mozCancelFullScreen){
    //     document.mozCancelFullScreen();
    // }
    // else if(document.webkitExitFullscreen){
    //     document.webkitExitFullscreen();
    // }
    // else if(document.msExitFullscreen){
    //     document.msExitFullscreen();
    // }
    if (document.fullscreenElement) {
        document.exitFullscreen()
          .then(() => console.log("Document Exited from Full screen mode"))
          .catch((err) => console.error(err))
      } else {
        // document.documentElement.requestFullscreen();
      }

}