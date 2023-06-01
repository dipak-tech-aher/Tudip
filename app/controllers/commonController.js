const moment = require('moment');

const common = {
    getOneByField: async (Model,fields,sort={}) => {
        const doc = await Model.findOne(fields).sort(sort);
        return doc;
    },
    getByField: async (Model,fields,sort={}) => {
        const doc = await Model.find(fields).sort(sort);
        return doc;
    },
    findOneAndUpdate: async (Model, filter, data) => {
        let doc = await Model.findOneAndUpdate(filter, data, {
            new: true,
            upsert: true,
            runValidators: true
        });
        return doc;
    },
    updateOne: async (Model, filter, data) => {
        let doc = await Model.findOneAndUpdate(filter, data, {
            new: true,
            runValidators: true
        });
        return doc;
    },
    findByID: async (Model,id) => {
        return await Model.findById(id);
    },
    findByIdAndUpdate: async (Model,id,data) => {
        return await Model.findByIdAndUpdate(id, data);
    },
    createOne: async (Model,data) => {
        return await Model.create(data);
    },
    getMasterFieldById: async (Model,fields,key) => {
        const doc = await Model.findOne(fields);
        if(doc){
            return doc.key?doc.key:'';
        }
        return '';
    },
    dateFormat: (date,format) => {
        try{
            if(moment(date, format).isValid()) {
                return moment(date).format(format);
            }else{
                return "";
            }
        }catch(e){
            return "";
        }
    },
    sleep: (ms) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
    getFullPath: (path) => {
      if(path != '' && path != undefined && path != 'undefined'){
        return process.env.BUCKET_URL+'/'+path;
      }
      return '';
    },
    searchKeywords: async (Model, filter) => {
        const doc = await Model.find(filter);
        return doc;
    },
    hideMiddle: (type,value) => {
        if(type == 'mobile'){
            phone = value;
            prefixLength = 6;
            suffixLength = 3;
            prefix  = phone.substring(0, prefixLength);
            suffix  = phone.slice(-suffixLength);
            nbStars = phone.length - (prefixLength + suffixLength);
            return formattedPhone = prefix + "*".repeat(nbStars) + suffix;
        }else if(type == 'email'){
          var email = value
          var hiddenEmail = "";
          for (i = 0; i < email.length; i++) {
            if (i > 2 && i< email.indexOf("@") ) {
              hiddenEmail += "*";
            } else {
              hiddenEmail += email[i];
            }
          }
          return hiddenEmail;
        }
        return '';
    },
    getCandidates: async (Model,data) => {
        let doc = await Model.aggregate([
            {
                "$project": {
                    "usertype": "$usertype",
                    "adminverified": "$adminverified",
                    "userid": {
                        "$toString": "$_id"
                    },
                    "name": 1,
                    "email": 1,
                    "mobile": 1,
                    "created_date": 1,
                    "status": 1,
                    "supplier_rating": 1,
                    "total_rating": 1,
                    "countrycode": 1,
                    "_id": 0
                }
            },
            { $sort: { "created_date": -1 } },
            {
                $match: {
                    usertype: Number(data.usertype),
                    adminverified: data.adminverified
                }
            },
            {
            "$facet": {
              "data": [
                { "$skip": data.offset },
                { "$limit": data.limit }
              ],
              "pagination": [
                { "$count": "total_records" }
              ]
            }
          }
        ]).exec();
        return doc;
    }
}

module.exports = common;