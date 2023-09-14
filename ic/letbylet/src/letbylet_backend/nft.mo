module {

    public type TokenId = Nat64;

    public type ApiError = {
        #Unauthorized;
        #InvalidTokenId;
        #ZeroAddress;
        #Other;
    };

    public type Result<S, E> = {
        #Ok : S;
        #Err : E;
    };

    public type MetadataDesc = [MetadataPart];

    public type MetadataPart = {
        purpose : MetadataPurpose;
        key_val_data : [MetadataKeyVal];
        data : Blob;
    };

    public type MetadataPurpose = {
        #Preview;
        #Rendered;
    };

    public type MetadataKeyVal = {
        key : Text;
        val : MetadataVal;
    };

    public type MetadataVal = {
        #TextContent : Text;
        #BlobContent : Blob;
        #NatContent : Nat;
        #Nat8Content : Nat8;
        #Nat16Content : Nat16;
        #Nat32Content : Nat32;
        #Nat64Content : Nat64;
    };

    public type MintReceipt = Result<MintReceiptPart, ApiError>;

    public type MintReceiptPart = {
        token_id : TokenId;
        id : Nat;
    };

    public type NFT = actor {
        mintDip721(to : Principal, metadata : MetadataDesc) : async MintReceipt;
    };
};
