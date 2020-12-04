export const getQueryVariable = (key, queryParam) => {
  let query = queryParam.substring(1);
  // console.log(query)//"app=article&act=news_content&aid=160990"
  let vars = query.split("&");
  // console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
  for (let i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
    if (pair[0] === key || queryParam) {
      return pair[1];
    }
  }
  return false;
};

export const getQueryVariables = (queryParam) => {
  let query = queryParam.substring(1);
  let vars = query.split("&");
  let obj = {};

  vars.map((x, index) => {
    let temp = x.split("=");
    return (obj[temp[0]] = temp[1]);
  });
  return obj;
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 5,
});
