const mailjet = require ('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

module.exports.addContact = (event, context, callback) => {

  data = event.body;

  // create contact
  const request = mailjet
  .post("contact", {'version': 'v3'})
  .request({
      "IsExcludedFromCampaigns":"true",
      "Email":data.email
    })

  request
    .then((result) => {
      // add to contact list
      const request = mailjet
        .post("listrecipient", {'version': 'v3'})
        .request({
            "ContactAlt":data.email,
            "ListID":process.env.MJ_CONTACTLIST
          })
      
      request
        .then((result) => {
           // add data ton contact
          const request = mailjet
            .put("contactdata", {'version': 'v3'})
            .id(data.email)
            .request({
                "Data":[
                  {
                    "Name":"firstname",
                    "Value":data.firstname
                  },
                  {
                    "Name":"lastname",
                    "Value":data.lastname
                  },
                  {
                    "Name":"country",
                    "Value":data.country
                  }
                ]
              })
          request
            .then((result) => {
              callback(null, result.body);
            })
            .catch((err) => {
              callback(null, err)
            })

        })
        .catch((err) => {
          callback(null, err)
        })

    })
    .catch((err) => {
      if(err.statusCode === 400) {
        // add contact to list if already created
        const request = mailjet
        .post("listrecipient", {'version': 'v3'})
        .request({
            "ContactAlt":data.email,
            "ListID":process.env.MJ_CONTACTLIST
          })
      
        request
          .then((result) => {
            callback(null, result);
          })
          .catch((err) => {
            // add data to contact if already created
            const request = mailjet
              .put("contactdata", {'version': 'v3'})
              .id(data.email)
              .request({
                  "Data":[
                    {
                      "Name":"firstname",
                      "Value":data.firstname
                    },
                    {
                      "Name":"lastname",
                      "Value":data.lastname
                    },
                    {
                      "Name":"country",
                      "Value":data.country
                    }
                  ]
                })
            request
              .then((result) => {
                callback(null, result.body);
              })
              .catch((err) => {
                callback(null, err)
              })

          })
      } else {
        callback(null, err)
      }
    })
};