import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";
// LOKALNA MEMORIJA
let username;
if(localStorage.username){
    username = localStorage.username;
} else {
    username = 'anonymus';
    localStorage.setItem('username', username);

}

let roomSpans = document.querySelectorAll('.roomsContainer span');
let room;

let chatUserInterface = new ChatUI(document.querySelector('#messageList'));
let korisnik1 = new Chatroom(room, username);


// PROVERAVAM DA LI SOBA POSTOJI U MEMORIJI I NA OSNOVU TOGA SE OPET ISPISUJU PORUKE
if(localStorage.room){
    room = localStorage.room;
    korisnik1.room = room;
    roomSpans.forEach(span => {
        if(span.innerHTML === localStorage.room){
            span.classList.add('selected');
        }
    })
    korisnik1.getChats(data => {
    chatUserInterface.list.append(chatUserInterface.templateLI(data))
    });

} else {
    korisnik1.room = '#general';
    roomSpans.forEach(span => {
        if(span.innerHTML === '#general'){
            span.classList.add('selected');
        }
    })
    korisnik1.getChats(data => {
    chatUserInterface.list.append(chatUserInterface.templateLI(data))
    });
    
}


let rooms = document.querySelectorAll('.roomsContainer span');
rooms.forEach(span => {
    span.addEventListener('click', () => {
        if(span.innerHTML === '#general'){
            chatUserInterface.delete();
            korisnik1.room = '#general'
            korisnik1.getChats(data => {
            chatUserInterface.list.append(chatUserInterface.templateLI(data))
        });
        } else if (span.innerHTML === '#js'){
            chatUserInterface.delete();
            korisnik1.room = '#js'
            korisnik1.getChats(data => {
            chatUserInterface.list.append(chatUserInterface.templateLI(data))
            });
        } else if (span.innerHTML === '#homeworks'){
            chatUserInterface.delete();
            korisnik1.room = '#homeworks'
            korisnik1.getChats(data => {
            chatUserInterface.list.append(chatUserInterface.templateLI(data))
            });
        } else if (span.innerHTML === 'tests'){
            chatUserInterface.delete();
            korisnik1.room = '#homeworks'
            korisnik1.getChats(data => {
            chatUserInterface.list.append(chatUserInterface.templateLI(data))
            });
        }
    });
});


let sendBtn = document.querySelector('#messageButton');
sendBtn.addEventListener('click', () => {
    let messageInput = document.querySelector('#message');
    if(messageInput.value == ''){
        return;
    } else {
        korisnik1.addChat(messageInput.value);
    }
    messageInput.value = '';
})


// POSTAVLJAM STORAGE ZA USERNAME I KADA SE KLIKNE UPDATE OPET POKRECEMO GET CHATS DA BI PRAVO IME BILO SA DESNE STRANE 
document.querySelector('#usernameButton').addEventListener('click', () => {
    let newUsername = document.querySelector('#username').value;
    korisnik1.username = newUsername;

    localStorage.setItem('username', newUsername);

    if(document.querySelector('#username').value != ''){
        korisnik1.room = localStorage.room;
        chatUserInterface.delete();
        korisnik1.getChats(data => {
            chatUserInterface.list.append(chatUserInterface.templateLI(data))
        });


        let notification = document.createElement('div');
        notification.textContent = `Username updated to: ${newUsername}`;
        notification.classList.add('notification');
        document.querySelector('.mainContainer').appendChild(notification);

        document.querySelector('#username').value = '';
        setTimeout(() => {
            document.querySelector('.mainContainer').removeChild(notification);
        }, 3000);
    }
});


// POSTAVLJAM STORAGE ZA SOBE
roomSpans.forEach((span) => {
    span.addEventListener('click', () => {
        roomSpans.forEach((spn) => {
            spn.classList.remove('selected');
        });
        if(span.innerHTML === localStorage.room){
            span.classList.add('selected');
        }
        span.classList.add('selected');
        let newRoom = document.querySelector('.selected').innerHTML;
        localStorage.setItem('room', newRoom);
    });
});
       

// POSTAVLJAMO BOJU NA POZADINU 
if(localStorage.bgColor){
    document.body.style.backgroundColor = localStorage.bgColor;
} else {
    document.body.style.backgroundColor = 'white';

}
document.querySelector('#colorBtn').addEventListener('click', () => {
    let bgColor = document.querySelector('#colorPick').value;
    document.body.style.backgroundColor = bgColor;
    localStorage.setItem('bgColor', bgColor);

})



document.querySelector('.modalAlert button').addEventListener('click',() => {
    document.querySelector('.modalAlert').style.display = 'none';
})




// CONFIRM MODAL 

function openModal() {
    document.getElementById('customModal').style.display = 'block';
    return new Promise((resolve) => {
        document.querySelector('#modalConfirm').addEventListener('click', () => {
            resolve(true);
        });
        document.querySelector('#modalCancel').addEventListener('click', () => {
            resolve(false);
            document.querySelector('#customModal').style.display = 'none';
        });
    });
}

export {openModal};