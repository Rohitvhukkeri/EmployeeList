/* filter sort and pagination */

class ProductFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    //filter
    filtering(){
        return this;
    }

    //filter
    dataSort(key){
        //let sortBy = this.queryString.sort.split(' , ').join(' ')
        switch (key) {
            case "price lh":
                return this.query?.sort((a,b) => a.price - b.price)
            case "price hl":
                return this.query?.sort((a,b) => b.price - a.price)
            case "az":
                return this.query.sort((a,b) => b.title > a.title ? -1 : a.title === b.title ? 0 : 1)
            case "za":
                return this.query.sort((a,b) => b.title > a.title ? 1 : a.title === b.title ? 0 : -1)
            default: 
                return this.query.sort('-createdAt')
        }
    }
    sorting() {
        if( this.queryString.sort) {
            let sortBy = this.queryString.sort.split(' , ').join(' ')
            //let filtered = this.query.filter(el => true)
            let sortLogic = this.dataSort(sortBy);
            return sortLogic ? filtered.sort(sortLogic) : this.query;
        }
        return this;
    }

    //filter
    pagination(){
        return this;
    }


}

module.exports = ProductFeatures