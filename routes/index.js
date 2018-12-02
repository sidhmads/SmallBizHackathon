var express = require('express');
var router = express.Router();
var request = require('request');
const Nexmo = require('nexmo')

const nexmo = new Nexmo({
  apiKey: '435d1195',
  apiSecret: '8KAJRgvFecqxM4TF'
})
const from = '15067160280';
const to = '16472245144';
const text = 'Hello from Nexmon';

var api_uri = "https://sandbox-quickbooks.api.intuit.com/v3/company/"
var publisher_one = {
  realmId: "123146178900094",
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..3c6gZzUlYIS_b5Q-kpOj7Q.aH0VkKOVerwPLZjHaIhGwS3TwuiemKEA7aKF2nDf_oD7K3bHY3dQykmqAH4YQlbToX67XuGhNrWs90hljFF1rYtX7z_-_o0n_aPcHPTarjDzIDKGLTvnVIFnQ2VGXFx_vLRhEHYyQ05l8_uBQkOxIcH_KmAZXjqW0_ieHS8tRN5Zes5dbXGQqMecgM2_V94I7A5UK89dVt3C_gNUvHib700WV1HonE1D8cutpkJSKMw4cGGW0yRMS-KcU1XRB7nElog6FMXfQ6ehUBOF72LuDB3vKp9X-40kXkK_s5pSsGI7ZDqez_GOf3qT3OBdAlLmkmKlq92bJ9ssHSj8e6d4bNNcSQZWPy-3LYj8fPRemZu55eZ1pyOxh6a0GJFT4qz5qeYZbvDIXqA7dpb6bwatRn8YIIJdOeRfMNi1mIhBLAWcpKFNtkmX-nR2Fvav4g3WBHV2odX4PdMg-ckFoKmfNQxkUvghEU3vP9IOIOSkiaHaqHEGUMWiiRu8ws1KLLce23SvNQi_4lsyRtmGbu6hV28cTR2wUltYN16vEacrj4cKDTYDH-xB_Sqgjitg70n5uCtL5wudXxYIE-YZWWPjqSlGvY8J64QLaQv-Ye_21hKTBA351cPud8z4XrAfvk9E5S-wrybndkb74ErQfwBaRprxj2Urd0dS8KNRO_lNI6mWEfXyr5tA3aqjyJhHSHF-.9G0bhCrPPTLg-GYXAwNWcQ"
}
var publisher_two = {
  realmId: "123146197851304",
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..Cb3SrrJqXkzFG9x5aSuVaA.puj2fD-LOsjq65J0BkoUMKwd1ayBWzfrwLjF604zI8adu9q_ejGXegaRQjGOmsHXA6fKyxNYQF2rzGxRrWlic_v0Ofz71PgZ-3ZYmvU89kPKU7TYsaefbtqIjhtY5e5bowvA3z8X4sLPhABdwPExgeZCqbigIgk7iDXlDXQzJToLA3ubVNiZl1ppDQ_dfdXX-s-DSh5tqohJ1qwROBaE20JQn4cIezvitIxRpWbgEOFenBH7UuxXSNV6cXCtEXiYZeRl0gjn-Meplp6LeV8tc1wUR_BLMAoSMD5oY5LhiCJOKMmhol0CHJvKCik6q31SZlcfkUbkMpcKFyxYDjaOy0tDF4w6-9LP_84aB8kuJuV0nA_vMk0GUbEE3Hmf5SsPxAyzQhVVuHJOUi3wg9yhhVjyJHRGo6S5r0Dola6SLMIPfoDc-Bs38wYC84hC8zffZy9c3tdMjndko0xL95xj7qCxllo_WRvYvf9iSFIyZuAkVwldo2er_iGdCm9994Ve8pl8Uy8rpsEVZqeNMIEOtIz7oLYc9q7NuxXqoQv31oPjCwVgRDyyGVwHrlvNuC3nH66WpO6eDlHSnCrshirgn_75aG6tJUzEHws9xqypXoRaqccFw2q6dmPInHvJfrmnEm4j_OuZrzaPWe3GPWXxTKstH26RuEkWI5HsWw8dFpfZDdXIzG75m9u28J60bYDy.k9L5dwrA_gYbHMADLzlSuA"
}
var demand_one = {
  realmId: "123146197847929",
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..G9z2zHIpnQBIQpNt96EdiA.nrEd2ZumcMFbU4sakfbMlgWdSLOy8QAWV-LQt_WkkrWlLmK8knRK3_C9Qgt46YgIqwKbYLNx0hyHG5gdS4lwNkbR8zyngS9tvKiu-7l-5j7Jj1JdB3XXQA6DPT95Ac_PuFGSl8tHXiQv0WG-MUE4-JXEAGFeISW84ap7ALpMPQHl82T_ugLrERsL-WGaaTHLJeUJ9MaR8TsozsvOYsggOXJoWPv8ehbfNaAidAv22Z3Kp_V9UclDAg_DEnF5pcLQ8K63u6vkrJYthnxR1r_ldImr-GoFxNkb7jRFaHMF7-VdULi4vx7JR6cr4nQxL25bNnyI1j0Kns_IUSyvMWPAcHSsFaXldH7KMa7nvpXfdy12G8Wjw1OMI4NY_Zdsittbcx4hmnDPskr2oVVaS4umd8kP7TRwagQwatPmaQoxaWoBhaqvm_32fZu5ytUNVXelomqfCWp7SN36KEKyfShlgQgsQdctZunAa6YAKoWpcfnZrvYr0CiSEHU3-grsy49vyFdhOD6RvbaWCM52l04AOUQrGOG0c-yYBXoze0HJCzuuvRhNTWPFJoWWG5lbTefX8IxM9eUWPHc6_T-8vfzdmnxUnz5cBYy-vR8U1ZPE33UA3GRSO3MOGQtAu9cSTXegs3UMqkFrEbLHpScItCEKbwuEvAgQ79COAo4x8Y2ChxDEx3RrkOc7vdoHqgxsTGBS.szyELStltPq0ArgzbvYDoA"
}
var demand_one_item_template = {
  "TrackQtyOnHand": true, 
  "Name": "", 
  "QtyOnHand": NaN, 
  "Taxable": true,
  "PurchaseCost": NaN,
	"IncomeAccountRef": {
	    "value": "140",
	    "name": "Sales of Product Income"
	},
  "AssetAccountRef": {
    "name": "Inventory Asset", 
    "value": "142"
  }, 
  "InvStartDate": "2018-12-01", 
  "Type": "Inventory", 
  "ExpenseAccountRef": {
    "name": "Cost of Goods Sold", 
    "value": "141"
  }
}
var demand_one_expense_one = {
  "PaymentType": "Check", 
  "EntityRef": {
	    "value": "",
	},
  "AccountRef": {
    "value": "145"
  },
  "Line": []
}
var demand_one_line = {
  "Amount": NaN,
  "DetailType": "ItemBasedExpenseLineDetail",
  "ItemBasedExpenseLineDetail": {
      "ItemRef": {
          "value": "",
          "name": ""
      },
      "UnitPrice": NaN,
      "Qty": NaN
  }
}

