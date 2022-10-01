(async () => {

    let granted = false;
    if (Notification.permission === 'granted') {
        granted = true;
    } else if (Notification.permission !== 'denied') {
        let permission = await Notification.requestPermission();
        granted = permission === 'granted' ? true : false;
    }

    if (granted) {
        let notifi;
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === "hidden") {
                notifi = new Notification("Away", {
                    body: 'Hmmm.. Seems like you are going away',
                    icon: "../../asssets/sad.png",
                }) 
            } else {
                notifi.close();
            }
        })
        notifi.addEventListener('close', e => {
            notifi.close();
        })        
    }

})();

