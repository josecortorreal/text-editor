   const butInstall = document.getElementById('buttonInstall');
  
    // Variable to store the deferredPrompt (this will be used to trigger the installation)
    let deferredPrompt;
  
    window.addEventListener('beforeinstallprompt', (event) => {
      deferredPrompt = event;
  
      // Display your custom install button (you can show it when appropriate)
      butInstall.style.display = 'block';
    });
  
    butInstall.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
  
        if (result.outcome === 'accepted') {
          console.log('User accepted the installation');
        } else {
          console.log('User dismissed the installation');
        }
  
        deferredPrompt = null;
        butInstall.style.display = 'none';
      }
    });
  
    window.addEventListener('appinstalled', (event) => {
      console.log('App installed successfully!');
    });
  
  