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
        _id: '',
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
        this._id = firebaseUser._id || '';
    }

    this.toFirestore = function(){
        return{
            _id: this._id,
            badges: this.badges,
            email: this.email,
            exp: this.exp,
            farmName: this.farmName,
            imageUrl: this.imageUrl,
            level: this.level,
            theme: this.theme,
            username: this.username
        }
    };
}

User.fromFirestore = function(snapshot, options){
    let data = snapshot.data(options);

    return new User(data);
}