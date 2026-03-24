function filterProductItems(shortval, product, brandname, category) {
  let filteredProducts = product;
  // console.log(brandname);
  // console.log(category);
  // console.log(product);
  // filter by brandname

  if (brandname && brandname.length > 0) {
    filteredProducts = filteredProducts.filter((item) =>
      brandname.some((c) => c.toLowerCase() === item.brand.toLowerCase())
    );
  }

  //  Filter by category

  if (category && category.length > 0) {
    filteredProducts = filteredProducts.filter((item) =>
      category.some((c) => c.toLowerCase() === item.category.toLowerCase())
    );
  }

  if (shortval === "lowToHigh") {
    let sortedProducts = [...filteredProducts].sort(
      (a, b) => a.salePrice - b.salePrice
    );
    return sortedProducts;
  } else if (shortval === "highToLow") {
    let sortedProducts = [...filteredProducts].sort(
      (a, b) => b.salePrice - a.salePrice
    );
    return sortedProducts;
  } else if (shortval === "AToZ") {
    let sortedProducts = [...filteredProducts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    return sortedProducts;
  } else if (shortval === "ZToA") {
    let sortedProducts = [...filteredProducts].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    return sortedProducts;
  } else {
    return filteredProducts;
  }
}

export default filterProductItems;
// lowToHigh;
// highToLow;
// AToZ;
// ZToA;
