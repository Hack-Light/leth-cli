export const ensController = {
  mainnet: '0x253553366Da8546fC250F225fe3d25d0C782303b',
  goerli: '0xCc5e7dB10E65EED1BBD105359e7268aa660f6734',
}

export const getControllerWithName = (name: 'mainnet' | 'goerli') => {
  return ensController[name]
}

export const getControllerAddress = (flags: any) => {
  let address

  if (flags.rpc_url) {
    address = getControllerWithName('goerli')
  } else if (flags.mainnet) {
    address = getControllerWithName('mainnet')
  } else if (flags.goerli) {
    address = getControllerWithName('goerli')
  } else {
    address = null
  }

  return address
}

// Addresses Mainnet 29/3/2023

// NameWrapper - 0xd4416b13d2b3a9abae7acd5d6c2bbdbe25686401
// New .eth Registrar Controller - 0x253553366da8546fc250f225fe3d25d0c782303b
// New Reverse Registrar - 0xa58e81fe9b61b5c3fe2afd33cf304c454abfc7cb
// New Public Resolver - 0x231b0ee14048e9dccd1d247744d114a4eb5e8e63
// Exponential Price Curve Oracle - 0x7542565191d074ce84fbfa92cae13acb84788ca9

// Addresses Goerli 14/3/2023

// NameWrapper - 0x114D4603199df73e7D157787f8778E21fCd13066
// New .eth Registrar Controller - 0xCc5e7dB10E65EED1BBD105359e7268aa660f6734
// New Reverse Registrar - 0x4f7A657451358a22dc397d5eE7981FfC526cd856
// New Public Resolver - 0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750
// Exponential Price Curve Oracle - 0xE4354bCf22e3C6a6496C31901399D46FC4Ac6a61
// Static Metadata Service - 0x269eb6AeDeEa030B96354Bc73f0A09eae3546e23

// As usual these contracts can be discovered using ENS directly:

// NameWrapper - ens.resolver(namehash('eth')).interfaceImplementer('0x019a38fe')
// New .eth Registrar Controller - ens.resolver(namehash('eth')).interfaceImplementer('0x612e8c09')
// New Reverse Registrar - ens.owner(namehash('addr.reverse'))
// New Public Resolver - ens.resolver(namehash('resolver.ens.eth')).addr()
// Exponential Price Curve Oracle - ethController.prices()
// StaticMetadataService - nameWrapper.metadataService()
