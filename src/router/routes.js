import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePageGuest from "@/pages/HomePageGuest";
import FarmPage from "@/pages/FarmPage";
import FeedingTimePage from "@/pages/FeedingTimePage";
import FarmHubPage from "@/pages/FarmHubPage";
import TreatTimePage from "@/pages/TreatTimePage";
import RoundUpPage from "@/pages/RoundUpPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import AccountPage from "@/pages/AccountPage";
import BadgesPage from "@/pages/BadgesPage";
import BackgroundsPage from "@/pages/BackgroundsPage";

const routes = [
    {name: 'home-page-guest', path: '/', component: HomePageGuest},
    {path: '/farm', component: FarmPage, children: [
        {name: 'farm-hub-page', path:'/', component: FarmHubPage},
        {name: 'feeding-time-page', path:'/feeding-time', component: FeedingTimePage},
        {name: 'treat-time-page', path:'/treat-time', component: TreatTimePage},
        {name: 'round-up-page', path:'/round-up', component: RoundUpPage},
    ]},
    {name: 'sign-in-page', path: '/sign-in', component: SignInPage},
    {name: 'sign-up-page', path: '/sign-up', component: SignUpPage},
    {name: 'account-page', path: '/account', component: AccountPage},
    {name: 'backgrounds-page', path: '/backgrounds', component: BackgroundsPage},
    {name: 'badges-page', path: '/badges', component: BadgesPage}
];

const router = new VueRouter({routes});

Vue.use(VueRouter);

export default router;