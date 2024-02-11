class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chat');
        this.unsub = false;
    }


    set room(room){
        this._room = room;
        if(this.unsub){
            this.unsub();
        }
    }

    set username(username){
        if (username.length >= 2 && username.length <= 10 && username.trim() != ""){
            this._username = username;
        } else {
            document.querySelector('.modalAlert').style.display = 'block';
        }

    }

    get room() {
        return this._room;
    }

    get username() {
        return this._username;
    }

    async addChat(msg) {
        try {
            let message = msg;
            let username = this.username;
            let room =  this.room;
            let datum = new Date();
            let created_at = firebase.firestore.Timestamp.fromDate(datum);

            let dokument = {message, username, room, created_at};

            return await this.chats.add(dokument);
        }
        catch {
            console.error();
        }
        
    }

    getChats(callback) {
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    callback(change.doc.data());                    
                }
            });
        });
    }
}





export {Chatroom}