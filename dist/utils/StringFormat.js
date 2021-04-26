// TODO: Implement in TypeScript
// NOTE: If you're reading this and know how to express a variable parameter length function like
// the one below in TS please let me know as I couldn't figure out how to declare this in TS.
export class StringFormat {
    // Adds a string helper function used to generate alien names based on dynamic format strings
    static stringFormat(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != "undefined" ? args[number] : match;
        });
    }
}
//# sourceMappingURL=StringFormat.js.map