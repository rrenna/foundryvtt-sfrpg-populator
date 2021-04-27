import { Tippy } from "tippy.js"

// Adds Tippy to the global namespace
// See conversation: https://discord.com/channels/732325252788387980/803646399014109205/836405683447529492
declare global {
    var tippy: Tippy
}
