export const script = `import MetadataViews from 0xMetadataViews

pub struct Item {
    pub let display: MetadataViews.Display?
    pub let traits: MetadataViews.Traits?
    pub let rarity: MetadataViews.Rarity?
    pub let editions:  MetadataViews.Editions?
    pub let serial: MetadataViews.Serial?
    pub let royalties: MetadataViews.Royalties?
    pub let license: MetadataViews.License?
    pub let medias: MetadataViews.Medias?
    pub let externalURL: MetadataViews.ExternalURL?
    pub let collectionDisplay: MetadataViews.NFTCollectionDisplay?
    pub let id: UInt64

    init(
        id: UInt64,
        display: MetadataViews.Display?,
        traits: MetadataViews.Traits?,
        rarity: MetadataViews.Rarity?,
        editions:  MetadataViews.Editions?,
        serial:  MetadataViews.Serial?,
        royalties: MetadataViews.Royalties?,
        license: MetadataViews.License?,
        medias: MetadataViews.Medias?,
        externalURL: MetadataViews.ExternalURL?,
        collectionDisplay: MetadataViews.NFTCollectionDisplay?
    ){
        self.id = id
        self.display = display
        self.traits = traits
        self.rarity = rarity
        self.editions = editions
        self.serial = serial
        self.royalties = royalties
        self.license = license
        self.medias = medias
        self.externalURL = externalURL
        self.collectionDisplay = collectionDisplay
    }
}

pub struct ItemsStruct {
    pub let items: [Item]
    pub let remained: [UInt64]?

    init (items: [Item], remained: [UInt64]?){
        self.items = items
        self.remained = remained
    }
}

pub fun returnResolveCollection(account: AuthAccount, path: String): &{MetadataViews.ResolverCollection}? {
    let storPath = StoragePath(identifier: path)
        ?? panic("No item with that ID")
    let storCab = account.borrow<&{MetadataViews.ResolverCollection}>(from: storPath)
    return storCab
}

pub fun returnIds(collection: &{MetadataViews.ResolverCollection}?): [UInt64]{
    let tokensIds = collection?.getIDs() ?? panic("No items")
    return tokensIds
}

pub fun listOfTokens(
    collection: &{MetadataViews.ResolverCollection}?, 
    tokensIds: [UInt64]
): [Item] {
    let res: [Item] = []
    for tokensId in tokensIds {
        let token = collection!.borrowViewResolver(id: tokensId)
        let display = MetadataViews.getDisplay(token)
        let traits = MetadataViews.getTraits(token)
        let rarity = MetadataViews.getRarity(token)
        let editions = MetadataViews.getEditions(token)
        let serial = MetadataViews.getSerial(token)
        let royalties = MetadataViews.getRoyalties(token)
        let license = MetadataViews.getLicense(token)
        let medias = MetadataViews.getMedias(token) 
        let externalURL = MetadataViews.getExternalURL(token)
        let collectionDisplay = MetadataViews.getNFTCollectionDisplay(token)

        res.append(Item(
            id: tokensId, 
            display: display, 
            traits: traits, 
            rarity: rarity, 
            editions: editions,
            serial: serial,
            royalties: royalties,
            license: license,
            medias: medias,
            externalURL: externalURL,
            collectionDisplay: collectionDisplay
        ))
    }
    return res
}
 
pub fun main (
    address: Address, 
    paths: [String],
    ids: [UInt64]
): {String: ItemsStruct} {
    let account = getAuthAccount(address);

    let res: {String: ItemsStruct} = {}

    for path in paths {
        let collection = returnResolveCollection(account: account, path: path)
        var tokensIds: [UInt64] = []

        if ids.length > 0 {
            tokensIds = ids
        }
        else {
            tokensIds = returnIds(collection: collection)
        }

        if tokensIds.length < 50 {
            res[path] = ItemsStruct(
                items: listOfTokens(
                    collection: collection, 
                    tokensIds: tokensIds
                ), 
                remained: nil
            )
            continue
        }
        res[path] = ItemsStruct(
            items: listOfTokens(
                collection: collection, 
                tokensIds: tokensIds.slice(from: 0, upTo: 50 )
            ), 
            remained: tokensIds.slice(from: 50, upTo: tokensIds.length)
        )
    }
    return res
}
`