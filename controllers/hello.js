function getHello(req, res) {
    res.status(200).send({"msg": "Hello"})
}

module.exports = {
    getHello
};