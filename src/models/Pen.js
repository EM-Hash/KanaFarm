import FeedBag from "@/models/FeedBag";

export default function Pen(letter){
    this.letter = letter;
    this.feedBag = new FeedBag('', ['ma-0', 'd-none']);
}