// TODO: Implement in TypeScript
export class StringFormat {
    // Adds a string helper function used to generate alien names based on dynamic format strings
    static stringFormat(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}
