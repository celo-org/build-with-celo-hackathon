
export async function sendEmail(subject: string, to: string[], body: string) {
    const message =  await Email.send({
        SecureToken : '0b609bc7-5c77-4975-9b62-55d6454783da',
        // Host : "smtp.elasticemail.com",
        // Username : "olayinkaliberty@gmail.com",
        // Password : "F25ECAFEF59DF6218084E68F12A2150C4CF3",
        To : "olayinkaliberty@gmail.com", //'recipient@example.com',
        Bcc : to,
        From : "CeloPOAP<olayinkaliberty@gmail.com>",
        Subject : subject, // "Test email",
        Body : body // "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>"
    });
    // const message =  await Email.send({
    //     Host : "smtp.ethereal.email",
    //     Username : "murphy.langosh65@ethereal.email",
    //     Password : "DGXKKwVmptcWMpgmfE",
    //     To : to, //'recipient@example.com',
    //     From : "info@celopoap.io",
    //     Subject : subject, // "Test email",
    //     Body : body // "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>"
    // });
    
    console.log(message);
    
}