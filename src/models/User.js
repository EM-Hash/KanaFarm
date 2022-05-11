// import {db} from "@/plugins/vuefire";

export default function User(firebaseUser){
    this.user = {
        username: '',
        farmName: '',
        email: '',
        level: 0,
        exp: 0,
        badges: [],
        imageUrl: '',
        theme: '',
        background: '',
        _id: '',
        daysActive: 0,
        lastActive: '',
    }

    if(firebaseUser){
        this.username = firebaseUser.username ? firebaseUser.username : '';
        this.farmName = firebaseUser.farmName ? firebaseUser.farmName : '';
        this.email = firebaseUser.email ? firebaseUser.email : '';
        this.level = firebaseUser.level ? firebaseUser.level : 1;
        this.exp = firebaseUser.exp ? firebaseUser.exp : 0;
        this.badges = firebaseUser.badges ? firebaseUser.badges : [];
        this.imageUrl = firebaseUser.imageUrl ? firebaseUser.imageUrl : '';
        this.theme = firebaseUser.theme ? firebaseUser.theme : 'default';
        this.background = firebaseUser.background ? firebaseUser.background : 'default';
        this._id = firebaseUser._id || '';
        this.daysActive = firebaseUser.daysActive;
        this.lastActive = firebaseUser.lastActive;
    }
}

User.fromFirestore = function(snapshot, options){
    let data = snapshot.data(options);

    return new User(data);
}

User.toFirestore = function(user){
    return{
        _id: user._id || '',
        badges: user.badges || '',
        email: user.email || '',
        exp: user.exp || 0,
        farmName: user.farmName || '',
        imageUrl: user.imageUrl || '',
        level: user.level || 0,
        theme: user.theme || 'default',
        background: user.background || 'bg-default',
        username: user.username || '',
        daysActive: user.daysActive,
        lastActive: user.lastActive,
    }
};