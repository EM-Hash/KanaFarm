/**
 * A badge for the game, with set Foci and Methods that can be chosen from
 * @constant FOCI - The potential focuses of the badge
 * @constant METHODS - Ways to obtain a badge
 * @param name - The name of the badge
 * @param description - The description for the badge
 * @param badgeImage - The url of the badge image
 * @param foci - An array of what the badge is focused on - can be a game, their level, or their attendance, or
 * some combination (ex: Playing Treat Time 5 times and Feeding Time 5 times would have two foci)
 * @param method - How the user can get the achievement (ex: PLAY is playing a game, SCORE is getting a certain score,
 * etc.)
 * @param target - The number the user has to meet in regards to the method (ex: PLAY with a target of 3 means playing
 * a game 3 times)
 * @constructor
 */

function Badge(name, description, badgeImage, foci, method, target){
    this.name = name || '';
    this.description = description || '';
    this.badgeImage = badgeImage || '';
    this.foci = foci || [FOCI.LEVEL];
    this.method = method || METHODS.LEVEL_UP;
    this.target = target || 0;
}

const FOCI = {TREAT_TIME: 'treat time', FEEDING_TIME: 'feeding time', ROUND_UP: 'round up',
    LEVEL: 'level', ATTENDANCE: 'visit site'};
const METHODS = {PLAY: 'play', SCORE: 'score', VISIT_SITE: 'visit site', LEVEL_UP: 'level up'}


export {Badge, FOCI, METHODS}