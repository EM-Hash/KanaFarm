export default function Background(className){
    this.class = className || '';

    this.name = function(){
        //Remove the "bg-"
        let displayName = this.class.slice(this.class.indexOf('-') + 1);
        let upperCase = displayName.charAt(0).toUpperCase();
        //Capitalize the first letter
        displayName = upperCase + displayName.slice(1);
        //While there are still dashes...
        while(displayName.indexOf('-') !== -1){
            //Find the dash
            let dashIndex = displayName.indexOf('-');
            //Remove & format
            displayName = `${displayName.slice(0, dashIndex)} ${displayName.slice(dashIndex,1).toUpperCase()}${displayName.slice(dashIndex + 1)}`;
        }
        return displayName;
    }

}