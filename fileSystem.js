import {promises as fs} from "fs"

class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () =>{
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuestaDos = await this.readProducts()
        return console.log (respuestaDos)
    }

    getProductsById = async (id) => {
        let respuestaTres = await this.readProducts()
        if (!respuestaTres.find(product => product.id === id)){
        console.log("No Encuentro tu Producto")
        } else {
        }
    }

    deleteProductsById = async (id) => {
        let respuestaTres = await this.readProducts()
        let productFilter = respuestaTres.filter((products) => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Este Producto ha sido Eliminado")
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id)
        let oldProduct = await this.readProducts()
        let modifiedProducts = [{...producto, id}, ...oldProduct]
        await fs.writeFile(this.patch, JSON.stringify(modifiedProducts))
    }
}

const productos = new ProductManager()

/*productos.addProduct("Cama Donita", "Cama redonda con tela antirasgaduras. Variedad de telas y colores", 3000, "imagen1", "abcd123", 10)
productos.addProduct("Cama Nidito", "Cama redonda con bordes altos, con tela antirasgaduras y peluche, reversible, ideal para frío y calor. Variedad de telas y colores", 4500, "imagen2", "abcd124", 15)
productos.addProduct("Cama Cuadrada", "Cama cuadrada con tela antirasgaduras y peluche, reversible, ideal para frío y calor. Variedad de telas y colores", 4500, "imagen3", "abcd125", 20)*/

//productos.getProducts()

//productos.getProductsById(2)

//productos.deleteProductsById(3)

productos.updateProducts({
    title: 'Cama Nidito',
    description: 'Cama redonda con bordes altos, con tela antirasgaduras y peluche, reversible, ideal para frío y calor. Variedad de telas y colores',
    price: 6900,
    thumbnail: 'imagen2',
    code: 'abcd124',
    stock: 15,
    id: 2
})