var demand_one_post_request = {
  "Publisher_1":[{"item":"Carrot","quantity":8,"price":2},{"item":"Name Badges","quantity":3150,"price":3},{"item":"Name Badges - old","quantity":0,"price":3},{"item":"Guest Book","quantity":20,"price":25},{"item":"Water Bottles - Generic","quantity":550,"price":10},{"item":"Lemon","quantity":100,"price":0}],
  "Publisher_2":[{"item":"Pump","quantity":25,"price":15},{"item":"Rock Fountain","quantity":2,"price":275},{"item":"Sprinkler Heads","quantity":25,"price":2},{"item":"Sprinkler Pipes","quantity":31,"price":4}]
}


async function getQuery(publisher, table='Item') {
  // Set up API call (with OAuth2 accessToken)
  var url = api_uri + publisher.realmId + '/query?query=select * from ' + table;
  var requestObj = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + publisher.token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  // Make API call
  return new Promise (function(resolve,reject) {
    request(requestObj, function (err, response) {
      resolve(JSON.parse(response.body).QueryResponse);
    })
  })
}

async function postQuery(publisher, body, endpoint) {
  // Set up API call (with OAuth2 accessToken)
  var url = api_uri + publisher.realmId + '/' + endpoint;
  var requestObj = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + publisher.token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body,
    json: true
  }

  // Make API call
  return new Promise (function(resolve,reject) {
    request.post(requestObj, function (err, response, body) {
      if (err) {
        resolve();
      }
      resolve(body);
    })
  })
}


