module.exports = async (client) => {

    console.log("Ready with " + client.guilds.cache.size + " servers");
	client.user.setActivity('READY !');

};