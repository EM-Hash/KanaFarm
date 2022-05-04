export default userMixin;
//This is how a mixin would work
const userMixin = {
    //Put all that stuff you'd put the component/etc. into in here

    //Can have props, computed, etc:
    props: {
        //If the component also has an authUser prop, the component will override
        authUser: {required: true},
    },

    computed: {
        loggedIn(){
            return (this.authUser && this.authUser.uid);
        }
    },

    methods: {
        //Etc. etc.
    }
}

/*
To Use:
- Import into the component you wanna use it for w/ import * from ....
- In the vue component, have this:
mixins: [mixinName]
- And the mixin will be in
- For any conflicts, the right-most/last defined mixing overwrites the previous mixin(s)
 */