router.get('/products', async function (req, res) {
  var result = {
    "Publisher_1": [],
    "Publisher_2":[]
  }
  var pubOne = await getQuery(publisher_one, "Item where type='Inventory'");
  for (var item of pubOne['Item']) {
    var name = item['Name'];
    var quantity = item['QtyOnHand'];
    var price = item['UnitPrice'];
    result['Publisher_1'].push({item: name, quantity: quantity, price: price});
  }
  var pubTwo = await getQuery(publisher_two, "Item where type='Inventory'");
  for (var item of pubTwo['Item']) {
    var name = item['Name'];
    var quantity = item['QtyOnHand'];
    var price = item['UnitPrice'];
    result['Publisher_2'].push({item: name, quantity: quantity, price: price});
  }
  res.json(result);
});

router.get('/items', async function(req,res) {
  var body = demand_one_post_request;
  var postPromises = [];
  var inBooks = [];
  var items_from_one = [];
  var items_from_two = [];

  for(var item of body['Publisher_1']) {
    demand_one_item_template['QtyOnHand'] = item['quantity'];
    demand_one_item_template['PurchaseCost'] = item['price'];
    demand_one_item_template['Name'] = item['item'];
    items_from_one.push(item['item']);
    postPromises.push(postQuery(demand_one, demand_one_item_template, 'item'));
  }
  for(var item of body['Publisher_2']) {
    demand_one_item_template['QtyOnHand'] = item['quantity'];
    demand_one_item_template['PurchaseCost'] = item['price'];
    demand_one_item_template['Name'] = item['item'];
    items_from_two.push(item['item']);
    postPromises.push(postQuery(demand_one, demand_one_item_template, 'item'));
  }
  Promise.all(postPromises).then(async function () {
    var result = [];
    var expensePromises = [];
    var demandOne = await getQuery(demand_one, "Item where type='Inventory'")
    for (var newItem of demandOne['Item']) {
      result.push({value: newItem['Id'], name: newItem['Name'], UnitPrice: newItem['PurchaseCost'], quantity: newItem['QtyOnHand']})
    }
    var pub_one = JSON.parse(JSON.stringify(demand_one_expense_one));
    pub_one['EntityRef']['value'] = '58';
    var pub_two = JSON.parse(JSON.stringify(demand_one_expense_one));
    pub_two['EntityRef']['value'] = '59';
    for (var purchasedItem of result) {
      var temp = JSON.parse(JSON.stringify(demand_one_line))
      temp['ItemBasedExpenseLineDetail']['Qty'] = purchasedItem.quantity;
      temp['ItemBasedExpenseLineDetail']['UnitPrice'] = purchasedItem.UnitPrice;
      temp['ItemBasedExpenseLineDetail']['ItemRef']['value'] = purchasedItem.value.toString();
      temp['ItemBasedExpenseLineDetail']['ItemRef']['name'] = purchasedItem.name;
      temp['Amount'] = purchasedItem.UnitPrice * purchasedItem.quantity;
      if (items_from_one.includes(purchasedItem.name)) {
        pub_one['Line'].push(temp);
      } else if (items_from_two.includes(purchasedItem.name)) {
        pub_two['Line'].push(temp);
      }
    }
    expensePromises.push(postQuery(demand_one, pub_one, 'purchase'));
    expensePromises.push(postQuery(demand_one, pub_two, 'purchase'));
    Promise.all(expensePromises).then(async function () {
      res.json(demandOne);
    });
  });
});

module.exports = router;
