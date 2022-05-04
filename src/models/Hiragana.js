function Hiragana(character, letter){
    this.character = character || '';
    this.letter = letter || '';
}

export default function HiraganaData(){
    this.body = [
        {"row":"a",
            letters: [
                new Hiragana("ん","n"), new Hiragana("わ", "wa"), new Hiragana("ら","ra"), new Hiragana("や","ya"),
                new Hiragana("ま","ma"), new Hiragana("は","ha"), new Hiragana("な","na"), new Hiragana("た","ta"),
                new Hiragana("さ","sa"), new Hiragana("か","ka"), new Hiragana("あ","a")
            ]
        },
        {"row":"i",
            letters: [
                "", "", new Hiragana("り","ri"), "", new Hiragana("み","mi"), new Hiragana("ひ","hi"),
                new Hiragana("に","ni"), new Hiragana("ち","chi"), new Hiragana("し","shi"), new Hiragana("き","ki"),
                new Hiragana("い","i"),
            ]
        },
        {
            "row":"u",
            letters: [
                "", "", new Hiragana("る","ru"), new Hiragana("ゆ","yu"), new Hiragana("む","mu"),
                new Hiragana("ふ","fu"), new Hiragana("ぬ","nu"), new Hiragana("つ","tsu"), new Hiragana("す","su"),
                new Hiragana("く","ku"), new Hiragana("う","u"),
            ]
        },
        {
            "row":"e",
            letters: [
                "", "", new Hiragana("れ","re"), "", new Hiragana("め","me"), new Hiragana("へ","he"),
                new Hiragana("ね","ne"), new Hiragana("て","te"), new Hiragana("せ","se"), new Hiragana("け","ke"),
                new Hiragana("え","e"),
            ]
        },
        {
            "row":"o",
            "letters": ["", new Hiragana("を","wo"), new Hiragana("ろ","ro"), new Hiragana("よ","yo"),
                new Hiragana("も","mo"), new Hiragana("ほ","ho"), new Hiragana("の","no"), new Hiragana("と","to"),
                new Hiragana("そ","so"), new Hiragana("こ","ko"), new Hiragana("お","o")]
        }]

    this.getBody = function(){return this.body}

    this.getCharacters = function(){
        let characters = [];
            this.body.forEach(function(row){
                row.letters.forEach(function(letter){
                    if(letter !== ""){
                        characters.push(letter);
                    }
                });
            });
        return characters;
    }
}