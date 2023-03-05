const Menu = require('./model')

module.exports.viewAllOrders = async () => {
    const allMenu = await Menu.find()
    return allMenu
}

module.exports.createOder = async (info) => {
    const newMenu = new Menu(info)

    const result = await newMenu.save()

    return result
}

module.exports.collectionName = 'Menu'