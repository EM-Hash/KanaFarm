export default function User(firebaseUser, id){
    let user = {
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
        console.log(firebaseUser);
        user.username = firebaseUser.username ? firebaseUser.username : '';
        user.farmName = firebaseUser.farmName ? firebaseUser.farmName : '';
        user.email = firebaseUser.email ? firebaseUser.email : '';
        user.level = firebaseUser.level ? firebaseUser.level : 1;
        user.exp = firebaseUser.exp ? firebaseUser.exp : 0;
        user.badges = firebaseUser.badges ? firebaseUser.badges : [];
        user.imageUrl = firebaseUser.imageUrl ? firebaseUser.imageUrl : '';
        user.theme = firebaseUser.theme ? firebaseUser.theme : 'default';
        user._id = id || '';
    }

    return user;
}