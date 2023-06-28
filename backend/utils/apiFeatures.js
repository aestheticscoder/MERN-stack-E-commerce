class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter (){
    const queryCopy = {...this.queryStr}

    // Some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach(key =>delete queryCopy[key]);

    // Filter for Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);


    this.query = this.query.find(JSON.parse(queryStr));
    return this;                // This is nothing but Product.find() method
  }

  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1; // If no pages are given then in that case it would be page 1
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;

  }
}

module.exports = ApiFeatures;
