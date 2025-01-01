export async function connectToUnifiedLoginSystem({ publicKey }) {
    if(!publicKey?.length) return {
        isError: true,
        msg: 'publicKey required!'
    }
    const unifiedLoginSystemUrl = 'https://unified-login-system.gvishnu.in'; // Replace with the actual URL

    const url = unifiedLoginSystemUrl + "/ThirdPartyConnect?publicKey=" + publicKey;
    const popupWidth = 500;
    const popupHeight = 630;

    // Calculate the center position of the popup
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const popupLeft = (screenWidth - popupWidth) / 2;
    const popupTop = (screenHeight - popupHeight) / 2;

    // Open the popup
    const popup = window.open(
        url,
        "LoginPopup",
        `width=${popupWidth},height=${popupHeight},left=${popupLeft},top=${popupTop},resizable=no,scrollbars=yes`
    );

    // Check if the popup was blocked
    if (!popup) {
        return {
            isError: true,
            msg: "Popup was blocked. Please allow popups for this site."
        };
    }

    return new Promise((resolve, reject) => {
        window.removeEventListener("message", messageHandler);

        // Check for popup close every second
        const interval = setInterval(() => {
            try {
                if (popup.closed) {
                    clearInterval(interval);
                    window.removeEventListener("message", messageHandler);
                    return resolve({
                        isError: true,
                        msg: "Popup was closed"
                    });
                }
            } catch (error) {
                window.removeEventListener("message", messageHandler);
                return resolve({
                    isError: true,
                    error,
                    msg: "Error while checking for popup close"
                });
            }
        }, 1000);

        // add eventlistener
        function messageHandler (event) {
            if (event.origin !== unifiedLoginSystemUrl) return; // Validate the origin
            console.log("messageFromULS:", event.data);
            window.removeEventListener("message", messageHandler);
            clearInterval(interval);
            return resolve(event.data);
        }
        window.addEventListener("message", messageHandler);
        console.log("messageFromULS listening started");
    })
}