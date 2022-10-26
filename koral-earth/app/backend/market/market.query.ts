export const projects = `{
  projects(where: {}) {
    id
    projectId
    owner {
      id
    }
    timestamp
    tx
    projectId
    standard
    methodology
    region
    storageMethod
    method
    emissionType
    category
    uri
    vintages {
      id
      owner {
        id
      }
      timestamp
      tx
      name
      startTime
      endTime
      totalVintageQuantity
      isCorsiaCompliant
      isCCPcompliant
      coBenefits
      correspAdjustment
      additionalCertification
      tco2Token {
        name
        symbol
        address
      }
    }
  }
}
`;

export const tco2Tokens = `{
  tco2Tokens {
    id
    creator {
      id
    }
    createdAt
    creationTx
    name
    symbol
    address
    projectVintage {
      id
      startTime
      endTime
      project {
        id
        projectId
        owner {
          id
        }
        timestamp
        tx
        projectId
        standard
        methodology
        region
        storageMethod
        method
        emissionType
        category
        uri
      }
    }
  }
}
`;
