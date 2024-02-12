import { openModal } from "./app.js";

class ChatUI {
    constructor(l){
        this.list = l;
    }

    set list(l) {
        this._list = l;
    }

    get list(){
        return this._list;
    }

    formatDate(timestamp){
        const messageDate = timestamp.toDate(); // Pretvaranje timestamp-a u Date objekat
        const currentDate = new Date();

        const day = ('0' + messageDate.getDate()).slice(-2);
        const month = ('0' + (messageDate.getMonth() + 1)).slice(-2);
        const year = messageDate.getFullYear();
        const hours = ('0' + messageDate.getHours()).slice(-2);
        const minutes = ('0' + messageDate.getMinutes()).slice(-2);

        const formattedDate = `${day}.${month}.${year}`;
        const formattedTime = `${hours}:${minutes}`;

        if (
            currentDate.getDate() === messageDate.getDate() &&
            currentDate.getMonth() === messageDate.getMonth() &&
            currentDate.getFullYear() === messageDate.getFullYear()
        ) {
            return formattedTime; // Prikazi samo vreme ako je poruka poslata danas
        } else {
            return `${formattedDate} ${formattedTime}`;
        }
    }

    templateLI(data) {
        let li = document.createElement('li');
        li.innerHTML = `
            <div>
            <span class='usernameMsg'>${data.username}</span>
            <span class='created_at'>${this.formatDate(data.created_at)}</span> 
            <img class = 'deleteImg' src="delete.png"  alt="">
            </div>
            <div>
            <span class='messageChat'>${data.message}</span>
            </div>  
            
            `;
            
        li.style.listStyle  = 'none';
            
        
        if (data.username === document.querySelector('#username').value || data.username === localStorage.username) {
            li.style.maxWidth = '50%';
            li.style.marginLeft = 'auto';
            li.style.backgroundColor = 'yellow';
        }
        

        li.querySelector('.deleteImg').addEventListener('click', async (e) => {
            // Provera da li je korisnik koji briše isti kao korisnik koji je poslao poruku
            const loggedInUser = document.querySelector('#username').value || localStorage.username;
            const messageUser = e.target.parentElement.querySelector('.usernameMsg').textContent;
        
            // Provera potvrde
            
            const userConfirmed = await openModal();

            if (userConfirmed) {
                document.querySelector('#customModal').style.display = 'none';
                if (loggedInUser === messageUser) {
        
                    // BRISEMO IZ BAZE                
                    try {
                        // Dohvatanje referenci na dokumente sa određenim tekstom poruke
                        const querySnapshot = await db.collection('chat')
                            .where('message', '==', data.message)
                            .where('created_at', '==', data.created_at)
                            .get();
                        // Iteriranje kroz rezultate upita
                        querySnapshot.forEach(async (doc) => {
                            // Brisanje dokumenta iz baze podataka
                            await db.collection('chat').doc(doc.id).delete();
                        });
                    } catch (error) {
                        console.error('Error:', error);
                    }
        
                    // Menjamo tekst poruke
                    let messageSpan = e.target.parentElement.nextElementSibling.querySelector('.messageChat');
                    messageSpan.textContent = 'Message deleted';
        
                    // Brišemo roditeljski element slike (cijeli div)
                    e.target.parentElement.remove();
                } else {
                    // Privremeno sakrijemo poruku ako korisnik briše tuđu poruku
                    let messageSpan = e.target.parentElement.nextElementSibling.querySelector('.messageChat');
                    e.target.parentElement.remove();
        
                    messageSpan.textContent = 'Message deleted';
                }
            }
        });
    
        return li;
    }


    delete(){
        this.list.innerHTML = '';
    }

}




export {ChatUI};