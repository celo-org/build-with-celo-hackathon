// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: 'ngoDetails',
      title: 'NGO Data',
      type: 'document',
      fields: [
        {
          name: 'ngoname',
          title: 'NGO Nmae',
          type: 'string'
        },
        {
          name: 'description',
          title: 'NGO Description',
          type: 'string'
        },
        {
          name: 'registeredByGovt',
          title: 'Registered By',
          type: 'string'
        },
        {
          name: 'serviceSince',
          title: 'serviceSince',
          type: 'number'
        },
        {
          name: 'ngoAddress',
          title: 'ngoAddress',
          type: 'string'
        },

        {
          name: 'country',
          title: 'country',
          type: 'string'
        },
        {
          name: 'campaignCount',
          title: 'campaignCount',
          type: 'number'
        },
        {
          name: 'campaignCount',
          title: 'campaignCount',
          type: 'number'
        },
        {
          name: 'date',
          title: 'System Time',
          type: 'datetime'
        }
      ]
    },
    {
      name: 'userData',
      title: 'User Master Data',
      type: 'document',
      fields: [
        {
          name: 'name',
          title: 'Name of Business',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'string'
        },
        {
          name: 'domain',
          title: 'Domain',
          type: 'string'
        },
        {
          name: 'apiKey',
          title: 'API Key',
          type: 'string'
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        },
        {
          name: 'walletAddress',
          title: 'Registered Wallet Address',
          type: 'string'
        },
        {
          name: 'date',
          title: 'Registered on',
          type: 'datetime'
        }
      ]
    }
  ]),
})

