module.exports = {
    name: "ready",
    run: async (bot) => {
        console.log("Logged In As " + bot.client.user.tag)
    }
}